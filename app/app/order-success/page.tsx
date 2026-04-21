import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function OrderSuccessPage() {
  const orderNumber = Math.random().toString(36).substring(2, 15).toUpperCase().substring(0, 8);
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-green-200 rounded-full animate-pulse" />
              <CheckCircle
                size={80}
                className="relative text-green-600 fill-green-600"
              />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Order Confirmed!
          </h1>
          <p className="text-lg text-muted-foreground mb-8 text-balance">
            Thank you for your purchase. Your order has been successfully placed and we&apos;re preparing it for shipment.
          </p>

          {/* Order Details */}
          <div className="bg-muted rounded-lg p-8 mb-12 space-y-4">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                <p className="text-2xl font-bold text-primary">{orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                <p className="text-2xl font-bold text-foreground">{today}</p>
              </div>
            </div>
            <div className="border-t border-border pt-4 text-left">
              <p className="text-sm text-muted-foreground mb-2">What&apos;s Next?</p>
              <ul className="space-y-2 text-left">
                <li className="flex gap-2 text-sm">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Order confirmation email has been sent to your inbox</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Your items will be shipped within 1-2 business days</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>You&apos;ll receive a tracking number via email</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Policy Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">30 Days</p>
              <p className="text-sm text-muted-foreground">Hassle-free returns</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">100%</p>
              <p className="text-sm text-muted-foreground">Quality guaranteed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">24/7</p>
              <p className="text-sm text-muted-foreground">Customer support</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded font-semibold hover:opacity-90 transition"
            >
              Continue Shopping
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-border text-foreground rounded font-semibold hover:bg-muted transition"
            >
              Back to Home
            </Link>
          </div>

          {/* Contact */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Questions? Contact us at{' '}
              <a href="mailto:support@adinapparel.com" className="text-primary hover:underline">
                support@adinapparel.com
              </a>{' '}
              or call{' '}
              <a href="tel:+254700000000" className="text-primary hover:underline">
                +254 700 000 000
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
