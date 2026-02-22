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
    date: z.date(),
    length: z.string().optional(),
  }),
});

const stories = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    customer: z.string(),
    date: z.date(),
    industry: z.string().optional(),
  }),
});

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    location: z.string().optional(),
    url: z.string().optional(),
  }),
});

const press = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    outlet: z.string(),
    date: z.date(),
    url: z.string(),
  }),
});

const newsletter = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    issue: z.string().optional(),
  }),
});

export const collections = {
  blog,
  videos,
  stories,
  events,
  press,
  newsletter,
};