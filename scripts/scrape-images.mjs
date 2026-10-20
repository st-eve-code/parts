import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PRODUCTS_SRC = path.join(ROOT, "src", "data", "products.ts");
const OUT_DIR = path.join(ROOT, "public", "images", "products");
const OUT_MAP = path.join(ROOT, "src", "data", "images.ts");

const POW = "https://partonwheels.com";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const HEADERS = {
  "User-Agent": UA,
  "Accept-Language": "en-US,en;q=0.9",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
};

const TERMS = {
  piston: "piston",
  "brake-pads": "brake pad",
  "disc-rotor": "disc",
  mirror: "mirror",
  "clutch-plates": "clutch plate",
  "chain-sprocket": "chain sprocket",
  cdi: "cdi",
  speedometer: "speedometer",
  roller: "roller",
  "oil-seal": "oil seal",
  "air-filter": "air filter",
  indicator: "indicator",
  lever: "lever",
  footrest: "footrest",
  headlight: "headlight",
  "side-stand": "side stand",
  "engine-oil": "engine oil",
  "spark-plug": "spark plug",
  battery: "battery",
  camshaft: "camshaft",
  chain: "chain",
  "brake-shoe": "brake shoe",
  cable: "cable",
  seat: "seat",
  "engine-guard": "engine guard",
  "pannier-rail": "rail",
  sealant: "sealant",
  "sump-guard": "sump guard",
  exhaust: "exhaust",
  fender: "fender",
  "fuel-pump": "fuel pump",
};

const STOP = new Set([
  "the", "for", "and", "with", "kit", "kits", "set", "new", "all", "original", "genuine",
  "oem", "replacement", "part", "parts", "front", "rear", "left", "right", "side", "of",
  "plus", "old", "model", "assembly", "unit", "set", "with",
]);

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function tokens(text) {
  return (text ?? "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function significantTokens(text) {
  return tokens(text).filter((t) => !STOP.has(t) && t.length > 1);
}

async function fetchText(url, tries = 2) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { headers: HEADERS, redirect: "follow" });
      if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
      return await res.text();
    } catch (err) {
      if (i === tries - 1) throw err;
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
}

function largestImage(html) {
  const sizes = [...html.matchAll(/srcset="([^"]+)"/g)].flatMap((m) => m[1].split(","));
  let best = null;
  let bestW = 0;
  for (const s of sizes) {
    const [url, size] = s.trim().split(/\s+/);
    const w = parseInt(size || "", 10) || 0;
    if (w > bestW && /wp-content\/uploads/.test(url) && !/Logo/i.test(url)) {
      best = url;
      bestW = w;
    }
  }
  return best;
}

function searchCards(html) {
  const cards = [];
  for (const m of html.matchAll(/<div[^>]*class="[^"]*\bproduct\b[^"]*type-product[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi)) {
    const card = m[1];
    const url = card.match(/<a[^>]+href="(https:\/\/partonwheels\.com\/product\/[^"]+)"[^>]*>/i)?.[1];
    const title = card.match(/class="product-title"[^>]*>[\s\S]*?<a[^>]*>([^<]*)<\/a>/i)?.[1]?.trim();
    if (!url) continue;
    cards.push({
      url,
      title: title || url.split("/product/")[1].replace(/-/g, " "),
      img: largestImage(card),
    });
  }
  return cards;
}

function score(candidate, wanted) {
  const titleTokens = significantTokens(candidate.title);
  let score = 0;
  for (const w of wanted) {
    if (w.length <= 2) continue;
    const hit = titleTokens.filter((t) => t.includes(w) || w.includes(t)).length;
    if (hit > 0) score += 1;
  }
  return score;
}

async function download(url) {
  const res = await fetch(url, { headers: HEADERS, redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 500) throw new Error(`Suspiciously small image (${buf.length}b) ${url}`);
  return buf;
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function findPartonWheels(product) {
  const { brand, category, name, models } = product;
  const term = TERMS[category] ?? category.replace(/-/g, " ");
  const model = (models[0] ?? "").split(" ").filter((w) => w.length > 2).slice(0, 2).join(" ");
  const wanted = significantTokens(`${name} ${models.join(" ")} ${brand} ${term}`);
  const categoryTokens = significantTokens(term);

  const queries = [
    [term, model, brand].filter(Boolean).join(" "),
    [model, brand].filter(Boolean).join(" "),
    [term, brand].filter(Boolean).join(" "),
    [brand, category.replace(/-/g, " ")].filter(Boolean).join(" "),
  ];

  const hasCategory = (candidate) => {
    const titleTokens = significantTokens(candidate.title);
    return categoryTokens.some((ct) => titleTokens.some((t) => t.includes(ct) || ct.includes(t)));
  };

  let best = null;
  for (const q of queries) {
    let cards = [];
    try {
      const html = await fetchText(`${POW}/?s=${encodeURIComponent(q)}&post_type=product`);
      cards = searchCards(html);
    } catch {
      cards = [];
    }
    const scored = cards
      .map((c) => ({ ...c, score: score(c, wanted) }))
      .filter((c) => hasCategory(c))
      .sort((a, b) => b.score - a.score);
    if (scored.length && (!best || scored[0].score > best.score)) {
      best = scored[0];
    }
    if (best && best.score >= 4) break;
    await delay(200);
  }

  return best && best.score >= 4 ? best : null;
}

async function tryAmazon(query) {
  try {
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(query)}`;
    const res = await fetch(url, { headers: HEADERS, redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    if (html.length < 5000 || /Robot Check|captcha|bm-verify/i.test(html)) return null;
    const cards = [...html.matchAll(/data-asin="[^"]+"[\s\S]{0,6000}?src="([^"]+\.(?:jpg|jpeg|png|webp))"/g)];
    return cards.length ? cards[0][1] : null;
  } catch {
    return null;
  }
}

async function scrapeProduct(product, log) {
  const { slug } = product;
  const existing = await fs.readdir(OUT_DIR).catch(() => []);
  const found = existing.find((f) => f.startsWith(slug + "."));
  if (found) return { slug, ok: true, cached: true };

  let imageUrl = null;
  let source = null;

  const match = await findPartonWheels(product);
  if (match) {
    if (match.img) {
      imageUrl = match.img;
      source = "partonwheels";
    } else {
      try {
        const pageHtml = await fetchText(match.url);
        const m = pageHtml.match(/class="wp-post-image"[^>]*data-src="([^"]+)"/i) ||
          pageHtml.match(/class="wp-post-image"[^>]*src="([^"]+)"/i);
        if (m) {
          imageUrl = m[1];
          source = "partonwheels-page";
        }
      } catch (err) {
        log(`  page failed ${match.url}: ${err.message}`);
      }
    }
  }

  if (!imageUrl) {
    const term = TERMS[product.category] ?? product.category.replace(/-/g, " ");
    const model = (product.models[0] ?? "").split(" ").filter((w) => w.length > 2).slice(0, 2).join(" ");
    imageUrl = await tryAmazon([term, model, product.brand].filter(Boolean).join(" "));
    if (imageUrl) source = "amazon";
  }

  if (!imageUrl) {
    return { slug, ok: false, reason: "no image found" };
  }

  const dest = path.join(OUT_DIR, `${slug}.jpg`);
  try {
    const buf = await download(imageUrl);
    await sharp(buf).resize({ width: 800, height: 800, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 82 }).toFile(dest);
    return { slug, ok: true, url: imageUrl, source };
  } catch (err) {
    return { slug, ok: false, reason: err.message };
  }
}

async function main() {
  const src = await fs.readFile(PRODUCTS_SRC, "utf8");
  const blocks = [...src.matchAll(/part\(\{([\s\S]*?)\}\)\s*,/g)];

  const products = blocks.map((b) => {
    const body = b[1];
    const brand = body.match(/\bbrand:\s*"([^"]+)"/)?.[1];
    const category = body.match(/\bcategory:\s*"([^"]+)"/)?.[1];
    const name = body.match(/\bname:\s*"([^"]+)"/)?.[1];
    const modelsBlock = body.match(/\bmodels:\s*\[([\s\S]*?)\]/)?.[1] ?? "";
    const models = [...modelsBlock.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
    return { slug: slugify(`${brand} ${category} ${name}`), brand, category, name, models };
  }).filter((p) => p.slug);

  await fs.mkdir(OUT_DIR, { recursive: true });

  const results = [];
  const queue = [...products];
  const workers = Math.min(3, queue.length);
  let cursor = 0;

  async function worker() {
    while (true) {
      const idx = cursor++;
      if (idx >= queue.length) return;
      const product = queue[idx];
      process.stdout.write(`[${idx + 1}/${queue.length}] ${product.brand}/${product.category} ${product.name.slice(0, 40)}...\n`);
      const r = await scrapeProduct(product);
      results.push(r);
      await delay(120);
    }
  }

  await Promise.all(Array.from({ length: workers }, worker));

  const ok = results.filter((r) => r.ok);
  const fail = results.filter((r) => !r.ok);
  console.log(`\nOK: ${ok.length}  FAIL: ${fail.length}`);
  for (const f of fail) {
    console.log(`  FAIL ${f.slug}: ${f.reason}`);
  }

  const files = await fs.readdir(OUT_DIR);
  const map = {};
  for (const file of files) {
    if (!/\.(png|jpe?g|jpg|webp|avif|gif)$/i.test(file)) continue;
    const slug = file.replace(/\.[a-z0-9]+$/i, "");
    map[slug] = `/images/products/${file}`;
  }
  const entries = Object.entries(map)
    .map(([k, v]) => `  "${k}": "${v}",`)
    .join("\n");
  await fs.writeFile(OUT_MAP, `export const productImages: Record<string, string> = {\n${entries}\n};\n`, "utf8");
  console.log(`Wrote ${Object.keys(map).length} image entries to ${path.relative(ROOT, OUT_MAP)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
