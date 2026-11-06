import type { APIRoute, GetStaticPaths } from "astro"
import { REGISTRY_ITEMS } from "../../data/registry-catalog"

const rawUiFiles = import.meta.glob<string>(
  "../../../../../packages/ui/src/**/*.{ts,tsx}",
  {
    query: "?raw",
    import: "default",
    eager: true,
  }
)

export const getStaticPaths: GetStaticPaths = async () => {
  return REGISTRY_ITEMS.map((item) => ({
    params: { slug: item.slug },
    props: { item },
  }))
}

export const GET: APIRoute = async ({ props }) => {
  const { item } = props as { item: (typeof REGISTRY_ITEMS)[number] }

  const matchedKey = Object.keys(rawUiFiles).find((key) =>
    key.replace(/\\/g, "/").endsWith(item.sourceFile)
  )
  const rawSource = (matchedKey && rawUiFiles[matchedKey]) || item.code

  const payload = {
    $schema: "https://ethereal-ui.saefulrohman.dev/schema/registry-item.json",
    name: item.slug,
    title: item.title,
    type: `registry:${item.category}`,
    description: item.description,
    dependencies: item.dependencies,
    usage: item.code,
    files: [
      {
        path: item.sourceFile,
        target: `components/ui/${item.slug}.tsx`,
        type: `registry:${item.category}`,
        content: rawSource,
      },
    ],
  }

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
}
