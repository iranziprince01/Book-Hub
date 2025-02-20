export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  cover_url: string;
  genre: string[];
  publication_date: string;
  rating: number;
  isbn: string;
  created_at?: string;
  user_id: string;
}

export type BookFilters = {
  genre?: string;
  search?: string;
  sortBy?: 'date' | 'title' | 'rating';
  sortOrder?: 'asc' | 'desc';
};

export interface User {
  id: string;
  email: string;
  username: string;
  role: 'admin' | 'user';
}