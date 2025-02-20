import React, { useState, useEffect } from 'react';
import { X, Database, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface DatabaseViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DatabaseViewer: React.FC<DatabaseViewerProps> = ({ isOpen, onClose }) => {
  const [tables, setTables] = useState<{ [key: string]: any[] }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTable, setActiveTable] = useState<string>('books');

  const fetchTableData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const results: { [key: string]: any[] } = {};
      
      // Fetch books data
      const { data: books, error: booksError } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (booksError) throw booksError;
      results.books = books;

      // Fetch profiles data
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (profilesError) throw profilesError;
      results.profiles = profiles;

      setTables(results);
    } catch (err) {
      setError('Failed to fetch database data. Please try again.');
      console.error('Database fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchTableData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Database className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">Database Viewer</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchTableData}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {error && (
          <div className="m-6 p-4 bg-red-50 border border-red-100 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="flex flex-1 overflow-hidden">
          <div className="w-48 border-r bg-gray-50 p-4">
            <div className="space-y-2">
              {Object.keys(tables).map((tableName) => (
                <button
                  key={tableName}
                  onClick={() => setActiveTable(tableName)}
                  className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                    activeTable === tableName
                      ? 'bg-purple-100 text-purple-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tableName}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
            ) : tables[activeTable]?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.keys(tables[activeTable][0]).map((column) => (
                        <th
                          key={column}
                          className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tables[activeTable].map((row, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        {Object.entries(row).map(([key, value]) => (
                          <td
                            key={key}
                            className="px-4 py-3 text-sm text-gray-900 font-mono whitespace-pre-wrap"
                          >
                            {typeof value === 'object'
                              ? JSON.stringify(value, null, 2)
                              : String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-8">
                No data available in this table
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};