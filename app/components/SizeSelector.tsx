'use client';

interface SizeSelectorProps {
  availableSizes: string[];
  selectedSize: string | null;
  onSizeChange: (size: string) => void;
}

export function SizeSelector({
  availableSizes,
  selectedSize,
  onSizeChange,
}: SizeSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Size</label>
      <div className="grid grid-cols-4 gap-2">
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`py-2 px-3 text-sm font-medium rounded border transition ${
              selectedSize === size
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border text-foreground hover:border-primary'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
