import type { ResourceItem } from '../types/content';

type SlugEntry = Pick<ResourceItem, 'slug'>;

type DatedEntry = SlugEntry & {
  data: {
    date: Date;
  };
};

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

/**
 * Build page URL for sharing
 * @param origin - The request URL origin
 * @param path - Path to the page (e.g., /blog/slug/)
 * @returns Full URL or fallback path
 */
export function buildPageUrl(origin: string, path: string): string {
  return origin ? `${origin}${path}` : path;
}

/**
 * Normalize unknown tag input into a clean string array
 * @param tags - Potential tags value from content frontmatter
 * @returns String tags only
 */
export function getStringTags(tags: unknown): string[] {
  if (!Array.isArray(tags)) return [];
  return tags.filter((tag: unknown): tag is string => typeof tag === 'string' && tag.trim().length > 0);
}
