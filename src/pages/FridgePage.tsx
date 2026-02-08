import { useState, useRef } from 'react';
import { Camera, X, Clock, Users, ChefHat, Plus } from 'lucide-react';
import { useStore } from '../store/useStore';
import { findRecipesByIngredients } from '../data/recipes';
import type { Recipe, TimeFilter } from '../types';

const commonIngredients = [
  'chicken breast', 'beef mince', 'eggs', 'milk', 'cheese', 'bread',
  'rice', 'pasta', 'canned tomatoes', 'butter', 'avocados', 'bananas',
  'broccoli', 'tomatoes', 'peanut butter', 'yoghurt', 'olive oil',
  'salmon fillets', 'sausages', 'wraps', 'fish fingers', 'frozen peas',
  'soy sauce', 'onion', 'garlic',
];

const timeFilters: { label: string; value: TimeFilter; icon: string }[] = [
  { label: 'Any time', value: 'all', icon: '⏰' },
  { label: '< 15 min', value: 'under15', icon: '⚡' },
  { label: '< 30 min', value: 'under30', icon: '🍳' },
  { label: '< 1 hour', value: 'under60', icon: '👨‍🍳' },
];

function getMaxTime(filter: TimeFilter): number | undefined {
  switch (filter) {
    case 'under15': return 15;
    case 'under30': return 30;
    case 'under60': return 60;
    default: return undefined;
  }
}

export default function FridgePage() {
  const { fridgeItems, addFridgeItem, removeFridgeItem, clearFridge } = useStore();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [showRecipes, setShowRecipes] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [scanning, setScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const recipes = findRecipesByIngredients(fridgeItems, getMaxTime(timeFilter));

  const simulateFridgeScan = () => {
    setScanning(true);
    setTimeout(() => {
      // Simulate detecting items from fridge photo
      const detected = ['eggs', 'milk', 'cheese', 'butter', 'tomatoes', 'bread', 'avocados'];
      detected.forEach(item => addFridgeItem(item));
      setScanning(false);
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      simulateFridgeScan();
    }
  };

  if (selectedRecipe) {
    return (
      <div className="px-4 py-4">
        <button
          onClick={() => setSelectedRecipe(null)}
          className="flex items-center gap-1 text-sm text-text-secondary mb-4 hover:text-text"
        >
          <X size={16} /> Back to recipes
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {/* Recipe Header */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-6 text-center">
            <span className="text-5xl">{selectedRecipe.image}</span>
            <h2 className="text-xl font-bold text-text mt-3">{selectedRecipe.name}</h2>
            <div className="flex items-center justify-center gap-4 mt-2 text-sm text-text-secondary">
              <span className="flex items-center gap-1"><Clock size={14} /> {selectedRecipe.cookTime} min</span>
              <span className="flex items-center gap-1"><Users size={14} /> {selectedRecipe.servings} serves</span>
              <span className="flex items-center gap-1"><ChefHat size={14} /> {selectedRecipe.difficulty}</span>
            </div>
          </div>

          {/* Ingredients */}
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-bold text-text mb-2">Ingredients</h3>
            <div className="space-y-1.5">
              {selectedRecipe.ingredients.map(ing => {
                const haveIt = selectedRecipe.matchedIngredients.includes(ing);
                return (
                  <div key={ing} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      haveIt ? 'bg-success text-white' : 'bg-warning/20 text-warning'
                    }`}>
                      {haveIt ? '✓' : '!'}
                    </div>
                    <span className={`text-sm ${haveIt ? 'text-text' : 'text-text-secondary'}`}>
                      {ing}
                      {!haveIt && <span className="text-warning text-xs ml-1">(need to buy)</span>}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instructions */}
          <div className="p-4">
            <h3 className="text-sm font-bold text-text mb-2">Instructions</h3>
            <div className="space-y-3">
              {selectedRecipe.instructions.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary">{i + 1}</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      {/* Camera Section */}
      {!showRecipes && (
        <>
          <div className={`relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden aspect-[3/2] flex items-center justify-center mb-4 ${
            scanning ? '' : ''
          }`}>
            {scanning ? (
              <div className="text-center">
                <div className="w-32 h-32 border-2 border-white/30 rounded-2xl mx-auto mb-3 flex items-center justify-center relative">
                  <div className="absolute inset-0 border-2 border-accent rounded-2xl animate-pulse" />
                  <span className="text-4xl animate-bounce">📸</span>
                </div>
                <p className="text-white/80 text-sm font-medium">Scanning your fridge...</p>
                <p className="text-white/50 text-xs mt-1">Identifying ingredients</p>
              </div>
            ) : (
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Camera size={28} className="text-white/70" />
                </div>
                <h2 className="text-white font-bold text-lg mb-1">Snap Your Fridge</h2>
                <p className="text-white/60 text-sm max-w-[220px] mx-auto">
                  Take a photo and we'll suggest recipes with what you have
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2 mb-4">
            <button
              onClick={simulateFridgeScan}
              disabled={scanning}
              className="w-full bg-accent text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors disabled:opacity-50"
            >
              <Camera size={18} />
              {scanning ? 'Scanning...' : 'Take Photo of Fridge'}
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={scanning}
              className="w-full bg-white text-text border border-gray-200 py-3.5 rounded-xl font-semibold text-sm hover:bg-surface-alt transition-colors disabled:opacity-50"
            >
              Upload Photo
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </>
      )}

      {/* Manual ingredient selection */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-text">
            {fridgeItems.length > 0 ? `My Ingredients (${fridgeItems.length})` : 'Or pick manually'}
          </h3>
          {fridgeItems.length > 0 && (
            <button onClick={clearFridge} className="text-xs text-danger font-medium">Clear</button>
          )}
        </div>

        {/* Selected items */}
        {fridgeItems.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {fridgeItems.map(item => (
              <span
                key={item}
                className="inline-flex items-center gap-1 bg-accent/10 text-accent text-xs font-medium px-2.5 py-1 rounded-full"
              >
                {item}
                <button onClick={() => removeFridgeItem(item)} className="hover:text-accent/70">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Common ingredients grid */}
        <div className="flex flex-wrap gap-1.5">
          {commonIngredients
            .filter(i => !fridgeItems.includes(i))
            .map(item => (
              <button
                key={item}
                onClick={() => addFridgeItem(item)}
                className="inline-flex items-center gap-1 bg-surface-alt text-text-secondary text-xs font-medium px-2.5 py-1.5 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Plus size={10} /> {item}
              </button>
            ))}
        </div>
      </div>

      {/* Find Recipes Button */}
      {fridgeItems.length >= 2 && !showRecipes && (
        <button
          onClick={() => setShowRecipes(true)}
          className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors mb-4"
        >
          <ChefHat size={18} />
          Find Recipes ({recipes.length} available)
        </button>
      )}

      {/* Recipes Section */}
      {showRecipes && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setShowRecipes(false)}
              className="text-sm text-text-secondary hover:text-text flex items-center gap-1"
            >
              <X size={14} /> Back
            </button>
          </div>

          {/* Time filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
            {timeFilters.map(tf => (
              <button
                key={tf.value}
                onClick={() => setTimeFilter(tf.value)}
                className={`shrink-0 px-3 py-2 rounded-full text-xs font-medium transition-all ${
                  timeFilter === tf.value
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-white text-text-secondary border border-gray-200'
                }`}
              >
                {tf.icon} {tf.label}
              </button>
            ))}
          </div>

          {/* Recipe Cards */}
          {recipes.length > 0 ? (
            <div className="space-y-3">
              {recipes.map(recipe => {
                const matchPercent = Math.round(
                  (recipe.matchedIngredients.length / recipe.ingredients.length) * 100
                );
                return (
                  <button
                    key={recipe.id}
                    onClick={() => setSelectedRecipe(recipe)}
                    className="w-full bg-white rounded-xl border border-gray-100 p-4 text-left hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{recipe.image}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-text">{recipe.name}</h4>
                        <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                          <span className="flex items-center gap-0.5"><Clock size={12} /> {recipe.cookTime}m</span>
                          <span className="flex items-center gap-0.5"><Users size={12} /> {recipe.servings}</span>
                          <span className={`font-medium ${
                            recipe.difficulty === 'Easy' ? 'text-success' : 'text-warning'
                          }`}>{recipe.difficulty}</span>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full bg-success transition-all"
                                style={{ width: `${matchPercent}%` }}
                              />
                            </div>
                            <span className="text-[10px] font-semibold text-success">{matchPercent}% match</span>
                          </div>
                          {recipe.missingIngredients.length > 0 && (
                            <p className="text-[10px] text-text-muted mt-1">
                              Need: {recipe.missingIngredients.join(', ')}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">🍽️</p>
              <p className="text-text-secondary text-sm font-medium">No recipes found</p>
              <p className="text-text-muted text-xs mt-1">Try adding more ingredients or adjusting the time filter</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
