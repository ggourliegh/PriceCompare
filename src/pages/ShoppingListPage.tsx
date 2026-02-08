import { useState } from 'react';
import { Trash2, Plus, Minus, ChevronRight, ShoppingCart, Sparkles, LayoutList } from 'lucide-react';
import { useStore } from '../store/useStore';
import { getStoreInfo } from '../data/stores';
import { getEffectivePrice } from '../data/products';
import StoreBadge from '../components/StoreBadge';

type ViewMode = 'list' | 'optimized';

export default function ShoppingListPage() {
  const { shoppingList, removeFromList, updateQuantity, toggleChecked, clearList, getOptimizedList } = useStore();
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  if (shoppingList.length === 0) {
    return (
      <div className="px-4 py-4">
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart size={32} className="text-primary" />
          </div>
          <h2 className="text-lg font-bold text-text mb-1">Your list is empty</h2>
          <p className="text-sm text-text-secondary max-w-[240px] mx-auto">
            Search for products or browse specials to add items to your shopping list.
          </p>
        </div>
      </div>
    );
  }

  const optimized = getOptimizedList();

  return (
    <div className="px-4 py-4">
      {/* View Toggle */}
      <div className="flex bg-white rounded-xl border border-gray-200 p-1 mb-4">
        <button
          onClick={() => setViewMode('list')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all ${
            viewMode === 'list'
              ? 'bg-primary text-white shadow-sm'
              : 'text-text-secondary'
          }`}
        >
          <LayoutList size={16} />
          My List
        </button>
        <button
          onClick={() => setViewMode('optimized')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all ${
            viewMode === 'optimized'
              ? 'bg-primary text-white shadow-sm'
              : 'text-text-secondary'
          }`}
        >
          <Sparkles size={16} />
          Smart Shop
        </button>
      </div>

      {viewMode === 'list' ? (
        /* Standard List View */
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-text">
              {shoppingList.length} items
            </h3>
            <button
              onClick={clearList}
              className="text-xs text-danger font-medium hover:text-danger/80"
            >
              Clear all
            </button>
          </div>
          <div className="space-y-2">
            {shoppingList.map(item => {
              const cheapestSp = [...item.product.prices].sort(
                (a, b) => getEffectivePrice(a) - getEffectivePrice(b)
              )[0];
              const cheapPrice = getEffectivePrice(cheapestSp);

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl border border-gray-100 p-3 transition-opacity ${
                    item.checked ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleChecked(item.id)}
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                        item.checked
                          ? 'bg-success border-success text-white'
                          : 'border-gray-300'
                      }`}
                    >
                      {item.checked && <span className="text-xs">✓</span>}
                    </button>

                    <span className="text-2xl">{item.product.image}</span>

                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold truncate ${item.checked ? 'line-through' : ''}`}>
                        {item.product.name}
                      </p>
                      <p className="text-xs text-text-muted">{item.product.brand} · {item.product.size}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-sm font-bold text-primary">
                          ${(cheapPrice * item.quantity).toFixed(2)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-text-muted">
                            (${cheapPrice.toFixed(2)} ea)
                          </span>
                        )}
                        <StoreBadge store={cheapestSp.store} />
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg bg-surface-alt flex items-center justify-center text-text-secondary hover:bg-gray-200"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg bg-surface-alt flex items-center justify-center text-text-secondary hover:bg-gray-200"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromList(item.id)}
                      className="text-text-muted hover:text-danger transition-colors shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total Summary */}
          <div className="mt-4 bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-text-secondary">Estimated total (cheapest per item)</span>
              <span className="font-bold text-text">${optimized.totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">vs. buying at most expensive</span>
              <span className="text-text-muted line-through">${optimized.worstCaseCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mt-2 pt-2 border-t border-gray-100">
              <span className="font-semibold text-success">You save</span>
              <span className="font-bold text-success">${optimized.totalSavings.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => setViewMode('optimized')}
            className="w-full mt-3 bg-primary text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors"
          >
            <Sparkles size={16} />
            Optimize My Trip
            <ChevronRight size={16} />
          </button>
        </div>
      ) : (
        /* Optimized View - grouped by store */
        <div>
          {/* Savings Banner */}
          <div className="bg-gradient-to-br from-success to-emerald-600 rounded-2xl p-4 mb-4 text-white">
            <p className="text-xs font-medium opacity-80">Smart shopping saves you</p>
            <p className="text-3xl font-extrabold mt-0.5">${optimized.totalSavings.toFixed(2)}</p>
            <div className="flex items-center gap-3 mt-2 text-xs opacity-80">
              <span>Total: ${optimized.totalCost.toFixed(2)}</span>
              <span>·</span>
              <span>{optimized.groups.length} store{optimized.groups.length > 1 ? 's' : ''} to visit</span>
            </div>
          </div>

          {/* Store Groups */}
          <div className="space-y-3">
            {optimized.groups.map(group => {
              const storeInfo = getStoreInfo(group.store);
              return (
                <div key={group.store} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  {/* Store Header */}
                  <div
                    className="px-4 py-3 flex items-center justify-between"
                    style={{ backgroundColor: storeInfo.bgColor + '15' }}
                  >
                    <div className="flex items-center gap-2">
                      <StoreBadge store={group.store} size="md" />
                      <span className="text-xs text-text-muted">
                        {group.items.length} item{group.items.length > 1 ? 's' : ''}
                      </span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: storeInfo.bgColor }}>
                      ${group.total.toFixed(2)}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="divide-y divide-gray-50">
                    {group.items.map(item => {
                      const sp = item.product.prices.find(p => p.store === group.store);
                      const price = sp ? getEffectivePrice(sp) : 0;
                      return (
                        <div key={item.id} className="px-4 py-2.5 flex items-center gap-3">
                          <span className="text-lg">{item.product.image}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.product.name}</p>
                            <p className="text-xs text-text-muted">{item.product.size} × {item.quantity}</p>
                          </div>
                          <span className="text-sm font-semibold">${(price * item.quantity).toFixed(2)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
