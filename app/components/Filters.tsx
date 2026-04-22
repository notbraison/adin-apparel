'use client';

import { useFilters } from '@/contexts/FilterContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Filters() {
  const {
    priceRange,
    sortBy,
    setPriceRange,
    setSortBy,
    resetFilters,
  } = useFilters();

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    price: true,
    sort: true,
  });

  const [minPrice, setMinPrice] = useState(String(priceRange[0]));
  const [maxPrice, setMaxPrice] = useState(String(priceRange[1]));

  useEffect(() => {
    setMinPrice(String(priceRange[0]));
    setMaxPrice(String(priceRange[1]));
  }, [priceRange]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const applyPrice = () => {
    const parsedMin = Number.parseInt(minPrice, 10);
    const parsedMax = Number.parseInt(maxPrice, 10);

    const nextMin = Number.isFinite(parsedMin) ? parsedMin : 0;
    const nextMax = Number.isFinite(parsedMax) ? parsedMax : 5000;

    const clampedMin = Math.max(0, Math.min(5000, nextMin));
    const clampedMax = Math.max(0, Math.min(5000, nextMax));

    setPriceRange([
      Math.min(clampedMin, clampedMax),
      Math.max(clampedMin, clampedMax),
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Sort */}
      <div className="pb-6 border-b border-border">
        <button
          onClick={() => toggleSection('sort')}
          className="w-full flex items-center justify-between mb-4"
        >
          <h3 className="text-sm font-semibold uppercase">Sort By</h3>
          <ChevronDown
            size={16}
            className={`transition-transform ${expandedSections.sort ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.sort && (
          <div className="space-y-3">
            {[
              { id: 'newest', label: 'Newest' },
              { id: 'price-low', label: 'Price: Low to High' },
              { id: 'price-high', label: 'Price: High to Low' },
              { id: 'popularity', label: 'Most Popular' },
            ].map((option) => (
              <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="sort"
                  value={option.id}
                  checked={sortBy === option.id}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm text-foreground">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price */}
      <div className="pb-6 border-b border-border">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between mb-4"
        >
          <h3 className="text-sm font-semibold uppercase">Price</h3>
          <ChevronDown
            size={16}
            className={`transition-transform ${expandedSections.price ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.price && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Min (KSh)</label>
                <Input
                  inputMode="numeric"
                  type="number"
                  min={0}
                  max={5000}
                  step={100}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  onBlur={applyPrice}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Max (KSh)</label>
                <Input
                  inputMode="numeric"
                  type="number"
                  min={0}
                  max={5000}
                  step={100}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  onBlur={applyPrice}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="outline" className="flex-1" onClick={applyPrice}>
                Apply
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="flex-1"
                onClick={() => setPriceRange([0, 5000])}
              >
                Clear
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="w-full py-2 px-4 text-sm font-medium text-foreground border border-border rounded hover:bg-muted transition"
      >
        Reset Filters
      </button>
    </div>
  );
}
