'use client';

import { Minus, Plus } from 'lucide-react';

interface QuantityPickerProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  max?: number;
}

export function QuantityPicker({ quantity, onQuantityChange, max = 10 }: QuantityPickerProps) {
  return (
    <div className="flex items-center gap-3 border border-border rounded w-fit">
      <button
        onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
        className="p-2 hover:bg-muted transition"
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      <span className="w-8 text-center font-medium">{quantity}</span>
      <button
        onClick={() => onQuantityChange(Math.min(max, quantity + 1))}
        className="p-2 hover:bg-muted transition"
        disabled={quantity >= max}
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
