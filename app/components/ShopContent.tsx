'use client';
import { useFilters } from '@/contexts/FilterContext';
import { Filters } from '@/components/Filters';
import { ProductGrid } from '@/components/ProductGrid';
import { CategoryNav } from '@/components/CategoryNav';
import { products } from '@/lib/products';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, X } from 'lucide-react';

const normalizeShopCategory = (category: string | null) => {
  if (!category) return null;
  switch (category) {
    case 'hoodies':
    case 'jackets':
      return 'outerwear';
    case 'tshirts':
    case 'sweatshirts':
      return 'shirts';
    case 'sweatpants':
    case 'shorts':
      return 'legwear';
    default:
      return category;
  }
};

const categoryCopy: Record<
  string,
  { title: string; description: string }
> = {
  bundle: {
    title: 'Bundle Deals',
    description:
      'Complete sets and bundle offers — curated for comfort, value, and effortless matching.',
  },
  outerwear: {
    title: 'Jackets & Hoodies',
    description:
      'Explore our outerwear collection — built for everyday wear, premium comfort, and a confident look.',
  },
  shirts: {
    title: "Men’s Shirts",
    description:
      'Discover our collection of tees and sweatshirts, designed with care and attention to detail.',
  },
  legwear: {
    title: 'Legwear',
    description:
      'Sweatpants and shorts designed for movement, comfort, and clean everyday style.',
  },
  caps: {
    title: 'Caps',
    description:
      'Finish the fit with our caps — bold branding, easy styling, and all-day wear.',
  },
  branding: {
    title: 'Branding',
    description:
      'Explore ADIN brand assets and identity pieces used across our products and packaging.',
  },
};

export default function ShopContent() {
  const searchParams = useSearchParams();
  const {
    selectedCategory,
    priceRange,
    sortBy,
    setCategory,
  } = useFilters();
  const lastCategoryParamRef = useRef<string | null>(null);

  // Set category from URL if provided
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const nextCategory = normalizeShopCategory(categoryParam);
    if (categoryParam !== lastCategoryParamRef.current) {
      lastCategoryParamRef.current = categoryParam;
      if (nextCategory) setCategory(nextCategory);
    }
  }, [searchParams, setCategory]);

  // Filter products
  let filteredProducts = products;

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === selectedCategory
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

  const header = categoryCopy[selectedCategory ?? ''] ?? {
    title: 'Shop',
    description: 'Browse the latest drops and essentials from ADIN.',
  };

  return (
    <div className="min-h-screen">
      {/* Category Navigation */}
      <CategoryNav />

      <div className="mx-auto w-full px-3 sm:px-4 lg:px-6 2xl:px-8 py-10">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{header.title}</h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
            {header.description}
          </p>
          <p className="text-muted-foreground text-sm md:text-base mt-4">
            {filteredProducts.length} products found
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,340px)_minmax(0,1fr)] items-start gap-6">
          {/* Sidebar Filters */}
          <div className="hidden lg:block">
            <div className="sticky top-20 max-h-[calc(100vh-80px)] overflow-y-auto">
              <Filters />
            </div>
          </div>

          {/* Products Grid */}
          <div className="min-w-0">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>

      {/* Mobile Filters (floating overlay) */}
      <div className="lg:hidden">
        <Drawer direction="bottom">
          <DrawerTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="fixed bottom-4 right-4 z-40 shadow-lg bg-background/80 backdrop-blur"
            >
              <SlidersHorizontal />
              Filters
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[80vh] overflow-hidden bg-background/80 backdrop-blur-lg">
            <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-border">
              <div className="font-semibold">Filters</div>
              <DrawerClose asChild>
                <Button type="button" variant="ghost" size="icon">
                  <X />
                  <span className="sr-only">Close</span>
                </Button>
              </DrawerClose>
            </div>
            <div className="p-4 overflow-y-auto">
              <Filters />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
