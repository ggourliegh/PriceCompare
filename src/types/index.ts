export type StoreName = 'New World' | 'Pak\'nSave' | 'Woolworths';

export interface StoreInfo {
  name: StoreName;
  logo: string;
  color: string;
  bgColor: string;
  tagline: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  image: string;
  unit: string;
  size: string;
}

export interface StorePrice {
  store: StoreName;
  price: number;
  onSpecial: boolean;
  specialPrice?: number;
  specialLabel?: string;
  validUntil?: string;
}

export interface ProductWithPrices extends Product {
  prices: StorePrice[];
}

export interface ShoppingListItem {
  id: string;
  product: ProductWithPrices;
  quantity: number;
  checked: boolean;
}

export interface StoreGroup {
  store: StoreName;
  items: ShoppingListItem[];
  total: number;
}

export interface OptimizedList {
  groups: StoreGroup[];
  totalCost: number;
  totalSavings: number;
  worstCaseCost: number;
}

export interface Recipe {
  id: string;
  name: string;
  image: string;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  matchedIngredients: string[];
  missingIngredients: string[];
  instructions: string[];
}

export interface ScannedProduct {
  product: ProductWithPrices;
  alternatives: ProductWithPrices[];
}

export type Category =
  | 'Fruits & Vegetables'
  | 'Meat & Seafood'
  | 'Dairy & Eggs'
  | 'Bakery'
  | 'Pantry'
  | 'Frozen'
  | 'Drinks'
  | 'Snacks'
  | 'Household'
  | 'Health & Beauty';

export type TimeFilter = 'all' | 'under15' | 'under30' | 'under60';
