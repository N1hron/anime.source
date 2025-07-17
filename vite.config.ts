import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@icons": path.resolve(__dirname, "./src/assets/icons"),
    },
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        titleProp: true,
      },
    }),
  ],
});
