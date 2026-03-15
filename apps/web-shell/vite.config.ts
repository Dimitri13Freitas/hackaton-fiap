import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "web_shell",
      remotes: {
        mfe_login: "http://localhost:5001/assets/remoteEntry.js",
        mfe_settings: "http://localhost:5002/assets/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        "react-dom": { singleton: true, requiredVersion: false },
        "@repo/ui": { singleton: true, eager: true, version: "0.0.1" },
        "@repo/stores": {
          singleton: true,
          eager: true,
          version: "0.0.1",
        },
      },
    }),
  ],
  optimizeDeps: {
    include: ["@repo/ui"],
  },
  resolve: {
    preserveSymlinks: true,
    dedupe: ["react", "react-dom"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 5000,
    strictPort: true,
    fs: {
      allow: ["../.."],
    },
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
