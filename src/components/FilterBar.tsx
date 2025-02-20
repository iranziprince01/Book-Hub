import React from 'react';
import { useBookStore } from '../store/bookStore';

const GENRES = [
  'Fiction',
  'Non-Fiction',
  'Mystery',
  'Science Fiction',
  'Fantasy',
  'Romance',
  'Thriller',
  'Biography',
];

const SORT_OPTIONS = [
  { value: 'title', label: 'Title' },
  { value: 'date', label: 'Publication Date' },
  { value: 'rating', label: 'Rating' },
];

export const FilterBar: React.FC = () => {
  const setFilters = useBookStore((state) => state.setFilters);
  const filters = useBookStore((state) => state.filters);

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
      <select
        value={filters.genre || ''}
        onChange={(e) => setFilters({ genre: e.target.value || undefined })}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Genres</option>
        {GENRES.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      <select
        value={filters.sortBy || ''}
        onChange={(e) => setFilters({ sortBy: e.target.value as any || undefined })}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Sort By</option>
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {filters.sortBy && (
        <select
          value={filters.sortOrder || 'asc'}
          onChange={(e) => setFilters({ sortOrder: e.target.value as 'asc' | 'desc' })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      )}
    </div>
  );
};