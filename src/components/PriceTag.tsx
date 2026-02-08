import type { StorePrice } from '../types';

interface PriceTagProps {
  storePrice: StorePrice;
  showStore?: boolean;
  large?: boolean;
}

export default function PriceTag({ storePrice, large = false }: PriceTagProps) {
  const { price, onSpecial, specialPrice } = storePrice;

  if (onSpecial && specialPrice) {
    return (
      <div className={`flex items-baseline gap-1.5 ${large ? 'text-lg' : ''}`}>
        <span
          className={`font-extrabold text-danger tabular-nums tracking-tight ${
            large ? 'text-2xl' : 'text-base'
          }`}
        >
          ${specialPrice.toFixed(2)}
        </span>
        <span
          className={`line-through text-text-muted font-medium tabular-nums decoration-text-muted/50 ${
            large ? 'text-sm' : 'text-[11px]'
          }`}
        >
          ${price.toFixed(2)}
        </span>
      </div>
    );
  }

  return (
    <span
      className={`font-extrabold text-text tabular-nums tracking-tight ${
        large ? 'text-2xl' : 'text-base'
      }`}
    >
      ${price.toFixed(2)}
    </span>
  );
}
