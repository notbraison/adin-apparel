'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export function Header() {
  const { getItemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const itemCount = getItemCount();
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header
      className={
        isHome
          ? 'fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-white/5 backdrop-blur-md text-white'
          : 'sticky top-0 z-40 bg-background border-b border-border'
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className={isHome ? 'text-2xl font-bold text-white' : 'text-2xl font-bold text-primary'}>
              AdinApparel
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className={isHome ? 'text-white/90 hover:text-white transition' : 'text-foreground hover:text-primary transition'}>
              Home
            </Link>
            <Link
              href="/shop"
              className={
                isHome
                  ? 'text-white font-semibold hover:text-white/90 transition'
                  : 'text-foreground hover:text-primary transition'
              }
            >
              Shop
            </Link>
            <Link href="/about" className={isHome ? 'text-white/90 hover:text-white transition' : 'text-foreground hover:text-primary transition'}>
              About
            </Link>
          </nav>

          {/* Cart Button */}
          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className={
                isHome
                  ? 'relative p-2 text-white hover:text-white/90 transition'
                  : 'relative p-2 text-foreground hover:text-primary transition'
              }
            >
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={
                isHome
                  ? 'md:hidden p-2 text-white hover:text-white/90 transition'
                  : 'md:hidden p-2 text-foreground hover:text-primary transition'
              }
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className={isHome ? 'md:hidden pb-4 border-t border-white/10 pt-4' : 'md:hidden pb-4 border-t border-border pt-4'}>
            <Link
              href="/"
              className={isHome ? 'block py-2 text-white/90 hover:text-white transition' : 'block py-2 text-foreground hover:text-primary transition'}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className={isHome ? 'block py-2 text-white hover:text-white/90 transition font-semibold' : 'block py-2 text-foreground hover:text-primary transition'}
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className={isHome ? 'block py-2 text-white/90 hover:text-white transition' : 'block py-2 text-foreground hover:text-primary transition'}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
