import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "auth_ui",
      filename: "remoteEntry.js",
      exposes: {
        "./LoginForm": "./src/LoginForm.tsx",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^19" },
        "react-dom": { singleton: true, requiredVersion: "^19" },
      },
    }),
  ],
  server: {
    fs: { allow: [".."] },
    // optional: pin a port so host can point at it consistently
    port: 5011,
  },
  optimizeDeps: { include: ["design-system"] },
});
