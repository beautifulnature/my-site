import { BASE_SITE_CONTENT } from '../../shared/siteContent';

export const SITE_CONTENT = {
  ...BASE_SITE_CONTENT,
  defaultTitle: 'My Site',
  sidebarHeading: 'Navigation',
  tocHeading: 'On this page',
  intelligenceEyebrow: 'Scheduling Intelligence',
  intelligenceTitle: 'Timefold Intelligence',
} as const;

export const HOME_PAGE_CONTENT = {
  requestTrialLabel: 'Request free trial',
  exploreApisLabel: 'Explore our APIs',
  exploreModelsLabel: 'Explore models',
  talkToSalesLabel: 'Talk to sales',
  readDocumentationLabel: 'Read documentation',
  docsUrl: 'https://docs.timefold.ai',
  modelsUrl: 'https://timefold.ai/model',
  contactUrl: 'mailto:hello@timefold.ai',
  whyTimefoldLabel: 'Why Timefold',
  testimonialLeadQuote:
    '“Timefold’s clean APIs and engineering-first approach made integration straightforward and fast.”',
} as const;
