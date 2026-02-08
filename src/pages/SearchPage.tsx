import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import type { Category } from '../types';
import { products, searchProducts } from '../data/products';
import ProductCard from '../components/ProductCard';

const categories: Category[] = [
  'Fruits & Vegetables',
  'Meat & Seafood',
  'Dairy & Eggs',
  'Bakery',
  'Pantry',
  'Frozen',
  'Drinks',
  'Snacks',
  'Household',
  'Health & Beauty',
];

const categoryEmojis: Record<string, string> = {
  'Fruits & Vegetables': '🥬',
  'Meat & Seafood': '🥩',
  'Dairy & Eggs': '🥛',
  'Bakery': '🍞',
  'Pantry': '🥫',
  'Frozen': '🧊',
  'Drinks': '☕',
  'Snacks': '🍿',
  'Household': '🧹',
  'Health & Beauty': '💊',
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(true);

  const results = useMemo(() => {
    if (query.trim()) {
      let filtered = searchProducts(query);
      if (selectedCategory) {
        filtered = filtered.filter(p => p.category === selectedCategory);
      }
      return filtered;
    }
    if (selectedCategory) {
      return products.filter(p => p.category === selectedCategory);
    }
    return [];
  }, [query, selectedCategory]);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim()) {
      setShowCategories(false);
    }
  };

  const handleCategoryClick = (cat: string) => {
    if (selectedCategory === cat) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(cat);
      setShowCategories(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSelectedCategory(null);
    setShowCategories(true);
  };

  return (
    <div className="px-4 py-4">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search products, brands..."
          className="w-full pl-10 pr-10 py-3 bg-white rounded-xl border border-gray-200 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
        <button
          onClick={() => setShowCategories(!showCategories)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary"
        >
          <SlidersHorizontal size={18} />
        </button>
      </div>

      {/* Category Pills */}
      {showCategories && (
        <div className="mb-4">
          <h3 className="text-sm font-bold text-text mb-2.5">Browse by Category</h3>
          <div className="grid grid-cols-2 gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-left text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-md shadow-primary/25'
                    : 'bg-white text-text border border-gray-100 hover:border-primary/30'
                }`}
              >
                <span className="text-lg">{categoryEmojis[cat]}</span>
                <span className="truncate">{cat}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active filters */}
      {(query || selectedCategory) && (
        <div className="flex items-center gap-2 mb-3">
          {selectedCategory && (
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">
              {categoryEmojis[selectedCategory]} {selectedCategory}
              <button onClick={() => setSelectedCategory(null)} className="ml-0.5 hover:text-primary-dark">&times;</button>
            </span>
          )}
          {query && (
            <span className="text-xs text-text-muted">
              &ldquo;{query}&rdquo;
            </span>
          )}
          <button onClick={clearSearch} className="text-xs text-primary font-medium ml-auto">
            Clear all
          </button>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div>
          <p className="text-xs text-text-muted mb-2">{results.length} products found</p>
          <div className="space-y-2">
            {results.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!showCategories && results.length === 0 && query && (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-text-secondary text-sm font-medium">No products found</p>
          <p className="text-text-muted text-xs mt-1">Try a different search term</p>
        </div>
      )}
    </div>
  );
}
