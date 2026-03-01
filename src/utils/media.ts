export function extractYouTubeId(input: { youtubeId?: unknown; url?: unknown }): string {
  const directId = input.youtubeId;
  if (typeof directId === 'string' && directId.trim()) return directId.trim();

  const rawUrl = input.url;
  if (typeof rawUrl !== 'string' || !rawUrl.trim()) return '';

  try {
    const parsed = new URL(rawUrl);
    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.replace(/^\//, '').trim();
    }
    if (parsed.hostname.includes('youtube.com')) {
      const fromQuery = parsed.searchParams.get('v');
      if (fromQuery) return fromQuery.trim();

      const pathParts = parsed.pathname.split('/').filter(Boolean);
      const markerIndex = pathParts.findIndex((part) => part === 'embed' || part === 'shorts');
      if (markerIndex >= 0 && pathParts[markerIndex + 1]) return pathParts[markerIndex + 1].trim();
    }
  } catch {
    return '';
  }

  return '';
}

export function getYouTubeThumbnailUrl(input: { youtubeId?: unknown; url?: unknown }): string {
  const youtubeId = extractYouTubeId(input);
  return youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` : '';
}
