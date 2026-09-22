import React from 'react';
import { PapilioLogo } from './PapilioLogo';
import { Star, ArrowRight, Sparkles } from 'lucide-react';
import { CAFE_INFO } from '../data/papilioData';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenReservation,
  onExploreMenu,
}) => {
  return (
    <section
      id="home"
      className="h-screen flex flex-col justify-center relative overflow-hidden"
    >
      {/* Background warm glow */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 left-0 w-[60%] h-full bg-gradient-to-r from-[#F2E8DC]/50 to-transparent pointer-events-none -z-10"
      />

      {/* Floating Butterfly Ambient Accents */}
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -15, 0], rotate: [0, 5, -3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-32 right-[42%] hidden lg:block opacity-35 pointer-events-none"
      >
        <PapilioLogo size={38} variant="cutout" glow={false} />
      </motion.div>

      <motion.div
        animate={{ x: [0, -15, 0], y: [0, 20, 0], rotate: [0, -4, 4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-24 left-8 hidden lg:block opacity-30 pointer-events-none"
      >
        <PapilioLogo size={28} variant="cutout" glow={false} />
      </motion.div>

      {/* Full-width grid — no max-width constraint */}
      <div className="w-full h-full pt-16 grid grid-cols-1 lg:grid-cols-2">

        {/* ── Left: Text Content ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center px-4 sm:px-12 lg:px-16 xl:px-24 space-y-5 sm:space-y-6 text-center lg:text-left"
        >
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center self-center lg:self-start space-x-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#E7DDD0] text-[10px] sm:text-xs tracking-[0.22em] text-[#6E5D54] uppercase shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
            <span>{CAFE_INFO.established}</span>
            <span className="text-[#C5A880]">•</span>
            <span>HANAMKONDA</span>
          </motion.div>

          {/* Headline */}
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif text-[#2C231E] leading-[1.08] sm:leading-[1.05] tracking-tight"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Savor Every <br />
              <span className="italic font-normal text-[#C5A880] relative inline-block">
                Sweet
                <motion.svg
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="absolute -bottom-1 left-0 w-full h-2 text-[#C5A880]/50"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path d="M0 10 Q 50 20 100 5" stroke="currentColor" strokeWidth="3" />
                </motion.svg>
              </span>{' '}
              Moment
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="font-serif italic text-base sm:text-xl text-[#7E5259] font-medium tracking-wide"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {CAFE_INFO.subTagline}
            </motion.p>
          </div>

          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="text-[#5B4E47] text-sm sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 font-sans"
          >
            Experience the delicate art of French pastry, artisanal pizzas, and specialty
            coffees in an atmosphere thoughtfully crafted for slow living, meaningful
            conversations, and pure indulgence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenReservation}
              id="hero-reserve-btn"
              className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-[#7E5259] text-white text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase hover:bg-[#673E45] shadow-[0_4px_16px_rgba(126,82,89,0.28)] transition-colors flex items-center justify-center space-x-3 group"
            >
              <span>RESERVE A TABLE</span>
              <ArrowRight className="w-4 h-4 text-[#E8D6C6] group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onExploreMenu}
              id="hero-menu-btn"
              className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-white border border-[#DDD1C3] text-[#2C231E] text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase hover:border-[#7E5259] hover:text-[#7E5259] transition-all shadow-xs"
            >
              EXPLORE MENU
            </motion.button>
          </motion.div>

          {/* Mobile Visual Hero Card (Shows on mobile < lg) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="lg:hidden relative mx-auto max-w-sm w-full pt-2"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-white bg-[#FAF4EB] aspect-16/10">
              <img
                src="/assets/hero-macarons.jpg"
                alt="Papilio Handcrafted French Macarons"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#201C1A]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#EAE0D4] shadow-sm flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-[#FAF3EA] text-[#C5A880] shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-[9px] tracking-[0.18em] uppercase font-bold text-[#7E5259]">
                    TOP RATED • GOOGLE 5★
                  </p>
                  <p className="font-serif text-xs font-semibold text-[#2C231E] leading-tight truncate">
                    Signature French Macarons &amp; Truffle Pasta
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trust / Rating Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex items-center justify-center lg:justify-start space-x-6 text-xs text-[#7A6B63]"
          >
            <div className="flex items-center space-x-1.5">
              <div className="flex text-[#C5A880]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-[#2C231E]">4.9 / 5.0</span>
            </div>
            <span className="text-[#D8CDC0]">|</span>
            <span className="tracking-wide">Over 420+ Google Reviews</span>
          </motion.div>
        </motion.div>

        {/* ── Right: Full-height Arch Image ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative hidden lg:flex items-center justify-center pr-10 xl:pr-16"
        >
          {/* Floating Sanctuary Badge */}
          <motion.div
            animate={{ y: [4, -4, 4] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-0 top-[15%] z-20 flex p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#EAE0D4] shadow-xl items-center space-x-3 max-w-[210px]"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-[#EAE0D4]">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=160&q=80"
                alt="Cafe interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <p className="text-[10px] tracking-wider uppercase text-[#C5A880] font-semibold">
                SANCTUARY
              </p>
              <p className="text-xs font-serif font-medium text-[#2C231E] leading-snug">
                Calm nature-inspired haven
              </p>
            </div>
          </motion.div>

          {/* Main Arch Card */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-full h-[78vh] rounded-t-[999px] rounded-b-[2rem] overflow-hidden shadow-[0_24px_60px_rgba(44,35,30,0.15)] border-2 border-white/80 bg-[#FAF4EB] group"
          >
            <img
              src="/assets/hero-macarons.jpg"
              alt="Papilio Handcrafted French Macarons & Pastries"
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
            />

            {/* Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#201C1A]/45 via-transparent to-transparent pointer-events-none" />

            {/* Floating Top-Rated Badge */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-8 left-8 right-8 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#EAE0D4] shadow-xl flex items-center space-x-3.5"
            >
              <div className="p-2.5 rounded-xl bg-[#FAF3EA] border border-[#E8DCCB] text-[#C5A880]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#7E5259]">
                    TOP RATED
                  </span>
                  <span className="text-[10px] text-[#A39287]">• Google 5★</span>
                </div>
                <p
                  className="font-serif text-sm font-semibold text-[#2C231E] leading-tight"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  Signature French Macarons &amp; Truffle Pasta
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
