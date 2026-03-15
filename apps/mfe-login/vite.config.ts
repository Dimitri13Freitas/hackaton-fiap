import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "mfe_login",
      filename: "remoteEntry.js",
      exposes: {
        "./Login": "./src/components/Login",
        "./Register": "./src/components/Register",
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
  resolve: {
    preserveSymlinks: true,
    dedupe: ["react", "react-dom"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  optimizeDeps: {
    include: ["@repo/ui"],
  },
  preview: {
    port: 5001,
    strictPort: true,
    cors: true,
  },
  server: {
    host: true,
    port: 5001,
    strictPort: true,
  },
});
