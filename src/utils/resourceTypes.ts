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
  indexProps: {
    dateField: string;
    titleField: string;
    metaField?: string;
    subtitleField?: string;
    showBody?: boolean;
  };
  moreCard: {
    dateClass: string;
    titleClass: string;
    secondaryField?: string;
    secondaryClass?: string;
    descriptionField?: string;
    descriptionClass?: string;
  };
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
    indexProps: {
      dateField: 'date',
      titleField: 'title',
    },
    moreCard: {
      dateClass: 'meta-label text-slate-600',
      titleClass: 'font-semibold text-slate-900',
      descriptionField: 'description',
      descriptionClass: 'line-clamp-3 text-slate-700',
    },
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
    indexProps: {
      dateField: 'date',
      titleField: 'title',
      metaField: 'length',
      showBody: false,
    },
    moreCard: {
      dateClass: 'meta-label text-[11px] text-slate-900',
      titleClass: 'text-sm font-semibold text-slate-900',
      secondaryField: 'length',
      secondaryClass: 'text-xs text-slate-900',
    },
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
    indexProps: {
      dateField: 'date',
      titleField: 'title',
      metaField: 'location',
    },
    moreCard: {
      dateClass: 'meta-label text-slate-600',
      titleClass: 'font-semibold text-slate-900',
      secondaryField: 'location',
      secondaryClass: 'text-slate-600',
    },
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
    indexProps: {
      dateField: 'date',
      titleField: 'title',
      metaField: 'outlet',
    },
    moreCard: {
      dateClass: 'meta-label text-slate-600',
      titleClass: 'font-semibold text-slate-900',
      secondaryField: 'outlet',
      secondaryClass: 'text-slate-600',
    },
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
    indexProps: {
      dateField: 'date',
      titleField: 'title',
      metaField: 'issue',
    },
    moreCard: {
      dateClass: 'meta-label text-slate-600',
      titleClass: 'font-semibold text-slate-900',
      secondaryField: 'issue',
      secondaryClass: 'text-slate-600',
    },
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
    indexProps: {
      dateField: 'date',
      titleField: 'title',
      metaField: 'industry',
      subtitleField: 'customer',
    },
    moreCard: {
      dateClass: 'meta-label text-[11px] text-slate-600',
      titleClass: 'text-sm font-semibold text-slate-900',
      secondaryField: 'customer',
      secondaryClass: 'text-xs text-slate-600',
    },
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
