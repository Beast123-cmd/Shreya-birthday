import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    allowedHosts: ["shreya-birthday.onrender.com"],
  },
  preview: {
    allowedHosts: ["shreya-birthday-123445.onrender.com"],
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ["**/*.JPG", "**/*.HEIC"], // Added this line to include .JPG and .HEIC files as assets
  esbuild: {
    jsx: "automatic",
  },
}));
