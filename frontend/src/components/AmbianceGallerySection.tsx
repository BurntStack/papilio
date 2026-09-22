import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/papilioData';
import { GalleryItem } from '../types';
import { Sparkles, Maximize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AmbianceGallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ambiance' | 'patisserie' | 'culinary'>('all');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const filteredGallery = GALLERY_ITEMS.filter((item) =>
    selectedCategory === 'all' ? true : item.category === selectedCategory
  );

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#FAF6F0] relative border-t border-[#EAE1D5]/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-[#E2D6C8] text-[11px] tracking-[0.2em] uppercase text-[#7E5259] font-medium mb-3 shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#C5A880]" />
            <span>VISUAL STORYTELLING</span>
          </div>
          <h2
            className="text-3xl sm:text-5xl font-serif text-[#2C231E] tracking-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Glimpse Inside Papilio
          </h2>
          <p className="text-[#63554D] text-sm sm:text-base mt-2">
            A symphony of natural wood, soft botanical light, and freshly crafted culinary artistry.
          </p>
        </motion.div>

        {/* Filter Pills with Horizontal Swiping on Mobile */}
        <div className="flex items-center sm:justify-center gap-2 mb-8 overflow-x-auto no-scrollbar py-1 px-1 -mx-4 sm:mx-0 px-4 sm:px-0 flex-nowrap sm:flex-wrap">
          {[
            { label: 'ALL MOMENTS', value: 'all' },
            { label: 'SERENE AMBIANCE', value: 'ambiance' },
            { label: 'FRENCH PATISSERIE', value: 'patisserie' },
            { label: 'CULINARY CREATIONS', value: 'culinary' },
          ].map((tab) => {
            const isActive = selectedCategory === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setSelectedCategory(tab.value as any)}
                className={`relative shrink-0 px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-colors z-10 ${
                  isActive
                    ? 'text-white'
                    : 'bg-white border border-[#E0D5C7] text-[#5A4C45] hover:border-[#7E5259]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeGalleryTab"
                    className="absolute inset-0 bg-[#7E5259] rounded-full shadow-2xs -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid with AnimatePresence: 2-Columns on Mobile */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <AnimatePresence>
            {filteredGallery.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                key={item.id}
                onClick={() => setActiveLightbox(item)}
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-4/3 bg-[#F0E8DE] cursor-pointer shadow-xs hover:shadow-xl transition-shadow"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-600"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#201C1A]/85 via-transparent to-transparent opacity-85 group-hover:opacity-100 transition-opacity" />

                <div className="absolute bottom-2.5 sm:bottom-3.5 left-2.5 sm:left-3.5 right-2.5 sm:right-3.5 flex items-end justify-between text-white">
                  <div className="min-w-0 pr-1">
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#C5A880] font-bold block">
                      {item.category}
                    </span>
                    <p
                      className="font-serif text-xs sm:text-sm font-semibold leading-tight line-clamp-1"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      {item.title}
                    </p>
                  </div>

                  <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-white/25 backdrop-blur-xs shrink-0">
                    <Maximize2 className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal with AnimatePresence */}
      <AnimatePresence>
        {activeLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightbox(null)}
            className="fixed inset-0 z-50 bg-[#181412]/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#3E342F]"
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveLightbox(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#2C231E] shadow-md transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </motion.button>

              <div className="aspect-16/10 bg-black">
                <img
                  src={activeLightbox.image}
                  alt={activeLightbox.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 bg-white flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#7E5259] font-bold">
                    {activeLightbox.category}
                  </span>
                  <h3
                    className="font-serif text-xl font-bold text-[#2C231E]"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {activeLightbox.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
