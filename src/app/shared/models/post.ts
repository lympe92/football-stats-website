export interface Post {
  title: string;
  featuredImage: string;
  text: string;
  tags: string[];
  status: 'visible' | 'draft';
  categories: string[];
  timestamp: Date;
}
