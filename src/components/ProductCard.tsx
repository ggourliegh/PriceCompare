import { useState } from 'react';
import { Plus, Check, ChevronDown, Award } from 'lucide-react';
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
  const [justAdded, setJustAdded] = useState(false);
  const { addToList, shoppingList } = useStore();
  const isInList = shoppingList.some(item => item.product.id === product.id);

  const sortedPrices = [...product.prices].sort(
    (a, b) => getEffectivePrice(a) - getEffectivePrice(b)
  );
  const cheapest = sortedPrices[0];
  const displayPrice = highlightStore
    ? product.prices.find(p => p.store === highlightStore) || cheapest
    : cheapest;

  const hasSpecial = displayPrice.onSpecial && displayPrice.specialPrice;
  const savings = hasSpecial
    ? ((displayPrice.price - (displayPrice.specialPrice ?? 0)) / displayPrice.price * 100).toFixed(0)
    : null;

  const handleAddToList = () => {
    addToList(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 600);
  };

  if (compact) {
    return (
      <div className="card-interactive flex items-center gap-3 px-3.5 py-3">
        {/* Compact emoji */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-surface-alt to-surface-dark flex items-center justify-center shrink-0">
          <span className="text-xl">{product.image}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-text truncate">{product.name}</p>
          <p className="text-xs text-text-muted mt-0.5">{product.brand} · {product.size}</p>
        </div>
        <div className="text-right shrink-0">
          <PriceTag storePrice={displayPrice} />
          <div className="mt-1">
            <StoreBadge store={displayPrice.store} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-interactive overflow-hidden animate-fade-in">
      <div className="p-4">
        <div className="flex items-start gap-3.5">
          {/* Product Image Container */}
          <div className="relative shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 flex items-center justify-center">
              <span className="text-3xl drop-shadow-sm">{product.image}</span>
            </div>
            {/* Savings badge overlapping the image */}
            {savings && (
              <div className="absolute -top-1.5 -right-1.5 bg-danger text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-md shadow-danger/25 animate-scale-in">
                -{savings}%
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-text leading-tight">{product.name}</h3>
            <p className="text-xs text-text-muted mt-0.5 font-medium">{product.brand} · {product.size}</p>

            {/* Price Row */}
            <div className="flex items-center gap-2 mt-2">
              <PriceTag storePrice={displayPrice} />
              {displayPrice.onSpecial && displayPrice.specialLabel && (
                <span className="text-[10px] font-bold text-danger bg-danger/8 px-2 py-0.5 rounded-full border border-danger/15 animate-pulse-soft">
                  {displayPrice.specialLabel}
                </span>
              )}
            </div>

            {/* Best price store indicator */}
            <div className="flex items-center gap-1.5 mt-2">
              <StoreBadge store={cheapest.store} />
              {cheapest.store === displayPrice.store ? (
                <span className="inline-flex items-center gap-0.5 text-[10px] text-success font-semibold">
                  <Award size={10} className="fill-success/20" />
                  Best price
                </span>
              ) : (
                <span className="text-[10px] text-text-muted font-medium">cheapest</span>
              )}
            </div>
          </div>

          {/* Add to List Button */}
          <button
            onClick={handleAddToList}
            className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 btn-press ${
              isInList
                ? 'bg-success/12 text-success shadow-sm shadow-success/10'
                : 'bg-primary/8 text-primary hover:bg-primary/15 hover:shadow-md hover:shadow-primary/10'
            } ${justAdded ? 'animate-bounce-in' : ''}`}
            aria-label={isInList ? 'Added to list' : 'Add to list'}
          >
            {isInList ? <Check size={18} strokeWidth={2.5} /> : <Plus size={18} strokeWidth={2} />}
          </button>
        </div>

        {/* Expand/Collapse Compare Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 mt-3 text-xs font-semibold text-text-secondary hover:text-primary transition-all duration-200 group"
        >
          <span className="group-hover:underline underline-offset-2">Compare all stores</span>
          <div className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
            <ChevronDown size={14} />
          </div>
        </button>
      </div>

      {/* Expandable Store Comparison */}
      <div
        className={`grid transition-all duration-300 ease-out ${
          expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-surface-dark/80 mx-4" />
          <div className="px-4 py-3 bg-gradient-to-b from-surface-alt/60 to-transparent space-y-1.5">
            {sortedPrices.map((sp: StorePrice, index: number) => {
              const isCheapest = index === 0;
              return (
                <div
                  key={sp.store}
                  className={`flex items-center justify-between py-1.5 px-2.5 rounded-xl transition-all duration-200 ${
                    isCheapest
                      ? 'bg-success/6 border border-success/12'
                      : 'hover:bg-surface-dark/50'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-2">
                    <StoreBadge store={sp.store} />
                    {isCheapest && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-success font-bold bg-success/10 px-1.5 py-0.5 rounded-full">
                        <Award size={9} />
                        Best
                      </span>
                    )}
                  </div>
                  <PriceTag storePrice={sp} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
