# Configurar MHD+ en Vercel

La API key de TMDb **no debe** exponerse al navegador. El proxy serverless
`/api/tmdb/*` (y las server functions de TanStack Start) leen la clave solo en
el servidor.

## Variable de entorno

| Nombre | Ámbito | Obligatorio |
| --- | --- | --- |
| `TMDB_API_KEY` | Production, Preview y Development | Sí |

**No uses el prefijo `VITE_`.** Las variables `VITE_*` se empaquetan en el
cliente y filtrarían la clave.

Nombre exacto de la variable: **`TMDB_API_KEY`**

## Pasos en el dashboard de Vercel

1. Abre el proyecto → **Settings** → **Environment Variables**.
2. Crea una variable:
   - **Key:** `TMDB_API_KEY`
   - **Value:** tu clave de [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
   - Márcala para Production, Preview y Development.
3. Redeploy para que el runtime la reciba.

## Cómo se usa (Serverless Function)

- Función serverless: `src/routes/api/tmdb.$.ts` → `GET /api/tmdb/<endpoint>`
  (ejemplo: `/api/tmdb/movie/popular?page=1`).
- En Vercel, TanStack Start + Nitro (`preset: "vercel"` en `vite.config.ts`)
  empaqueta esa ruta como Serverless Function. El `vercel.json` añade
  `Cache-Control` sobre `/api/tmdb/*`.
- El handler lee `process.env.TMDB_API_KEY` (nunca `VITE_TMDB_API_KEY`) y
  reenvía a `https://api.themoviedb.org/3`.
- El cliente **nunca** llama a TMDb directo ni ve la key: usa `createServerFn`
  y el proxy `/api/tmdb/*`.

Si la variable no está definida, el servidor usa una clave de prueba local
(solo para desarrollo). En producción de Vercel hay que definir `TMDB_API_KEY`.
