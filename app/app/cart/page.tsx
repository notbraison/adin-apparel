'use client';

import { useCart } from '@/contexts/CartContext';
import { CartSummary } from '@/components/CartSummary';
import { QuantityPicker } from '@/components/QuantityPicker';
import { Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { formatKsh } from '@/lib/currency';

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-12">Shopping Cart</h1>

          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-2xl font-semibold mb-6">Your cart is empty</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded font-semibold hover:opacity-90 transition"
            >
              <ArrowLeft size={20} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 pb-4 border-b border-border"
                >
                  {/* Product Image */}
                  <div className="relative w-24 h-24 bg-muted rounded overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.id}`}
                      className="text-lg font-semibold hover:text-primary transition block truncate"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                    <p className="text-lg font-bold text-primary mt-2">
                      {formatKsh(item.price)}
                    </p>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id, item.size)}
                      className="p-2 text-muted-foreground hover:text-red-600 transition"
                      aria-label="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>

                    <div className="flex flex-col items-end gap-2">
                      <QuantityPicker
                        quantity={item.quantity}
                        onQuantityChange={(q) =>
                          updateQuantity(item.id, item.size, q)
                        }
                        max={10}
                      />
                      <p className="text-sm font-medium">
                        {formatKsh(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all font-semibold mt-8"
            >
              <ArrowLeft size={20} />
              Continue Shopping
            </Link>
          </div>

          {/* Cart Summary */}
          <div>
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
