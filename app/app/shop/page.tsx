'use client';

import { useFilters } from '@/contexts/FilterContext';
import { Filters } from '@/components/Filters';
import { ProductGrid } from '@/components/ProductGrid';
import { products } from '@/lib/products';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function ShopPage() {
  const searchParams = useSearchParams();
  const {
    selectedCategory,
    selectedSizes,
    priceRange,
    sortBy,
    setCategory,
  } = useFilters();

  // Set category from URL if provided
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categoryParam !== selectedCategory) {
      setCategory(categoryParam);
    }
  }, [searchParams, selectedCategory, setCategory]);

  // Filter products
  let filteredProducts = products;

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === selectedCategory
    );
  }

  if (selectedSizes.length > 0) {
    filteredProducts = filteredProducts.filter((p) =>
      p.sizes.some((size) => selectedSizes.includes(size))
    );
  }

  filteredProducts = filteredProducts.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  // Sort products
  switch (sortBy) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'popularity':
      filteredProducts.sort((a, b) => b.reviews - a.reviews);
      break;
    case 'newest':
    default:
      // Keep original order (newest first)
      break;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Shop</h1>
          <p className="text-muted-foreground text-lg">
            {filteredProducts.length} products found
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 max-h-[calc(100vh-80px)] overflow-y-auto">
              <Filters />
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
