'use client';

import { Product } from '@/lib/products';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {
  const gridClassName =
    'grid gap-4 lg:gap-5 grid-cols-[repeat(auto-fit,minmax(190px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] 2xl:grid-cols-[repeat(auto-fit,minmax(240px,1fr))]';

  if (isLoading) {
    return (
      <div className={gridClassName}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square bg-muted rounded mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-6 bg-muted rounded w-1/3 mt-4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No products found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className={gridClassName}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
