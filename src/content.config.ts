import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    author: z.string(),
    authorUrl: z.string().url().optional(),
    tags: z.array(z.string()).optional(),
    type: z.string().optional(),
  }),
});

const videos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    url: z.string(),
    youtubeId: z.string().optional(),
    date: z.coerce.date(),
    length: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const stories = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    customer: z.string(),
    date: z.coerce.date(),
    industry: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    location: z.string().optional(),
    url: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const press = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    outlet: z.string(),
    date: z.coerce.date(),
    url: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

const newsletter = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    issue: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const docs = defineCollection({
  type: 'content',
  schema: z.object({}).passthrough(),
});

const math = defineCollection({
  type: 'content',
  schema: z.object({}).passthrough(),
});

const notes = defineCollection({
  type: 'content',
  schema: z.object({}).passthrough(),
});

export const collections = {
  blog,
  videos,
  stories,
  events,
  press,
  newsletter,
  docs,
  math,
  notes,
};
