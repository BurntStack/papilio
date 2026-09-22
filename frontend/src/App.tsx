import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MealShowcaseSection } from './components/MealShowcaseSection';
import { MenuSection } from './components/MenuSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ReservationSection } from './components/ReservationSection';
import { AmbianceGallerySection } from './components/AmbianceGallerySection';
import { StoryAndLocationSection } from './components/StoryAndLocationSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { DishDetailModal } from './components/DishDetailModal';
import { MenuItem, CartItem } from './types';
import { Calendar, UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);

  const handleAddToCart = (item: MenuItem, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.menuItem.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.menuItem.id === item.id
            ? { ...ci, quantity: ci.quantity + quantity }
            : ci
        );
      }
      return [...prev, { menuItem: item, quantity }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.menuItem.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.menuItem.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2C231E] selection:bg-[#7E5259] selection:text-white font-sans antialiased">
      {/* Modern Outer Framed Shell (Inspired by High-End Dribbble Prototype) */}
      <div className="min-h-screen flex flex-col justify-between">
        {/* Navigation Bar */}
        <Navbar
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenReservation={() => setIsReservationOpen(true)}
        />

        {/* Main Sections */}
        <main className="flex-grow pb-16 sm:pb-0">
          {/* Hero Section */}
          <HeroSection
            onOpenReservation={() => setIsReservationOpen(true)}
            onExploreMenu={scrollToMenu}
          />

          {/* Curated Mealtimes Switcher (Video Frames 3, 4, 5) */}
          <MealShowcaseSection
            onAddToCart={handleAddToCart}
            onSelectDish={(dish) => setSelectedDish(dish)}
            onOpenReservation={() => setIsReservationOpen(true)}
          />

          {/* Full Menu with Numbered List & Hover Floating Previews (Video Frames 7, 8) */}
          <MenuSection
            onAddToCart={handleAddToCart}
            onSelectDish={(dish) => setSelectedDish(dish)}
          />

          {/* Guest Reviews Carousel (Video Frame 9) */}
          <ReviewsSection />

          {/* Table Reservation Booking Section (Video Frame 10) */}
          <ReservationSection />

          {/* Visual Storytelling Gallery */}
          <AmbianceGallerySection />

          {/* Story & Location in Hanamkonda */}
          <StoryAndLocationSection />
        </main>

        {/* Modern Editorial Footer (Video Frame 13) */}
        <Footer onOpenReservation={() => setIsReservationOpen(true)} />
      </div>

      {/* Floating Bottom Quick Action Bar for Mobile View */}
      <div className="sm:hidden fixed bottom-4 left-3.5 right-3.5 z-30 pointer-events-auto">
        <AnimatePresence mode="wait">
          {totalCartCount > 0 ? (
            <motion.button
              key="mobile-cart-bar"
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCartOpen(true)}
              className="w-full py-3.5 px-5 rounded-2xl bg-[#7E5259] text-white shadow-2xl flex items-center justify-between border border-white/20 active:scale-98 transition-all"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                  {totalCartCount}
                </div>
                <span className="text-xs font-bold tracking-wider uppercase">View Order Bag</span>
              </div>
              <span className="text-sm font-serif font-bold">₹{cartTotal.toFixed(0)} →</span>
            </motion.button>
          ) : (
            <motion.div
              key="mobile-quick-actions"
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-[#201C1A]/95 backdrop-blur-md text-white p-1.5 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-between gap-1.5"
            >
              <button
                onClick={() => setIsReservationOpen(true)}
                className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-[#7E5259] text-white text-xs font-semibold uppercase tracking-wider active:scale-95 transition-transform"
              >
                <Calendar className="w-3.5 h-3.5 text-[#EAD8CB]" />
                <span>Book Table</span>
              </button>
              <button
                onClick={scrollToMenu}
                className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl text-xs font-medium text-[#FAF6F0] hover:text-white active:scale-95 transition-transform"
              >
                <UtensilsCrossed className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>View Menu</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Slide-out Order Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Dish Detail Preview Modal */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Floating Table Reservation Modal */}
      {isReservationOpen && (
        <ReservationSection
          isOpenModal={true}
          onCloseModal={() => setIsReservationOpen(false)}
        />
      )}
    </div>
  );
}
