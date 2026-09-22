import React, { useState } from 'react';
import { ReservationFormData } from '../types';
import { Calendar, Clock, Users, Sparkles, CheckCircle2, Phone, X } from 'lucide-react';
import { CAFE_INFO } from '../data/papilioData';
import { motion, AnimatePresence } from 'motion/react';

interface ReservationSectionProps {
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  isOpenModal = false,
  onCloseModal,
}) => {
  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    email: '',
    phone: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '19:30',
    guests: 2,
    seatingArea: 'indoor-calm',
    occasion: 'Casual Dining',
    specialRequests: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  const timeSlots = [
    { label: 'Morning Coffee & Pastry', time: '10:30' },
    { label: 'Artisan Lunch', time: '13:00' },
    { label: 'Afternoon High Tea', time: '16:30' },
    { label: 'Sunset & Bites', time: '18:00' },
    { label: 'Dinner & Truffles', time: '19:30' },
    { label: 'Late Evening Dessert', time: '21:00' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = 'PAP-' + Math.floor(100000 + Math.random() * 900000);
    setBookingCode(randomCode);
    setIsSubmitted(true);
  };

  const formContent = (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E7DDD0] p-5 sm:p-10 shadow-xl max-w-3xl mx-auto">
      {isSubmitted ? (
        <div className="py-10 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-[#FAF3EA] border border-[#E8DCCB] text-[#4E6B4B] mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#7E5259]">
              TABLE CONFIRMED
            </span>
            <h3
              className="font-serif text-3xl text-[#2C231E] font-bold mt-1"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              We Look Forward to Welcoming You
            </h3>
            <p className="text-xs text-[#7A6C64] mt-2">
              Confirmation code: <span className="font-mono font-bold text-[#2C231E]">{bookingCode}</span>
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#EAE1D5] max-w-md mx-auto text-left text-xs space-y-2 text-[#5A4C45]">
            <div className="flex justify-between">
              <span className="text-[#8A7B72]">Guest Name:</span>
              <span className="font-semibold text-[#2C231E]">{formData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8A7B72]">Date & Time:</span>
              <span className="font-semibold text-[#2C231E]">{formData.date} at {formData.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8A7B72]">Party Size:</span>
              <span className="font-semibold text-[#2C231E]">{formData.guests} Guests</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#8A7B72]">Location:</span>
              <span className="font-semibold text-[#2C231E]">Hanamkonda, Telangana</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setIsSubmitted(false);
                if (onCloseModal) onCloseModal();
              }}
              className="px-6 py-2.5 rounded-full bg-[#7E5259] hover:bg-[#673E45] text-white text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Done
            </button>
            <a
              href={`tel:${CAFE_INFO.phone}`}
              className="px-5 py-2.5 rounded-full border border-[#E0D5C7] text-xs font-medium text-[#5A4C45] hover:border-[#7E5259] inline-flex items-center space-x-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Direct Support: {CAFE_INFO.phone}</span>
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A4C45] mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Sravani Rao"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E0D5C7] text-sm text-[#2C231E] focus:outline-hidden focus:border-[#7E5259]"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A4C45] mb-1.5">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 090003 16366"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E0D5C7] text-sm text-[#2C231E] focus:outline-hidden focus:border-[#7E5259]"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A4C45] mb-1.5">
                Reservation Date *
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={formData.date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E0D5C7] text-sm text-[#2C231E] focus:outline-hidden focus:border-[#7E5259]"
                />
              </div>
            </div>

            {/* Guests */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A4C45] mb-1.5">
                Number of Guests *
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5, '6+'].map((count) => {
                  const numVal = typeof count === 'number' ? count : 6;
                  const isSelected = formData.guests === numVal;
                  return (
                    <button
                      type="button"
                      key={String(count)}
                      onClick={() => setFormData({ ...formData, guests: numVal })}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        isSelected
                          ? 'bg-[#7E5259] text-white shadow-2xs'
                          : 'bg-[#FAF6F0] border border-[#E0D5C7] text-[#554740] hover:border-[#7E5259]'
                      }`}
                    >
                      {count}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Time Slots Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A4C45] mb-2">
              Preferred Dining Experience & Time *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {timeSlots.map((slot) => {
                const isSelected = formData.time === slot.time;
                return (
                  <button
                    type="button"
                    key={slot.time}
                    onClick={() => setFormData({ ...formData, time: slot.time })}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#7E5259] bg-[#F7EDEE] text-[#2C231E] ring-1 ring-[#7E5259]'
                        : 'border-[#E2D6C8] bg-[#FAF6F0] hover:bg-white text-[#5E5049]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-[#7E5259]">
                      <span>{slot.time}</span>
                      <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                    </div>
                    <p className="text-[11px] font-medium text-[#2C231E] mt-1 leading-snug">
                      {slot.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>



          {/* Special Occasion or Requests */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5A4C45] mb-1.5">
              Occasion or Special Requests (Optional)
            </label>
            <input
              type="text"
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              placeholder="e.g. Birthday surprise, quiet corner table, allergy notice..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E0D5C7] text-sm text-[#2C231E] focus:outline-hidden focus:border-[#7E5259]"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              id="submit-table-booking-btn"
              className="w-full py-4 rounded-full bg-[#7E5259] hover:bg-[#673E45] text-white text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase shadow-[0_4px_16px_rgba(126,82,89,0.25)] transition-all transform active:scale-98"
            >
              CONFIRM TABLE RESERVATION
            </button>
            <p className="text-[11px] text-[#8C7D75] text-center mt-3">
              No reservation fee required · Instant confirmation via SMS or Phone
            </p>
          </div>
        </form>
      )}
    </div>
  );

  if (isOpenModal) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCloseModal}
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-4 bg-[#201C1A]/75 backdrop-blur-xs overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl my-3 sm:my-8"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onCloseModal}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 rounded-full bg-[#FAF6F0] hover:bg-white text-[#2C231E] border border-[#E0D5C7] transition-colors shadow-xs"
              aria-label="Close Reservation"
            >
              <X className="w-4 h-4" />
            </motion.button>
            {formContent}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <section id="reservation" className="py-16 sm:py-24 bg-[#F7EFE4]/60 border-t border-[#EAE1D5]/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-[#E2D6C8] text-[11px] tracking-[0.2em] uppercase text-[#7E5259] font-medium mb-3 shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#C5A880]" />
            <span>TABLE RESERVATION</span>
          </div>
          <h2
            className="text-3xl sm:text-5xl font-serif text-[#2C231E] tracking-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Reserve Your Haven
          </h2>
          <p className="text-[#63554D] text-sm sm:text-base mt-2">
            Enjoy priority seating in our tranquil indoor dining room.
          </p>
        </motion.div>

        {formContent}
      </div>
    </section>
  );
};
