import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/react-fontawesome",
    ],
  },
  build: {
    rollupOptions: {
      external: ["@fortawesome/fontawesome-svg-core"],
    },
  },
});
