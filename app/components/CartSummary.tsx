'use client';

import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { formatKsh } from '@/lib/currency';

export function CartSummary() {
  const { getTotal, getItemCount } = useCart();
  const total = getTotal();
  const itemCount = getItemCount();
  const tax = Math.round(total * 0.08 * 100) / 100;
  const shipping = total > 100 ? 0 : 10;
  const finalTotal = total + tax + shipping;

  return (
    <div className="bg-muted rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold">Order Summary</h3>

      <div className="space-y-2 border-b border-border pb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
          <span className="text-foreground font-medium">{formatKsh(total)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax (8%)</span>
          <span className="text-foreground font-medium">{formatKsh(tax)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-foreground font-medium">
            {shipping === 0 ? (
              <span className="text-secondary">FREE</span>
            ) : (
              formatKsh(shipping)
            )}
          </span>
        </div>
      </div>

      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span className="text-primary">{formatKsh(finalTotal)}</span>
      </div>

      {total === 0 ? (
        <Link
          href="/shop"
          className="w-full block text-center py-3 bg-primary text-primary-foreground rounded font-medium hover:opacity-90 transition"
        >
          Continue Shopping
        </Link>
      ) : (
        <>
          <Link
            href="/checkout"
            className="w-full block text-center py-3 bg-primary text-primary-foreground rounded font-medium hover:opacity-90 transition"
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/shop"
            className="w-full block text-center py-3 border border-border text-foreground rounded font-medium hover:bg-muted transition"
          >
            Continue Shopping
          </Link>
        </>
      )}

      {shipping === 0 && (
        <p className="text-xs text-secondary text-center">
          You qualify for FREE shipping!
        </p>
      )}
    </div>
  );
}
