// Generates original Art-Deco style vector illustrations for the site.
// No stock photography, no third-party assets, no brand marks — pure
// procedurally-composed geometric SVG in a consistent palette.
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Source SVGs are kept outside `public/` (they're build-time inputs, not
// served assets) — only the rasterized output the app actually references
// gets written into `public/`.
const sourceDir = path.join(__dirname, "art-source");
const outDir = path.join(__dirname, "..", "public", "images");
mkdirSync(sourceDir, { recursive: true });
mkdirSync(outDir, { recursive: true });

const palette = {
  ink: "#0b0c10",
  ink2: "#14151b",
  ink3: "#1c1e26",
  gold: "#cda861",
  goldLight: "#ecd8a6",
  goldDeep: "#8a6c33",
  ivory: "#f4ecdc",
  emerald: "#0e3c2f",
  emeraldLight: "#1c5c46",
  burgundy: "#4c1626",
  burgundyLight: "#7a2438",
  smoke: "#2a2d38",
};

const deg2rad = (d) => (d * Math.PI) / 180;

function sunburst(cx, cy, rInner, rOuter, count, opts = {}) {
  const { colorA = palette.gold, colorB = "transparent", startDeg = 0, spreadDeg = 360, opacity = 0.5 } = opts;
  let out = "";
  const step = spreadDeg / count;
  for (let i = 0; i < count; i++) {
    const a0 = deg2rad(startDeg + i * step);
    const a1 = deg2rad(startDeg + i * step + step * 0.55);
    const x0 = cx + Math.cos(a0) * rInner;
    const y0 = cy + Math.sin(a0) * rInner;
    const x1 = cx + Math.cos(a0) * rOuter;
    const y1 = cy + Math.sin(a0) * rOuter;
    const x2 = cx + Math.cos(a1) * rOuter;
    const y2 = cy + Math.sin(a1) * rOuter;
    const x3 = cx + Math.cos(a1) * rInner;
    const y3 = cy + Math.sin(a1) * rInner;
    const c = i % 2 === 0 ? colorA : colorB;
    out += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} L ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)} L ${x3.toFixed(1)} ${y3.toFixed(1)} Z" fill="${c}" opacity="${opacity}"/>`;
  }
  return out;
}

function diamondStar(x, y, s, color, opacity = 1) {
  return `<path d="M ${x} ${y - s} L ${x + s * 0.32} ${y} L ${x} ${y + s} L ${x - s * 0.32} ${y} Z" fill="${color}" opacity="${opacity}"/>`;
}

function chevronBorder(x, y, w, h, teeth, color, opacity = 0.8) {
  let out = "";
  const tw = w / teeth;
  for (let i = 0; i < teeth; i++) {
    const x0 = x + i * tw;
    out += `<path d="M ${x0} ${y + h} L ${x0 + tw / 2} ${y} L ${x0 + tw} ${y + h} Z" fill="${color}" opacity="${opacity}"/>`;
  }
  return out;
}

function steppedTower(x, baseY, width, height, steps, color, opacity = 1) {
  let out = `<g opacity="${opacity}">`;
  let y = baseY;
  let w = width;
  for (let i = 0; i < steps; i++) {
    const h = height / steps;
    y -= h;
    out += `<rect x="${(x - w / 2).toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${(h + 1).toFixed(1)}" fill="${color}"/>`;
    w *= 0.78;
  }
  out += "</g>";
  return out;
}

function svgWrap(w, h, defs, body, bg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
<defs>${defs}</defs>
<rect width="${w}" height="${h}" fill="${bg}"/>
${body}
</svg>`;
}

/* ---------------------------------------------------------------- */
/* 1. HERO — Warsaw skyline, Art Deco towers, night glow             */
/* ---------------------------------------------------------------- */
function heroWarsaw() {
  const w = 1920, h = 1080;
  const defs = `
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${palette.ink}"/>
      <stop offset="55%" stop-color="${palette.ink2}"/>
      <stop offset="100%" stop-color="${palette.emerald}" stop-opacity="0.35"/>
    </linearGradient>
    <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${palette.goldLight}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${palette.goldLight}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="groundGlow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${palette.gold}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${palette.gold}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="towerShade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </linearGradient>`;

  let body = `<rect width="${w}" height="${h}" fill="url(#sky)"/>`;
  body += `<circle cx="1540" cy="230" r="260" fill="url(#moonGlow)"/>`;
  body += `<circle cx="1540" cy="230" r="70" fill="${palette.goldLight}" opacity="0.95"/>`;

  // stars
  let stars = "";
  const rnd = mulberry32(7);
  for (let i = 0; i < 70; i++) {
    const sx = rnd() * w;
    const sy = rnd() * h * 0.45;
    const s = 2 + rnd() * 4;
    stars += diamondStar(sx, sy, s, palette.goldLight, 0.25 + rnd() * 0.5);
  }
  body += stars;

  // skyline towers, silhouette, varying heights, art-deco stepped tops
  const baseY = 760;
  const towers = [
    { x: 120, w: 140, h: 380, steps: 4 },
    { x: 260, w: 90, h: 260, steps: 3 },
    { x: 380, w: 160, h: 520, steps: 5 },
    { x: 560, w: 110, h: 340, steps: 4 },
    { x: 700, w: 200, h: 640, steps: 6 },
    { x: 940, w: 130, h: 420, steps: 4 },
    { x: 1080, w: 90, h: 300, steps: 3 },
    { x: 1200, w: 170, h: 560, steps: 5 },
    { x: 1380, w: 110, h: 360, steps: 4 },
    { x: 1700, w: 150, h: 460, steps: 5 },
    { x: 1840, w: 100, h: 300, steps: 3 },
  ];
  for (const t of towers) {
    body += steppedTower(t.x, baseY, t.w, t.h, t.steps, palette.ink3, 1);
    // spire accent
    body += `<rect x="${t.x - 2}" y="${baseY - t.h - 40}" width="4" height="40" fill="${palette.gold}" opacity="0.8"/>`;
    body += `<circle cx="${t.x}" cy="${baseY - t.h - 44}" r="4" fill="${palette.goldLight}"/>`;
    // lit windows
    let win = "";
    const cols = Math.max(2, Math.floor(t.w / 22));
    const rows = Math.max(3, Math.floor(t.h / 30));
    const rw = mulberry32(t.x);
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        if (rw() > 0.62) continue;
        const wx = t.x - t.w / 2 + 10 + c * (t.w / cols);
        const wy = baseY - 12 - r * (t.h / rows);
        win += `<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="5" height="8" fill="${palette.gold}" opacity="${(0.35 + rw() * 0.5).toFixed(2)}"/>`;
      }
    }
    body += win;
  }

  // foreground hotel tower — centerpiece, wider + tallest + gold trim
  body += `<g>
    ${steppedTower(960, baseY + 20, 260, 720, 7, palette.ink, 1)}
    <rect x="836" y="${baseY - 700}" width="248" height="10" fill="${palette.gold}"/>
    <rect x="866" y="${baseY - 560}" width="188" height="6" fill="${palette.gold}" opacity="0.85"/>
    <rect x="896" y="${baseY - 420}" width="128" height="6" fill="${palette.gold}" opacity="0.7"/>
    ${sunburst(960, baseY - 760, 6, 60, 20, { colorA: palette.gold, colorB: "transparent", opacity: 0.7 })}
    <rect x="954" y="${baseY - 800}" width="12" height="46" fill="${palette.gold}"/>
    <circle cx="960" cy="${baseY - 806}" r="7" fill="${palette.goldLight}"/>
  </g>`;

  body += `<rect x="0" y="${baseY}" width="${w}" height="${h - baseY}" fill="url(#groundGlow)"/>`;
  body += `<rect x="0" y="${baseY - 2}" width="${w}" height="4" fill="${palette.gold}" opacity="0.35"/>`;

  return svgWrap(w, h, defs, body, palette.ink);
}

function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------------------------------------------------------------- */
/* 2. POKER LOUNGE — art-deco table, chips, cards, chandelier glow   */
/* ---------------------------------------------------------------- */
function pokerLounge() {
  const w = 1600, h = 1100;
  const defs = `
    <radialGradient id="pokerBg" cx="50%" cy="30%" r="80%">
      <stop offset="0%" stop-color="${palette.ink3}"/>
      <stop offset="100%" stop-color="${palette.ink}"/>
    </radialGradient>
    <radialGradient id="felt" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="${palette.emeraldLight}"/>
      <stop offset="100%" stop-color="${palette.emerald}"/>
    </radialGradient>
    <radialGradient id="spot" cx="50%" cy="0%" r="70%">
      <stop offset="0%" stop-color="${palette.goldLight}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${palette.goldLight}" stop-opacity="0"/>
    </radialGradient>`;

  let body = "";
  body += `<ellipse cx="800" cy="50" rx="900" ry="260" fill="url(#spot)"/>`;

  // hanging chandelier — abstract sunburst fixture
  body += `<g>
    <line x1="800" y1="0" x2="800" y2="120" stroke="${palette.gold}" stroke-width="3" opacity="0.7"/>
    ${sunburst(800, 150, 14, 90, 24, { colorA: palette.gold, colorB: palette.goldLight, opacity: 0.65 })}
    <circle cx="800" cy="150" r="16" fill="${palette.goldLight}"/>
  </g>`;

  // table
  body += `<ellipse cx="800" cy="640" rx="640" ry="300" fill="${palette.ink3}"/>`;
  body += `<ellipse cx="800" cy="620" rx="620" ry="288" fill="${palette.goldDeep}"/>`;
  body += `<ellipse cx="800" cy="612" rx="580" ry="264" fill="url(#felt)"/>`;
  body += `<ellipse cx="800" cy="612" rx="580" ry="264" fill="none" stroke="${palette.gold}" stroke-width="4" opacity="0.6"/>`;
  body += `<ellipse cx="800" cy="612" rx="460" ry="196" fill="none" stroke="${palette.goldLight}" stroke-width="1.5" opacity="0.35"/>`;

  // fanned cards (blank, no suits/logos) top area of table
  const cardW = 92, cardH = 132;
  const cardCount = 5;
  let cards = `<g>`;
  for (let i = 0; i < cardCount; i++) {
    const angle = -30 + i * 15;
    const cx = 800 + i * 6;
    const cy = 470;
    cards += `<g transform="translate(${cx} ${cy}) rotate(${angle})">
      <rect x="${-cardW / 2}" y="${-cardH / 2}" width="${cardW}" height="${cardH}" rx="8" fill="${palette.ivory}" stroke="${palette.goldDeep}" stroke-width="2"/>
      <rect x="${-cardW / 2 + 10}" y="${-cardH / 2 + 10}" width="${cardW - 20}" height="${cardH - 20}" rx="4" fill="none" stroke="${palette.gold}" stroke-width="1" opacity="0.5"/>
      <circle cx="0" cy="0" r="10" fill="none" stroke="${palette.goldDeep}" stroke-width="1.5" opacity="0.6"/>
    </g>`;
  }
  cards += `</g>`;
  body += cards;

  // chip stacks
  function chipStack(cx, cy, count, color) {
    let s = "";
    for (let i = 0; i < count; i++) {
      const cyy = cy - i * 8;
      s += `<ellipse cx="${cx}" cy="${cyy}" rx="26" ry="10" fill="${color}" stroke="${palette.ivory}" stroke-width="2"/>`;
      s += `<ellipse cx="${cx}" cy="${cyy - 3}" rx="26" ry="10" fill="none" stroke="${palette.ivory}" stroke-width="1" stroke-dasharray="4 5" opacity="0.7"/>`;
    }
    return s;
  }
  body += chipStack(560, 760, 6, palette.burgundyLight);
  body += chipStack(610, 770, 4, palette.gold);
  body += chipStack(1020, 770, 5, palette.ink3);
  body += chipStack(1070, 762, 7, palette.emeraldLight);
  body += chipStack(800, 800, 3, palette.gold);

  // dice accent (private lounge / games, not betting-explicit)
  body += `<g transform="translate(900 790) rotate(18)">
    <rect x="-18" y="-18" width="36" height="36" rx="6" fill="${palette.ivory}" stroke="${palette.goldDeep}" stroke-width="2"/>
    <circle cx="0" cy="0" r="3" fill="${palette.ink}"/>
  </g>`;

  // ornamental border chevrons at bottom
  body += chevronBorder(60, h - 50, w - 120, 34, 22, palette.gold, 0.35);

  body += `<rect width="${w}" height="${h}" fill="none"/>`;
  return svgWrap(w, h, defs, body, "url(#pokerBg)").replace('fill="url(#pokerBg)"', 'fill="url(#pokerBg)"');
}

/* ---------------------------------------------------------------- */
/* 3. SUITE — art-deco bedroom interior, arched window, skyline view */
/* ---------------------------------------------------------------- */
function suiteInterior() {
  const w = 1600, h = 1100;
  const defs = `
    <linearGradient id="roomBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${palette.ink2}"/>
      <stop offset="100%" stop-color="${palette.ink}"/>
    </linearGradient>
    <linearGradient id="windowSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2c3550"/>
      <stop offset="100%" stop-color="${palette.emerald}" stop-opacity="0.4"/>
    </linearGradient>
    <linearGradient id="bedThrow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${palette.burgundy}"/>
      <stop offset="100%" stop-color="${palette.burgundyLight}"/>
    </linearGradient>
    <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${palette.goldLight}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${palette.goldLight}" stop-opacity="0"/>
    </radialGradient>`;

  let body = "";
  // wall panel lines (art deco fluting)
  for (let i = 0; i < 14; i++) {
    body += `<line x1="${i * 120}" y1="0" x2="${i * 120}" y2="700" stroke="${palette.ink3}" stroke-width="2" opacity="0.5"/>`;
  }
  // floor
  body += `<rect x="0" y="700" width="${w}" height="${h - 700}" fill="${palette.ink3}"/>`;
  for (let i = 0; i < 20; i++) {
    body += `<line x1="${-200 + i * 100}" y1="700" x2="${i * 90}" y2="${h}" stroke="${palette.ink}" stroke-width="2" opacity="0.4"/>`;
  }

  // arched window with skyline
  body += `<g>
    <path d="M 980 620 L 980 260 A 220 220 0 0 1 1420 260 L 1420 620 Z" fill="url(#windowSky)"/>
    <circle cx="1300" cy="300" r="34" fill="${palette.goldLight}" opacity="0.85"/>
    ${steppedTower(1080, 610, 60, 180, 4, palette.ink, 0.9)}
    ${steppedTower(1160, 610, 90, 260, 5, palette.ink2, 0.95)}
    ${steppedTower(1280, 610, 70, 210, 4, palette.ink, 0.9)}
    ${steppedTower(1370, 610, 50, 150, 3, palette.ink2, 0.85)}
    <path d="M 980 620 L 980 260 A 220 220 0 0 1 1420 260 L 1420 620 Z" fill="none" stroke="${palette.gold}" stroke-width="6"/>
    <line x1="1200" y1="220" x2="1200" y2="620" stroke="${palette.gold}" stroke-width="3" opacity="0.7"/>
    <path d="M 990 460 L 1410 460" stroke="${palette.gold}" stroke-width="2" opacity="0.5"/>
  </g>`;

  // bed
  body += `<g>
    <rect x="120" y="560" width="640" height="180" rx="18" fill="${palette.ink3}"/>
    <rect x="150" y="520" width="580" height="70" rx="24" fill="${palette.ivory}"/>
    <rect x="150" y="600" width="580" height="120" rx="14" fill="url(#bedThrow)"/>
    <rect x="150" y="600" width="580" height="16" fill="${palette.gold}" opacity="0.8"/>
    <rect x="120" y="420" width="70" height="150" rx="14" fill="${palette.ivory}" transform="rotate(-4 155 495)"/>
    <rect x="210" y="420" width="70" height="150" rx="14" fill="${palette.ivory}" transform="rotate(3 245 495)"/>
    <rect x="80" y="380" width="30" height="360" fill="${palette.ink2}"/>
    <rect x="720" y="380" width="30" height="360" fill="${palette.ink2}"/>
    ${sunburst(95, 380, 4, 30, 12, { colorA: palette.gold, opacity: 0.8 })}
    ${sunburst(735, 380, 4, 30, 12, { colorA: palette.gold, opacity: 0.8 })}
  </g>`;

  // side table + lamp
  body += `<g>
    <rect x="800" y="640" width="120" height="100" fill="${palette.ink3}"/>
    <rect x="800" y="632" width="120" height="10" fill="${palette.gold}" opacity="0.7"/>
    <circle cx="860" cy="560" r="70" fill="url(#lampGlow)"/>
    <path d="M 830 600 L 890 600 L 875 540 L 845 540 Z" fill="${palette.goldLight}" opacity="0.9"/>
    <rect x="856" y="600" width="8" height="30" fill="${palette.ink2}"/>
  </g>`;

  // ceiling sunburst fixture
  body += sunburst(500, 40, 10, 70, 18, { colorA: palette.gold, opacity: 0.5 });

  body += chevronBorder(0, h - 26, w, 26, 26, palette.gold, 0.25);

  return svgWrap(w, h, defs, body, palette.ink);
}

/* ---------------------------------------------------------------- */
/* 4. SPA — pool, steam, palm fans, candlelight                      */
/* ---------------------------------------------------------------- */
function spaScene() {
  const w = 1600, h = 1100;
  const defs = `
    <linearGradient id="spaBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${palette.ink2}"/>
      <stop offset="100%" stop-color="${palette.emerald}" stop-opacity="0.55"/>
    </linearGradient>
    <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${palette.emeraldLight}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${palette.ink3}"/>
    </linearGradient>
    <radialGradient id="candle" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${palette.goldLight}" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="${palette.goldLight}" stop-opacity="0"/>
    </radialGradient>`;

  let body = "";
  // arched colonnade background
  for (let i = 0; i < 6; i++) {
    const x = 60 + i * 260;
    body += `<path d="M ${x} 640 L ${x} 260 A 120 120 0 0 1 ${x + 240} 260 L ${x + 240} 640" fill="none" stroke="${palette.ink3}" stroke-width="14" opacity="0.6"/>`;
  }
  // pool
  body += `<ellipse cx="800" cy="760" rx="720" ry="220" fill="${palette.ink3}"/>`;
  body += `<ellipse cx="800" cy="740" rx="680" ry="196" fill="url(#water)"/>`;
  for (let i = 0; i < 8; i++) {
    body += `<ellipse cx="${800 + (i - 4) * 70}" cy="${740 - Math.abs(i - 4) * 4}" rx="60" ry="8" fill="${palette.goldLight}" opacity="0.12"/>`;
  }
  body += `<ellipse cx="800" cy="740" rx="680" ry="196" fill="none" stroke="${palette.gold}" stroke-width="4" opacity="0.5"/>`;

  // steam swirls
  function steam(x, y) {
    return `<path d="M ${x} ${y} C ${x - 30} ${y - 60}, ${x + 30} ${y - 90}, ${x} ${y - 150} C ${x - 24} ${y - 200}, ${x + 24} ${y - 220}, ${x} ${y - 270}" stroke="${palette.ivory}" stroke-width="6" fill="none" opacity="0.18" stroke-linecap="round"/>`;
  }
  body += steam(500, 640) + steam(1100, 620) + steam(800, 600);

  // palm fan leaves (art deco fan motif)
  function palmFan(x, y, scale, color) {
    let s = `<g transform="translate(${x} ${y}) scale(${scale})">`;
    for (let i = -3; i <= 3; i++) {
      const a = i * 12;
      s += `<path d="M 0 0 L 0 -140" stroke="${color}" stroke-width="14" stroke-linecap="round" transform="rotate(${a})" opacity="0.85"/>`;
    }
    s += `</g>`;
    return s;
  }
  body += palmFan(160, 780, 0.9, palette.emeraldLight);
  body += palmFan(1440, 780, 0.9, palette.emeraldLight);

  // candles row
  for (let i = 0; i < 5; i++) {
    const cx = 300 + i * 260;
    body += `<circle cx="${cx}" cy="900" r="46" fill="url(#candle)"/>`;
    body += `<rect x="${cx - 10}" y="900" width="20" height="34" fill="${palette.ivory}" opacity="0.9"/>`;
    body += `<path d="M ${cx} 892 q 6 -14 0 -22 q -6 8 0 22 Z" fill="${palette.gold}"/>`;
  }

  body += sunburst(800, 60, 12, 90, 22, { colorA: palette.gold, opacity: 0.35 });
  body += chevronBorder(0, h - 26, w, 26, 26, palette.gold, 0.22);

  return svgWrap(w, h, defs, body, "url(#spaBg)");
}

/* ---------------------------------------------------------------- */
/* 5. RESTAURANT / BAR — bottles, glassware, pendant lights           */
/* ---------------------------------------------------------------- */
function restaurantBar() {
  const w = 1600, h = 1100;
  const defs = `
    <linearGradient id="barBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${palette.ink}"/>
      <stop offset="60%" stop-color="${palette.ink2}"/>
      <stop offset="100%" stop-color="${palette.burgundy}" stop-opacity="0.35"/>
    </linearGradient>
    <linearGradient id="counter" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${palette.goldDeep}"/>
      <stop offset="100%" stop-color="${palette.ink3}"/>
    </linearGradient>`;

  let body = "";
  // back shelf with bottles
  body += `<rect x="0" y="180" width="${w}" height="16" fill="${palette.gold}" opacity="0.5"/>`;
  body += `<rect x="0" y="360" width="${w}" height="16" fill="${palette.gold}" opacity="0.4"/>`;
  const bottleColors = [palette.emeraldLight, palette.burgundyLight, palette.gold, palette.ink3, palette.goldDeep];
  const rnd = mulberry32(3);
  for (let row = 0; row < 2; row++) {
    const y = row === 0 ? 180 : 360;
    for (let i = 0; i < 26; i++) {
      const bx = 30 + i * 60 + rnd() * 10;
      const bh = 90 + rnd() * 60;
      const bw = 20 + rnd() * 10;
      const c = bottleColors[Math.floor(rnd() * bottleColors.length)];
      body += `<rect x="${bx.toFixed(1)}" y="${(y - bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="4" fill="${c}" opacity="0.85"/>`;
      body += `<rect x="${(bx + bw / 2 - 3).toFixed(1)}" y="${(y - bh - 16).toFixed(1)}" width="6" height="16" fill="${c}" opacity="0.85"/>`;
    }
  }

  // pendant lights
  for (let i = 0; i < 5; i++) {
    const cx = 200 + i * 300;
    body += `<line x1="${cx}" y1="0" x2="${cx}" y2="130" stroke="${palette.gold}" stroke-width="2" opacity="0.6"/>`;
    body += `<circle cx="${cx}" cy="150" r="26" fill="${palette.goldLight}" opacity="0.85"/>`;
    body += `<circle cx="${cx}" cy="150" r="60" fill="${palette.goldLight}" opacity="0.15"/>`;
  }

  // bar counter, curved
  body += `<path d="M -20 900 Q 800 760 1620 900 L 1620 1120 L -20 1120 Z" fill="url(#counter)"/>`;
  body += `<path d="M -20 900 Q 800 760 1620 900" fill="none" stroke="${palette.gold}" stroke-width="6" opacity="0.7"/>`;

  // glassware on counter
  function martini(x, y, color) {
    return `<g transform="translate(${x} ${y})">
      <path d="M -26 -30 L 0 0 L 26 -30 Z" fill="none" stroke="${palette.ivory}" stroke-width="3"/>
      <path d="M -22 -28 L 0 -6 L 22 -28 Z" fill="${color}" opacity="0.75"/>
      <line x1="0" y1="0" x2="0" y2="30" stroke="${palette.ivory}" stroke-width="3"/>
      <line x1="-14" y1="30" x2="14" y2="30" stroke="${palette.ivory}" stroke-width="3"/>
    </g>`;
  }
  function rocks(x, y, color) {
    return `<g transform="translate(${x} ${y})">
      <rect x="-18" y="-30" width="36" height="34" rx="4" fill="none" stroke="${palette.ivory}" stroke-width="3"/>
      <rect x="-15" y="-14" width="30" height="16" rx="2" fill="${color}" opacity="0.8"/>
    </g>`;
  }
  body += martini(560, 840, palette.gold);
  body += rocks(680, 850, palette.burgundyLight);
  body += martini(900, 838, palette.emeraldLight);
  body += rocks(1020, 852, palette.gold);

  body += chevronBorder(0, h - 24, w, 24, 26, palette.gold, 0.25);

  return svgWrap(w, h, defs, body, "url(#barBg)");
}

/* ---------------------------------------------------------------- */
/* FAVICON — abstract geometric fan mark (no letters, no brand)      */
/* ---------------------------------------------------------------- */
function faviconMark() {
  const w = 256, h = 256;
  const defs = `
    <linearGradient id="favBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${palette.ink2}"/>
      <stop offset="100%" stop-color="${palette.ink}"/>
    </linearGradient>`;
  let body = `<circle cx="128" cy="128" r="124" fill="url(#favBg)" stroke="${palette.gold}" stroke-width="4"/>`;
  body += sunburst(128, 150, 10, 96, 16, { colorA: palette.gold, colorB: palette.goldLight, opacity: 0.9, startDeg: -180, spreadDeg: 180 });
  body += `<circle cx="128" cy="150" r="14" fill="${palette.ivory}"/>`;
  body += diamondStar(128, 62, 22, palette.gold, 0.95);
  return svgWrap(w, h, defs, body, "transparent");
}

/* ---------------------------------------------------------------- */

const assets = {
  "hero-warsaw": heroWarsaw(),
  "poker-lounge": pokerLounge(),
  "suite-interior": suiteInterior(),
  "spa": spaScene(),
  "restaurant-bar": restaurantBar(),
};

for (const [name, svg] of Object.entries(assets)) {
  writeFileSync(path.join(sourceDir, `${name}.svg`), svg, "utf8");
}
const faviconSvgPath = path.join(sourceDir, "favicon-mark.svg");
writeFileSync(faviconSvgPath, faviconMark(), "utf8");

console.log("SVG art generated. Rasterizing served assets...");

const raster = async () => {
  for (const name of Object.keys(assets)) {
    const svgPath = path.join(sourceDir, `${name}.svg`);
    await sharp(svgPath).webp({ quality: 88 }).toFile(path.join(outDir, `${name}.webp`));
  }

  const appDir = path.join(__dirname, "..", "src", "app");
  await sharp(faviconSvgPath).resize(32, 32).png().toFile(path.join(appDir, "icon.png"));
  await sharp(faviconSvgPath).resize(180, 180).png().toFile(path.join(appDir, "apple-icon.png"));
  await sharp(faviconSvgPath).resize(192, 192).png().toFile(path.join(outDir, "..", "icon-192.png"));
  await sharp(faviconSvgPath).resize(512, 512).png().toFile(path.join(outDir, "..", "icon-512.png"));

  const { copyFileSync } = await import("node:fs");
  copyFileSync(faviconSvgPath, path.join(appDir, "icon.svg"));

  console.log("Rasterization complete.");
};

await raster();
