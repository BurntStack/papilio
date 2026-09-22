import React, { useState, useMemo, useEffect } from 'react';
import { MENU_ITEMS } from '../data/papilioData';
import { MenuItem, FoodCategory, DietaryTag } from '../types';
import { Search, Plus, Star, Sparkles, LayoutList, LayoutGrid, Check, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
  onSelectDish: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  onSelectDish,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('all');
  const [selectedTag, setSelectedTag] = useState<DietaryTag | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [hoveredDish, setHoveredDish] = useState<MenuItem | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Mouse Tracking Spring Physics for Floating Cursor-Follower Preview (Dribbble Video Signature)
  const cursorX = useMotionValue(-500);
  const cursorY = useMotionValue(-500);
  const springX = useSpring(cursorX, { damping: 22, stiffness: 240, mass: 0.6 });
  const springY = useSpring(cursorY, { damping: 22, stiffness: 240, mass: 0.6 });
  const rotateVal = useMotionValue(0);
  const springRotate = useSpring(rotateVal, { damping: 18, stiffness: 180 });

  const handleGlobalMouseMove = (e: React.MouseEvent) => {
    cursorX.set(e.clientX + 24);
    cursorY.set(e.clientY - 90);
    // Subtle tilt based on movement speed
    const tilt = Math.max(-6, Math.min(6, (e.movementX || 0) * 0.9));
    rotateVal.set(tilt);
  };

  // Reset rotate when mouse slows down
  useEffect(() => {
    const timer = setTimeout(() => {
      rotateVal.set(0);
    }, 150);
    return () => clearTimeout(timer);
  }, [rotateVal]);

  const categories: { label: string; value: FoodCategory }[] = [
    { label: 'ALL', value: 'all' },
    { label: 'PIZZAS', value: 'pizzas' },
    { label: 'PASTAS', value: 'pastas' },
    { label: 'BURGERS', value: 'burgers' },
    { label: 'PASTRIES', value: 'pastries' },
    { label: 'BEVERAGES', value: 'beverages' },
  ];

  const dietaryFilters: { label: string; value: DietaryTag | 'all' }[] = [
    { label: 'ALL', value: 'all' },
    { label: 'VEGAN', value: 'vegan' },
    { label: 'VEGETARIAN', value: 'vegetarian' },
    { label: 'GLUTEN-FREE', value: 'gluten-free' },
    { label: 'POPULAR', value: 'popular' },
    { label: 'SIGNATURE', value: 'signature' },
    { label: "CHEF'S SPECIAL", value: "chef's special" },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchTag =
        selectedTag === 'all' || item.dietaryTags.includes(selectedTag as DietaryTag);
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.ingredients &&
          item.ingredients.some((ing) =>
            ing.toLowerCase().includes(searchQuery.toLowerCase())
          ));
      return matchCategory && matchTag && matchSearch;
    });
  }, [selectedCategory, selectedTag, searchQuery]);

  const handleAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item);
    setJustAddedId(item.id);
    setTimeout(() => setJustAddedId(null), 1200);
  };

  return (
    <section
      id="menu"
      onMouseMove={handleGlobalMouseMove}
      className="py-16 sm:py-24 relative bg-[#FAF6F0] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title with Animated Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="inline-flex items-center justify-center p-2 mb-2 text-[#C5A880]">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <h2
            className="text-3xl sm:text-5xl font-serif text-[#2C231E] tracking-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Full Menu
          </h2>
          <p className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#7E5259] uppercase mt-2">
            EVERY DISH, HANDCRAFTED WITH LOVE
          </p>
        </motion.div>

        {/* Category Pill Filters with Smooth Horizontal Swiping on Mobile */}
        <div className="flex items-center sm:justify-center gap-2 sm:gap-3 mb-4 overflow-x-auto no-scrollbar py-1 px-1 -mx-4 sm:mx-0 px-4 sm:px-0 flex-nowrap sm:flex-wrap">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`relative shrink-0 px-4 sm:px-6 py-2 rounded-full text-xs font-semibold tracking-[0.14em] sm:tracking-[0.16em] uppercase transition-all duration-200 z-10 ${
                  isActive
                    ? 'text-white'
                    : 'bg-white border border-[#E2D6C8] text-[#55473F] hover:border-[#7E5259] shadow-2xs'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="menuActiveCategoryPill"
                    className="absolute inset-0 bg-[#2C231E] rounded-full shadow-md -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Sub-filters & Dietary Badges with Horizontal Swiping */}
        <div className="flex items-center sm:justify-center gap-1.5 sm:gap-2 mb-8 overflow-x-auto no-scrollbar py-1 px-1 -mx-4 sm:mx-0 px-4 sm:px-0 flex-nowrap sm:flex-wrap">
          {dietaryFilters.map((tag) => {
            const isActive = selectedTag === tag.value;
            return (
              <motion.button
                key={tag.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTag(tag.value)}
                className={`shrink-0 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-medium tracking-wider uppercase transition-colors ${
                  isActive
                    ? 'bg-[#7E5259] text-white shadow-xs'
                    : 'bg-[#F4ECE0] hover:bg-[#EFE5D7] text-[#695B53]'
                }`}
              >
                {tag.label}
              </motion.button>
            );
          })}
        </div>

        {/* Search Bar & View Mode Toggle Controls */}
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3 mb-12">
          {/* Search Input */}
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8988D]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search our menu (e.g., Truffle, Burrata, Macaron)..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white border border-[#E0D5C7] text-xs sm:text-sm text-[#2C231E] placeholder-[#A8988D] focus:outline-hidden focus:border-[#7E5259] focus:ring-1 focus:ring-[#7E5259] transition-all shadow-2xs"
            />
          </div>

          {/* View Toggle (List from Video vs Grid from Current Website) */}
          <div className="flex items-center bg-white p-1 rounded-full border border-[#E0D5C7] shadow-2xs">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-full transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#7E5259] text-white shadow-2xs'
                  : 'text-[#695B53] hover:text-[#2C231E]'
              }`}
              title="Editorial Numbered List View (Dribbble Video Design)"
            >
              <LayoutList className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-full transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#7E5259] text-white shadow-2xs'
                  : 'text-[#695B53] hover:text-[#2C231E]'
              }`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white/70 rounded-3xl border border-[#EAE1D5] max-w-lg mx-auto"
          >
            <p className="font-serif text-xl text-[#2C231E]">No delicacies found</p>
            <p className="text-xs text-[#7A6C64] mt-2">
              Try adjusting your search or category filters to explore our offerings.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedTag('all');
                setSearchQuery('');
              }}
              className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#7E5259] underline underline-offset-4"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

        {/* 1. EDITORIAL NUMBERED LIST VIEW (With Cursor Tracking Floating Preview from Dribbble Video) */}
        {viewMode === 'list' && filteredItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative max-w-4xl mx-auto bg-white rounded-3xl border border-[#E7DDD0] shadow-sm p-4 sm:p-8 divide-y divide-[#F0E8DE]"
          >
            {filteredItems.map((item, index) => {
              const numberFormatted = String(index + 1).padStart(2, '0');
              const isJustAdded = justAddedId === item.id;
              const isHovered = hoveredDish?.id === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.4) }}
                  onMouseEnter={() => setHoveredDish(item)}
                  onMouseLeave={() => setHoveredDish(null)}
                  onClick={() => onSelectDish(item)}
                  className={`py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group cursor-pointer -mx-4 sm:-mx-8 px-4 sm:px-8 rounded-xl transition-all duration-300 relative ${
                    isHovered ? 'bg-[#FAF4EB]/80 pl-6 sm:pl-10' : 'hover:bg-[#FAF6F0]/50'
                  }`}
                >
                  {/* Left: Number, Thumbnail & Name */}
                  <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
                    <span
                      className={`font-mono text-xs sm:text-sm font-semibold transition-colors pt-0.5 sm:pt-0 ${
                        isHovered ? 'text-[#7E5259] font-bold' : 'text-[#A8988D]'
                      }`}
                    >
                      ({numberFormatted})
                    </span>

                    {/* Small Thumbnail Indicator (Mobile only) */}
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#EAE1D5] sm:hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3
                          className={`font-serif text-base sm:text-xl font-semibold transition-colors leading-snug flex items-center space-x-1.5 ${
                            isHovered ? 'text-[#7E5259]' : 'text-[#2C231E]'
                          }`}
                          style={{ fontFamily: 'var(--font-serif)' }}
                        >
                          <span>{item.name}</span>
                          <ArrowUpRight
                            className={`w-4 h-4 text-[#7E5259] transition-all duration-200 hidden sm:inline-block ${
                              isHovered
                                ? 'opacity-100 translate-x-0.5 -translate-y-0.5'
                                : 'opacity-0 -translate-x-1'
                            }`}
                          />
                        </h3>

                        {/* Dietary Pills */}
                        {item.dietaryTags.map((t) => (
                          <span
                            key={t}
                            className={`text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold transition-colors ${
                              t === "chef's special"
                                ? 'bg-[#7E5259] text-white'
                                : t === 'signature'
                                ? 'bg-[#2C231E] text-white'
                                : 'bg-[#F2EAE0] text-[#695B53]'
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-[#7A6C64] mt-1 line-clamp-1 max-w-xl">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Price & Add Button */}
                  <div className="flex items-center justify-between sm:justify-end space-x-4 pl-8 sm:pl-0">
                    <span className="font-serif text-base sm:text-lg font-bold text-[#2C231E]">
                      {item.formattedPrice}
                    </span>

                    <motion.button
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={(e) => handleAdd(item, e)}
                      id={`btn-add-${item.id}`}
                      className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all shadow-2xs ${
                        isJustAdded
                          ? 'bg-[#4E6B4B] text-white'
                          : 'bg-[#7E5259] hover:bg-[#673E45] text-white'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>ADDED</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>ADD</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}

            {/* SIGNATURE DRIBBLE VIDEO ANIMATION: Floating Preview Card Following Mouse Cursor with Spring Motion */}
            <AnimatePresence>
              {hoveredDish && (
                <motion.div
                  style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    x: springX,
                    y: springY,
                    rotate: springRotate,
                    pointerEvents: 'none',
                    zIndex: 60,
                  }}
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.75, transition: { duration: 0.15 } }}
                  transition={{ type: 'spring', damping: 20, stiffness: 260 }}
                  className="hidden lg:flex w-72 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E7DDD0] shadow-[0_20px_40px_rgba(44,35,30,0.18)] items-center space-x-3.5"
                >
                  <div className="w-18 h-18 rounded-xl overflow-hidden shrink-0 border border-[#EAE1D5] bg-[#FAF4EB]">
                    <img
                      src={hoveredDish.image}
                      alt={hoveredDish.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=400&q=80';
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-grow">
                    <span className="text-[9px] uppercase tracking-widest text-[#C5A880] font-bold block mb-0.5">
                      {hoveredDish.category}
                    </span>
                    <p className="text-xs font-serif font-bold text-[#2C231E] truncate leading-snug">
                      {hoveredDish.name}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-bold text-[#7E5259]">
                        {hoveredDish.formattedPrice}
                      </span>
                      <span className="text-[10px] text-[#A8988D] flex items-center space-x-1">
                        <Star className="w-2.5 h-2.5 fill-[#C5A880] text-[#C5A880]" />
                        <span>{hoveredDish.rating}</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* 2. VISUAL CARD GRID VIEW (Animated Cards) */}
        {viewMode === 'grid' && filteredItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredItems.map((dish, idx) => {
              const isJustAdded = justAddedId === dish.id;

              return (
                <motion.div
                  key={dish.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: Math.min(idx * 0.05, 0.4) }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  onClick={() => onSelectDish(dish)}
                  className="group rounded-2xl bg-white border border-[#E6DDD1] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative aspect-4/3 overflow-hidden bg-[#FAF6F0]">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=800&q=80';
                      }}
                    />

                    {/* Price Pill Tag */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#E0D5C7] shadow-sm">
                      <span className="text-xs font-bold text-[#2C231E]">
                        {dish.formattedPrice}
                      </span>
                    </div>

                    {/* Tag Badges */}
                    <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                      {dish.dietaryTags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-full bg-[#7E5259]/90 text-white text-[9px] uppercase tracking-wider font-semibold backdrop-blur-xs shadow-2xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-center space-x-1 text-[#C5A880] text-xs mb-1">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="font-semibold text-[#2C231E]">{dish.rating}</span>
                        <span className="text-[#A39287]">({dish.reviewsCount})</span>
                      </div>

                      <h3
                        className="font-serif text-base font-semibold text-[#2C231E] group-hover:text-[#7E5259] transition-colors leading-snug"
                        style={{ fontFamily: 'var(--font-serif)' }}
                      >
                        {dish.name}
                      </h3>
                      <p className="text-xs text-[#75675F] mt-1.5 line-clamp-2">
                        {dish.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-[#F0E8DE] flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#7E5259]">
                        {dish.formattedPrice}
                      </span>

                      <motion.button
                        whileTap={{ scale: 0.92 }}
                        onClick={(e) => handleAdd(dish, e)}
                        className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all shadow-2xs ${
                          isJustAdded
                            ? 'bg-[#4E6B4B] text-white'
                            : 'bg-[#7E5259] hover:bg-[#673E45] text-white'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>ADDED</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" />
                            <span>ADD</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};
