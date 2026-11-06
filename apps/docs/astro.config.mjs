import { fileURLToPath } from "node:url"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import mdx from "@astrojs/mdx"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  site: "https://ui.saefulrohman.dev",
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@etherealui/react/styles.css": fileURLToPath(
          new URL("../../packages/ui/src/styles/globals.css", import.meta.url)
        ),
        "@etherealui/react": fileURLToPath(
          new URL("../../packages/ui/src/index.ts", import.meta.url)
        ),
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
