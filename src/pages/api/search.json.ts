import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const [blogs, docs, useCases] = await Promise.all([
    getCollection('blog'),
    getCollection('docs'),
    getCollection('use-cases'),
  ]);

  const entries = [
    // ── Static pages ──────────────────────────────────────────────
    {
      type: 'page',
      title: 'Home',
      description: 'Timefold intelligent scheduling optimization platform.',
      tags: [],
      href: '/',
    },
    {
      type: 'page',
      title: 'Notes',
      description: 'Knowledge base powered by Logseq.',
      tags: ['logseq', 'notes'],
      href: '/notes',
    },
    {
      type: 'page',
      title: 'Math Notes',
      description: 'Interactive math notes with MathJax and GeoGebra visualizations.',
      tags: ['math', 'calculus'],
      href: '/math-notes',
    },
    {
      type: 'page',
      title: 'Pricing',
      description: 'Timefold pricing plans.',
      tags: [],
      href: 'https://timefold.ai/pricing',
    },

    // ── Blog posts ────────────────────────────────────────────────
    ...blogs.map((post) => ({
      type: 'blog',
      title: post.data.title,
      description: post.data.description ?? '',
      tags: post.data.tags ?? [],
      href: `/blog/${post.data.slug ?? post.id}`,
      author: post.data.author ?? '',
    })),

    // ── Docs pages ────────────────────────────────────────────────
    ...docs.map((doc) => ({
      type: 'docs',
      title: doc.data.title,
      description: '',
      tags: doc.data.tags ?? [],
      href: `/docs/${doc.data.slug ?? doc.id}`,
    })),

    // ── Use cases ─────────────────────────────────────────────────
    ...useCases.map((uc) => ({
      type: 'use-case',
      title: uc.data.title,
      description: uc.data.description,
      tags: uc.data.tags ?? [],
      href: `/use-cases/${uc.data.slug ?? uc.id}`,
    })),

    // ── Math notes (registered manually) ─────────────────────────
    {
      type: 'math',
      title: 'The Fundamental Theorem of Calculus',
      description:
        'Interactive deep-dive: Riemann sums, FTC Parts I & II, GeoGebra applets, and practice problems.',
      tags: ['calculus', 'integration', 'differentiation', 'analysis'],
      href: '/math-notes/calculus-ftc',
    },
  ];

  return new Response(JSON.stringify(entries), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
