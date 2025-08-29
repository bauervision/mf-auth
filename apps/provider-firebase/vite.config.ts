import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite"; // <-- named import

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "provider_firebase",
      filename: "remoteEntry.js",
      exposes: { "./createProvider": "./src/createProvider.ts" },
      shared: {
        react: { singleton: true, requiredVersion: "^19" },
        "react-dom": { singleton: true, requiredVersion: "^19" },
      },
    }),
  ],
  server: { port: 5021 },
});
