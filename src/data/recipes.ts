import type { Recipe } from '../types';

export const recipes: Recipe[] = [
  {
    id: 'r-001',
    name: 'Classic Spaghetti Bolognese',
    image: '🍝',
    cookTime: 30,
    servings: 4,
    difficulty: 'Easy',
    ingredients: ['beef mince', 'pasta', 'canned tomatoes', 'onion', 'garlic', 'olive oil', 'cheese'],
    matchedIngredients: [],
    missingIngredients: [],
    instructions: [
      'Brown the mince in olive oil over high heat.',
      'Add diced onion and garlic, cook until soft.',
      'Add canned tomatoes and simmer for 20 minutes.',
      'Cook pasta according to packet directions.',
      'Serve sauce over pasta with grated cheese.',
    ],
  },
  {
    id: 'r-002',
    name: 'Chicken Stir-Fry',
    image: '🍳',
    cookTime: 15,
    servings: 2,
    difficulty: 'Easy',
    ingredients: ['chicken breast', 'broccoli', 'rice', 'soy sauce', 'garlic', 'olive oil'],
    matchedIngredients: [],
    missingIngredients: [],
    instructions: [
      'Slice chicken breast into strips.',
      'Stir-fry chicken in oil over high heat until golden.',
      'Add broccoli florets and garlic, cook 3 minutes.',
      'Add soy sauce and toss to coat.',
      'Serve over steamed rice.',
    ],
  },
  {
    id: 'r-003',
    name: 'Avocado Toast with Eggs',
    image: '🥑',
    cookTime: 10,
    servings: 2,
    difficulty: 'Easy',
    ingredients: ['bread', 'avocados', 'eggs', 'tomatoes', 'olive oil'],
    matchedIngredients: [],
    missingIngredients: [],
    instructions: [
      'Toast the bread until golden.',
      'Mash avocado with a fork, season with salt and pepper.',
      'Fry or poach eggs to your liking.',
      'Spread avocado on toast, top with egg and sliced tomato.',
      'Drizzle with olive oil and serve.',
    ],
  },
  {
    id: 'r-004',
    name: 'Banana Smoothie Bowl',
    image: '🍌',
    cookTime: 5,
    servings: 1,
    difficulty: 'Easy',
    ingredients: ['bananas', 'yoghurt', 'milk'],
    matchedIngredients: [],
    missingIngredients: [],
    instructions: [
      'Blend frozen banana, yoghurt, and a splash of milk.',
      'Pour into a bowl.',
      'Top with sliced banana and any toppings you like.',
    ],
  },
  {
    id: 'r-005',
    name: 'Fish Finger Wraps',
    image: '🌯',
    cookTime: 20,
    servings: 4,
    difficulty: 'Easy',
    ingredients: ['fish fingers', 'wraps', 'tomatoes', 'avocados'],
    matchedIngredients: [],
    missingIngredients: [],
    instructions: [
      'Cook fish fingers according to packet directions.',
      'Warm wraps in a dry pan.',
      'Slice tomatoes and avocado.',
      'Assemble wraps with fish fingers, tomato, and avocado.',
      'Roll up and serve.',
    ],
  },
  {
    id: 'r-006',
    name: 'Cheesy Pasta Bake',
    image: '🧀',
    cookTime: 40,
    servings: 4,
    difficulty: 'Medium',
    ingredients: ['pasta', 'cheese', 'milk', 'butter', 'broccoli'],
    matchedIngredients: [],
    missingIngredients: [],
    instructions: [
      'Cook pasta until al dente, drain.',
      'Steam broccoli florets until tender.',
      'Melt butter in a pan, stir in flour, gradually add milk.',
      'Add grated cheese and stir until melted.',
      'Combine pasta, broccoli, and sauce in a baking dish.',
      'Top with extra cheese and bake at 180°C for 20 minutes.',
    ],
  },
  {
    id: 'r-007',
    name: 'Beef Mince Tacos',
    image: '🌮',
    cookTime: 25,
    servings: 4,
    difficulty: 'Easy',
    ingredients: ['beef mince', 'wraps', 'tomatoes', 'cheese', 'avocados'],
    matchedIngredients: [],
    missingIngredients: [],
    instructions: [
      'Brown the mince over high heat with taco seasoning.',
      'Warm wraps in a dry pan or oven.',
      'Dice tomatoes and mash avocado.',
      'Assemble tacos with mince, tomato, avocado, and cheese.',
    ],
  },
  {
    id: 'r-008',
    name: 'Salmon & Rice Bowl',
    image: '🐟',
    cookTime: 25,
    servings: 2,
    difficulty: 'Medium',
    ingredients: ['salmon fillets', 'rice', 'avocados', 'broccoli', 'soy sauce'],
    matchedIngredients: [],
    missingIngredients: [],
    instructions: [
      'Cook rice according to packet directions.',
      'Pan-fry salmon fillets skin-side down for 4 minutes, flip and cook 3 more.',
      'Steam broccoli until bright green.',
      'Slice avocado.',
      'Assemble bowls with rice, salmon, broccoli, and avocado.',
      'Drizzle with soy sauce.',
    ],
  },
  {
    id: 'r-009',
    name: 'Peanut Butter Banana Toast',
    image: '🥜',
    cookTime: 5,
    servings: 1,
    difficulty: 'Easy',
    ingredients: ['bread', 'peanut butter', 'bananas'],
    matchedIngredients: [],
    missingIngredients: [],
    instructions: [
      'Toast bread until golden.',
      'Spread peanut butter generously.',
      'Top with sliced banana.',
      'Drizzle with honey if desired.',
    ],
  },
  {
    id: 'r-010',
    name: 'Creamy Tomato Soup',
    image: '🍅',
    cookTime: 30,
    servings: 4,
    difficulty: 'Easy',
    ingredients: ['canned tomatoes', 'milk', 'butter', 'bread', 'cheese'],
    matchedIngredients: [],
    missingIngredients: [],
    instructions: [
      'Sauté onion in butter until soft.',
      'Add canned tomatoes and simmer 15 minutes.',
      'Blend until smooth, stir in milk.',
      'Make cheese toasties with bread and cheese.',
      'Serve soup with cheese toasties for dipping.',
    ],
  },
  {
    id: 'r-011',
    name: 'Quick Fried Rice',
    image: '🍚',
    cookTime: 15,
    servings: 2,
    difficulty: 'Easy',
    ingredients: ['rice', 'eggs', 'frozen peas', 'soy sauce', 'olive oil'],
    matchedIngredients: [],
    missingIngredients: [],
    instructions: [
      'Cook rice and let cool (or use leftover rice).',
      'Scramble eggs in a hot wok, set aside.',
      'Stir-fry peas in oil for 2 minutes.',
      'Add rice and soy sauce, toss over high heat.',
      'Add back eggs, mix through and serve.',
    ],
  },
  {
    id: 'r-012',
    name: 'Sausage & Mash',
    image: '🌭',
    cookTime: 35,
    servings: 4,
    difficulty: 'Easy',
    ingredients: ['sausages', 'butter', 'milk', 'frozen peas'],
    matchedIngredients: [],
    missingIngredients: [],
    instructions: [
      'Grill or pan-fry sausages until cooked through.',
      'Boil potatoes until tender, drain.',
      'Mash with butter and milk until smooth.',
      'Cook frozen peas.',
      'Serve sausages on mash with peas on the side.',
    ],
  },
];

export function findRecipesByIngredients(
  availableIngredients: string[],
  maxTime?: number
): Recipe[] {
  const available = availableIngredients.map(i => i.toLowerCase());

  return recipes
    .map(recipe => {
      const matched = recipe.ingredients.filter(ing =>
        available.some(a => ing.toLowerCase().includes(a) || a.includes(ing.toLowerCase()))
      );
      const missing = recipe.ingredients.filter(
        ing => !available.some(a => ing.toLowerCase().includes(a) || a.includes(ing.toLowerCase()))
      );
      return { ...recipe, matchedIngredients: matched, missingIngredients: missing };
    })
    .filter(recipe => {
      const hasEnough = recipe.matchedIngredients.length >= 2;
      const withinTime = maxTime ? recipe.cookTime <= maxTime : true;
      return hasEnough && withinTime;
    })
    .sort((a, b) => {
      const aRatio = a.matchedIngredients.length / a.ingredients.length;
      const bRatio = b.matchedIngredients.length / b.ingredients.length;
      return bRatio - aRatio;
    });
}
