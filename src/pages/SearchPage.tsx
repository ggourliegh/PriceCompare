import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
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

const categoryGradients: Record<string, { from: string; to: string; border: string; selectedText: string }> = {
  'Fruits & Vegetables': { from: '#dcfce7', to: '#bbf7d0', border: '#86efac', selectedText: '#166534' },
  'Meat & Seafood':      { from: '#fee2e2', to: '#fecaca', border: '#fca5a5', selectedText: '#991b1b' },
  'Dairy & Eggs':        { from: '#dbeafe', to: '#bfdbfe', border: '#93c5fd', selectedText: '#1e40af' },
  'Bakery':              { from: '#fef3c7', to: '#fde68a', border: '#fcd34d', selectedText: '#92400e' },
  'Pantry':              { from: '#ffedd5', to: '#fed7aa', border: '#fdba74', selectedText: '#9a3412' },
  'Frozen':              { from: '#cffafe', to: '#a5f3fc', border: '#67e8f9', selectedText: '#155e75' },
  'Drinks':              { from: '#ccfbf1', to: '#99f6e4', border: '#5eead4', selectedText: '#115e59' },
  'Snacks':              { from: '#f3e8ff', to: '#e9d5ff', border: '#d8b4fe', selectedText: '#6b21a8' },
  'Household':           { from: '#e2e8f0', to: '#cbd5e1', border: '#94a3b8', selectedText: '#1e293b' },
  'Health & Beauty':     { from: '#fce7f3', to: '#fbcfe8', border: '#f9a8d4', selectedText: '#9d174d' },
};

const placeholderHints = [
  'Search for "milk"...',
  'Try "chicken breast"...',
  'Find "Whittaker\'s"...',
  'Look up "bananas"...',
  'Search "Anchor butter"...',
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayedHint, setDisplayedHint] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Typewriter placeholder effect
  useEffect(() => {
    if (isFocused || query) return;

    const currentHint = placeholderHints[placeholderIndex];

    if (isTyping) {
      if (displayedHint.length < currentHint.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedHint(currentHint.slice(0, displayedHint.length + 1));
        }, 60);
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (displayedHint.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedHint(displayedHint.slice(0, -1));
        }, 30);
      } else {
        setPlaceholderIndex((prev) => (prev + 1) % placeholderHints.length);
        setIsTyping(true);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayedHint, isTyping, placeholderIndex, isFocused, query]);

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

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    if (value.trim()) {
      setShowCategories(false);
    }
  }, []);

  const handleCategoryClick = useCallback((cat: string) => {
    if (selectedCategory === cat) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(cat);
      setShowCategories(false);
    }
  }, [selectedCategory]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setSelectedCategory(null);
    setShowCategories(true);
  }, []);

  const hasActiveFilters = query || selectedCategory;

  return (
    <div className="px-4 pt-2 pb-6">
      {/* ─── Premium Frosted Glass Search Bar ─── */}
      <div className="relative mb-5">
        <div
          className={`
            relative flex items-center gap-3 px-4 py-3.5
            rounded-2xl transition-all duration-300
            glass-heavy border
            ${isFocused
              ? 'border-primary/30 search-focus-glow'
              : 'border-white/60 shadow-sm shadow-black/[0.04]'
            }
          `}
        >
          <Search
            size={22}
            className={`shrink-0 transition-colors duration-200 ${
              isFocused ? 'text-primary' : 'text-text-muted'
            }`}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={isFocused ? 'Search products, brands...' : (displayedHint || ' ')}
            className="flex-1 bg-transparent text-[15px] text-text placeholder:text-text-muted/60 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => {
                handleSearch('');
                setShowCategories(true);
                inputRef.current?.focus();
              }}
              className="shrink-0 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 active:scale-90"
              aria-label="Clear search"
            >
              <X size={14} className="text-text-secondary" />
            </button>
          ) : (
            <button
              onClick={() => setShowCategories(!showCategories)}
              className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
                showCategories
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-muted hover:text-primary hover:bg-primary/5'
              }`}
              aria-label="Toggle categories"
            >
              <SlidersHorizontal size={18} />
            </button>
          )}
        </div>
      </div>

      {/* ─── Active Filters Bar ─── */}
      {hasActiveFilters && (
        <div
          className="flex items-center gap-2 mb-4 flex-wrap"
          style={{ animation: 'chipSlideIn 0.3s ease-out both' }}
        >
          {selectedCategory && (
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm transition-all"
              style={{
                background: `linear-gradient(135deg, ${categoryGradients[selectedCategory].from}, ${categoryGradients[selectedCategory].to})`,
                color: categoryGradients[selectedCategory].selectedText,
                border: `1px solid ${categoryGradients[selectedCategory].border}`,
              }}
            >
              <span className="text-sm">{categoryEmojis[selectedCategory]}</span>
              {selectedCategory}
              <button
                onClick={() => setSelectedCategory(null)}
                className="ml-0.5 w-4 h-4 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors"
                aria-label={`Remove ${selectedCategory} filter`}
              >
                <X size={10} />
              </button>
            </span>
          )}
          {query && (
            <span className="inline-flex items-center gap-1 text-xs text-text-secondary bg-surface-dark px-2.5 py-1.5 rounded-full">
              <Search size={11} className="text-text-muted" />
              <span className="max-w-[140px] truncate">&ldquo;{query}&rdquo;</span>
            </span>
          )}
          <button
            onClick={clearSearch}
            className="text-xs text-primary/80 hover:text-primary font-semibold ml-auto transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      {/* ─── Category Grid ─── */}
      {showCategories && (
        <div className="mb-5" style={{ animation: 'fadeIn 0.3s ease-out both' }}>
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-3.5">
            <h3 className="text-[15px] font-bold text-text tracking-tight">
              Browse Categories
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-200 via-gray-100 to-transparent" />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {categories.map((cat, index) => {
              const isSelected = selectedCategory === cat;
              const gradient = categoryGradients[cat];

              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`
                    relative flex flex-col items-center justify-center
                    py-4 px-3 rounded-2xl
                    transition-all duration-300 ease-out
                    active:scale-[0.96]
                    ${isSelected
                      ? 'shadow-md ring-2 ring-offset-1'
                      : 'shadow-sm hover:shadow-md hover:-translate-y-0.5'
                    }
                  `}
                  style={{
                    background: `linear-gradient(145deg, ${gradient.from}, ${gradient.to})`,
                    borderColor: isSelected ? gradient.border : 'transparent',
                    ['--tw-ring-color' as any]: isSelected ? gradient.border : undefined,
                    animation: `categoryCardIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.04}s both`,
                  }}
                >
                  {/* Emoji */}
                  <span
                    className="text-[32px] leading-none mb-2 drop-shadow-sm transition-transform duration-300"
                    style={{
                      transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                    }}
                  >
                    {categoryEmojis[cat]}
                  </span>

                  {/* Label */}
                  <span
                    className="text-xs font-semibold text-center leading-tight tracking-tight"
                    style={{
                      color: gradient.selectedText,
                    }}
                  >
                    {cat}
                  </span>

                  {/* Selected indicator dot */}
                  {isSelected && (
                    <div
                      className="absolute top-2 right-2 w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: gradient.border,
                        animation: 'countPop 0.3s ease-out both',
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── Results ─── */}
      {results.length > 0 && (
        <div>
          {/* Results Count */}
          <div
            className="flex items-center gap-2 mb-3"
            style={{ animation: 'countPop 0.35s ease-out both' }}
          >
            <span className="inline-flex items-center justify-center bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full min-w-[28px]">
              {results.length}
            </span>
            <span className="text-sm text-text-secondary font-medium">
              {results.length === 1 ? 'product found' : 'products found'}
            </span>
          </div>

          {/* Product Cards with Staggered Animation */}
          <div className="space-y-2.5">
            {results.map((product, index) => (
              <div
                key={product.id}
                style={{
                  animation: `resultSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${Math.min(index * 0.06, 0.6)}s both`,
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── Empty State ─── */}
      {!showCategories && results.length === 0 && query && (
        <div
          className="text-center py-20"
          style={{ animation: 'fadeIn 0.4s ease-out both' }}
        >
          <div
            className="text-5xl mb-4 inline-block"
            style={{ animation: 'emptyBounce 2s ease-in-out infinite' }}
          >
            🔍
          </div>
          <p className="text-text font-semibold text-base">
            No products found
          </p>
          <p className="text-text-muted text-sm mt-1.5 max-w-[240px] mx-auto leading-relaxed">
            We couldn&apos;t find anything for &ldquo;{query}&rdquo;. Try a different search term.
          </p>
          <button
            onClick={clearSearch}
            className="mt-4 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            Browse categories instead
          </button>
        </div>
      )}
    </div>
  );
}
