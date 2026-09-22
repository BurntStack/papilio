import React from 'react';
import { PapilioLogo } from './PapilioLogo';
import { CAFE_INFO } from '../data/papilioData';
import { MapPin, Phone, Clock, ArrowUp, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#201C1A] text-[#FAF6F0] pt-16 pb-10 border-t border-[#352F2B] relative overflow-hidden">
      {/* Delicate background logo watermarking */}
      <div className="absolute right-1/2 translate-x-1/2 bottom-0 opacity-10 pointer-events-none select-none">
        <PapilioLogo size={420} variant="cutout" glow={false} animated={false} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Grand Editorial Statement (From Video Screenshot 13) */}
        <div className="border-b border-[#38302B] pb-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs tracking-[0.24em] font-semibold text-[#C5A880] uppercase">
              {CAFE_INFO.established} · HANAMKONDA
            </span>
            <h2
              className="text-3xl sm:text-5xl font-serif text-[#FAF6F0] tracking-tight mt-2"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              The Art of Mindful Dining
            </h2>
            <p className="text-[#A89A91] text-xs sm:text-sm mt-1.5 italic font-serif">
              {CAFE_INFO.subTagline}
            </p>
          </div>

          <button
            onClick={onOpenReservation}
            className="px-7 py-3.5 rounded-full bg-[#7E5259] hover:bg-[#925F67] text-[#FAF6F0] text-xs font-semibold uppercase tracking-[0.16em] transition-all shadow-md self-start md:self-auto"
          >
            RESERVE A TABLE
          </button>
        </div>

        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#38302B]">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <PapilioLogo size={40} variant="cutout" glow />
              <div>
                <span
                  className="font-serif text-2xl font-bold tracking-[0.18em] text-[#FAF6F0] uppercase"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {CAFE_INFO.name}
                </span>
                <p className="text-[9px] tracking-[0.26em] text-[#A89A91] uppercase">
                  CAFE & PATISSERIE
                </p>
              </div>
            </div>

            <p className="text-xs text-[#B5A79E] leading-relaxed max-w-sm">
              A peaceful haven created for our neighbourhood. A place to pause, meet friends,
              or settle in with good coffee, artisan pizzas, and simple, fresh food.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#2E2825] border border-[#453C37] flex items-center justify-center text-[#C5A880] hover:text-white hover:border-[#7E5259] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#2E2825] border border-[#453C37] flex items-center justify-center text-[#C5A880] hover:text-white hover:border-[#7E5259] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Numbered Navigation (Inspired by Video Screenshot 13) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#C5A880] uppercase mb-4">
              QUICK NAVIGATION
            </p>
            <ul className="space-y-2.5 text-xs text-[#B5A79E]">
              <li>
                <a
                  href="#home"
                  className="hover:text-white transition-colors inline-flex items-center space-x-2"
                >
                  <span className="font-mono text-[#7E5259] text-[11px]">(01)</span>
                  <span>Home Experience</span>
                </a>
              </li>
              <li>
                <a
                  href="#meals"
                  className="hover:text-white transition-colors inline-flex items-center space-x-2"
                >
                  <span className="font-mono text-[#7E5259] text-[11px]">(02)</span>
                  <span>Curated Mealtimes</span>
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  className="hover:text-white transition-colors inline-flex items-center space-x-2"
                >
                  <span className="font-mono text-[#7E5259] text-[11px]">(03)</span>
                  <span>Full Artisan Menu</span>
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  className="hover:text-white transition-colors inline-flex items-center space-x-2"
                >
                  <span className="font-mono text-[#7E5259] text-[11px]">(04)</span>
                  <span>Guest Reviews</span>
                </a>
              </li>
              <li>
                <a
                  href="#story"
                  className="hover:text-white transition-colors inline-flex items-center space-x-2"
                >
                  <span className="font-mono text-[#7E5259] text-[11px]">(05)</span>
                  <span>Our Story & Sourcing</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#C5A880] uppercase mb-4">
              LOCATION & HOURS
            </p>
            <div className="space-y-2.5 text-xs text-[#B5A79E]">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>{CAFE_INFO.address}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>{CAFE_INFO.hours}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a
                  href={`tel:${CAFE_INFO.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {CAFE_INFO.phone}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full bg-[#2E2825] border border-[#453C37] text-[10px] tracking-wider uppercase text-[#EAD8CB]">
                Dine-in · Takeaway · Delivery
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Rights & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A7B72] gap-4">
          <p>
            © {new Date().getFullYear()} {CAFE_INFO.fullName}. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center space-x-1.5 text-xs text-[#C5A880] hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
