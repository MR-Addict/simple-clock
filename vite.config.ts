import path from "path";
import react from "@vitejs/plugin-react-swc";

import { defineConfig } from "vite";

import pwa from "./src/lib/plugins/pwa";

export default defineConfig({
  plugins: [pwa, react()],
  base: process.env.GITHUB_REPOSITORY?.split("/").pop() || "/",
  resolve: { alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }] }
});
