import { useState } from 'react';
import { Flame, ArrowRight } from 'lucide-react';
import type { StoreName } from '../types';
import { getSpecialsByStore } from '../data/products';
import { stores } from '../data/stores';
import ProductCard from '../components/ProductCard';

type StoreFilter = 'all' | StoreName;

export default function SpecialsPage() {
  const [activeStore, setActiveStore] = useState<StoreFilter>('all');

  const specials =
    activeStore === 'all'
      ? stores.flatMap(s => getSpecialsByStore(s.name))
        .filter((p, i, arr) => arr.findIndex(x => x.id === p.id) === i)
      : getSpecialsByStore(activeStore);

  // Sort: biggest discount first
  const sorted = [...specials].sort((a, b) => {
    const aDiscount = getDiscount(a);
    const bDiscount = getDiscount(b);
    return bDiscount - aDiscount;
  });

  // Top deals (biggest savings)
  const topDeals = sorted.slice(0, 3);
  const restDeals = sorted.slice(3);

  return (
    <div className="px-4 py-4">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-4 mb-4 text-white">
        <div className="flex items-center gap-2 mb-1">
          <Flame size={20} />
          <span className="text-sm font-semibold opacity-90">This Week's Specials</span>
        </div>
        <h2 className="text-xl font-bold">
          Save up to 50% across {stores.length} stores
        </h2>
        <p className="text-sm opacity-75 mt-1">
          Updated weekly. Tap any item to compare prices.
        </p>
      </div>

      {/* Store Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        <button
          onClick={() => setActiveStore('all')}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeStore === 'all'
              ? 'bg-primary text-white shadow-md shadow-primary/25'
              : 'bg-white text-text-secondary border border-gray-200'
          }`}
        >
          All Stores
        </button>
        {stores.map(store => (
          <button
            key={store.name}
            onClick={() => setActiveStore(store.name)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeStore === store.name
                ? 'text-white shadow-md'
                : 'bg-white text-text-secondary border border-gray-200'
            }`}
            style={
              activeStore === store.name
                ? { backgroundColor: store.bgColor, color: store.color }
                : undefined
            }
          >
            {store.logo} {store.name}
          </button>
        ))}
      </div>

      {/* Top Deals */}
      {activeStore === 'all' && topDeals.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-text flex items-center gap-1.5">
              <span className="text-danger">🔥</span> Hottest Deals
            </h3>
            <ArrowRight size={14} className="text-text-muted" />
          </div>
          <div className="space-y-2">
            {topDeals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* All Specials */}
      <div>
        <h3 className="text-sm font-bold text-text mb-2">
          {activeStore === 'all' ? 'All Specials' : `${activeStore} Specials`}
          <span className="text-text-muted font-normal ml-1.5">
            ({activeStore === 'all' ? restDeals.length : sorted.length} items)
          </span>
        </h3>
        <div className="space-y-2">
          {(activeStore === 'all' ? restDeals : sorted).map(product => (
            <ProductCard
              key={product.id}
              product={product}
              highlightStore={activeStore !== 'all' ? activeStore : undefined}
            />
          ))}
        </div>
      </div>

      {sorted.length === 0 && (
        <div className="text-center py-12">
          <p className="text-4xl mb-2">🏷️</p>
          <p className="text-text-secondary text-sm">No specials found for this store</p>
        </div>
      )}
    </div>
  );
}

function getDiscount(product: { prices: { price: number; onSpecial: boolean; specialPrice?: number }[] }): number {
  let maxDiscount = 0;
  for (const sp of product.prices) {
    if (sp.onSpecial && sp.specialPrice) {
      const discount = ((sp.price - sp.specialPrice) / sp.price) * 100;
      if (discount > maxDiscount) maxDiscount = discount;
    }
  }
  return maxDiscount;
}
