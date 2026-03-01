import { getCollection, type CollectionEntry } from 'astro:content';
import type { ResourceItem } from '../types/content';

type SlugEntry = Pick<ResourceItem, 'slug'>;

type DatedEntry = SlugEntry & {
  data: {
    date: Date;
  };
};

type TaggedEntry = SlugEntry & {
  data: {
    tags?: unknown;
  };
};

export type DateCollectionKey = 'blog' | 'videos' | 'events' | 'press' | 'newsletter' | 'stories';

export function getRequestOrigin(requestUrl?: string): string {
  return requestUrl ? new URL(requestUrl).origin : '';
}

/**
 * Get related items from a collection, sorted by date (newest first)
 * @param allItems - All items from the collection
 * @param currentSlug - The slug of the current item
 * @param count - Number of items to return (default: 3)
 * @returns Array of next items
 */
export function getRelatedItems<T extends DatedEntry>(allItems: T[], currentSlug: string, count: number = 3) {
  const sorted = [...allItems].sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  const currentIndex = sorted.findIndex((item) => item.slug === currentSlug);

  return currentIndex === -1 ? [] : sorted.slice(currentIndex + 1, currentIndex + 1 + count);
}

export function sortByDateDesc<T extends DatedEntry>(items: T[]): T[] {
  return [...items].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getSortedDateCollection<K extends DateCollectionKey>(key: K): Promise<CollectionEntry<K>[]> {
  const entries = await getCollection(key);
  return sortByDateDesc(entries as unknown as Array<CollectionEntry<K> & DatedEntry>) as CollectionEntry<K>[];
}

export function buildStaticPathsForCollection<T extends SlugEntry>(entries: T[], propName: string) {
  return entries.map((entry) => ({
    params: { slug: entry.slug },
    props: { [propName]: entry } as Record<string, T>,
  }));
}

export function buildDetailPageMeta<T extends DatedEntry & TaggedEntry>(
  allItems: T[],
  currentItem: T,
  detailBasePath: string,
  requestUrl?: string,
  relatedCount: number = 3,
) {
  const origin = getRequestOrigin(requestUrl);
  return {
    pageUrl: buildPageUrl(origin, `${detailBasePath}/${currentItem.slug}/`),
    moreItems: getRelatedItems(allItems, currentItem.slug, relatedCount),
    tags: getStringTags(currentItem.data.tags),
  };
}

/**
 * Build page URL for sharing
 * @param origin - The request URL origin
 * @param path - Path to the page (e.g., /blog/slug/)
 * @returns Full URL or fallback path
 */
export function buildPageUrl(origin: string, path: string): string {
  return origin ? `${origin}${path}` : path;
}

export const TAG_CANONICAL_MAP: Record<string, string> = {
  documentation: 'docs',
  'q-and-a': 'qa',
  'case-study': 'customer-story',
};

export function normalizeTag(tag: string): string {
  const normalized = tag.trim().toLowerCase();
  if (!normalized) return '';
  return TAG_CANONICAL_MAP[normalized] ?? normalized;
}

/**
 * Normalize unknown tag input into a clean string array
 * @param tags - Potential tags value from content frontmatter
 * @returns String tags only
 */
export function getStringTags(tags: unknown): string[] {
  if (!Array.isArray(tags)) return [];
  return Array.from(
    new Set(
      tags
        .filter((tag: unknown): tag is string => typeof tag === 'string')
        .map((tag) => normalizeTag(tag))
        .filter(Boolean),
    ),
  );
}
