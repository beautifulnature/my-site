import type {
  BlogEntry,
  EventEntry,
  NewsletterEntry,
  PressEntry,
  StoryEntry,
  VideoEntry,
} from './collections';

type CollectionResourceEntry =
  | BlogEntry
  | VideoEntry
  | EventEntry
  | PressEntry
  | NewsletterEntry
  | StoryEntry;

export type ResourceItemData = CollectionResourceEntry['data'] & {
  [key: string]: unknown;
};

export type ResourceItem = {
  slug: CollectionResourceEntry['slug'];
  data: ResourceItemData;
  body?: string;
};

export type MoreListItem = {
  slug: ResourceItem['slug'];
  data: ResourceItemData & {
    date: Date;
    title: string;
  };
};
