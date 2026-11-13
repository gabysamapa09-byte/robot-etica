// Compara el CSS ANTES (Sass sin optimizar) vs DESPUÉS (Lightning CSS)
// Uso: npm run build && npm run metrics
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const root = path.join(__dirname, "..");
const baseline = path.join(root, "node_modules/bootstrap/dist/css/bootstrap.css"); // Bootstrap completo sin optimizar
const before = path.join(root, "src/css/main.css");
const after = path.join(root, "dist/css/main.min.css");

const kb = (n) => (n / 1024).toFixed(2) + " KB";
const stats = (file) => {
  const buf = fs.readFileSync(file);
  return {
    raw: buf.length,
    gzip: zlib.gzipSync(buf, { level: 9 }).length,
    brotli: zlib.brotliCompressSync(buf).length,
  };
};
const pct = (a, b) => (((a - b) / a) * 100).toFixed(1) + "%";

const z = stats(baseline);
const a = stats(before);
const b = stats(after);

const rows = [
  ["Sin comprimir", a.raw, b.raw],
  ["Gzip", a.gzip, b.gzip],
  ["Brotli", a.brotli, b.brotli],
];

console.log("\nMétricas de optimización de CSS\n");
console.log("Tipo".padEnd(16) + "Bootstrap full".padEnd(16) + "Sass modular".padEnd(14) + "Lightning".padEnd(14) + "Mejora total");
rows.forEach(([name, x, y], i) => {
  const full = [z.raw, z.gzip, z.brotli][i];
  console.log(name.padEnd(16) + kb(full).padEnd(16) + kb(x).padEnd(14) + kb(y).padEnd(14) + pct(full, y));
});

const out = { bootstrapCompleto: z, sassModular: a, lightningCss: b, mejoraTotalRawPct: pct(z.raw, b.raw) };
fs.writeFileSync(path.join(root, "metrics.json"), JSON.stringify(out, null, 2));
console.log("\n✔ Guardado en metrics.json\n");
