import React, { useState } from 'react';
import { MenuItem } from '../types';
import { X, Star, Clock, Flame, Plus, Minus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onAddToCart: (dish: MenuItem, quantity: number) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!dish) return null;

  const handleAdd = () => {
    onAddToCart(dish, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#181412]/75 backdrop-blur-xs overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#E7DDD0] my-auto max-h-[92vh] flex flex-col"
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-[#2C231E] shadow-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* Top Image */}
          <div className="relative aspect-16/10 shrink-0 bg-[#FAF6F0] overflow-hidden">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs border border-[#E0D5C7] shadow-sm">
              <span className="text-sm font-bold text-[#2C231E]">
                {dish.formattedPrice}
              </span>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-5 sm:p-8 space-y-4 sm:space-y-5 overflow-y-auto">
            <div>
              <div className="flex items-center space-x-2 text-[#C5A880] text-xs mb-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-[#2C231E]">{dish.rating}</span>
                <span className="text-[#918177]">({dish.reviewsCount} reviews)</span>
              </div>

              <h3
                className="text-2xl sm:text-3xl font-serif font-bold text-[#2C231E]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {dish.name}
              </h3>

              {/* Dietary Tags */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {dish.dietaryTags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-full bg-[#FAF3EA] border border-[#E8DCCB] text-[10px] font-semibold tracking-wider uppercase text-[#7E5259]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#5C4F47] leading-relaxed">
              {dish.description}
            </p>

            {/* Key Culinary Attributes */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#F0E8DE] text-xs text-[#5C4F47]">
              {dish.prepTime && (
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#C5A880]" />
                  <span>Prep: {dish.prepTime}</span>
                </div>
              )}
              {dish.calories && (
                <div className="flex items-center space-x-2">
                  <Flame className="w-4 h-4 text-[#7E5259]" />
                  <span>Energy: {dish.calories}</span>
                </div>
              )}
            </div>

            {/* Ingredients list */}
            {dish.ingredients && (
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#7E5259] mb-1.5">
                  Key Ingredients:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {dish.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="px-2 py-0.5 rounded-md bg-[#FAF6F0] text-[11px] text-[#695B53] border border-[#EAE1D5]"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add Action */}
            <div className="pt-3 flex items-center justify-between gap-4">
              <div className="flex items-center space-x-3 bg-[#FAF6F0] px-3 py-2 rounded-full border border-[#E0D5C7]">
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-[#5C4F47] hover:text-[#7E5259]"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </motion.button>
                <span className="font-bold text-sm text-[#2C231E] w-6 text-center">
                  {quantity}
                </span>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 text-[#5C4F47] hover:text-[#7E5259]"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAdd}
                className={`flex-grow py-3 px-6 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 ${
                  added
                    ? 'bg-[#4E6B4B] text-white'
                    : 'bg-[#7E5259] hover:bg-[#673E45] text-white shadow-sm'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Order</span>
                  </>
                ) : (
                  <>
                    <span>Add to Order · ₹{(dish.price * quantity).toFixed(0)}</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
