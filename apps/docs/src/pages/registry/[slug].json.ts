import type { APIRoute, GetStaticPaths } from "astro"
import { REGISTRY_ITEMS } from "../../data/registry-catalog"

export const getStaticPaths: GetStaticPaths = async () => {
  return REGISTRY_ITEMS.map((item) => ({
    params: { slug: item.slug },
    props: { item },
  }))
}

export const GET: APIRoute = async ({ props }) => {
  const { item } = props as { item: (typeof REGISTRY_ITEMS)[number] }

  const payload = {
    $schema: "https://ethereal-ui.vercel.app/schema/registry-item.json",
    name: item.slug,
    title: item.title,
    type: `registry:${item.category}`,
    description: item.description,
    dependencies: item.dependencies,
    files: [
      {
        path: item.sourceFile,
        type: `registry:${item.category}`,
        content: item.code,
      },
    ],
  }

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
}

