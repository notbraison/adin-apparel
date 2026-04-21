'use client';

import { useFilters } from '@/contexts/FilterContext';
import Link from 'next/link';
import { useState } from 'react';

export function CategoryNav() {
  const { selectedCategory, setCategory } = useFilters();
  const [isScrolled, setIsScrolled] = useState(false);

  const categories = [
    { id: null, label: 'All Products' },
    { id: 'bundle', label: 'Bundle Deals' },
    { id: 'hoodies', label: 'Hoodies' },
    { id: 'jackets', label: 'Varsity Jackets' },
    { id: 'shorts', label: 'Sweat Shorts' },
    { id: 'tshirts', label: 'T-Shirts' },
    { id: 'sweatshirts', label: 'Sweatshirts' },
    { id: 'caps', label: 'Trucker Hats' },
    { id: 'sweatpants', label: 'Sweatpants' },
  ];

  return (
    <div className="sticky top-16 z-40 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id || 'all'}
              onClick={() => setCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-4 text-sm font-medium border-b-2 transition ${
                selectedCategory === cat.id
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
