import { useState } from 'react';
import { Plus, Check, ChevronDown, ChevronUp } from 'lucide-react';
import type { ProductWithPrices, StorePrice } from '../types';
import { useStore } from '../store/useStore';
import { getEffectivePrice } from '../data/products';
import StoreBadge from './StoreBadge';
import PriceTag from './PriceTag';

interface ProductCardProps {
  product: ProductWithPrices;
  highlightStore?: string;
  compact?: boolean;
}

export default function ProductCard({ product, highlightStore, compact = false }: ProductCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { addToList, shoppingList } = useStore();
  const isInList = shoppingList.some(item => item.product.id === product.id);

  const sortedPrices = [...product.prices].sort(
    (a, b) => getEffectivePrice(a) - getEffectivePrice(b)
  );
  const cheapest = sortedPrices[0];
  const displayPrice = highlightStore
    ? product.prices.find(p => p.store === highlightStore) || cheapest
    : cheapest;

  if (compact) {
    return (
      <div className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 border border-gray-100">
        <span className="text-2xl">{product.image}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-text truncate">{product.name}</p>
          <p className="text-xs text-text-muted">{product.brand} · {product.size}</p>
        </div>
        <div className="text-right">
          <PriceTag storePrice={displayPrice} />
          <div className="mt-0.5">
            <StoreBadge store={displayPrice.store} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-shadow hover:shadow-md">
      <div className="p-3.5">
        <div className="flex items-start gap-3">
          <div className="text-3xl w-12 h-12 flex items-center justify-center bg-surface-alt rounded-xl shrink-0">
            {product.image}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-text leading-tight">{product.name}</h3>
            <p className="text-xs text-text-muted mt-0.5">{product.brand} · {product.size}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <PriceTag storePrice={displayPrice} />
              {displayPrice.onSpecial && displayPrice.specialLabel && (
                <span className="text-[10px] font-semibold text-danger bg-red-50 px-1.5 py-0.5 rounded-md">
                  {displayPrice.specialLabel}
                </span>
              )}
            </div>
            <div className="mt-1">
              <StoreBadge store={cheapest.store} />
              {cheapest.store !== displayPrice.store && (
                <span className="text-[10px] text-text-muted ml-1">cheapest</span>
              )}
            </div>
          </div>
          <button
            onClick={() => addToList(product)}
            className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              isInList
                ? 'bg-success/10 text-success'
                : 'bg-primary/10 text-primary hover:bg-primary/20'
            }`}
          >
            {isInList ? <Check size={18} /> : <Plus size={18} />}
          </button>
        </div>

        {/* Expand/collapse for price comparison */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 mt-2.5 text-xs text-text-secondary hover:text-primary transition-colors"
        >
          Compare all stores
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {expanded && (
        <div className="border-t border-gray-50 px-3.5 py-2.5 bg-surface-alt/50">
          <div className="space-y-2">
            {sortedPrices.map((sp: StorePrice) => (
              <div
                key={sp.store}
                className={`flex items-center justify-between py-1 ${
                  sp.store === cheapest.store ? 'opacity-100' : 'opacity-70'
                }`}
              >
                <div className="flex items-center gap-2">
                  <StoreBadge store={sp.store} />
                  {sp.store === cheapest.store && (
                    <span className="text-[10px] text-success font-medium">Best Price</span>
                  )}
                </div>
                <PriceTag storePrice={sp} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
