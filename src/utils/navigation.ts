import {
  BASE_HEADER_NAV_ITEMS,
  FOOTER_LEGAL_LINKS,
  FOOTER_SECTIONS,
  TALK_TO_US_URL,
  FOOTER_SOCIAL_LINKS,
  type HeaderNavItem,
  type NavLink,
} from '../../shared/navigation';

export { FOOTER_LEGAL_LINKS, FOOTER_SECTIONS, FOOTER_SOCIAL_LINKS, TALK_TO_US_URL };

export type MainNavItem = HeaderNavItem;

export type NavSection = {
  heading?: string;
  links: NavLink[];
};

export const SIDEBAR_SECTIONS: NavSection[] = [
  {
    links: [{ href: '/docs', label: 'Documentation' }],
  },
  {
    links: [{ href: '/math', label: 'Math' }],
  },
  {
    links: [{ href: '/notes', label: 'Notes' }],
  },
  {
    heading: 'Resources',
    links: [
      { href: '/resources', label: 'Overview' },
      { href: '/blog', label: 'Blog' },
      { href: '/resources/videos', label: 'Videos' },
      { href: '/resources/stories', label: 'Customer stories' },
      { href: '/resources/events', label: 'Events' },
      { href: '/resources/press', label: 'Press' },
      { href: '/resources/newsletter', label: 'Newsletter' },
    ],
  },
];

const ROOT_EXTRA_MAIN_NAV_ITEMS: MainNavItem[] = [
  { href: '/blog', label: 'Blog' },
  { href: '/docs', label: 'Documentation' },
  { href: '/math', label: 'Math' },
  { href: '/notes', label: 'Notes' },
  { href: '/resources', label: 'Resources' },
];

export const MAIN_NAV_ITEMS: MainNavItem[] = [
  ...BASE_HEADER_NAV_ITEMS,
  ...ROOT_EXTRA_MAIN_NAV_ITEMS,
];

export type ResourceNavItem = {
  href: string;
  label: string;
  iconName: 'blog' | 'videos' | 'stories' | 'events' | 'press' | 'newsletter';
};

export const RESOURCE_NAV_ITEMS: ResourceNavItem[] = [
  { href: '/blog', label: 'Blog', iconName: 'blog' },
  { href: '/resources/videos', label: 'Videos', iconName: 'videos' },
  { href: '/resources/stories', label: 'Customer stories', iconName: 'stories' },
  { href: '/resources/events', label: 'Events', iconName: 'events' },
  { href: '/resources/press', label: 'Press', iconName: 'press' },
  { href: '/resources/newsletter', label: 'Newsletter', iconName: 'newsletter' },
];
