import React, { useState } from 'react';
import { REVIEWS } from '../data/papilioData';
import { ReviewItem } from '../types';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2, MessageSquarePlus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    text: '',
    dish: '',
  });
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const activeReview = reviewsList[currentIndex];

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? reviewsList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === reviewsList.length - 1 ? 0 : prev + 1));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;

    const added: ReviewItem = {
      id: `rev-${Date.now()}`,
      guestName: newReview.name,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      rating: newReview.rating,
      timeAgo: 'Just now',
      source: 'Verified Guest',
      reviewText: newReview.text,
      recommendedDishes: newReview.dish ? [newReview.dish] : undefined,
      verified: true,
    };

    setReviewsList([added, ...reviewsList]);
    setCurrentIndex(0);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setShowReviewModal(false);
      setNewReview({ name: '', rating: 5, text: '', dish: '' });
    }, 1500);
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#FAF6F0] relative overflow-hidden border-t border-[#EAE1D5]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Metrics (As seen in Video Screenshot 9) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-b border-[#E7DDD0] pb-8 mb-12 sm:mb-16 text-center md:text-left">
          {/* Metric 1 */}
          <div>
            <span className="text-[11px] font-semibold tracking-[0.24em] text-[#C5A880] uppercase">
              COMMUNITY LOVE
            </span>
            <p
              className="text-3xl sm:text-4xl font-serif text-[#2C231E] font-bold mt-1"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              15,000+
            </p>
            <p className="text-xs text-[#7A6C64] uppercase tracking-wider mt-0.5">
              Cherished Guests Hosted
            </p>
          </div>

          {/* Center Title */}
          <div className="text-center">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#7E5259] uppercase">
              REAL FEEDBACK
            </span>
            <h2
              className="text-2xl sm:text-3xl font-serif text-[#2C231E] tracking-tight mt-1"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              What Our Guests Say
            </h2>
          </div>

          {/* Metric 3 */}
          <div className="md:text-right">
            <div className="flex items-center justify-center md:justify-end space-x-1.5 text-[#C5A880] mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p
              className="text-3xl sm:text-4xl font-serif text-[#2C231E] font-bold"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              4.9 / 5.0
            </p>
            <p className="text-xs text-[#7A6C64] uppercase tracking-wider mt-0.5">
              Average Google Rating
            </p>
          </div>
        </div>

        {/* Main Floating Testimonial Stage (As seen in Video Screenshot 9) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Cafe Atmosphere Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-white aspect-4/3 sm:aspect-square">
              <img
                src="/assets/what-papilio-2.jpg"
                alt="Guests enjoying Papilio cafe"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#201C1A]/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-[#EAE1D5]">
                <p className="text-xs font-serif italic text-[#2C231E]">
                  “A peaceful haven created for mindful conversations and delicious handcrafted bites.”
                </p>
                <p className="text-[10px] tracking-widest uppercase font-semibold text-[#7E5259] mt-1">
                  HANAMKONDA, TELANGANA
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Active Floating Testimonial Card */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="relative bg-white rounded-3xl border border-[#E7DDD0] p-6 sm:p-10 shadow-lg min-h-[320px] flex flex-col justify-between">
              {/* Decorative Quote Icon */}
              <Quote className="absolute top-6 right-8 w-12 h-12 text-[#FAF3EA] fill-[#FAF3EA] pointer-events-none -z-0" />

              <div className="relative z-10">
                {/* 5 Stars Rating */}
                <div className="flex items-center space-x-1.5 text-[#C5A880] mb-5">
                  {[...Array(activeReview.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Main Quoted Feedback */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeReview.id}
                    initial={{ opacity: 0, x: direction * 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -40 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <p
                      className="font-serif italic text-xl sm:text-2xl text-[#2C231E] leading-relaxed mb-6"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      “{activeReview.reviewText}”
                    </p>

                    {activeReview.recommendedDishes && (
                      <div className="flex flex-wrap items-center gap-2 mb-6">
                        <span className="text-[11px] font-semibold text-[#7E5259] uppercase tracking-wider">
                          Recommended:
                        </span>
                        {activeReview.recommendedDishes.map((dish) => (
                          <span
                            key={dish}
                            className="px-2.5 py-0.5 rounded-full bg-[#FAF3EA] border border-[#E8DCCB] text-[10px] font-medium text-[#695A52]"
                          >
                            {dish}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Reviewer Profile Row */}
              <div className="relative z-10 pt-6 border-t border-[#F0E8DE] flex items-center justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-[#EAE1D5] shrink-0 bg-[#FAF4EB] flex items-center justify-center font-bold text-[#7E5259]">
                    {activeReview.avatar ? (
                      <img
                        src={activeReview.avatar}
                        alt={activeReview.guestName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      activeReview.guestName.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <p className="font-semibold text-sm text-[#2C231E]">
                        {activeReview.guestName}
                      </p>
                      {activeReview.verified && (
                        <span title="Verified Guest">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#4E6B4B]" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#8A7B72]">{activeReview.timeAgo}</p>
                  </div>
                </div>

                {/* Arrow Controls (As seen in Video) */}
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePrev}
                    id="reviews-prev-btn"
                    className="p-2.5 rounded-full border border-[#E0D5C7] bg-white hover:bg-[#FAF4EB] text-[#2C231E] transition-colors shadow-2xs"
                    aria-label="Previous Review"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNext}
                    id="reviews-next-btn"
                    className="p-2.5 rounded-full border border-[#E0D5C7] bg-white hover:bg-[#FAF4EB] text-[#2C231E] transition-colors shadow-2xs"
                    aria-label="Next Review"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Bottom Reviewer Selector Dots & Write Review Trigger */}
            <div className="flex items-center justify-between mt-4 px-2">
              <div className="flex items-center space-x-2">
                {reviewsList.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? 'w-8 bg-[#7E5259]' : 'w-2 bg-[#D8CCC0]'
                    }`}
                    aria-label={`View review ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setShowReviewModal(true)}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold tracking-wider uppercase text-[#7E5259] hover:text-[#5B393F] transition-colors"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>WRITE A REVIEW</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Write A Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#201C1A]/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE1D5] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3
              className="text-2xl font-serif text-[#2C231E] mb-2"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Share Your Papilio Experience
            </h3>
            <p className="text-xs text-[#7A6C64] mb-6">
              Your thoughts inspire our chefs and help fellow guests discover delicious moments.
            </p>

            {submittedMessage ? (
              <div className="py-8 text-center text-[#4E6B4B] space-y-2">
                <CheckCircle2 className="w-12 h-12 mx-auto" />
                <p className="font-serif text-lg font-bold">Thank You!</p>
                <p className="text-xs text-[#7A6C64]">Your review has been shared successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#554740] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder="e.g. Sravani Rao"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0D5C7] text-sm focus:outline-hidden focus:border-[#7E5259]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#554740] mb-1">
                    Rating
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="p-1 focus:outline-hidden"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newReview.rating
                              ? 'text-[#C5A880] fill-[#C5A880]'
                              : 'text-[#D8CDC0]'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#554740] mb-1">
                    Favorite Dish / Recommended
                  </label>
                  <input
                    type="text"
                    value={newReview.dish}
                    onChange={(e) => setNewReview({ ...newReview, dish: e.target.value })}
                    placeholder="e.g. Tartufo Pizza or Pastel Macarons"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0D5C7] text-sm focus:outline-hidden focus:border-[#7E5259]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#554740] mb-1">
                    Your Review
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newReview.text}
                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                    placeholder="Describe the flavors, ambiance, or service..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0D5C7] text-sm focus:outline-hidden focus:border-[#7E5259]"
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-[#7A6C64] uppercase hover:text-[#2C231E]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#7E5259] hover:bg-[#673E45] text-white text-xs font-semibold uppercase tracking-wider shadow-sm"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
