import { create } from 'zustand';
import type { Book, BookFilters } from '../types/book';
import { supabase, checkSupabaseConnection } from '../lib/supabase';

interface BookStore {
  books: Book[];
  filters: BookFilters;
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
  setFilters: (filters: BookFilters) => void;
  fetchBooks: () => Promise<void>;
  createBook: (book: Omit<Book, 'id' | 'user_id'>) => Promise<void>;
  updateBook: (book: Partial<Book> & { id: string }) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  checkConnection: () => Promise<void>;
}

export const useBookStore = create<BookStore>((set, get) => ({
  books: [],
  filters: {},
  isLoading: false,
  error: null,
  isConnected: false,

  checkConnection: async () => {
    const isConnected = await checkSupabaseConnection();
    set({ isConnected });
    if (!isConnected) {
      set({ error: 'Unable to connect to the database. Please check your connection and try again.' });
    }
    return isConnected;
  },

  setFilters: (filters) => {
    set({ filters: { ...get().filters, ...filters } });
    get().fetchBooks();
  },

  fetchBooks: async () => {
    if (!get().isConnected && !(await get().checkConnection())) {
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const { filters } = get();
      let query = supabase.from('books').select('*');

      if (filters.genre) {
        query = query.contains('genre', [filters.genre]);
      }
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,author.ilike.%${filters.search}%`);
      }
      if (filters.sortBy === 'title') {
        query = query.order('title', { ascending: filters.sortOrder === 'asc' });
      } else if (filters.sortBy === 'date') {
        query = query.order('publication_date', { ascending: filters.sortOrder === 'asc' });
      } else if (filters.sortBy === 'rating') {
        query = query.order('rating', { ascending: filters.sortOrder === 'asc' });
      }

      const { data, error } = await query;
      
      if (error) throw error;
      set({ books: data as Book[], isLoading: false });
    } catch (error) {
      console.error('Error fetching books:', error);
      set({ 
        error: 'Failed to fetch books. Please try again later.',
        isLoading: false 
      });
    }
  },

  createBook: async (book) => {
    if (!get().isConnected && !(await get().checkConnection())) {
      return;
    }

    try {
      set({ isLoading: true, error: null });
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to create a book');
      }

      const { error } = await supabase
        .from('books')
        .insert([{ ...book, user_id: user.id }]);

      if (error) throw error;
      get().fetchBooks();
    } catch (error) {
      console.error('Error creating book:', error);
      set({ 
        error: 'Failed to create book. Please try again.',
        isLoading: false 
      });
    }
  },

  updateBook: async (book) => {
    if (!get().isConnected && !(await get().checkConnection())) {
      return;
    }

    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase
        .from('books')
        .update(book)
        .eq('id', book.id);
      if (error) throw error;
      get().fetchBooks();
    } catch (error) {
      console.error('Error updating book:', error);
      set({ 
        error: 'Failed to update book. Please try again.',
        isLoading: false 
      });
    }
  },

  deleteBook: async (id) => {
    if (!get().isConnected && !(await get().checkConnection())) {
      return;
    }

    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', id);
      if (error) throw error;
      get().fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
      set({ 
        error: 'Failed to delete book. Please try again.',
        isLoading: false 
      });
    }
  },
}));