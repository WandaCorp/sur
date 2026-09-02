/**
 * Documento raíz: SEO, fuentes, providers y marco de la app.
 * No incluye og:* / twitter:card — los inyecta el plugin PWA.
 */
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AppProviders } from "@/components/layout/providers";
import { AppShell } from "@/components/layout/app-shell";
import appCss from "../styles.css?url";

const APP_NAME = "MHD+";
const DESCRIPTION =
  "MHD+ es tu base de datos de películas y series: fichas, trailers, reparto, estadísticas y favoritos, impulsada por TMDb.";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${APP_NAME} · Películas y series` },
      { name: "description", content: DESCRIPTION },
      { name: "theme-color", content: "#000000" },
      { name: "application-name", content: APP_NAME },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://image.tmdb.org" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="es" className="dark antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-bg text-fg">
        <PreviewHostBridge />
        <AuthProvider>
          <AppProviders>
            <AppShell>
              <Outlet />
            </AppShell>
          </AppProviders>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
