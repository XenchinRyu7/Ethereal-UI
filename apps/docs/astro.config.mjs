import { fileURLToPath } from "node:url"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import mdx from "@astrojs/mdx"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  site: "https://ethereal-ui.vercel.app",
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@ethereal/ui/styles.css": fileURLToPath(
          new URL("../../packages/ui/src/styles/globals.css", import.meta.url)
        ),
        "@ethereal/ui": fileURLToPath(
          new URL("../../packages/ui/src/index.ts", import.meta.url)
        ),
      },
    },
  },
})
