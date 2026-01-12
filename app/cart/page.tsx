"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import TrustBadge from "@/components/ui/TrustBadge";
import { motion } from "framer-motion";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart, proceedToCheckout } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const checkoutUrl = await proceedToCheckout();

      // Redirect to Shopify checkout
      if (checkoutUrl && checkoutUrl !== '/checkout') {
        window.location.href = checkoutUrl;
      } else {
        // Fallback for mock mode - go to local checkout
        window.location.href = '/checkout';
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an error creating your checkout. Please try again.');
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-3xl font-serif font-bold text-primary">Your Cart is Empty</h1>
          <p className="text-gray-600 max-w-md">
            Discover our pre-coordinated collections and start decorating with confidence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quiz" className="btn-primary">
              Take Style Quiz
            </Link>
            <Link href="/collections" className="btn-outline">
              Browse Collections
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8">
            Your Cart
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Collection Integrity Message */}
              <div className="bg-accent/10 border-2 border-accent/20 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✨</span>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">
                      Designed to Work Together
                    </h3>
                    <p className="text-sm text-gray-700">
                      These collections are pre-coordinated to create perfect harmony throughout your home. Each piece is designed to complement the others.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cart Items List */}
              {items.map((item) => (
                <div key={item.collection.id} className="card p-6">
                  <div className="flex gap-6">
                    {/* Image */}
                    <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={item.collection.images.main}
                        alt={item.collection.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-serif font-semibold text-primary mb-1">
                            {item.collection.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {item.collection.style} • {item.collection.roomCount} pieces
                          </p>
                          <p className="text-sm text-accent font-medium mt-1 capitalize">
                            {item.selectedTier} Tier
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.collection.id)}
                          className="text-gray-400 hover:text-error transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.collection.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg border border-gray-300 hover:border-accent hover:bg-accent/5 transition-colors flex items-center justify-center"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.collection.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg border border-gray-300 hover:border-accent hover:bg-accent/5 transition-colors flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-xl font-bold text-primary">
                            ${item.collection.price[item.selectedTier].price * item.quantity}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-gray-600">
                              ${item.collection.price[item.selectedTier].price} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <div className="flex justify-between items-center pt-4">
                <Link href="/collections" className="text-accent font-medium hover:underline">
                  ← Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-error hover:underline text-sm"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h2 className="text-xl font-serif font-semibold text-primary mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-medium">${getTotal()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="font-medium text-success">FREE</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-semibold text-primary">
                      <span>Total</span>
                      <span>${getTotal()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="btn-primary w-full block text-center mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : 'Proceed to Secure Checkout'}
                </button>

                <p className="text-xs text-gray-600 text-center mb-4">
                  You will be redirected to our secure Shopify checkout
                </p>

                {/* Trust Badges */}
                <div className="space-y-3 mt-6 pt-6 border-t border-gray-200">
                  <TrustBadge icon="🔒" text="Secure Checkout" subtext="Powered by Shopify" />
                  <TrustBadge icon="🚚" text="Free Shipping" />
                  <TrustBadge icon="↩️" text="30-Day Returns" />
                </div>

                {/* Promo Code */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">Have a promo code?</p>
                  <p className="text-xs text-gray-600">Apply it at checkout</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
