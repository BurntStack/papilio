import React, { useState } from 'react';
import { MEAL_COLLECTIONS } from '../data/papilioData';
import { MenuItem } from '../types';
import { Plus, ArrowUpRight, Clock, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MealShowcaseSectionProps {
  onAddToCart: (item: MenuItem) => void;
  onSelectDish: (item: MenuItem) => void;
  onOpenReservation: () => void;
}

export const MealShowcaseSection: React.FC<MealShowcaseSectionProps> = ({
  onAddToCart,
  onSelectDish,
  onOpenReservation,
}) => {
  const [activeMealId, setActiveMealId] = useState<string>('lunch');

  const activeCollection =
    MEAL_COLLECTIONS.find((m) => m.id === activeMealId) || MEAL_COLLECTIONS[0];

  return (
    <section id="meals" className="py-16 sm:py-24 bg-[#F5EFEB]/60 border-y border-[#EAE1D5]/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Animated Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-[#E2D7C8] text-[11px] tracking-[0.2em] uppercase text-[#7E5259] font-medium mb-3 shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#C5A880]" />
            <span>CURATED MEALTIMES</span>
          </div>
          <h2
            className="text-3xl sm:text-5xl font-serif text-[#2C231E] tracking-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Crafted for Every Hour
          </h2>
          <p className="text-[#63554D] text-sm sm:text-base mt-3">
            From golden morning lattes and flaky croissants to candlelit truffle pizzas and decadent entremets.
          </p>
        </motion.div>

        {/* Big Editorial Category Switcher Tabs with Mobile Horizontal Swiping */}
        <div className="flex items-center sm:justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 overflow-x-auto no-scrollbar py-1 px-1 -mx-4 sm:mx-0 px-4 sm:px-0 flex-nowrap sm:flex-wrap">
          {MEAL_COLLECTIONS.map((meal) => {
            const isActive = meal.id === activeMealId;
            return (
              <motion.button
                key={meal.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveMealId(meal.id)}
                className={`relative shrink-0 px-4 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold tracking-[0.14em] sm:tracking-[0.18em] uppercase transition-all duration-300 z-10 ${
                  isActive
                    ? 'text-white'
                    : 'bg-white/90 hover:bg-white text-[#4D3F37] border border-[#E0D5C7] hover:border-[#7E5259]/40 shadow-xs'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeMealPill"
                    className="absolute inset-0 bg-[#7E5259] rounded-full shadow-md -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span>{meal.shortTitle}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Active Collection Banner & Quick Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-[#E2D7C8] pb-4 mb-8 sm:mb-12 gap-3 text-center sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs text-[#7E5259] font-medium mb-1">
              <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="tracking-wider uppercase">{activeCollection.time}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#5B4D45] max-w-xl">
              {activeCollection.subtitle}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenReservation}
            className="inline-flex items-center space-x-2 text-xs font-semibold tracking-[0.16em] uppercase text-[#7E5259] hover:text-[#5E3B41] underline underline-offset-4 decoration-[#C5A880] transition-colors"
          >
            <span>BOOK A TABLE FOR {activeCollection.shortTitle}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>

        {/* Active Meal Cards Grid with Smooth Staggered Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMealId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {activeCollection.items.map((dish, index) => {
              // Synthetic MenuItem conversion for adding to cart
              const menuItem: MenuItem = {
                id: dish.id,
                name: dish.name,
                category: activeMealId === 'patisserie' ? 'pastries' : 'pizzas',
                mealTimes: [activeMealId as any],
                price: parseFloat(dish.price.replace(/[^0-9.]/g, '')),
                formattedPrice: dish.price,
                description: `Handcrafted ${dish.name} prepared fresh daily at Papilio Cafe with premium ethical ingredients.`,
                dietaryTags: ['popular'],
                image: dish.image,
                rating: 4.9,
                reviewsCount: 84,
              };

              return (
                <motion.div
                  key={dish.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.25 } }}
                  className="group rounded-2xl bg-white border border-[#E6DDD1] overflow-hidden shadow-xs hover:shadow-2xl transition-shadow duration-300 flex flex-col"
                >
                  {/* Image Container with Floating Price Pill (Video Style) */}
                  <div
                    className="relative aspect-4/3 overflow-hidden bg-[#FAF6F0] cursor-pointer"
                    onClick={() => onSelectDish(menuItem)}
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-600"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=800&q=80';
                      }}
                    />

                    {/* Floating Price Pill (As seen in Dribbble video) */}
                    <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#E0D5C7] shadow-sm flex items-center space-x-1">
                      <span className="text-xs font-bold text-[#2C231E]">
                        {dish.price}
                      </span>
                    </div>

                    {/* Floating Category/Trait Tag */}
                    <div className="absolute top-3.5 right-3.5 px-2.5 py-0.5 rounded-full bg-[#7E5259]/90 text-white text-[10px] tracking-wider uppercase font-medium backdrop-blur-xs shadow-2xs">
                      {dish.tag}
                    </div>

                    {/* Hover Overlay with Dish Details Prompt */}
                    <div className="absolute inset-0 bg-[#2C231E]/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="px-3.5 py-1.5 rounded-full bg-white/95 text-xs font-semibold text-[#2C231E] shadow-sm"
                      >
                        View Details
                      </motion.span>
                    </div>
                  </div>

                  {/* Card Bottom Content */}
                  <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
                    <div>
                      <h3
                        onClick={() => onSelectDish(menuItem)}
                        className="font-serif text-base sm:text-lg text-[#2C231E] font-semibold hover:text-[#7E5259] transition-colors cursor-pointer leading-snug"
                        style={{ fontFamily: 'var(--font-serif)' }}
                      >
                        {dish.name}
                      </h3>
                      <p className="text-xs text-[#75675F] mt-1 line-clamp-2">
                        Freshly prepared with pure local and imported artisanal ingredients.
                      </p>
                    </div>

                    {/* Quick Add Action */}
                    <div className="pt-4 mt-3 border-t border-[#F0E8DE] flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#7E5259]">
                        {dish.price}
                      </span>

                      <motion.button
                        whileTap={{ scale: 0.92 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => onAddToCart(menuItem)}
                        className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#7E5259] hover:bg-[#653E45] text-white text-xs font-semibold tracking-wider transition-colors shadow-xs"
                        aria-label={`Add ${dish.name} to order`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>ADD</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
