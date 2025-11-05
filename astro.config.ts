import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import icon from "astro-icon";
import tailwind from "@astrojs/tailwind";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: "https://tonsiteweb.ch",
  base: "/",
  trailingSlash: "never",
  output: "server",
  adapter: vercel(),
  prerender: true,
  integrations: [tailwind({ applyBaseStyles: false }), icon()],
  vite: {
    resolve: {
      alias: {
        "astrowind:config": path.resolve(__dirname, "src/mocks/astrowind-config.ts"),
      },
    },
    build: {
      rollupOptions: {
        external: ["stripe"], // ✅ <— tell Vite not to bundle Stripe
      },
    },
  },
});
