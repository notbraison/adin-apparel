'use client';

import Link from 'next/link';
import { ArrowRight, Facebook, Instagram, Music2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide uppercase">Company</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Showroom Locations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Social Responsibility
                </a>
              </li>
            </ul>

            <div className="pt-4 text-sm text-white/80 space-y-1">
              <a href="tel:+254700000000" className="block hover:text-white transition">
                +254 700 000 000
              </a>
              <a href="mailto:support@adinapparel.com" className="block hover:text-white transition">
                support@adinapparel.com
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide uppercase">Customer Service</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href="#" className="hover:text-white transition">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Returns
                </a>
              </li>
              <li>
                <Link href="/journal" className="hover:text-white transition">
                  The Journal
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms / Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Gift Vouchers
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide uppercase">Wholesale Resources</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href="#" className="hover:text-white transition">
                  Fabric Range
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Colour Range
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Downloads & Assets
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Printers & Embroiderers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Invoices & Payments
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide uppercase">Stay Connected</h3>
            <div className="flex items-center gap-4 text-white">
              <a href="#" aria-label="Instagram" className="hover:text-white/80 transition">
                <Instagram size={18} />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-white/80 transition">
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="TikTok" className="hover:text-white/80 transition">
                <Music2 size={18} />
              </a>
            </div>

            <p className="text-sm text-white/80 max-w-sm">
              Be one of the first to receive new product launches, sale offers, collabs & more.
            </p>

            <form
              className="relative max-w-sm"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-transparent border border-white/35 rounded-full px-4 py-2.5 pr-12 text-sm placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                required
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white text-black flex items-center justify-center hover:opacity-90 transition"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 mt-12 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-white/70">
          <p>&copy; 2026 AdinApparel. All rights reserved.</p>
          <div className="flex items-center justify-between w-full md:w-auto gap-6">
            <div className="text-white/70">Kenya | KES</div>
            <div className="flex items-center gap-2">
              {['VISA', 'MC', 'AMEX', 'PayPal', 'M-Pesa'].map((label) => (
                <span
                  key={label}
                  className="px-2 py-1 rounded border border-white/20 text-[10px] tracking-wide"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
