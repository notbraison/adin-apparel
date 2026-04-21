'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About AdinApparel</h1>
        <p className="text-muted-foreground text-lg mb-10">
          AdinApparel is built around everyday essentials that look sharp, feel premium, and last.
          We focus on clean design, quality materials, and a shopping experience that stays simple.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-lg border border-border p-6 bg-background">
            <h2 className="text-lg font-semibold mb-2">Quality First</h2>
            <p className="text-sm text-muted-foreground">
              Durable fabrics, consistent sizing, and details that hold up.
            </p>
          </div>
          <div className="rounded-lg border border-border p-6 bg-background">
            <h2 className="text-lg font-semibold mb-2">Modern Essentials</h2>
            <p className="text-sm text-muted-foreground">
              Minimal silhouettes you can dress up or down—no loud branding.
            </p>
          </div>
          <div className="rounded-lg border border-border p-6 bg-background">
            <h2 className="text-lg font-semibold mb-2">Customer Care</h2>
            <p className="text-sm text-muted-foreground">
              Fast support, easy returns, and transparent pricing.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-6 py-3 rounded bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
          >
            Shop Now
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded border border-border font-semibold hover:bg-muted transition"
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}

