import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

/**
 * Blog
 *
 * Colección para artículos editoriales.
 * Los archivos Markdown y MDX compartirán este esquema.
 */
const blog = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/blog",
  }),

  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

/**
 * Collections registry
 *
 * Registro central de colecciones disponibles en el proyecto.
 */
export const collections = {
  blog,
};
