import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    type: z.string().optional(),
    author: z.string().optional(),
    authorUrl: z.string().optional(),
  }),
});

const docsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    tags: z.array(z.string()).optional(),
    order: z.number().optional(),
  }),
});

const useCasesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    description: z.string(),
    eyebrow: z.string().optional(),
    heroImage: z.string().optional(),
    icon: z.enum(['route', 'shift', 'task']).optional(),
    tags: z.array(z.string()).optional(),
    date: z.coerce.date().optional(),
    order: z.number().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  docs: docsCollection,
  'use-cases': useCasesCollection,
};
