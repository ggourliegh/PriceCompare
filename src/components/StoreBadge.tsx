import type { StoreName } from '../types';
import { getStoreInfo } from '../data/stores';

interface StoreBadgeProps {
  store: StoreName;
  size?: 'sm' | 'md' | 'lg';
}

export default function StoreBadge({ store, size = 'sm' }: StoreBadgeProps) {
  const info = getStoreInfo(store);

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full whitespace-nowrap ${sizeClasses[size]}`}
      style={{ backgroundColor: info.bgColor, color: info.color }}
    >
      {info.name}
    </span>
  );
}
