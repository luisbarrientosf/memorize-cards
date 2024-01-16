export interface ModyoContentResponse {
  entries: Entry[];
  meta: Meta;
}

interface Meta {
  total_entries: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}

interface Entry {
  meta: EntryMeta;
  fields: Fields;
}

interface EntryMeta {
  name: string;
  slug: string;
  tags: any[];
  type: string;
  uuid: string;
  space: string;
  author: Author;
  locale: string;
  excerpt: string;
  private: boolean;
  category: any;
  segments: any[];
  created_at: string;
  updated_at: string;
  published_at: string;
  unpublish_at: any;
  version_type: string;
  category_name: any;
  category_slug: any;
  available_locales: string[];
}

interface Author {}

interface Fields {
  image: Image;
}

interface Image {
  url: string;
  tags: any[];
  uuid: string;
  title: string;
  alt_text: any;
  description: any;
  content_type: string;
}

