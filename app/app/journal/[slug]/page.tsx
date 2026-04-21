'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { journalPosts } from '@/lib/journal';
import { ArrowLeft } from 'lucide-react';

export default function JournalPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = journalPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <Link href="/journal" className="text-primary hover:underline">
            Back to The Journal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all font-semibold mb-8"
        >
          <ArrowLeft size={18} />
          Back to The Journal
        </Link>

        <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
          {post.category}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mt-2">{post.title}</h1>
        <p className="text-muted-foreground mt-4">{post.excerpt}</p>

        <div className="mt-10 aspect-[16/9] bg-muted overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none mt-10">
          <p>
            This is a placeholder article layout for now. When you’re ready, we can replace this
            with real content, a CMS, or markdown files.
          </p>
          <p>
            For a frontend-only store, keeping these posts in a single file makes it easy to
            iterate fast.
          </p>
        </div>
      </div>
    </div>
  );
}

