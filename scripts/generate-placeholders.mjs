import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "images", "parts");
mkdirSync(outDir, { recursive: true });

const CATEGORIES = [
  "piston",
  "brake-pads",
  "disc-rotor",
  "mirror",
  "clutch-plates",
  "chain-sprocket",
  "cdi",
  "speedometer",
  "roller",
  "oil-seal",
  "air-filter",
  "indicator",
  "lever",
  "footrest",
  "headlight",
  "side-stand",
  "engine-oil",
  "spark-plug",
  "battery",
  "camshaft",
  "chain",
  "brake-shoe",
  "cable",
  "seat",
  "engine-guard",
  "pannier-rail",
  "sealant",
  "sump-guard",
  "exhaust",
  "fender",
  "fuel-pump",
  "wiper",
];

const VARIANTS = [
  { from: "#f1f3f6", to: "#e3e8ef", accent: "#64748b" },
  { from: "#f7f1e6", to: "#eee3cf", accent: "#8a6d3b" },
  { from: "#eef2f8", to: "#dfe6f2", accent: "#51688f" },
];

const label = (s) =>
  s
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

function gearSvg(color, cx = 400, cy = 380, stroke = 34, r = 108, arm = 300, size = 92) {
  return `
  <g fill="none" stroke="${color}" stroke-width="${stroke}">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none"/>
    <rect x="${cx - size / 2}" y="${cy - arm / 2}" width="${size}" height="${arm}" rx="${size / 2}"/>
    <rect x="${cx - arm / 2}" y="${cy - size / 2}" width="${arm}" height="${size}" rx="${size / 2}"/>
  </g>`;
}

let n = 0;
for (const cat of CATEGORIES) {
  VARIANTS.forEach((v, i) => {
    const file = join(outDir, `${cat}-${i}.svg`);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${v.from}"/>
      <stop offset="1" stop-color="${v.to}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="800" fill="url(#bg)"/>
  <g opacity="0.25" stroke="${v.accent}" stroke-width="1.5">
    ${Array.from({ length: 11 }, (_, r) => `<circle cx="400" cy="380" r="${40 + r * 34}" fill="none"/>`).join("\n    ")}
  </g>
  <g opacity="0.85">${gearSvg(v.accent)}</g>
  <text x="400" y="712" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="700" letter-spacing="4" fill="${v.accent}">${label(cat)}</text>
  <text x="400" y="748" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" letter-spacing="8" fill="${v.accent}" opacity="0.6">GENUINE PART</text>
</svg>`;
    writeFileSync(file, svg);
    n++;
  });
}

const BRANDS = [
  { id: "hero", name: "HERO", color: "#f2a900" },
  { id: "bajaj", name: "BAJAJ", color: "#d11f26" },
  { id: "honda", name: "HONDA", color: "#e80000" },
  { id: "tvs", name: "TVS", color: "#e4002b" },
  { id: "yamaha", name: "YAMAHA", color: "#0f3aa3" },
  { id: "royal-enfield", name: "ROYAL ENFIELD", color: "#16306e" },
  { id: "ktm", name: "KTM", color: "#ff6600" },
  { id: "suzuki", name: "SUZUKI", color: "#004098" },
  { id: "mahindra", name: "MAHINDRA", color: "#e8433a" },
];

for (const b of BRANDS) {
  const file = join(outDir, `brand-${b.id}.svg`);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" width="800" height="520">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#f4f6f9"/>
    </linearGradient>
  </defs>
  <rect width="800" height="520" rx="36" fill="url(#bg)"/>
  <rect x="16" y="16" width="768" height="488" rx="28" fill="none" stroke="#e7ebf0" stroke-width="2"/>
  <g opacity="0.14">${gearSvg(b.color, 400, 190, 26, 84, 230, 70)}</g>
  <text x="400" y="360" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="74" font-weight="800" letter-spacing="6" fill="${b.color}">${b.name}</text>
  <text x="400" y="412" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="26" letter-spacing="10" fill="#9aa4b1">GENUINE PARTS</text>
</svg>`;
  writeFileSync(file, svg);
  n++;
}

const heroBanner = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 640" width="1600" height="640" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1b1e27"/>
      <stop offset="0.55" stop-color="#242836"/>
      <stop offset="1" stop-color="#13151c"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#e23744"/>
      <stop offset="1" stop-color="#ff9f1c"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="640" fill="url(#bg)"/>
  <g opacity="0.07" stroke="#ffffff" stroke-width="2">
    ${Array.from({ length: 14 }, (_, i) => `<circle cx="${100 + i * 120}" cy="${420 - (i % 3) * 80}" r="${52 + (i % 4) * 14}" fill="none"/>`).join("\n    ")}
  </g>
  <text x="120" y="250" font-family="Arial, Helvetica, sans-serif" font-size="38" letter-spacing="10" fill="#ff9f1c" font-weight="700">100% ORIGINAL SPARE PARTS</text>
  <text x="120" y="360" font-family="Arial, Helvetica, sans-serif" font-size="86" font-weight="800" fill="#ffffff">Ride Genuine.</text>
  <text x="120" y="460" font-family="Arial, Helvetica, sans-serif" font-size="86" font-weight="800" fill="url(#accent)">Ride Safe.</text>
  <text x="122" y="540" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#aeb6c2">Hero • Bajaj • Honda • TVS • Yamaha • Royal Enfield • KTM • Suzuki • Mahindra</text>
  <rect x="120" y="590" width="300" height="12" rx="6" fill="url(#accent)"/>
</svg>`;
writeFileSync(join(outDir, "hero-banner.svg"), heroBanner);
n++;

const promo1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300" width="1200" height="300">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e23744"/>
      <stop offset="1" stop-color="#b51523"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="300" fill="url(#bg)"/>
  <g opacity="0.12" fill="none" stroke="#ffffff" stroke-width="2">
    <circle cx="980" cy="150" r="180" fill="none"/>
    <circle cx="980" cy="150" r="110" fill="none"/>
    <circle cx="980" cy="150" r="40" fill="none"/>
  </g>
  <text x="70" y="150" font-family="Arial, Helvetica, sans-serif" font-size="60" font-weight="800" fill="#ffffff">SPARK MINDA &amp; ROYAL ENFIELD</text>
  <text x="70" y="210" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#ffd9db">Genuine Accessories • Assured Prices</text>
  <text x="70" y="258" font-family="Arial, Helvetica, sans-serif" font-size="22" letter-spacing="6" fill="#ffffff" opacity="0.85">SHOP NOW</text>
</svg>`;
writeFileSync(join(outDir, "promo-1.svg"), promo1);
n++;

const promo2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300" width="1200" height="300">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0f3aa3"/>
      <stop offset="1" stop-color="#07215e"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="300" fill="url(#bg)"/>
  <g opacity="0.12" fill="none" stroke="#ffffff" stroke-width="2">
    <circle cx="180" cy="150" r="150" fill="none"/>
    <circle cx="180" cy="150" r="90" fill="none"/>
    <circle cx="180" cy="150" r="30" fill="none"/>
  </g>
  <text x="340" y="150" font-family="Arial, Helvetica, sans-serif" font-size="60" font-weight="800" fill="#ffffff">ENGINE OILS</text>
  <text x="340" y="210" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#cdd7f0">Genuine 4T &amp; 2T Oils • Free Shipping Over $12</text>
  <text x="340" y="258" font-family="Arial, Helvetica, sans-serif" font-size="22" letter-spacing="6" fill="#ffffff" opacity="0.85">SHOP NOW</text>
</svg>`;
writeFileSync(join(outDir, "promo-2.svg"), promo2);
n++;

console.log(`Generated ${n} SVG placeholders into public/images/parts`);
