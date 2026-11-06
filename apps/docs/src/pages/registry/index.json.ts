import type { APIRoute } from "astro"
import { REGISTRY_ITEMS } from "../../data/registry-catalog"

export const GET: APIRoute = async () => {
  const payload = {
    $schema: "https://ethereal-ui.saefulrohman.dev/schema/registry.json",
    name: "@etherealui/react",
    version: "0.0.3",
    license: "MIT",
    totalItems: REGISTRY_ITEMS.length,
    items: REGISTRY_ITEMS.map((item) => ({
      name: item.slug,
      title: item.title,
      category: item.category,
      subcategory: item.subcategory,
      description: item.description,
      dependencies: item.dependencies,
      endpoint: `/registry/${item.slug}.json`,
    })),
  }

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
}

