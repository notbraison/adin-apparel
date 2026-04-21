export interface JournalPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
}

export const journalPosts: JournalPost[] = [
  {
    slug: 'merch-series-coffee',
    category: 'Merch Series',
    title: 'Merch Series: Coffee Culture',
    excerpt:
      'A behind-the-scenes look at the craft, the people, and the details that make great everyday essentials.',
    image:
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1600&h=1000&fit=crop',
  },
  {
    slug: 'merch-series-street',
    category: 'Merch Series',
    title: 'Merch Series: Street Uniforms',
    excerpt:
      'How modern silhouettes and quality materials come together for a clean, wearable wardrobe.',
    image:
      'https://images.unsplash.com/photo-1520975958225-27bbf4b48ab5?w=1600&h=1000&fit=crop',
  },
  {
    slug: 'franchise-focus-collection',
    category: 'Franchise Focus',
    title: 'Franchise Focus: Capsule Collection',
    excerpt:
      'From concept to fit—what it takes to build a capsule that works across seasons and settings.',
    image:
      'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=1600&h=1000&fit=crop',
  },
  {
    slug: 'events-community-2026',
    category: 'Community',
    title: 'Community: Pop-ups & Events 2026',
    excerpt:
      'A quick roundup of what we’re planning this year—collabs, pop-ups, and new releases.',
    image:
      'https://images.unsplash.com/photo-1520975682071-7a0856a1d464?w=1600&h=1000&fit=crop',
  },
];

