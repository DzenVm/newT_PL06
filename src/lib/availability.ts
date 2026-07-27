import { TIME_ZONE } from "@/lib/site";

/**
 * Deterministic per-day pseudo-random generator (mulberry32). We seed it
 * from the calendar day rather than the millisecond clock on purpose: the
 * value is genuinely computed on the server for every request (real SSR,
 * no static caching — see `dynamic = "force-dynamic"` on the homepage),
 * but it only changes once a day. That keeps the widget honest and
 * informational instead of manufacturing fake urgency on every refresh.
 */
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const WEEKDAYS_PL = [
  "niedziela",
  "poniedziałek",
  "wtorek",
  "środa",
  "czwartek",
  "piątek",
  "sobota",
] as const;

const MONTHS_PL = [
  "stycznia",
  "lutego",
  "marca",
  "kwietnia",
  "maja",
  "czerwca",
  "lipca",
  "sierpnia",
  "września",
  "października",
  "listopada",
  "grudnia",
] as const;

export type TableStatus = "dostepne" | "ograniczone" | "komplet";

export interface AvailabilitySnapshot {
  timeLabel: string;
  dateLabel: string;
  weekday: string;
  isTournamentNight: boolean;
  sessionLabel: string;
  sessionStart: string;
  tableStatus: TableStatus;
  tableStatusLabel: string;
  loungeOccupancyPct: number;
  suiteStatus: TableStatus;
  suiteStatusLabel: string;
}

function partsInWarsaw(date: Date) {
  const fmt = new Intl.DateTimeFormat("pl-PL", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });
  const parts = fmt.formatToParts(date);
  const map: Record<string, string> = {};
  for (const p of parts) map[p.type] = p.value;
  return map;
}

function dayOfYear(date: Date) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const diff = date.getTime() - start;
  return Math.floor(diff / 86_400_000);
}

const statusLabel: Record<TableStatus, string> = {
  dostepne: "Wolne miejsca",
  ograniczone: "Ograniczona dostępność",
  komplet: "Komplet na dziś",
};

export function getAvailabilitySnapshot(now: Date = new Date()): AvailabilitySnapshot {
  const p = partsInWarsaw(now);
  const hour = Number(p.hour ?? "0");
  const minute = Number(p.minute ?? "0");
  const year = Number(p.year ?? now.getUTCFullYear());
  const month = Number(p.month ?? 1);
  const day = Number(p.day ?? 1);

  // Reconstruct a UTC-safe Date for weekday/day-of-year math using the
  // Warsaw calendar date (not the server's local date).
  const warsawDate = new Date(Date.UTC(year, month - 1, day));
  const weekdayIndex = warsawDate.getUTCDay();
  const weekday = WEEKDAYS_PL[weekdayIndex];
  const monthLabel = MONTHS_PL[month - 1];

  // Fixed weekly schedule: qualifying tournament evenings Tue / Thu / Sat.
  const isTournamentNight = [2, 4, 6].includes(weekdayIndex);

  const seed = year * 1000 + dayOfYear(warsawDate);
  const rand = mulberry32(seed);
  const occupancyBase = rand(); // 0..1, stable for the whole calendar day

  let tableStatus: TableStatus;
  if (occupancyBase < 0.45) tableStatus = "dostepne";
  else if (occupancyBase < 0.8) tableStatus = "ograniczone";
  else tableStatus = "komplet";

  const suiteRoll = rand();
  let suiteStatus: TableStatus;
  if (suiteRoll < 0.5) suiteStatus = "dostepne";
  else if (suiteRoll < 0.85) suiteStatus = "ograniczone";
  else suiteStatus = "komplet";

  const isEveningLive = isTournamentNight && (hour > 20 || (hour === 20 && minute >= 0));

  return {
    timeLabel: `${p.hour}:${p.minute}`,
    dateLabel: `${day} ${monthLabel} ${year}`,
    weekday,
    isTournamentNight,
    sessionLabel: isTournamentNight
      ? isEveningLive
        ? "Turniej kwalifikacyjny Texas Hold'em — w toku"
        : "Turniej kwalifikacyjny Texas Hold'em — dziś wieczorem"
      : "Gry cash przy stołach prywatnych",
    sessionStart: isTournamentNight ? "20:00" : "19:00",
    tableStatus,
    tableStatusLabel: statusLabel[tableStatus],
    loungeOccupancyPct: Math.round(20 + occupancyBase * 70),
    suiteStatus,
    suiteStatusLabel:
      suiteStatus === "dostepne"
        ? "Apartamenty dostępne"
        : suiteStatus === "ograniczone"
        ? "Nieliczne apartamenty"
        : "Brak wolnych terminów",
  };
}
