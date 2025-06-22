import { defineCollection, z } from 'astro:content';

const modsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    creator: z.string(),
    type: z.array(z.string()),
    url: z.string().optional(),
    content: z.string(),
    filename: z.string(),
  }),
});

export const collections = {
  mods: modsCollection,
};