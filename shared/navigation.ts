export type NavLink = {
  href: string;
  label: string;
};

export type HeaderNavItem = NavLink & {
  sectionLink?: boolean;
};

export type FooterSection = {
  heading?: string;
  links: NavLink[];
};

export type FooterSocialLink = {
  icon: 'youtube' | 'linkedin' | 'x' | 'github' | 'stackoverflow' | 'rss';
  url: string;
  id: string;
  label: string;
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
    heading: '',
    links: [
      { href: 'https://timefold.ai/model', label: 'Planning Models' },
      { href: 'https://docs.timefold.ai/', label: 'Documentation' },
      { href: 'https://www.timefold.ai/', label: 'Professional Services' },
      { href: 'https://solver.timefold.ai/', label: 'Open Source' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: 'https://timefold.ai/about-us', label: 'About Us' },
      { href: 'https://jobs.timefold.ai', label: 'Jobs' },
      { href: 'https://timefold.ai/partners', label: 'Partners' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { href: 'https://timefold.ai/blog', label: 'Blog' },
      { href: 'https://timefold.ai/videos', label: 'Videos' },
      { href: 'https://timefold.ai/customer-stories', label: 'Customer Stories' },
      { href: 'https://timefold.ai/events', label: 'Events' },
      { href: 'https://timefold.ai/press', label: 'Press' },
      { href: 'https://timefold.ai/support', label: 'Support' },
    ],
  },
];

export const FOOTER_LEGAL_LINKS: NavLink[] = [
  { href: 'https://timefold.ai/terms', label: 'Legal' },
  { href: 'https://timefold.ai/privacy', label: 'Privacy' },
  { href: 'https://timefold.ai/trademarks', label: 'Brand Assets' },
];

export const FOOTER_SOCIAL_LINKS: FooterSocialLink[] = [
  { icon: 'youtube', url: 'https://www.youtube.com/', id: '@timefold', label: 'YouTube' },
  { icon: 'linkedin', url: 'https://www.linkedin.com/company/', id: 'timefoldai', label: 'LinkedIn' },
  { icon: 'x', url: 'https://x.com/', id: 'timefoldai', label: 'X' },
  { icon: 'github', url: 'https://github.com/', id: 'TimefoldAI/timefold-solver', label: 'GitHub' },
  { icon: 'stackoverflow', url: 'https://stackoverflow.com/questions/tagged/', id: 'timefold', label: 'Stack Overflow' },
  { icon: 'rss', url: 'https://timefold.ai/', id: 'feed.xml', label: 'RSS Feed' },
];
