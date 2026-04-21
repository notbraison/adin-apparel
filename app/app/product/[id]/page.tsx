'use client';

import { products } from '@/lib/products';
import { useCart } from '@/contexts/CartContext';
import { SizeSelector } from '@/components/SizeSelector';
import { QuantityPicker } from '@/components/QuantityPicker';
import { ProductGrid } from '@/components/ProductGrid';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { formatKsh } from '@/lib/currency';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = products.find((p) => p.id === productId);
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/shop" className="text-primary hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
    });

    // Reset form and show success message
    setQuantity(1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-border">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" className="text-primary hover:underline">
            Home
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/shop" className="text-primary hover:underline">
            Shop
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-muted rounded-lg overflow-hidden aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.floor(product.rating)
                          ? 'fill-secondary text-secondary'
                          : 'text-muted'
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Price */}
            <div className="border-t border-b border-border py-6">
              <div className="text-4xl font-bold text-primary mb-2">
                {formatKsh(product.price)}
              </div>
              {product.inStock ? (
                <span className="text-green-600 font-semibold">In Stock</span>
              ) : (
                <span className="text-red-600 font-semibold">Out of Stock</span>
              )}
            </div>

            {/* Size Selector */}
            <SizeSelector
              availableSizes={product.sizes}
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
            />

            {/* Quantity */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Quantity</label>
              <QuantityPicker
                quantity={quantity}
                onQuantityChange={setQuantity}
                max={10}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-border">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded font-semibold transition ${
                  isAdded
                    ? 'bg-green-600 text-white'
                    : 'bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50'
                }`}
              >
                <ShoppingCart size={20} />
                {isAdded ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className={`p-3 border rounded transition ${
                  isFavorited
                    ? 'bg-red-50 border-red-300'
                    : 'border-border hover:border-primary'
                }`}
              >
                <Heart
                  size={20}
                  className={isFavorited ? 'fill-red-500 text-red-500' : ''}
                />
              </button>
            </div>

            {/* Shipping Info */}
            <div className="bg-muted p-4 rounded space-y-2 text-sm">
              <p className="font-semibold">Shipping & Returns</p>
              <p className="text-muted-foreground">
                Free shipping on orders over {formatKsh(100)}. Easy 30-day returns on all items.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-border pt-16">
            <h2 className="text-3xl font-bold mb-8">Related Products</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
