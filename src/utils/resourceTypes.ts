export type ResourceTypeKey = 'blog' | 'videos' | 'events' | 'press' | 'newsletter' | 'stories';

export type ResourceCollectionConfig = {
  key: ResourceTypeKey;
  label: string;
  indexHref: string;
  toTagHref: (tag: string) => string;
};

type ResourceTypeConfig = {
  backHref: string;
  backLabel: string;
  iconName: ResourceTypeKey;
  detailBasePath: string;
  moreTitle: string;
  indexTitle: string;
  indexDescription: string;
  indexCurrentPath: string;
  tagBasePath?: string;
  tagAllPath?: string;
};

export const RESOURCE_TYPES: Record<ResourceTypeKey, ResourceTypeConfig> = {
  blog: {
    backHref: '/blog',
    backLabel: 'Blog',
    iconName: 'blog',
    detailBasePath: '/blog',
    moreTitle: 'More from the blog',
    indexTitle: 'Blog',
    indexDescription: 'Insights, deep dives, and updates on planning and optimization.',
    indexCurrentPath: '/blog',
    tagBasePath: '/blog/tag',
    tagAllPath: '/blog',
  },
  videos: {
    backHref: '/resources/videos',
    backLabel: 'Videos',
    iconName: 'videos',
    detailBasePath: '/resources/videos',
    moreTitle: 'More videos',
    indexTitle: 'Videos',
    indexDescription: 'Watch demos, deep dives, and office hours on planning and optimization.',
    indexCurrentPath: '/resources/videos',
    tagBasePath: '/resources/videos/tag',
    tagAllPath: '/resources/videos',
  },
  events: {
    backHref: '/resources/events',
    backLabel: 'Events',
    iconName: 'events',
    detailBasePath: '/resources/events',
    moreTitle: 'More events',
    indexTitle: 'Events',
    indexDescription: 'Join live sessions, webinars, and conferences about planning and optimization.',
    indexCurrentPath: '/resources/events',
    tagBasePath: '/resources/events/tag',
    tagAllPath: '/resources/events',
  },
  press: {
    backHref: '/resources/press',
    backLabel: 'Press',
    iconName: 'press',
    detailBasePath: '/resources/press',
    moreTitle: 'More press',
    indexTitle: 'Press',
    indexDescription: 'Recent articles, announcements, and coverage from around the web.',
    indexCurrentPath: '/resources/press',
    tagBasePath: '/resources/press/tag',
    tagAllPath: '/resources/press',
  },
  newsletter: {
    backHref: '/resources/newsletter',
    backLabel: 'Newsletter',
    iconName: 'newsletter',
    detailBasePath: '/resources/newsletter',
    moreTitle: 'More newsletters',
    indexTitle: 'Newsletter',
    indexDescription: 'Periodic updates on new features, case studies, and upcoming events.',
    indexCurrentPath: '/resources/newsletter',
    tagBasePath: '/resources/newsletter/tag',
    tagAllPath: '/resources/newsletter',
  },
  stories: {
    backHref: '/resources/stories',
    backLabel: 'Customer Stories',
    iconName: 'stories',
    detailBasePath: '/resources/stories',
    moreTitle: 'More stories',
    indexTitle: 'Customer stories',
    indexDescription: 'See how different teams use planning and optimization to improve their operations.',
    indexCurrentPath: '/resources/stories',
    tagBasePath: '/resources/stories/tag',
    tagAllPath: '/resources/stories',
  },
};

export const RESOURCE_COLLECTIONS: readonly ResourceCollectionConfig[] = [
  {
    key: 'blog',
    label: 'Blog',
    indexHref: '/blog',
    toTagHref: (tag: string) => `/blog/tag/${encodeURIComponent(tag)}`,
  },
  {
    key: 'videos',
    label: 'Videos',
    indexHref: '/resources/videos',
    toTagHref: (tag: string) => `/resources/videos/tag/${encodeURIComponent(tag)}`,
  },
  {
    key: 'events',
    label: 'Events',
    indexHref: '/resources/events',
    toTagHref: (tag: string) => `/resources/events/tag/${encodeURIComponent(tag)}`,
  },
  {
    key: 'press',
    label: 'Press',
    indexHref: '/resources/press',
    toTagHref: (tag: string) => `/resources/press/tag/${encodeURIComponent(tag)}`,
  },
  {
    key: 'stories',
    label: 'Stories',
    indexHref: '/resources/stories',
    toTagHref: (tag: string) => `/resources/stories/tag/${encodeURIComponent(tag)}`,
  },
  {
    key: 'newsletter',
    label: 'Newsletter',
    indexHref: '/resources/newsletter',
    toTagHref: (tag: string) => `/resources/newsletter/tag/${encodeURIComponent(tag)}`,
  },
];
