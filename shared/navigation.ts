export type NavLink = {
  href: string;
  label: string;
};

export type HeaderNavItem = NavLink & {
  sectionLink?: boolean;
};

export type FooterSection = {
  heading: string;
  links: NavLink[];
};

export const TALK_TO_US_URL = 'https://timefold.ai/talk-to-us';

export const BASE_HEADER_NAV_ITEMS: HeaderNavItem[] = [
  { href: '#solutions', label: 'Solutions', sectionLink: true },
  { href: '#models', label: 'Planning Models', sectionLink: true },
  { href: '#proof', label: 'Customer Stories', sectionLink: true },
  { href: 'https://timefold.ai/blog', label: 'Blog' },
  { href: '#pricing', label: 'Pricing', sectionLink: true },
  { href: 'https://docs.timefold.ai', label: 'Documentation' },
];

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    heading: 'Solutions',
    links: [
      { href: 'https://timefold.ai/solutions/route-optimization', label: 'Route Scheduling' },
      { href: 'https://timefold.ai/solutions/shift-scheduling-optimization', label: 'Shift Scheduling' },
      { href: 'https://timefold.ai/solutions/task-assignment-optimization', label: 'Task Scheduling' },
    ],
  },
  {
    heading: 'Platform',
    links: [
      { href: 'https://timefold.ai/model', label: 'Planning Models' },
      { href: 'https://docs.timefold.ai', label: 'Documentation' },
      { href: 'https://app.timefold.ai', label: 'Explore APIs' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: 'https://timefold.ai/about-us', label: 'About Us' },
      { href: 'https://timefold.ai/partners', label: 'Partners' },
      { href: 'https://jobs.timefold.ai', label: 'Jobs' },
    ],
  },
];

export const FOOTER_LEGAL_LINKS: NavLink[] = [
  { href: 'https://timefold.ai/terms', label: 'Legal' },
  { href: 'https://timefold.ai/privacy', label: 'Privacy' },
  { href: 'https://timefold.ai/trademarks', label: 'Brand Assets' },
];
