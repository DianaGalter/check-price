import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const base = env.DEPLOY_PATH || "/check-price/";
  const isDevDeploy = base.includes("/dev/");

  return {
    plugins: [
      react(),

      VitePWA({
        registerType: "prompt",

        includeAssets: ["apple-touch-icon-180x180.png"],

        manifest: {
          name: isDevDeploy
            ? "Product Search DEV"
            : "Product Search",

          short_name: isDevDeploy
            ? "Search DEV"
            : "Search",

          description: "Internal product and price lookup tool",

          start_url: base,
          scope: base,

          display: "standalone",

          background_color: "#ffffff",
          theme_color: "#ffffff",

          icons: [
            {
              src: `${base}pwa-192x192.png`,
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: `${base}pwa-512x512.png`,
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: `${base}pwa-maskable-512x512.png`,
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
},

        workbox: {
          cleanupOutdatedCaches: true,
        },
      }),
    ],

    base,
  };
});