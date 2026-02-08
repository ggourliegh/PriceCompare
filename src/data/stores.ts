import type { StoreInfo } from '../types';

export const stores: StoreInfo[] = [
  {
    name: 'Pak\'nSave',
    logo: '🟡',
    color: '#1565c0',
    bgColor: '#fdd835',
    tagline: 'NZ\'s Lowest Food Prices',
  },
  {
    name: 'New World',
    logo: '🔴',
    color: '#ffffff',
    bgColor: '#e31837',
    tagline: 'Fresh & Friendly',
  },
  {
    name: 'Woolworths',
    logo: '🟢',
    color: '#ffffff',
    bgColor: '#00a651',
    tagline: 'The Fresh Food People',
  },
];

export function getStoreInfo(name: string): StoreInfo {
  return stores.find(s => s.name === name) || stores[0];
}
