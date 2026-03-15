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
        react: { singleton: true, eager: true, requiredVersion: "^19.2.0" },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: "^19.2.0",
        },
        "@repo/ui": { singleton: true, eager: true },
        "@repo/stores": {
          singleton: true,
          eager: true,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5000,
    strictPort: true,
    host: true,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
