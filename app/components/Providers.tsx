'use client';

import { CartProvider } from '@/contexts/CartContext';
import { FilterProvider } from '@/contexts/FilterContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <FilterProvider>{children}</FilterProvider>
    </CartProvider>
  );
}
