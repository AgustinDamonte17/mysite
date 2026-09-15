# mysite — Agustín Damonte

Sitio personal estático (Astro + MDX), bilingüe ES/EN.

**Primer contenido en `main`:** este repo estaba vacío (sin rama base). El scaffold completo se empujó directamente a `main` como primer commit (no hubo push README-first ni draft PR).

## URLs previstas (aún no publicar)

- Site: `https://agustindamonte17.github.io/mysite/`
- `site` / `base` en `astro.config.mjs`: `https://agustindamonte17.github.io` + `/mysite`

### GitHub Pages — NO activar todavía

Hay un workflow en `.github/workflows/deploy-pages.yml` que corre **solo** en push a `main`.

**No habilites Pages en GitHub Settings** hasta que Agustín lo okée explícitamente vía Chieff. El workflow está listo pero no debe activarse desde Settings sin ese OK.

## Desarrollo

```bash
npm install
npm run dev
npm run build
```

Requisitos: Node.js ≥ 22.12.

## Estructura

- `src/content/es/` — fuente de verdad (posts + projects)
- `src/content/en/` — gemelos EN (mismos slugs)
- Rutas: `/es/`, `/en/` (home, posts, projects); `/` redirige a `/es/`
- Layout: `BaseLayout` + `Header` (cambio de idioma)
- Imágenes locales: `public/images/`

## Cómo agregar un escrito nuevo

1. Crear `src/content/es/posts/mi-slug.mdx` con frontmatter (`title`, `description`, `pubDate`).
2. Crear el gemelo EN: `src/content/en/posts/mi-slug.mdx` (mismo slug).
3. Las rutas `/es/posts/mi-slug/` y `/en/posts/mi-slug/` se generan solas.

Igual para proyectos bajo `src/content/{es,en}/projects/`.
