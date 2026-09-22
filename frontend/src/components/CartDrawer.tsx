import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PapilioLogo } from './PapilioLogo';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [diningType, setDiningType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );
  const tax = subtotal * 0.05; // 5% GST
  const total = subtotal + tax;

  const handleCheckout = () => {
    const code = 'PAP-ORD-' + Math.floor(1000 + Math.random() * 9000);
    setOrderId(code);
    setOrderSuccess(true);
    setTimeout(() => {
      onClearCart();
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex justify-end bg-[#201C1A]/60 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="w-full max-w-md bg-[#FAF6F0] h-full shadow-2xl flex flex-col justify-between border-l border-[#EAE1D5]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Header */}
            <div className="p-5 border-b border-[#EAE1D5] bg-white flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <PapilioLogo size={26} variant="cutout" glow={false} />
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2C231E]">
                    Your Order Bag
                  </h3>
                  <p className="text-[11px] text-[#8A7B72]">
                    {cartItems.length} {cartItems.length === 1 ? 'delicacy' : 'delicacies'} selected
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[#FAF4EB] text-[#554740] transition-colors"
                aria-label="Close Bag"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Order Success State */}
            {orderSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-grow p-8 flex flex-col items-center justify-center text-center space-y-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                  className="w-16 h-16 rounded-full bg-[#FAF3EA] border border-[#E8DCCB] text-[#4E6B4B] flex items-center justify-center"
                >
                  <CheckCircle2 className="w-9 h-9" />
                </motion.div>
                <h4 className="font-serif text-2xl font-bold text-[#2C231E]">
                  Order Received!
                </h4>
                <p className="text-xs text-[#7A6C64] max-w-xs">
                  Our kitchen and pastry chefs are handcrafting your order with care.
                </p>
                <div className="p-4 rounded-xl bg-white border border-[#E7DDD0] w-full text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[#8A7B72]">Order ID:</span>
                    <span className="font-mono font-bold text-[#2C231E]">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8A7B72]">Service:</span>
                    <span className="font-semibold capitalize text-[#2C231E]">{diningType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8A7B72]">Total Paid:</span>
                    <span className="font-bold text-[#7E5259]">₹{total.toFixed(0)}</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setOrderSuccess(false);
                    onClose();
                  }}
                  className="w-full py-3 rounded-full bg-[#7E5259] text-white text-xs font-semibold uppercase tracking-wider shadow-sm"
                >
                  Back to Menu
                </motion.button>
              </motion.div>
            ) : cartItems.length === 0 ? (
              /* Empty Bag State */
              <div className="flex-grow p-8 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-white border border-[#E0D5C7] text-[#C5A880] flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-serif text-lg font-semibold text-[#2C231E]">
                  Your bag is empty
                </p>
                <p className="text-xs text-[#8A7B72] max-w-xs">
                  Explore our artisanal pizzas, handmade pasta, and fresh French macarons to begin.
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#7E5259] text-white text-xs font-semibold uppercase tracking-wider mt-2"
                >
                  Browse Menu
                </motion.button>
              </div>
            ) : (
              /* Populated Bag Items List */
              <>
                <div className="flex-grow overflow-y-auto p-5 space-y-3 divide-y divide-[#F0E8DE]">
                  {/* Dining Mode Toggle */}
                  <div className="flex p-1 rounded-xl bg-white border border-[#E2D6C8] mb-4">
                    <button
                      type="button"
                      onClick={() => setDiningType('dine-in')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                        diningType === 'dine-in'
                          ? 'bg-[#7E5259] text-white shadow-2xs'
                          : 'text-[#695B53] hover:text-[#2C231E]'
                      }`}
                    >
                      Dine-In
                    </button>
                    <button
                      type="button"
                      onClick={() => setDiningType('takeaway')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                        diningType === 'takeaway'
                          ? 'bg-[#7E5259] text-white shadow-2xs'
                          : 'text-[#695B53] hover:text-[#2C231E]'
                      }`}
                    >
                      Takeaway
                    </button>
                  </div>

                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        key={item.menuItem.id}
                        className="pt-3 flex items-center space-x-3"
                      >
                        <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-[#EAE1D5] bg-white">
                          <img
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-grow min-w-0">
                          <h4 className="font-serif text-sm font-semibold text-[#2C231E] truncate">
                            {item.menuItem.name}
                          </h4>
                          <p className="text-xs font-bold text-[#7E5259]">
                            ₹{(item.menuItem.price * item.quantity).toFixed(0)}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2 bg-white px-2 py-1 rounded-full border border-[#E0D5C7]">
                          <motion.button
                            whileTap={{ scale: 0.8 }}
                            onClick={() => onUpdateQuantity(item.menuItem.id, -1)}
                            className="p-1 hover:text-[#7E5259]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </motion.button>
                          <span className="text-xs font-bold text-[#2C231E] w-4 text-center">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.8 }}
                            onClick={() => onUpdateQuantity(item.menuItem.id, 1)}
                            className="p-1 hover:text-[#7E5259]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </motion.button>
                        </div>

                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => onRemoveItem(item.menuItem.id)}
                          className="text-[#B3A297] hover:text-red-600 p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Bottom Checkout Summary */}
                <div className="p-5 bg-white border-t border-[#EAE1D5] space-y-3">
                  <div className="space-y-1.5 text-xs text-[#6B5D55]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-[#2C231E]">₹{subtotal.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes & Kitchen Service (5% GST)</span>
                      <span className="font-semibold text-[#2C231E]">₹{tax.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#2C231E] pt-2 border-t border-[#F0E8DE]">
                      <span>Total Amount</span>
                      <span className="text-[#7E5259]">₹{total.toFixed(0)}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full py-3.5 rounded-full bg-[#7E5259] hover:bg-[#673E45] text-white text-xs font-semibold uppercase tracking-[0.16em] flex items-center justify-center space-x-2 shadow-sm transition-colors"
                  >
                    <span>CONFIRM & PLACE ORDER</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
