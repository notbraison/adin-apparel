'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';

type SlideTone = 'light' | 'dark';
type SlideAlign = 'left' | 'right' | 'center';

type Slide = {
  key: string;
  image: string;
  imageClassName?: string;
  heading: string;
  subtext: string;
  tone: SlideTone;
  align: SlideAlign;
  cta?: { label: string; href: string };
  corner?: { image: string; alt: string };
};

export default function Home() {
  const slides = useMemo<Slide[]>(
    () => [
      {
        key: 'hero',
        image: '/productimg/Walk With Confidence.JPG',
        imageClassName: 'object-[center_55%] lg:object-[center_78%]',
        heading: 'Walk With Confidence',
        subtext: 'ADIN Apparel — Est. 2023',
        tone: 'light',
        align: 'center',
        cta: { label: 'Shop Now', href: '/shop' },
      },
      {
        key: 'lifestyle',
        image: '/productimg/moviescene2.JPG',
        imageClassName: 'object-[center_55%] lg:object-[center_72%]',
        heading: 'Everyday Essentials',
        subtext: 'Designed for the journey',
        tone: 'light',
        align: 'left',
        cta: { label: 'Explore', href: '/shop' },
      },
      {
        key: 'categories',
        image: '/productimg/logo.jpeg',
        heading: 'Shop by Category',
        subtext: 'Choose your lane',
        tone: 'light',
        align: 'center',
      },
      {
        key: 'hoodies',
        image: '/productimg/grayHoodie.jpeg',
        heading: 'Premium Comfort',
        subtext: 'Signature hoodie collection',
        tone: 'dark',
        align: 'right',
        cta: { label: 'Shop Hoodies', href: '/shop' },
      },
      {
        key: 'sets',
        image: '/productimg/matching sweatpants.jpeg',
        heading: 'Complete Sets',
        subtext: 'Coordinated comfort',
        tone: 'light',
        align: 'left',
        cta: { label: 'Shop Sets', href: '/shop' },
      },
      {
        key: 'color',
        image: '/productimg/navy blue set.jpeg',
        heading: 'Find Your Color',
        subtext: 'Multiple styles available',
        tone: 'light',
        align: 'right',
      },
      {
        key: 'studio',
        image: '/productimg/Studio portrait.JPG',
        imageClassName: 'object-[center_35%] lg:object-[center_40%]',
        heading: 'Varsity Collection',
        subtext: 'Classic meets modern',
        tone: 'dark',
        align: 'right',
        cta: { label: 'Shop Jackets', href: '/shop?category=jackets' },
      },
      {
        key: 'branding',
        image: '/productimg/logo.jpeg',
        heading: 'Custom Branding',
        subtext: 'Make it yours',
        tone: 'light',
        align: 'left',
        cta: { label: 'Learn More', href: '/about' },
      },
      {
        key: 'final',
        image: '/productimg/ADIN KENYA est 2023.jpeg',
        heading: 'Shop the Collection',
        subtext: '@ADIN_APPARELS',
        tone: 'light',
        align: 'center',
        cta: { label: 'Explore Now', href: '/shop' },
        corner: { image: '/productimg/Instagram QR.JPG', alt: 'Instagram QR code' },
      },
    ],
    []
  );

  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0); // real slide index (0..slides.length-1)

  const renderedSlides = useMemo(
    () => [
      { ...slides[slides.length - 1], _isClone: true, _realIndex: slides.length - 1 },
      ...slides.map((s, i) => ({ ...s, _isClone: false, _realIndex: i })),
      { ...slides[0], _isClone: true, _realIndex: 0 },
    ],
    [slides]
  );

  const scrollToRenderedIndex = (renderedIndex: number, behavior: ScrollBehavior) => {
    const container = containerRef.current;
    const target = slideRefs.current[renderedIndex];
    if (!container || !target) return;
    const top = (target as HTMLElement).offsetTop;
    container.scrollTo({ top, behavior });
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      e.preventDefault();
      const nextIndex =
        e.key === 'ArrowDown'
          ? activeIndex === slides.length - 1
            ? 0
            : activeIndex + 1
          : activeIndex === 0
          ? slides.length - 1
          : activeIndex - 1;
      scrollToRenderedIndex(nextIndex + 1, 'smooth');
    };
    window.addEventListener('keydown', onKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', onKeyDown as any);
  }, [activeIndex, slides.length]);

  useEffect(() => {
    // Start on the first real slide (rendered index 1) so the loop feels continuous.
    scrollToRenderedIndex(1, 'auto');
  }, [slides.length]);

  useEffect(() => {
  const nodes = slideRefs.current.filter(Boolean) as HTMLElement[];
  if (nodes.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.find((e) => e.isIntersecting);
      if (!visible) return;

      const renderedIndex = nodes.indexOf(visible.target as HTMLElement);
      const slideData = renderedSlides[renderedIndex] as any;
      
      setActiveIndex(slideData._realIndex);

      // THE MAGIC JUMP
      if (slideData._isClone) {
        // We use a tiny timeout or requestAnimationFrame to ensure 
        // the "smooth" scroll has finished before we "teleport"
        setTimeout(() => {
          if (renderedIndex === 0) {
            // Jump from top clone to the actual last slide
            scrollToRenderedIndex(slides.length, 'auto');
          } else if (renderedIndex === renderedSlides.length - 1) {
            // Jump from bottom clone to the actual first slide
            scrollToRenderedIndex(1, 'auto');
          }
        }, 50); // Small delay prevents the 'stutter'
      }
    },
    { 
      threshold: 0.5, // Fire when half the slide is visible
      root: containerRef.current 
    }
  );

  nodes.forEach((n) => observer.observe(n));
  return () => observer.disconnect();
}, [renderedSlides, slides.length]);

  return (
    <div className="h-[100svh] overflow-x-hidden">
      <div
        ref={containerRef}
        className="h-[100svh] overflow-y-scroll snap-y snap-mandatory "
      >
        {renderedSlides.map((slide: any, index: number) => {
          const isDarkText = slide.tone === 'dark';
          const align =
            slide.align === 'left'
              ? 'items-start text-left'
              : slide.align === 'right'
              ? 'items-end text-right'
              : 'items-center text-center';

          return (
            <section
              key={slide.key}
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
              className="relative h-[100svh] snap-start snap-always overflow-hidden"
              aria-label={slide.heading}
            >
              <img
                src={slide.image}
                alt={slide.heading}
                className={`absolute inset-0 h-full w-full object-cover ${slide.imageClassName ?? ''}`}
                loading={index < 3 ? 'eager' : 'lazy'}
              />

              <div className="absolute inset-0 bg-black/35" />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-black/60 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/45 to-transparent" />
              </div>

              <div className="relative z-10 h-full w-full">
                <div className="h-full max-w-7xl mx-auto px-6 sm:px-10 flex">
                  <div
                    className={`w-full flex flex-col justify-center gap-5 ${align}`}
                  >
                    <div className="max-w-2xl">
                      <h1
                        className={`font-bold tracking-tight ${
                          isDarkText ? 'text-black' : 'text-white'
                        } text-[clamp(2.25rem,6vw,4.75rem)]`}
                      >
                        {slide.heading}
                      </h1>
                      <p
                        className={`mt-3 text-[clamp(1rem,2vw,1.25rem)] uppercase tracking-[0.12em] ${
                          isDarkText ? 'text-black/80' : 'text-white/85'
                        }`}
                      >
                        {slide.subtext}
                      </p>
                    </div>

                    {slide.key === 'categories' && (
                      <div className="w-full max-w-5xl mt-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            {
                              name: 'Hoodies',
                              count: '6 items',
                              image: '/productimg/grayHoodie.jpeg',
                              href: '/shop',
                            },
                            {
                              name: 'Sweatpants',
                              count: '8 items',
                              image: '/productimg/matching sweatpants.jpeg',
                              href: '/shop?category=sweatpants',
                            },
                            {
                              name: 'Jackets',
                              count: '4 items',
                              image: '/productimg/Studio portrait.JPG',
                              href: '/shop?category=jackets',
                            },
                            {
                              name: 'Sets',
                              count: '5 items',
                              image: '/productimg/burgundy set.jpeg',
                              href: '/shop',
                            },
                          ].map((c) => (
                            <Link
                              key={c.name}
                              href={c.href}
                              className="group relative aspect-[4/5] overflow-hidden rounded-lg border border-white/15 bg-black/30"
                            >
                              <img
                                src={c.image}
                                alt={c.name}
                                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                              <div className="absolute inset-x-0 bottom-0 p-4">
                                <p className="text-sm font-semibold text-white">
                                  {c.name}
                                </p>
                                <p className="text-xs text-white/80">
                                  {c.count}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {slide.cta && (
                      <div className="pt-2">
                        <Link
                          href={slide.cta.href}
                          className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
                            isDarkText
                              ? 'bg-black text-white hover:bg-black/90'
                              : 'bg-white text-black hover:bg-white/90'
                          }`}
                        >
                          {slide.cta.label}
                          <ArrowRight size={18} />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {slide.corner && (
                  <div className="absolute bottom-6 right-6 z-20 hidden sm:block">
                    <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3">
                      <img
                        src={slide.corner.image}
                        alt={slide.corner.alt}
                        className="h-28 w-28 object-contain"
                        loading="lazy"
                      />
                      <p className="text-xs text-white/80 mt-2 text-center">
                        Scan for Instagram
                      </p>
                    </div>
                  </div>
                )}

                {index === 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      scrollToRenderedIndex(2, 'smooth')
                    }
                    className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/90 hover:text-white transition"
                    aria-label="Scroll to next slide"
                  >
                    <span className="text-xs uppercase tracking-[0.22em]">
                      Scroll
                    </span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/10 backdrop-blur-sm animate-bounce">
                      <ArrowDown size={18} />
                    </span>
                  </button>
                )}

                <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-2">
                  {slides.map((_, dotIndex) => (
                    <button
                      key={dotIndex}
                      type="button"
                      onClick={() =>
                        scrollToRenderedIndex(dotIndex + 1, 'smooth')
                      }
                      aria-label={`Go to slide ${dotIndex + 1}`}
                      className={`h-2.5 w-2.5 rounded-full transition ${
                        dotIndex === activeIndex
                          ? 'bg-white'
                          : 'bg-white/35 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
