'use client';

import { useFilters } from '@/contexts/FilterContext';
import { categories, sizes, priceRanges } from '@/lib/products';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function Filters() {
  const {
    selectedCategory,
    selectedSizes,
    priceRange,
    sortBy,
    setCategory,
    toggleSize,
    setPriceRange,
    setSortBy,
    resetFilters,
  } = useFilters();

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    size: true,
    price: true,
    sort: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
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

      {/* Category */}
      <div className="pb-6 border-b border-border">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between mb-4"
        >
          <h3 className="text-sm font-semibold uppercase">Category</h3>
          <ChevronDown
            size={16}
            className={`transition-transform ${expandedSections.category ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.category && (
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === null}
                onChange={() => setCategory(null)}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm text-foreground">All Products</span>
            </label>
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={cat.id}
                  checked={selectedCategory === cat.id}
                  onChange={() => setCategory(cat.id)}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm text-foreground">{cat.name}</span>
                <span className="text-xs text-muted-foreground">({cat.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Size */}
      <div className="pb-6 border-b border-border">
        <button
          onClick={() => toggleSection('size')}
          className="w-full flex items-center justify-between mb-4"
        >
          <h3 className="text-sm font-semibold uppercase">Size</h3>
          <ChevronDown
            size={16}
            className={`transition-transform ${expandedSections.size ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.size && (
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-3 py-2 text-xs font-medium rounded border transition ${
                  selectedSizes.includes(size)
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-foreground hover:border-primary'
                }`}
              >
                {size}
              </button>
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
          <div className="space-y-3">
            {priceRanges.map((range) => (
              <label key={`${range.min}-${range.max}`} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={
                    priceRange[0] <= range.min && priceRange[1] >= range.max
                  }
                  onChange={() => setPriceRange([range.min, range.max])}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm text-foreground">{range.label}</span>
              </label>
            ))}
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
