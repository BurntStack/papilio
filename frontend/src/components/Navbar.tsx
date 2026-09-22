import React, { useState, useEffect } from 'react';
import { PapilioLogo } from './PapilioLogo';
import { ShoppingBag, Calendar, Menu as MenuIcon, X, Phone } from 'lucide-react';
import { CAFE_INFO } from '../data/papilioData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'MENU', href: '#menu' },
    { label: 'EXPERIENCE', href: '#meals' },
    { label: 'REVIEWS', href: '#reviews' },
    { label: 'OUR STORY', href: '#story' },
    { label: 'VISIT US', href: '#location' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-3 sm:px-6 lg:px-10 py-3 sm:py-4 ${
          isScrolled
            ? 'bg-[#FAF6F0]/90 backdrop-blur-md shadow-[0_4px_24px_rgba(44,35,30,0.06)] border-b border-[#EAE1D5]/80'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-7 text-[13px] tracking-[0.18em] font-medium text-[#4A3E38]">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, '#home')}
              className="hover:text-[#7E5259] transition-colors relative group py-1"
            >
              HOME
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#7E5259] transition-all duration-200 group-hover:w-full" />
            </a>
            <a
              href="#meals"
              onClick={(e) => scrollToSection(e, '#meals')}
              className="hover:text-[#7E5259] transition-colors relative group py-1"
            >
              EXPERIENCE
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#7E5259] transition-all duration-200 group-hover:w-full" />
            </a>
            <a
              href="#menu"
              onClick={(e) => scrollToSection(e, '#menu')}
              className="hover:text-[#7E5259] transition-colors relative group py-1"
            >
              FULL MENU
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#7E5259] transition-all duration-200 group-hover:w-full" />
            </a>
            <a
              href="#reviews"
              onClick={(e) => scrollToSection(e, '#reviews')}
              className="hover:text-[#7E5259] transition-colors relative group py-1"
            >
              REVIEWS
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#7E5259] transition-all duration-200 group-hover:w-full" />
            </a>
            <a
              href="#story"
              onClick={(e) => scrollToSection(e, '#story')}
              className="hover:text-[#7E5259] transition-colors relative group py-1"
            >
              OUR STORY
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#7E5259] transition-all duration-200 group-hover:w-full" />
            </a>
          </nav>

          {/* Center Brand Identity (Logo & Name) */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center space-x-2 sm:space-x-3 group min-w-0"
            id="nav-brand-logo"
          >
            <PapilioLogo size={35} variant="cutout" glow className="shrink-0 transition-transform duration-300" />
            <div className="flex flex-col truncate">
              <span
                className="font-serif text-lg sm:text-2xl lg:text-[26px] tracking-[0.16em] sm:tracking-[0.22em] text-[#2C231E] font-semibold uppercase leading-none truncate"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {CAFE_INFO.name}
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.22em] sm:tracking-[0.28em] text-[#9E8E84] uppercase mt-0.5 font-sans truncate">
                CAFE & PATISSERIE
              </span>
            </div>
          </a>

          {/* Right Navigation & CTAs */}
          <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
            {/* Direct Phone Link */}
            <a
              href={`tel:${CAFE_INFO.phone}`}
              className="hidden md:flex items-center space-x-1.5 text-xs text-[#5A4D46] hover:text-[#7E5259] px-2.5 py-1.5 rounded-full border border-[#EAE1D5] hover:border-[#7E5259]/40 transition-colors"
              title="Call Papilio"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="font-medium">{CAFE_INFO.phone}</span>
            </a>

            {/* Book a Table Button */}
            <button
              onClick={onOpenReservation}
              id="nav-reserve-btn"
              className="hidden sm:inline-flex items-center space-x-2 text-xs font-semibold tracking-[0.12em] uppercase px-4 py-2.5 rounded-full bg-[#7E5259] text-[#FAF6F0] hover:bg-[#673E45] shadow-[0_2px_10px_rgba(126,82,89,0.25)] transition-all transform active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 text-[#EAD8CB]" />
              <span>BOOK A TABLE</span>
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              id="nav-cart-btn"
              className="relative flex items-center space-x-1.5 sm:space-x-2 text-xs font-medium tracking-[0.14em] uppercase px-2.5 py-2 sm:px-3.5 sm:py-2.5 rounded-full bg-white border border-[#E0D5C7] text-[#2C231E] hover:border-[#7E5259] hover:text-[#7E5259] shadow-sm transition-all"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4 text-[#7E5259]" />
              <span className="hidden xs:inline">CART</span>
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#7E5259] text-white text-[10px] font-bold">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-[#2C231E] hover:bg-[#F2EAE0] transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-5 rounded-2xl bg-[#FAF6F0] border border-[#EAE1D5] shadow-xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="px-3 py-2.5 rounded-lg text-xs tracking-wider font-medium text-[#4A3E38] hover:bg-[#F4ECE0] hover:text-[#7E5259] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-[#EAE1D5] flex flex-col space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full flex items-center justify-center space-x-2 text-xs font-semibold tracking-wider uppercase py-3 rounded-xl bg-[#7E5259] text-[#FAF6F0]"
              >
                <Calendar className="w-4 h-4 text-[#EAD8CB]" />
                <span>RESERVE A TABLE</span>
              </button>
              <a
                href={`tel:${CAFE_INFO.phone}`}
                className="w-full flex items-center justify-center space-x-2 text-xs font-medium py-2.5 rounded-xl border border-[#EAE1D5] text-[#5A4D46]"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Call {CAFE_INFO.phone}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
