/**
 * Get related items from a collection, sorted by date (newest first)
 * @param allItems - All items from the collection
 * @param currentSlug - The slug of the current item
 * @param count - Number of items to return (default: 3)
 * @returns Array of next items
 */
export function getRelatedItems(allItems: any[], currentSlug: string, count: number = 3) {
  // Sort by date, newest first
  const sorted = allItems.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  // Find current index
  const currentIndex = sorted.findIndex((item) => item.slug === currentSlug);

  // Return next N items after current one
  return currentIndex === -1 ? [] : sorted.slice(currentIndex + 1, currentIndex + 1 + count);
}

/**
 * Build page URL for sharing
 * @param baseUrl - The request URL origin
 * @param path - Path to the page (e.g., /blog/slug/)
 * @returns Full URL or fallback path
 */
export function buildPageUrl(origin: string, path: string): string {
  return origin ? `${origin}${path}` : path;
}
