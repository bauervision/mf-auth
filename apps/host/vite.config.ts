import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      remotes: {
        auth_ui: {
          type: "module",
          name: "auth_ui",
          entry: "http://localhost:5011/remoteEntry.js",
        },
        provider_firebase: {
          type: "module",
          name: "provider_firebase",
          entry: "http://localhost:5021/remoteEntry.js",
        },
      },
      shared: {
        react: { singleton: true, requiredVersion: "^19" },
        "react-dom": { singleton: true, requiredVersion: "^19" },
      },
    }),
  ],
  server: { fs: { allow: [".."] }, port: 5000 },
  optimizeDeps: { include: ["design-system"] },
});
