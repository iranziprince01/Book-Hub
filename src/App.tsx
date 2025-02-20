import React, { useEffect, useState } from 'react';
import { LogIn, LogOut, Search, X as XIcon, Plus, RefreshCw, ArrowUpDown, Github, Linkedin, Mail } from 'lucide-react';
import { BookCard } from './components/BookCard';
import { AuthModal } from './components/AuthModal';
import { AdminPanel } from './components/AdminPanel';
import { useBookStore } from './store/bookStore';
import { useAuthStore } from './store/authStore';
import type { Book as BookType } from './types/book';

const GENRES = [
  'Fiction',
  'Non-Fiction',
  'Mystery',
  'Science Fiction',
  'Fantasy',
  'Romance',
  'Thriller',
  'Biography',
  'Historical Fiction',
  'Horror',
  'Poetry',
  'Self-Help',
  'Technology',
  'Business',
  'Adventure',
  'Drama',
  'Science',
  'Environment',
  'Health',
  'Photography'
];

function App() {
  const { books, isLoading, error, fetchBooks, setFilters, checkConnection } = useBookStore();
  const { user, signOut, checkUser } = useAuthStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [editingBook, setEditingBook] = useState<BookType | null>(null);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [sortBy, setSortBy] = useState<'title' | 'date' | 'rating' | undefined>();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const init = async () => {
      await checkConnection();
      await Promise.all([fetchBooks(), checkUser()]);
    };
    init();
  }, [fetchBooks, checkUser, checkConnection]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ search: searchTerm });
  };

  const handleGenreSelect = (genre: string | null) => {
    setSelectedGenre(genre);
    setFilters({ genre: genre || undefined });
  };

  const handleSort = (value: string) => {
    if (value === '') {
      setSortBy(undefined);
      setSortOrder('asc');
      setFilters({ sortBy: undefined, sortOrder: undefined });
    } else {
      const [newSortBy, newSortOrder] = value.split('-') as ['title' | 'date' | 'rating', 'asc' | 'desc'];
      setSortBy(newSortBy);
      setSortOrder(newSortOrder);
      setFilters({ sortBy: newSortBy, sortOrder: newSortOrder });
    }
  };

  const handleRetry = async () => {
    setIsRetrying(true);
    await checkConnection();
    await fetchBooks();
    setIsRetrying(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col">
      <header className="sticky top-0 z-40 bg-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-xl opacity-70 group-hover:opacity-100 blur transition duration-200"></div>
                <div className="relative bg-white px-6 py-3 rounded-xl transform transition duration-200 group-hover:scale-105">
                  <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-transparent bg-clip-text tracking-tight">
                    BookHub
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full opacity-30 group-hover:opacity-100 blur transition duration-200"></div>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Discover your next favorite book..."
                    className="w-full pl-12 pr-4 py-3 bg-white border-0 rounded-full shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm('');
                        setFilters({ search: undefined });
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <XIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </form>

            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-purple-700">
                      {user.username}
                      {user.role === 'admin' && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                          Admin
                        </span>
                      )}
                    </span>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-lg opacity-70 group-hover:opacity-100 blur transition duration-200"></div>
                  <div className="relative flex items-center gap-2 px-6 py-2.5 bg-white rounded-lg transform transition duration-200 group-hover:scale-105">
                    <LogIn className="w-4 h-4 text-purple-600" />
                    <span className="font-medium bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-transparent bg-clip-text">
                      Sign In
                    </span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 flex-1">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-800">Browse by Genre</h2>
              <div className="relative">
                <select
                  value={selectedGenre || ''}
                  onChange={(e) => handleGenreSelect(e.target.value || null)}
                  className="pl-4 pr-10 py-2 bg-white border rounded-lg appearance-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm cursor-pointer"
                >
                  <option value="">All Genres</option>
                  {GENRES.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-5 h-5 text-gray-400" />
              <select
                value={sortBy && sortOrder ? `${sortBy}-${sortOrder}` : ''}
                onChange={(e) => handleSort(e.target.value)}
                className="pl-2 pr-8 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              >
                <option value="">Sort by</option>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="rating-asc">Lowest Rated</option>
              </select>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-lg">
            <div className="flex items-center justify-between">
              <p className="text-red-700">{error}</p>
              <button
                onClick={handleRetry}
                disabled={isRetrying}
                className="flex items-center gap-2 px-4 py-2 text-red-700 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
                {isRetrying ? 'Retrying...' : 'Retry'}
              </button>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full opacity-75 animate-pulse blur-lg"></div>
              <div className="relative w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={setEditingBook}
              />
            ))}
          </div>
        )}

        {user && (
          <button
            onClick={() => setIsAdminPanelOpen(true)}
            className="fixed bottom-8 right-8 group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-200"></div>
            <div className="relative flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg transform transition duration-200 group-hover:scale-105">
              <Plus className="w-5 h-5 text-purple-600" />
              <span className="font-medium bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-transparent bg-clip-text">
                Add New Book
              </span>
            </div>
          </button>
        )}
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-transparent bg-clip-text">
                BookHub
              </span>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your digital sanctuary for literary exploration. Discover, track, and share your reading journey with our vibrant community of book lovers.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <XIcon className="w-5 h-5 stroke-[1.5]" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600 text-sm transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600 text-sm transition-colors">
                    Featured Books
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600 text-sm transition-colors">
                    New Releases
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600 text-sm transition-colors">
                    Reading Lists
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600 text-sm transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600 text-sm transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600 text-sm transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600 text-sm transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Newsletter</h3>
              <p className="text-sm text-gray-600 mb-4">
                Stay updated with our latest books and reading recommendations.
              </p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-sm text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="border-t mt-12 pt-8">
            <p className="text-center text-sm text-gray-600">
              © {new Date().getFullYear()} BookHub. All rights reserved. Made with ❤️ for book lovers.
            </p>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {(editingBook || isAdminPanelOpen) && (
        <AdminPanel
          key={editingBook?.id || 'new'}
          initialBook={editingBook}
          onClose={() => {
            setEditingBook(null);
            setIsAdminPanelOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default App;