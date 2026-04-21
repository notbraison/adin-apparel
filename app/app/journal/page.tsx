'use client';

import Link from 'next/link';
import { journalPosts } from '@/lib/journal';

export default function JournalIndexPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-start justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">The Journal</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Stories, product notes, and updates from AdinApparel.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {journalPosts.map((post) => (
            <div key={post.slug} className="group">
              <Link
                href={`/journal/${post.slug}`}
                className="block aspect-[4/3] overflow-hidden bg-muted"
                aria-label={post.title}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              <div className="pt-5">
                <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                  {post.category}
                </p>
                <h2 className="mt-2 text-sm font-semibold leading-snug">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

