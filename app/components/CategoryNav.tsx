'use client';

import { useFilters } from '@/contexts/FilterContext';
import Link from 'next/link';

export function CategoryNav() {
  const { selectedCategory, setCategory } = useFilters();

  const categories = [
    { id: 'bundle', label: 'Bundle Deals' },
    { id: 'outerwear', label: 'Jackets & Hoodies' },
    { id: 'shirts', label: 'Shirts' },
    { id: 'legwear', label: 'Legwear' },
    { id: 'caps', label: 'Caps' },
    { id: 'branding', label: 'Branding' },
  ];

  return (
    <div className="sticky top-16 z-40 bg-white border-b border-border">
      <div className="mx-auto w-full px-2 sm:px-4 lg:px-6 2xl:px-8">
        <div className="flex justify-center overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${encodeURIComponent(cat.id)}`}
              onClick={() => setCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-4 text-sm font-medium border-b-2 transition ${
                selectedCategory === cat.id
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
