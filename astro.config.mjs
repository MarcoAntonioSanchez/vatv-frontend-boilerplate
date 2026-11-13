// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), vue()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      // TODO: Replace with the project-specific domain when creating its repository.
      allowedHosts: ["example.com"],
    },
  },
});
