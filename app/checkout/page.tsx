"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCartStore } from "@/lib/store/cartStore";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>();

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const onSubmit = async (data: CheckoutForm) => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // TODO: Backend integration for payment processing
    console.log("Order data:", { ...data, items, total: getTotal() });

    clearCart();
    router.push("/checkout/success");
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-custom max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8">
            Checkout
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Information */}
                <div className="card p-6">
                  <h2 className="text-xl font-serif font-semibold text-primary mb-6">
                    Contact Information
                  </h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="input-field"
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="text-error text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="card p-6">
                  <h2 className="text-xl font-serif font-semibold text-primary mb-6">
                    Shipping Address
                  </h2>

                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          {...register("firstName", { required: "First name is required" })}
                          className="input-field"
                        />
                        {errors.firstName && (
                          <p className="text-error text-sm mt-1">{errors.firstName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          {...register("lastName", { required: "Last name is required" })}
                          className="input-field"
                        />
                        {errors.lastName && (
                          <p className="text-error text-sm mt-1">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        {...register("address", { required: "Address is required" })}
                        className="input-field"
                        placeholder="123 Main St, Apt 4B"
                      />
                      {errors.address && (
                        <p className="text-error text-sm mt-1">{errors.address.message}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          {...register("city", { required: "City is required" })}
                          className="input-field"
                        />
                        {errors.city && (
                          <p className="text-error text-sm mt-1">{errors.city.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          {...register("state", { required: "State is required" })}
                          className="input-field"
                        />
                        {errors.state && (
                          <p className="text-error text-sm mt-1">{errors.state.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          {...register("zipCode", {
                            required: "ZIP code is required",
                            pattern: {
                              value: /^\d{5}(-\d{4})?$/,
                              message: "Invalid ZIP code",
                            },
                          })}
                          className="input-field"
                        />
                        {errors.zipCode && (
                          <p className="text-error text-sm mt-1">{errors.zipCode.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="card p-6">
                  <h2 className="text-xl font-serif font-semibold text-primary mb-6">
                    Payment Information
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        {...register("cardNumber", {
                          required: "Card number is required",
                          pattern: {
                            value: /^\d{16}$/,
                            message: "Invalid card number",
                          },
                        })}
                        className="input-field"
                        placeholder="1234 5678 9012 3456"
                        maxLength={16}
                      />
                      {errors.cardNumber && (
                        <p className="text-error text-sm mt-1">{errors.cardNumber.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          {...register("cardExpiry", {
                            required: "Expiry date is required",
                            pattern: {
                              value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                              message: "Use MM/YY format",
                            },
                          })}
                          className="input-field"
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                        {errors.cardExpiry && (
                          <p className="text-error text-sm mt-1">{errors.cardExpiry.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVC *
                        </label>
                        <input
                          type="text"
                          {...register("cardCvc", {
                            required: "CVC is required",
                            pattern: {
                              value: /^\d{3,4}$/,
                              message: "Invalid CVC",
                            },
                          })}
                          className="input-field"
                          placeholder="123"
                          maxLength={4}
                        />
                        {errors.cardCvc && (
                          <p className="text-error text-sm mt-1">{errors.cardCvc.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-center gap-2 text-sm text-gray-600">
                    <span>🔒</span>
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="card p-6 sticky top-24">
                  <h2 className="text-xl font-serif font-semibold text-primary mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.collection.id} className="flex gap-3">
                        <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                          <Image
                            src={item.collection.images.main}
                            alt={item.collection.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-primary truncate">
                            {item.collection.name}
                          </p>
                          <p className="text-xs text-gray-600 capitalize">
                            {item.selectedTier} • Qty: {item.quantity}
                          </p>
                          <p className="text-sm font-semibold text-primary mt-1">
                            ${item.collection.price[item.selectedTier].price * item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span className="font-medium">${getTotal()}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Shipping</span>
                      <span className="font-medium text-success">FREE</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-lg font-semibold text-primary">
                        <span>Total</span>
                        <span>${getTotal()}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? "Processing..." : "Complete Order"}
                  </button>

                  <p className="text-xs text-gray-600 text-center mt-4">
                    By completing your order, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
