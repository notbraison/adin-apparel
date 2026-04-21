'use client';
import { Suspense } from 'react';
import ShopContent from '@/components/ShopContent';

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Shop</h1>
            <p className="text-muted-foreground text-lg">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}