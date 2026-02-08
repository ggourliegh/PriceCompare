import { useState, useRef } from 'react';
import { Camera, X, Search, ArrowRight, Plus, Check } from 'lucide-react';
import type { ProductWithPrices } from '../types';
import { products, getCheapestPrice, getEffectivePrice } from '../data/products';
import { useStore } from '../store/useStore';
import StoreBadge from '../components/StoreBadge';
import PriceTag from '../components/PriceTag';

export default function ScannerPage() {
  const [scanning, setScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<ProductWithPrices | null>(null);
  const [alternatives, setAlternatives] = useState<ProductWithPrices[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addToList, shoppingList } = useStore();

  const simulateScan = () => {
    setScanning(true);
    // Simulate scanning delay then pick a random product
    setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * products.length);
      const product = products[randomIdx];
      setScannedProduct(product);

      // Find alternatives in same category
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
      // In a real app, this would send to an image recognition API
      simulateScan();
    }
  };

  const clearScan = () => {
    setScannedProduct(null);
    setAlternatives([]);
  };

  const isInList = (id: string) => shoppingList.some(item => item.product.id === id);

  return (
    <div className="px-4 py-4">
      {!scannedProduct ? (
        <>
          {/* Camera / Upload Area */}
          <div className="mb-4">
            <div
              className={`relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden ${
                scanning ? 'aspect-[4/3]' : 'aspect-[4/3]'
              } flex items-center justify-center`}
            >
              {scanning ? (
                <div className="text-center">
                  <div className="w-48 h-48 border-2 border-white/30 rounded-2xl mx-auto mb-4 flex items-center justify-center relative">
                    <div className="absolute inset-0 border-2 border-primary rounded-2xl animate-pulse" />
                    <Search size={32} className="text-white/50 animate-bounce" />
                  </div>
                  <p className="text-white/80 text-sm font-medium">Scanning product...</p>
                  <p className="text-white/50 text-xs mt-1">Identifying and comparing prices</p>
                </div>
              ) : (
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera size={36} className="text-white/70" />
                  </div>
                  <h2 className="text-white font-bold text-lg mb-1">Scan a Product</h2>
                  <p className="text-white/60 text-sm max-w-[250px] mx-auto">
                    Take a photo of any grocery product to find cheaper options instantly
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 mb-6">
            <button
              onClick={simulateScan}
              disabled={scanning}
              className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              <Camera size={18} />
              {scanning ? 'Scanning...' : 'Take Photo'}
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={scanning}
              className="w-full bg-white text-text border border-gray-200 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-surface-alt transition-colors disabled:opacity-50"
            >
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
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="text-sm font-bold text-text mb-3">How it works</h3>
            <div className="space-y-3">
              {[
                { step: '1', text: 'Point your camera at any product in-store' },
                { step: '2', text: 'We identify the product and check all store prices' },
                { step: '3', text: 'See if it\'s cheaper elsewhere + alternative brands' },
              ].map(({ step, text }) => (
                <div key={step} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary">{step}</span>
                  </div>
                  <p className="text-sm text-text-secondary">{text}</p>
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
            className="flex items-center gap-1 text-sm text-text-secondary mb-4 hover:text-text"
          >
            <X size={16} /> Clear scan
          </button>

          {/* Scanned Product */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
            <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-2">
              Scanned Product
            </p>
            <div className="flex items-start gap-3">
              <div className="text-4xl w-14 h-14 flex items-center justify-center bg-surface-alt rounded-xl">
                {scannedProduct.image}
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-text">{scannedProduct.name}</h3>
                <p className="text-xs text-text-muted">{scannedProduct.brand} · {scannedProduct.size}</p>

                {/* All store prices */}
                <div className="mt-3 space-y-2">
                  {[...scannedProduct.prices]
                    .sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b))
                    .map((sp, i) => (
                      <div
                        key={sp.store}
                        className={`flex items-center justify-between p-2 rounded-lg ${
                          i === 0 ? 'bg-success/5 border border-success/20' : 'bg-surface-alt'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <StoreBadge store={sp.store} />
                          {i === 0 && (
                            <span className="text-[10px] font-semibold text-success">Cheapest</span>
                          )}
                        </div>
                        <PriceTag storePrice={sp} />
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => addToList(scannedProduct)}
              className={`w-full mt-3 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                isInList(scannedProduct.id)
                  ? 'bg-success/10 text-success'
                  : 'bg-primary text-white hover:bg-primary-dark'
              }`}
            >
              {isInList(scannedProduct.id) ? (
                <><Check size={16} /> Added to list</>
              ) : (
                <><Plus size={16} /> Add to shopping list</>
              )}
            </button>
          </div>

          {/* Cheaper Alternatives */}
          {alternatives.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-sm font-bold text-text">Cheaper Alternatives</h3>
                <ArrowRight size={14} className="text-text-muted" />
              </div>
              <div className="space-y-2">
                {alternatives.map(alt => {
                  const cheapest = getCheapestPrice(alt);
                  const origCheapest = getCheapestPrice(scannedProduct);
                  const saving = origCheapest.price - cheapest.price;

                  return (
                    <div key={alt.id} className="bg-white rounded-xl border border-gray-100 p-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{alt.image}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate">{alt.name}</p>
                          <p className="text-xs text-text-muted">{alt.brand} · {alt.size}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-sm font-bold text-primary">${cheapest.price.toFixed(2)}</span>
                            <StoreBadge store={cheapest.store as any} />
                            {saving > 0 && (
                              <span className="text-[10px] font-semibold text-success bg-success/10 px-1.5 py-0.5 rounded">
                                Save ${saving.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => addToList(alt)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isInList(alt.id)
                              ? 'bg-success/10 text-success'
                              : 'bg-primary/10 text-primary'
                          }`}
                        >
                          {isInList(alt.id) ? <Check size={16} /> : <Plus size={16} />}
                        </button>
                      </div>
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
