import { getAvailabilitySnapshot, type TableStatus } from "@/lib/availability";
import { IconClock } from "@/components/icons";

const dotColor: Record<TableStatus, string> = {
  dostepne: "bg-emerald-light",
  ograniczone: "bg-gold",
  komplet: "bg-burgundy-light",
};

export function AvailabilityStrip() {
  // Computed fresh on every request on the server — see `force-dynamic`
  // on the page — not a static value baked in at build time.
  const s = getAvailabilitySnapshot();

  return (
    <section id="status" className="border-y border-gold-deep/25 bg-ink-2">
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 text-ivory/70">
            <IconClock className="h-5 w-5 text-gold" />
            <span className="text-sm">
              Czas w Warszawie:{" "}
              <span className="font-medium text-ivory">{s.timeLabel}</span> ·{" "}
              {s.weekday}, {s.dateLabel}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
            <div className="flex items-center gap-2.5">
              <span className={`h-2 w-2 rounded-full ${dotColor[s.tableStatus]}`} />
              <span className="text-ivory/80">
                Salon gier: <span className="text-ivory">{s.tableStatusLabel}</span>
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className={`h-2 w-2 rounded-full ${dotColor[s.suiteStatus]}`} />
              <span className="text-ivory/80">
                Apartamenty: <span className="text-ivory">{s.suiteStatusLabel}</span>
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-gold" />
              <span className="text-ivory/80">
                Dziś: <span className="text-ivory">{s.sessionLabel}</span>
              </span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-ivory/35">
          Status generowany po stronie serwera przy każdym wejściu na stronę,
          na podstawie stałego harmonogramu tygodniowego. Ma charakter
          informacyjny — ostateczną dostępność potwierdza recepcja.
        </p>
      </div>
    </section>
  );
}
