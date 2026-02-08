import type { StoreName } from '../types';
import { getStoreInfo } from '../data/stores';

interface StoreBadgeProps {
  store: StoreName;
  size?: 'sm' | 'md' | 'lg';
}

export default function StoreBadge({ store, size = 'sm' }: StoreBadgeProps) {
  const info = getStoreInfo(store);

  const sizeClasses = {
    sm: 'text-[10px] px-2.5 py-0.5 gap-1',
    md: 'text-xs px-3 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-1.5',
  };

  return (
    <span
      className={`inline-flex items-center font-bold rounded-full whitespace-nowrap tracking-wide ${sizeClasses[size]}`}
      style={{
        backgroundColor: info.bgColor,
        color: info.color,
        boxShadow: `0 1px 3px ${info.bgColor}40, 0 2px 6px ${info.bgColor}20`,
      }}
    >
      {info.name}
    </span>
  );
}
