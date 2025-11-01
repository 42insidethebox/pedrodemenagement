import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel"; // modern import path
import icon from "astro-icon";
import tailwind from "@astrojs/tailwind";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Ensure Astro knows the site origin for canonical URLs, OG images, etc.
  site: "https://monwebsite.ch",
  base: "/",
  trailingSlash: "never",

  output: "static", // 👈 force prerendering
  adapter: vercel(),
  integrations: [tailwind({ applyBaseStyles: false }), icon()],
  vite: {
    resolve: {
      alias: {
        // Keep mock for astrowind config only
        "astrowind:config": path.resolve(__dirname, "src/mocks/astrowind-config.ts"),
      },
    },
  },
});
