// Copia el HTML y el JS a /dist (carpeta que se publica en GitHub Pages)
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");

fs.mkdirSync(path.join(dist, "js"), { recursive: true });
fs.copyFileSync(path.join(root, "src/index.html"), path.join(dist, "index.html"));
fs.copyFileSync(path.join(root, "src/js/main.js"), path.join(dist, "js/main.js"));
console.log("✔ Archivos copiados a dist/");
