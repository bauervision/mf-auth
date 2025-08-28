import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [".."], // allow reading from ../packages
    },
  },
  optimizeDeps: {
    include: ["design-system"],
  },
});
