import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');

  const sorted = posts
    .filter((p) => p.data.date)
    .sort((a, b) => {
      const aTime = a.data.date ? new Date(a.data.date).getTime() : 0;
      const bTime = b.data.date ? new Date(b.data.date).getTime() : 0;
      return bTime - aTime;
    });

  return rss({
    title: 'Timefold Blog',
    description:
      'Insights on intelligent scheduling optimization — route, shift, and task scheduling powered by Timefold AI.',
    site: context.site ?? 'https://timefold.ai',
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description ?? '',
      pubDate: post.data.date ? new Date(post.data.date) : new Date(),
      link: `/blog/${post.data.slug ?? post.id}/`,
      categories: post.data.tags ?? [],
      author: post.data.author,
    })),
    customData: `<language>en-us</language>`,
    stylesheet: '/rss/styles.xsl',
  });
}
