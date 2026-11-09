import type { APIRoute } from "astro"
import { getCollection } from "astro:content"
import { REGISTRY_ITEMS } from "../data/registry-catalog"

const SITE_URL = "https://ethereal-ui.saefulrohman.dev"

export const GET: APIRoute = async () => {
  const docsEntries = await getCollection("docs")
  const lastMod = new Date().toISOString().split("T")[0]

  const staticRoutes: Array<{ path: string; priority: string; changefreq: string }> = [
    { path: "/", priority: "1.0", changefreq: "daily" },
    { path: "/components", priority: "0.9", changefreq: "weekly" },
    { path: "/blocks", priority: "0.9", changefreq: "weekly" },
    { path: "/charts", priority: "0.9", changefreq: "weekly" },
    { path: "/templates", priority: "0.9", changefreq: "weekly" },
    { path: "/themes", priority: "0.9", changefreq: "weekly" },
    { path: "/blog", priority: "0.7", changefreq: "weekly" },
  ]

  const docRoutes = docsEntries.map((entry) => ({
    path: `/docs/${entry.id}`,
    priority: "0.9",
    changefreq: "weekly",
  }))

  const registryRoutes = REGISTRY_ITEMS.map((item) => {
    const prefix =
      item.category === "primitives"
        ? "/components"
        : item.category === "blocks"
          ? "/blocks"
          : item.category === "charts"
            ? "/charts"
            : "/templates"
    return {
      path: `${prefix}/${item.slug}`,
      priority: "0.8",
      changefreq: "weekly",
    }
  })

  const allRoutes = [...staticRoutes, ...docRoutes, ...registryRoutes]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  })
}

