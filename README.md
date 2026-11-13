# 🤖 RoboÉtica — Ética y seguridad de los robots

Landing page responsive sobre **cómo diseñar y utilizar robots de manera responsable y segura**.
Construida con **Sass**, **Bootstrap 5 personalizado (overrides de variables)** y optimizada con **Lightning CSS**.

🔗 **Página publicada:** `https://TU-USUARIO.github.io/robot-etica/`

---

## Cómo ejecutarlo (VS Code)

Requisito: Node.js 18+.

```bash
npm install        # instala sass, bootstrap, lightningcss-cli, http-server
npm run build      # Sass -> CSS -> Lightning CSS (minifica) -> copia a dist/
npm run metrics    # compara tamaños antes/después
npm start          # build + servidor local en http://localhost:8080
npm run sass:watch # (opcional) recompila Sass al guardar
```

## Estructura

```
robot-etica/
├── src/
│   ├── index.html
│   ├── js/main.js
│   └── scss/
│       ├── _variables.scss    # overrides de variables de Bootstrap
│       ├── _custom-vars.scss  # variables y mixins propios
│       ├── _components.scss   # estilos de la landing
│       └── main.scss          # punto de entrada (importa Bootstrap modular)
├── scripts/ (copy.js, metrics.js)
├── dist/                      # resultado final publicado
└── .github/workflows/deploy.yml
```

## Publicar en GitHub Pages

1. Crea un repositorio vacío llamado `robot-etica` en GitHub.
2. En la terminal de VS Code:
   ```bash
   git init
   git add .
   git commit -m "Landing RoboÉtica"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/robot-etica.git
   git push -u origin main
   ```
3. En GitHub: **Settings → Pages → Source: GitHub Actions**.
4. El workflow `deploy.yml` compila y publica `dist/` automáticamente en cada `push`.

---

## Parte I — Investigación

### Preprocesadores CSS
| | **Sass (SCSS)** | **Less** |
|---|---|---|
| Variables | `$color` | `@color` |
| Anidación, mixins, funciones | Sí (muy completo: `@use`, `@function`, mapas, `@each`) | Sí (más simple) |
| Compilador | Dart Sass (oficial, activo) | less.js |
| Ecosistema | Muy amplio; Bootstrap 5 usa Sass | Usado en Bootstrap 3 y Ant Design |
| Tendencia | Estándar de facto | Menor adopción |

Ambos añaden al CSS variables, anidación, mixins y modularización antes de compilar a CSS normal.

### Frameworks CSS
| | **Bootstrap** | **Foundation** |
|---|---|---|
| Sistema de rejilla | 12 columnas flexbox (+ CSS Grid opcional) | XY Grid (flexbox) |
| Personalización | Variables Sass + mapas + API de utilidades | Settings Sass + mixins |
| Comunidad | Muy grande, abundantes plantillas | Más pequeña, orientada a proyectos a medida |
| Peso/JS | Modular; JS sin jQuery (v5) | Modular |
| Uso típico | Prototipado rápido, sitios generales | Sitios muy personalizados y accesibles |

Se eligió **Bootstrap** por su documentación, su rejilla responsive y porque permite sobrescribir variables antes de importarlo.

### Herramientas de optimización
- **Lightning CSS:** parser/transformador/minificador escrito en Rust; muy rápido. Minifica, agrupa `@import`, añade prefijos según navegadores objetivo y transforma sintaxis moderna.
- **cssnano / PostCSS:** minificador clásico basado en plugins (Autoprefixer, PurgeCSS).
- **PurgeCSS:** elimina clases no usadas.
- **Compresión Gzip/Brotli:** la aplica el servidor (GitHub Pages usa gzip).

### Técnicas aplicadas en este proyecto
1. Importar **solo los módulos de Bootstrap necesarios** (sin carousel, modal, dropdown…).
2. **No cargar el JS de Bootstrap** (menú con ~15 líneas de JS propio).
3. **SVG inline** en lugar de imágenes.
4. **Lightning CSS** con `--minify --bundle --targets ">= 0.5%"`.
5. Fuente con `preconnect` y `font-display: swap` (parámetro `display=swap`).
6. Accesibilidad: `prefers-reduced-motion`, `:focus-visible`, roles ARIA.

---

## Métricas de mejora de rendimiento (CSS)

Resultado de `npm run metrics`:

| Tipo | Bootstrap completo | Sass modular | Sass + Lightning CSS | Mejora total |
|---|---|---|---|---|
| Sin comprimir | 274.04 KB | 189.40 KB | **152.59 KB** | **44.3 %** |
| Gzip | 32.20 KB | 23.97 KB | **21.82 KB** | **32.2 %** |
| Brotli | 23.93 KB | 17.11 KB | **15.44 KB** | **35.5 %** |

> Para completar el informe, mide también con **Lighthouse** (Chrome DevTools → Lighthouse) la URL publicada y agrega capturas de Performance, Accessibility y Best Practices.

## Posibles mejoras
- Pasar el CSS por **PurgeCSS** para eliminar utilidades de Bootstrap sin usar.
- Limitar la API de utilidades de Bootstrap (`$utilities`) a las que se usan.
- Alojar la fuente localmente.
