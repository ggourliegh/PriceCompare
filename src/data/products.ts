import type { ProductWithPrices } from '../types';

export const products: ProductWithPrices[] = [
  // Fruits & Vegetables
  {
    id: 'fv-001',
    name: 'Bananas',
    brand: 'Fresh',
    category: 'Fruits & Vegetables',
    image: '🍌',
    unit: 'kg',
    size: 'per kg',
    prices: [
      { store: 'Pak\'nSave', price: 2.99, onSpecial: true, specialPrice: 1.99, specialLabel: 'Weekly Special', validUntil: '2026-02-14' },
      { store: 'New World', price: 3.49, onSpecial: false },
      { store: 'Woolworths', price: 3.29, onSpecial: false },
    ],
  },
  {
    id: 'fv-002',
    name: 'Avocados',
    brand: 'NZ Grown',
    category: 'Fruits & Vegetables',
    image: '🥑',
    unit: 'each',
    size: 'each',
    prices: [
      { store: 'Pak\'nSave', price: 2.50, onSpecial: false },
      { store: 'New World', price: 2.00, onSpecial: true, specialPrice: 1.50, specialLabel: '2 for $3', validUntil: '2026-02-14' },
      { store: 'Woolworths', price: 2.49, onSpecial: false },
    ],
  },
  {
    id: 'fv-003',
    name: 'Broccoli',
    brand: 'Fresh',
    category: 'Fruits & Vegetables',
    image: '🥦',
    unit: 'each',
    size: 'each',
    prices: [
      { store: 'Pak\'nSave', price: 2.49, onSpecial: false },
      { store: 'New World', price: 2.99, onSpecial: false },
      { store: 'Woolworths', price: 2.79, onSpecial: true, specialPrice: 1.99, specialLabel: 'Price Drop', validUntil: '2026-02-14' },
    ],
  },
  {
    id: 'fv-004',
    name: 'Tomatoes',
    brand: 'Fresh',
    category: 'Fruits & Vegetables',
    image: '🍅',
    unit: 'kg',
    size: 'per kg',
    prices: [
      { store: 'Pak\'nSave', price: 5.99, onSpecial: false },
      { store: 'New World', price: 6.49, onSpecial: true, specialPrice: 4.99, specialLabel: 'Hot Price', validUntil: '2026-02-14' },
      { store: 'Woolworths', price: 5.99, onSpecial: false },
    ],
  },
  {
    id: 'fv-005',
    name: 'Apples - Royal Gala',
    brand: 'NZ Grown',
    category: 'Fruits & Vegetables',
    image: '🍎',
    unit: 'kg',
    size: 'per kg',
    prices: [
      { store: 'Pak\'nSave', price: 3.99, onSpecial: true, specialPrice: 2.99, specialLabel: 'Super Saver', validUntil: '2026-02-14' },
      { store: 'New World', price: 4.49, onSpecial: false },
      { store: 'Woolworths', price: 4.29, onSpecial: false },
    ],
  },
  // Meat & Seafood
  {
    id: 'ms-001',
    name: 'Chicken Breast',
    brand: 'Tegel',
    category: 'Meat & Seafood',
    image: '🍗',
    unit: 'kg',
    size: '1kg',
    prices: [
      { store: 'Pak\'nSave', price: 13.99, onSpecial: false },
      { store: 'New World', price: 15.99, onSpecial: true, specialPrice: 11.99, specialLabel: 'Club Deal', validUntil: '2026-02-14' },
      { store: 'Woolworths', price: 14.99, onSpecial: false },
    ],
  },
  {
    id: 'ms-002',
    name: 'Beef Mince',
    brand: 'Premium',
    category: 'Meat & Seafood',
    image: '🥩',
    unit: 'kg',
    size: '500g',
    prices: [
      { store: 'Pak\'nSave', price: 9.99, onSpecial: true, specialPrice: 7.99, specialLabel: 'Low Price', validUntil: '2026-02-14' },
      { store: 'New World', price: 11.49, onSpecial: false },
      { store: 'Woolworths', price: 10.99, onSpecial: false },
    ],
  },
  {
    id: 'ms-003',
    name: 'Salmon Fillets',
    brand: 'Regal',
    category: 'Meat & Seafood',
    image: '🐟',
    unit: 'pack',
    size: '300g',
    prices: [
      { store: 'Pak\'nSave', price: 12.99, onSpecial: false },
      { store: 'New World', price: 14.99, onSpecial: false },
      { store: 'Woolworths', price: 13.99, onSpecial: true, specialPrice: 10.99, specialLabel: '½ Price', validUntil: '2026-02-14' },
    ],
  },
  {
    id: 'ms-004',
    name: 'Sausages - Beef',
    brand: 'Hellers',
    category: 'Meat & Seafood',
    image: '🌭',
    unit: 'pack',
    size: '6 pack',
    prices: [
      { store: 'Pak\'nSave', price: 6.99, onSpecial: false },
      { store: 'New World', price: 7.49, onSpecial: true, specialPrice: 5.49, specialLabel: 'Special', validUntil: '2026-02-14' },
      { store: 'Woolworths', price: 7.29, onSpecial: false },
    ],
  },
  // Dairy & Eggs
  {
    id: 'de-001',
    name: 'Whole Milk 2L',
    brand: 'Anchor',
    category: 'Dairy & Eggs',
    image: '🥛',
    unit: 'bottle',
    size: '2L',
    prices: [
      { store: 'Pak\'nSave', price: 3.65, onSpecial: false },
      { store: 'New World', price: 3.99, onSpecial: false },
      { store: 'Woolworths', price: 3.85, onSpecial: true, specialPrice: 3.25, specialLabel: 'Everyday Low', validUntil: '2026-02-14' },
    ],
  },
  {
    id: 'de-002',
    name: 'Free Range Eggs',
    brand: 'Farmer Brown',
    category: 'Dairy & Eggs',
    image: '🥚',
    unit: 'dozen',
    size: '12 pack',
    prices: [
      { store: 'Pak\'nSave', price: 7.99, onSpecial: true, specialPrice: 6.49, specialLabel: 'Great Price', validUntil: '2026-02-14' },
      { store: 'New World', price: 8.49, onSpecial: false },
      { store: 'Woolworths', price: 8.29, onSpecial: false },
    ],
  },
  {
    id: 'de-003',
    name: 'Tasty Cheese Block',
    brand: 'Mainland',
    category: 'Dairy & Eggs',
    image: '🧀',
    unit: 'block',
    size: '500g',
    prices: [
      { store: 'Pak\'nSave', price: 8.49, onSpecial: false },
      { store: 'New World', price: 8.99, onSpecial: false },
      { store: 'Woolworths', price: 8.99, onSpecial: true, specialPrice: 6.99, specialLabel: '½ Price', validUntil: '2026-02-14' },
    ],
  },
  {
    id: 'de-004',
    name: 'Greek Yoghurt',
    brand: 'Chobani',
    category: 'Dairy & Eggs',
    image: '🍦',
    unit: 'tub',
    size: '500g',
    prices: [
      { store: 'Pak\'nSave', price: 5.49, onSpecial: false },
      { store: 'New World', price: 5.99, onSpecial: true, specialPrice: 4.49, specialLabel: 'Clubcard Price', validUntil: '2026-02-14' },
      { store: 'Woolworths', price: 5.79, onSpecial: false },
    ],
  },
  {
    id: 'de-005',
    name: 'Butter',
    brand: 'Anchor',
    category: 'Dairy & Eggs',
    image: '🧈',
    unit: 'block',
    size: '500g',
    prices: [
      { store: 'Pak\'nSave', price: 5.99, onSpecial: true, specialPrice: 4.99, specialLabel: 'Low Price', validUntil: '2026-02-14' },
      { store: 'New World', price: 6.49, onSpecial: false },
      { store: 'Woolworths', price: 6.29, onSpecial: false },
    ],
  },
  // Bakery
  {
    id: 'bk-001',
    name: 'White Bread',
    brand: 'Nature\'s Fresh',
    category: 'Bakery',
    image: '🍞',
    unit: 'loaf',
    size: '700g',
    prices: [
      { store: 'Pak\'nSave', price: 2.69, onSpecial: false },
      { store: 'New World', price: 3.19, onSpecial: false },
      { store: 'Woolworths', price: 2.99, onSpecial: true, specialPrice: 2.29, specialLabel: 'Price Drop', validUntil: '2026-02-14' },
    ],
  },
  {
    id: 'bk-002',
    name: 'Wraps - Wholemeal',
    brand: 'Mission',
    category: 'Bakery',
    image: '🫓',
    unit: 'pack',
    size: '8 pack',
    prices: [
      { store: 'Pak\'nSave', price: 4.99, onSpecial: true, specialPrice: 3.99, specialLabel: 'Rollback', validUntil: '2026-02-14' },
      { store: 'New World', price: 5.49, onSpecial: false },
      { store: 'Woolworths', price: 5.29, onSpecial: false },
    ],
  },
  // Pantry
  {
    id: 'pt-001',
    name: 'Pasta - Spaghetti',
    brand: 'Barilla',
    category: 'Pantry',
    image: '🍝',
    unit: 'pack',
    size: '500g',
    prices: [
      { store: 'Pak\'nSave', price: 2.49, onSpecial: false },
      { store: 'New World', price: 2.89, onSpecial: false },
      { store: 'Woolworths', price: 2.79, onSpecial: true, specialPrice: 1.99, specialLabel: 'Everyday', validUntil: '2026-02-14' },
    ],
  },
  {
    id: 'pt-002',
    name: 'Basmati Rice',
    brand: 'SunRice',
    category: 'Pantry',
    image: '🍚',
    unit: 'bag',
    size: '1kg',
    prices: [
      { store: 'Pak\'nSave', price: 3.99, onSpecial: false },
      { store: 'New World', price: 4.49, onSpecial: true, specialPrice: 3.49, specialLabel: 'Hot Price', validUntil: '2026-02-14' },
      { store: 'Woolworths', price: 4.29, onSpecial: false },
    ],
  },
  {
    id: 'pt-003',
    name: 'Canned Tomatoes',
    brand: 'Wattie\'s',
    category: 'Pantry',
    image: '🥫',
    unit: 'can',
    size: '400g',
    prices: [
      { store: 'Pak\'nSave', price: 1.69, onSpecial: true, specialPrice: 1.29, specialLabel: 'Low Price', validUntil: '2026-02-14' },
      { store: 'New World', price: 2.19, onSpecial: false },
      { store: 'Woolworths', price: 1.99, onSpecial: false },
    ],
  },
  {
    id: 'pt-004',
    name: 'Peanut Butter',
    brand: 'Pic\'s',
    category: 'Pantry',
    image: '🥜',
    unit: 'jar',
    size: '380g',
    prices: [
      { store: 'Pak\'nSave', price: 6.99, onSpecial: false },
      { store: 'New World', price: 7.49, onSpecial: false },
      { store: 'Woolworths', price: 7.29, onSpecial: true, specialPrice: 5.99, specialLabel: '½ Price', validUntil: '2026-02-14' },
    ],
  },
  {
    id: 'pt-005',
    name: 'Olive Oil',
    brand: 'Olivani',
    category: 'Pantry',
    image: '🫒',
    unit: 'bottle',
    size: '500ml',
    prices: [
      { store: 'Pak\'nSave', price: 7.49, onSpecial: false },
      { store: 'New World', price: 8.49, onSpecial: true, specialPrice: 6.49, specialLabel: 'Club Deal', validUntil: '2026-02-14' },
      { store: 'Woolworths', price: 7.99, onSpecial: false },
    ],
  },
  // Frozen
  {
    id: 'fr-001',
    name: 'Frozen Peas',
    brand: 'Wattie\'s',
    category: 'Frozen',
    image: '🫛',
    unit: 'bag',
    size: '1kg',
    prices: [
      { store: 'Pak\'nSave', price: 3.99, onSpecial: false },
      { store: 'New World', price: 4.49, onSpecial: false },
      { store: 'Woolworths', price: 4.29, onSpecial: true, specialPrice: 3.49, specialLabel: 'Price Drop', validUntil: '2026-02-14' },
    ],
  },
  {
    id: 'fr-002',
    name: 'Fish Fingers',
    brand: 'Sealord',
    category: 'Frozen',
    image: '🐠',
    unit: 'box',
    size: '24 pack',
    prices: [
      { store: 'Pak\'nSave', price: 6.49, onSpecial: true, specialPrice: 4.99, specialLabel: 'Great Price', validUntil: '2026-02-14' },
      { store: 'New World', price: 7.49, onSpecial: false },
      { store: 'Woolworths', price: 6.99, onSpecial: false },
    ],
  },
  {
    id: 'fr-003',
    name: 'Ice Cream',
    brand: 'Tip Top',
    category: 'Frozen',
    image: '🍨',
    unit: 'tub',
    size: '2L',
    prices: [
      { store: 'Pak\'nSave', price: 5.99, onSpecial: false },
      { store: 'New World', price: 6.49, onSpecial: true, specialPrice: 4.99, specialLabel: '½ Price', validUntil: '2026-02-14' },
      { store: 'Woolworths', price: 6.29, onSpecial: false },
    ],
  },
  // Drinks
  {
    id: 'dr-001',
    name: 'Orange Juice',
    brand: 'Just Juice',
    category: 'Drinks',
    image: '🧃',
    unit: 'bottle',
    size: '2.4L',
    prices: [
      { store: 'Pak\'nSave', price: 4.49, onSpecial: false },
      { store: 'New World', price: 4.99, onSpecial: false },
      { store: 'Woolworths', price: 4.79, onSpecial: true, specialPrice: 3.49, specialLabel: 'Low Price', validUntil: '2026-02-14' },
    ],
  },
  {
    id: 'dr-002',
    name: 'Coffee - Instant',
    brand: 'Nescafé',
    category: 'Drinks',
    image: '☕',
    unit: 'jar',
    size: '150g',
    prices: [
      { store: 'Pak\'nSave', price: 8.99, onSpecial: true, specialPrice: 6.99, specialLabel: 'Super Deal', validUntil: '2026-02-14' },
      { store: 'New World', price: 9.99, onSpecial: false },
      { store: 'Woolworths', price: 9.49, onSpecial: false },
    ],
  },
  {
    id: 'dr-003',
    name: 'Sparkling Water',
    brand: 'Pump',
    category: 'Drinks',
    image: '💧',
    unit: 'pack',
    size: '12 x 250ml',
    prices: [
      { store: 'Pak\'nSave', price: 7.99, onSpecial: false },
      { store: 'New World', price: 8.99, onSpecial: true, specialPrice: 6.99, specialLabel: 'Clubcard', validUntil: '2026-02-14' },
      { store: 'Woolworths', price: 8.49, onSpecial: false },
    ],
  },
  // Snacks
  {
    id: 'sn-001',
    name: 'Potato Chips',
    brand: 'Bluebird',
    category: 'Snacks',
    image: '🍟',
    unit: 'bag',
    size: '150g',
    prices: [
      { store: 'Pak\'nSave', price: 2.99, onSpecial: false },
      { store: 'New World', price: 3.29, onSpecial: true, specialPrice: 2.49, specialLabel: 'Special', validUntil: '2026-02-14' },
      { store: 'Woolworths', price: 3.19, onSpecial: false },
    ],
  },
  {
    id: 'sn-002',
    name: 'Chocolate Block',
    brand: 'Whittaker\'s',
    category: 'Snacks',
    image: '🍫',
    unit: 'block',
    size: '250g',
    prices: [
      { store: 'Pak\'nSave', price: 4.99, onSpecial: false },
      { store: 'New World', price: 5.49, onSpecial: false },
      { store: 'Woolworths', price: 5.29, onSpecial: true, specialPrice: 3.99, specialLabel: '½ Price', validUntil: '2026-02-14' },
    ],
  },
  {
    id: 'sn-003',
    name: 'Muesli Bars',
    brand: 'Mother Earth',
    category: 'Snacks',
    image: '🥜',
    unit: 'box',
    size: '6 pack',
    prices: [
      { store: 'Pak\'nSave', price: 3.49, onSpecial: true, specialPrice: 2.79, specialLabel: 'Low Price', validUntil: '2026-02-14' },
      { store: 'New World', price: 3.99, onSpecial: false },
      { store: 'Woolworths', price: 3.79, onSpecial: false },
    ],
  },
  // Household
  {
    id: 'hh-001',
    name: 'Dish Liquid',
    brand: 'Earthwise',
    category: 'Household',
    image: '🧴',
    unit: 'bottle',
    size: '500ml',
    prices: [
      { store: 'Pak\'nSave', price: 3.49, onSpecial: false },
      { store: 'New World', price: 3.99, onSpecial: false },
      { store: 'Woolworths', price: 3.79, onSpecial: true, specialPrice: 2.99, specialLabel: 'Reduced', validUntil: '2026-02-14' },
    ],
  },
  {
    id: 'hh-002',
    name: 'Laundry Powder',
    brand: 'Persil',
    category: 'Household',
    image: '🧺',
    unit: 'box',
    size: '2kg',
    prices: [
      { store: 'Pak\'nSave', price: 12.99, onSpecial: true, specialPrice: 9.99, specialLabel: 'Super Saver', validUntil: '2026-02-14' },
      { store: 'New World', price: 14.99, onSpecial: false },
      { store: 'Woolworths', price: 13.99, onSpecial: false },
    ],
  },
  {
    id: 'hh-003',
    name: 'Toilet Paper',
    brand: 'Cottonsoft',
    category: 'Household',
    image: '🧻',
    unit: 'pack',
    size: '12 pack',
    prices: [
      { store: 'Pak\'nSave', price: 8.99, onSpecial: false },
      { store: 'New World', price: 9.49, onSpecial: true, specialPrice: 7.49, specialLabel: 'Club Deal', validUntil: '2026-02-14' },
      { store: 'Woolworths', price: 9.29, onSpecial: false },
    ],
  },
  // Health & Beauty
  {
    id: 'hb-001',
    name: 'Toothpaste',
    brand: 'Colgate',
    category: 'Health & Beauty',
    image: '🪥',
    unit: 'tube',
    size: '170g',
    prices: [
      { store: 'Pak\'nSave', price: 4.49, onSpecial: false },
      { store: 'New World', price: 4.99, onSpecial: false },
      { store: 'Woolworths', price: 4.79, onSpecial: true, specialPrice: 3.49, specialLabel: '½ Price', validUntil: '2026-02-14' },
    ],
  },
  {
    id: 'hb-002',
    name: 'Shampoo',
    brand: 'Tresemmé',
    category: 'Health & Beauty',
    image: '🧴',
    unit: 'bottle',
    size: '900ml',
    prices: [
      { store: 'Pak\'nSave', price: 7.99, onSpecial: true, specialPrice: 5.99, specialLabel: 'Great Price', validUntil: '2026-02-14' },
      { store: 'New World', price: 9.49, onSpecial: false },
      { store: 'Woolworths', price: 8.99, onSpecial: false },
    ],
  },
];

export function getProductById(id: string): ProductWithPrices | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: string): ProductWithPrices[] {
  return products.filter(p => p.category === category);
}

export function getSpecials(): ProductWithPrices[] {
  return products.filter(p => p.prices.some(sp => sp.onSpecial));
}

export function getSpecialsByStore(store: string): ProductWithPrices[] {
  return products.filter(p =>
    p.prices.some(sp => sp.store === store && sp.onSpecial)
  );
}

export function searchProducts(query: string): ProductWithPrices[] {
  const lower = query.toLowerCase();
  return products.filter(
    p =>
      p.name.toLowerCase().includes(lower) ||
      p.brand.toLowerCase().includes(lower) ||
      p.category.toLowerCase().includes(lower)
  );
}

export function getCheapestPrice(product: ProductWithPrices): { store: string; price: number } {
  let cheapest = { store: '', price: Infinity };
  for (const sp of product.prices) {
    const effectivePrice = sp.onSpecial && sp.specialPrice ? sp.specialPrice : sp.price;
    if (effectivePrice < cheapest.price) {
      cheapest = { store: sp.store, price: effectivePrice };
    }
  }
  return cheapest;
}

export function getMostExpensivePrice(product: ProductWithPrices): { store: string; price: number } {
  let expensive = { store: '', price: 0 };
  for (const sp of product.prices) {
    if (sp.price > expensive.price) {
      expensive = { store: sp.store, price: sp.price };
    }
  }
  return expensive;
}

export function getEffectivePrice(sp: { price: number; onSpecial: boolean; specialPrice?: number }): number {
  return sp.onSpecial && sp.specialPrice ? sp.specialPrice : sp.price;
}
