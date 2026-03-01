import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "audio/**/*.mp3"],
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,jpg,mp3,json}"],
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
        navigateFallbackDenylist: [/^\/~oauth/],
      },
      manifest: {
        name: "Story Time! - Adventures for Kids",
        short_name: "Story Time!",
        description: "Interactive stories for toddlers with big imaginations",
        theme_color: "#7ec8e3",
        background_color: "#fdf6e3",
        display: "standalone",
        orientation: "any",
        start_url: "/",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
