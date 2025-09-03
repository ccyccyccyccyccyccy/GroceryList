import { useState } from 'react';
import Header from './components/Header';
import SearchBar, { SearchFilters } from './components/SearchBar';
import ProductGrid from './components/ProductGrid';
import CompareView from './components/CompareView';
import ViewToggle, { ViewMode } from './components/ViewToggle';
import { Product } from './types/api';
import { searchProducts } from './services/api';
import { config } from './config/env';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const handleSearch = async (query: string, filters: SearchFilters) => {
    setLoading(true);
    setError(null);
    setSearchQuery(query);

    try {
      const searchParams = {
        product_name: query,
        lower_px_limit: filters.minPrice,
        upper_px_limit: filters.maxPrice,
        in_stock_only: filters.inStockOnly,
        brand_filter: filters.brands.length > 0 ? filters.brands : undefined,
        page: 1,
        per_page: 20
      };

      const results = await searchProducts(searchParams);
      setProducts(results);
    } catch (err) {
      setError('Failed to search products. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {config.appTitle}
            </h2>
            <p className="text-lg text-gray-600">
              {config.appDescription}
            </p>
          </div>
          
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Results Section */}
        <div className="mb-8">
          {searchQuery && !loading && (
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Search results for "{searchQuery}"
                </h3>
                <p className="text-gray-600 mt-1">
                  Found {products.length} product{products.length !== 1 ? 's' : ''}
                </p>
              </div>
              
              {/* View Toggle */}
              <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
            </div>
          )}
          
          {/* View Content */}
          {viewMode === 'list' ? (
            <ProductGrid 
              products={products} 
              loading={loading} 
              searchQuery={searchQuery}
            />
          ) : (
            <CompareView 
              products={products} 
              searchQuery={searchQuery}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 {config.appTitle}. {config.appDescription}.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App; 