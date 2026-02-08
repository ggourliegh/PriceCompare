import { useState, useRef } from 'react';
import { Camera, X, Search, ArrowRight, Plus, Check } from 'lucide-react';
import type { ProductWithPrices } from '../types';
import { products, getCheapestPrice, getEffectivePrice } from '../data/products';
import { useStore } from '../store/useStore';
import StoreBadge from '../components/StoreBadge';
import PriceTag from '../components/PriceTag';

const storeBarColors: Record<string, string> = {
  "Pak'nSave": '#fdd835',
  'New World': '#e31837',
  'Woolworths': '#00a651',
};

export default function ScannerPage() {
  const [scanning, setScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<ProductWithPrices | null>(null);
  const [alternatives, setAlternatives] = useState<ProductWithPrices[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addToList, shoppingList } = useStore();

  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * products.length);
      const product = products[randomIdx];
      setScannedProduct(product);

      const alts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .sort((a, b) => {
          const aPrice = getCheapestPrice(a).price;
          const bPrice = getCheapestPrice(b).price;
          return aPrice - bPrice;
        })
        .slice(0, 4);
      setAlternatives(alts);
      setScanning(false);
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      simulateScan();
    }
  };

  const clearScan = () => {
    setScannedProduct(null);
    setAlternatives([]);
  };

  const isInList = (id: string) => shoppingList.some(item => item.product.id === id);

  return (
    <div className="px-4 py-4 pb-8">
      {!scannedProduct ? (
        <>
          {/* Camera / Scan Area */}
          <div className="mb-5">
            <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 rounded-3xl overflow-hidden aspect-[4/3] flex items-center justify-center shadow-2xl">
              {/* Subtle grid pattern overlay */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              {scanning ? (
                <>
                  {/* Animated scan line */}
                  <div
                    className="absolute left-6 right-6 h-0.5 rounded-full z-10"
                    style={{
                      background: 'linear-gradient(90deg, transparent, #6366f1, #06b6d4, #6366f1, transparent)',
                      animation: 'scanLine 2s ease-in-out infinite',
                      boxShadow: '0 0 20px 4px rgba(99,102,241,0.4)',
                    }}
                  />

                  {/* Scan target area */}
                  <div className="relative w-52 h-52 flex items-center justify-center">
                    {/* Corner brackets */}
                    {[
                      'top-0 left-0 border-t-2 border-l-2 rounded-tl-xl',
                      'top-0 right-0 border-t-2 border-r-2 rounded-tr-xl',
                      'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-xl',
                      'bottom-0 right-0 border-b-2 border-r-2 rounded-br-xl',
                    ].map((pos, i) => (
                      <div
                        key={i}
                        className={`absolute w-12 h-12 ${pos}`}
                        style={{
                          borderColor: '#6366f1',
                          animation: 'bracketPulse 2s ease-in-out infinite',
                          animationDelay: `${i * 0.15}s`,
                        }}
                      />
                    ))}

                    <Search size={36} className="text-white/30" style={{ animation: 'gentleBounce 2s ease-in-out infinite' }} />
                  </div>

                  {/* Frosted glass text overlay */}
                  <div
                    className="absolute bottom-4 left-4 right-4 rounded-2xl px-4 py-3 text-center"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <p className="text-white/90 text-sm font-semibold">Scanning product...</p>
                    <p className="text-white/50 text-xs mt-0.5">Identifying and comparing prices across NZ stores</p>
                  </div>
                </>
              ) : (
                <div className="text-center p-8 relative z-10">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.2))',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <Camera size={36} className="text-white/80" />
                  </div>
                  <h2 className="text-white font-bold text-xl mb-1.5 tracking-tight">Scan a Product</h2>
                  <p className="text-white/50 text-sm max-w-[260px] mx-auto leading-relaxed">
                    Point your camera at any grocery item to instantly compare prices across stores
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 mb-8">
            <button
              onClick={simulateScan}
              disabled={scanning}
              className="w-full text-white py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2.5 transition-all disabled:opacity-50 active:scale-[0.98]"
              style={{
                background: scanning
                  ? 'linear-gradient(135deg, #94a3b8, #64748b)'
                  : 'linear-gradient(135deg, #6366f1, #4f46e5)',
                boxShadow: scanning
                  ? 'none'
                  : '0 4px 20px rgba(99,102,241,0.4), 0 2px 8px rgba(99,102,241,0.3)',
              }}
            >
              <Camera size={20} />
              {scanning ? 'Scanning...' : 'Take Photo'}
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={scanning}
              className="w-full bg-white text-text py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2.5 transition-all disabled:opacity-50 active:scale-[0.98]"
              style={{
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              <ArrowRight size={18} className="rotate-90" />
              Upload from Gallery
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* How it works */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: 'linear-gradient(135deg, #fafafe, #f0f0ff)',
              border: '1px solid rgba(99,102,241,0.08)',
            }}
          >
            <h3 className="text-sm font-bold text-text mb-4 tracking-tight">How it works</h3>
            <div className="space-y-4">
              {[
                { step: '1', icon: '📸', text: 'Point your camera at any product in-store' },
                { step: '2', icon: '🔍', text: 'We identify the product and check all store prices' },
                { step: '3', icon: '💰', text: "See if it's cheaper elsewhere + alternative brands" },
              ].map(({ step, icon, text }) => (
                <div key={step} className="flex items-center gap-3.5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 relative"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                      boxShadow: '0 2px 8px rgba(99,102,241,0.3)',
                    }}
                  >
                    <span className="text-white text-sm font-bold">{step}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-lg">{icon}</span>
                    <p className="text-sm text-text-secondary leading-snug">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Scan Results */
        <div>
          <button
            onClick={clearScan}
            className="flex items-center gap-1.5 text-sm text-text-secondary mb-5 hover:text-text transition-colors font-medium"
          >
            <X size={16} /> Clear scan
          </button>

          {/* Scanned Product Card */}
          <div
            className="rounded-3xl overflow-hidden mb-5"
            style={{
              background: '#fff',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
            }}
          >
            {/* Product header */}
            <div
              className="p-5 pb-4"
              style={{
                background: 'linear-gradient(135deg, #fafafe, #f5f3ff)',
              }}
            >
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">Scanned Product</p>
              <div className="flex items-start gap-4">
                <div
                  className="text-5xl w-16 h-16 flex items-center justify-center rounded-2xl shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)',
                  }}
                >
                  {scannedProduct.image}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-text tracking-tight">{scannedProduct.name}</h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    {scannedProduct.brand} &middot; {scannedProduct.size}
                  </p>
                </div>
              </div>
            </div>

            {/* Price comparison bar chart */}
            <div className="px-5 py-4">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">Price Comparison</p>
              {(() => {
                const sorted = [...scannedProduct.prices].sort(
                  (a, b) => getEffectivePrice(a) - getEffectivePrice(b)
                );
                const maxPrice = Math.max(...sorted.map(sp => getEffectivePrice(sp)));
                const cheapestPrice = getEffectivePrice(sorted[0]);
                const mostExpensivePrice = Math.max(...scannedProduct.prices.map(sp => sp.price));
                const saving = mostExpensivePrice - cheapestPrice;

                return (
                  <>
                    <div className="space-y-2.5">
                      {sorted.map((sp, i) => {
                        const effectivePrice = getEffectivePrice(sp);
                        const barWidth = Math.max((effectivePrice / maxPrice) * 100, 20);
                        const isCheapest = i === 0;
                        const barColor = storeBarColors[sp.store] || '#94a3b8';

                        return (
                          <div key={sp.store} className="flex items-center gap-3">
                            <div className="w-20 shrink-0">
                              <StoreBadge store={sp.store} size="sm" />
                            </div>
                            <div className="flex-1 flex items-center gap-2">
                              <div className="flex-1 h-8 bg-gray-50 rounded-lg overflow-hidden relative">
                                <div
                                  className="h-full rounded-lg flex items-center transition-all duration-700 ease-out"
                                  style={{
                                    width: `${barWidth}%`,
                                    background: isCheapest
                                      ? `linear-gradient(90deg, ${barColor}, ${barColor}dd)`
                                      : `linear-gradient(90deg, ${barColor}40, ${barColor}25)`,
                                    boxShadow: isCheapest ? `0 2px 8px ${barColor}40` : 'none',
                                  }}
                                >
                                  {isCheapest && (
                                    <span className="ml-2 text-xs">👑</span>
                                  )}
                                </div>
                              </div>
                              <div className="w-20 shrink-0 text-right">
                                <PriceTag storePrice={sp} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Savings callout */}
                    {saving > 0.01 && (
                      <div
                        className="mt-4 rounded-2xl px-4 py-3 flex items-center gap-3"
                        style={{
                          background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                          border: '1px solid rgba(16,185,129,0.2)',
                        }}
                      >
                        <span className="text-2xl">💸</span>
                        <div>
                          <p className="text-sm font-bold text-success">
                            You could save ${saving.toFixed(2)}
                          </p>
                          <p className="text-xs text-success/70">
                            by buying at {sorted[0].store} instead of the most expensive option
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>

            {/* Add to list button */}
            <div className="px-5 pb-5">
              <button
                onClick={() => addToList(scannedProduct)}
                className="w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                style={
                  isInList(scannedProduct.id)
                    ? {
                        background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                        color: '#10b981',
                        border: '1.5px solid rgba(16,185,129,0.2)',
                      }
                    : {
                        background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                        color: '#fff',
                        boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
                      }
                }
              >
                {isInList(scannedProduct.id) ? (
                  <><Check size={18} /> Added to list</>
                ) : (
                  <><Plus size={18} /> Add to shopping list</>
                )}
              </button>
            </div>
          </div>

          {/* Cheaper Alternatives */}
          {alternatives.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-base font-bold text-text tracking-tight">Alternatives</h3>
                <ArrowRight size={14} className="text-text-muted" />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4">
                {alternatives.map(alt => {
                  const cheapest = getCheapestPrice(alt);
                  const origCheapest = getCheapestPrice(scannedProduct);
                  const saving = origCheapest.price - cheapest.price;

                  return (
                    <div
                      key={alt.id}
                      className="shrink-0 w-44 rounded-2xl p-3.5 relative"
                      style={{
                        background: '#fff',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                        border: '1px solid rgba(0,0,0,0.04)',
                      }}
                    >
                      {saving > 0 && (
                        <div
                          className="absolute -top-2 -right-2 text-[10px] font-bold text-white px-2 py-0.5 rounded-full"
                          style={{
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            boxShadow: '0 2px 8px rgba(16,185,129,0.3)',
                          }}
                        >
                          -${saving.toFixed(2)}
                        </div>
                      )}
                      <div className="text-center mb-2">
                        <span className="text-3xl">{alt.image}</span>
                      </div>
                      <p className="text-xs font-bold text-text truncate">{alt.name}</p>
                      <p className="text-[10px] text-text-muted truncate">{alt.brand} &middot; {alt.size}</p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="text-sm font-bold text-primary">${cheapest.price.toFixed(2)}</span>
                        <StoreBadge store={cheapest.store as any} />
                      </div>
                      <button
                        onClick={() => addToList(alt)}
                        className="w-full mt-2.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-[0.97]"
                        style={
                          isInList(alt.id)
                            ? {
                                background: '#ecfdf5',
                                color: '#10b981',
                              }
                            : {
                                background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(99,102,241,0.04))',
                                color: '#6366f1',
                              }
                        }
                      >
                        {isInList(alt.id) ? <><Check size={14} /> Added</> : <><Plus size={14} /> Add</>}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
