import React from 'react';
import { CAFE_INFO } from '../data/papilioData';
import { PapilioLogo } from './PapilioLogo';
import { MapPin, Phone, Clock, Navigation, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const StoryAndLocationSection: React.FC = () => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Papilio Cafe, Waddepally, Excise Colony, Hanamkonda, Telangana 506001'
  )}`;

  return (
    <section id="story" className="py-20 sm:py-28 bg-white relative overflow-hidden border-t border-[#EAE1D5]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        {/* Top Story Block: "What Papilio is? A Calm Space Inspired by Nature" matching screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Overlapping Photos with Butterfly Medallion */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-[480px] lg:max-w-none pb-10 sm:pb-16 pr-6 sm:pr-12">
              {/* Back Card (Warm Dining Space with Ambient Seating) */}
              <div className="relative w-[76%] sm:w-[72%] aspect-[4/5] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl z-10 bg-[#F0EAE1]">
                <img
                  src="/assets/what-papilio-2.jpg"
                  alt="Papilio Cafe Dining Space"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Front Card (Handcrafted Counter, Arched Chandeliers & Potted Palm) - Overlapping bottom-right */}
              <div className="absolute right-0 bottom-0 w-[68%] sm:w-[65%] aspect-[4/5] z-20">
                <div className="w-full h-full rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl bg-[#F0EAE1] border-4 border-white">
                  <img
                    src="/assets/what-papilio-1.jpg"
                    alt="Papilio Handcrafted Counter & Bar"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Circular Butterfly Logo Medallion perfectly centered on the overlapping left border */}
                <div className="absolute top-[32%] left-0 -translate-x-1/2 -translate-y-1/2 z-30 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-[#FAF5EE] border-3 sm:border-4 border-white shadow-[0_10px_25px_rgba(0,0,0,0.18)] flex items-center justify-center p-2 sm:p-3 hover:scale-105 transition-transform duration-300">
                  <PapilioLogo size={34} variant="cutout" animated={false} glow={false} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Story Narrative from Screenshot */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <div>
              <h2
                className="text-4xl sm:text-5xl lg:text-[54px] font-serif font-bold text-[#2C231E] leading-[1.1] tracking-tight"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                What Papilio is?
              </h2>
              <p
                className="text-2xl sm:text-3xl font-serif italic text-[#4A3B32] mt-3"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                A Calm Space Inspired by Nature.
              </p>
            </div>

            <div className="space-y-4 text-[#5A4D45] text-sm sm:text-base leading-relaxed font-sans">
              <p>
                Papilio is a calm, welcoming space created for our neighbourhood. A place to pause, meet friends,
                or settle in with good coffee and simple, fresh food.
              </p>
              <p>
                We focus on quality ingredients, warm design, and small, thoughtful choices that reduce waste.
                Nothing loud or hurried—just a space that feels good to return to.
              </p>
            </div>

            <div className="pt-2">
              <a
                href="#visit"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#7E5259] hover:bg-[#683F46] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-md hover:shadow-lg transition-all group"
              >
                <span>OUR STORY</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Location & Visiting Details Block */}
        <motion.div
          id="visit"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl bg-[#FAF6F0] border border-[#E7DDD0] p-6 sm:p-12 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Address & Timings */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-[11px] font-bold tracking-[0.24em] text-[#C5A880] uppercase">
                  VISIT US IN PERSON
                </span>
                <h3
                  className="text-2xl sm:text-3xl font-serif font-bold text-[#2C231E] mt-1"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  Finding Papilio in Hanamkonda
                </h3>
                <p className="text-xs sm:text-sm text-[#706057] mt-1">
                  Located near the historic Kakatiya musical garden and Waddepally hub.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#4E413A]">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#7E5259] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#2C231E]">Address:</p>
                    <p className="text-[#695B53]">{CAFE_INFO.address}</p>
                    <p className="text-[#8A7B72] text-xs mt-0.5">Plus Code: {CAFE_INFO.plusCode}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#2C231E]">Opening Hours:</p>
                    <p className="text-[#695B53]">{CAFE_INFO.hours}</p>
                    <p className="text-[#8A7B72] text-xs mt-0.5">Kitchen orders pause 30 mins before closing</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-[#7E5259] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#2C231E]">Reservations & Inquiries:</p>
                    <a
                      href={`tel:${CAFE_INFO.phone}`}
                      className="text-[#7E5259] hover:underline font-medium"
                    >
                      {CAFE_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-[#7E5259] hover:bg-[#673E45] text-white text-xs font-semibold tracking-wider uppercase shadow-sm transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>GET DIRECTIONS ON GOOGLE MAPS</span>
                </motion.a>
              </div>
            </div>

            {/* Interactive Visual Map Card */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-[#E0D5C7] aspect-16/10 sm:aspect-16/9 bg-[#F3ECE1] shadow-inner group">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                  alt="Hanamkonda map view"
                  className="w-full h-full object-cover filter saturate-75 opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#2C231E]/20" />

                {/* Centered Location Pin */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative flex flex-col items-center">
                    <motion.div
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-14 h-14 rounded-full bg-[#7E5259] shadow-2xl border-2 border-white/90 flex items-center justify-center p-2"
                    >
                      <PapilioLogo size={32} variant="cutout" animated={false} glow={false} />
                    </motion.div>
                    <div className="mt-1.5 px-3.5 py-1 rounded-full bg-white/95 text-[#2C231E] text-xs font-bold shadow-md border border-[#E0D5C7] whitespace-nowrap">
                      Papilio Cafe & Patisserie
                    </div>
                  </div>
                </div>

                {/* Corner Map Click Overlay */}
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md text-[11px] font-semibold text-[#2C231E] border border-[#E0D5C7] shadow-sm hover:text-[#7E5259] transition-colors"
                >
                  Open in Maps ↗
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
