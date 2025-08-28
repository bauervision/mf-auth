import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // allow serving files from the monorepo packages folder
      allow: [".."],
    },
  },
  optimizeDeps: {
    include: ["design-system"],
  },
});
