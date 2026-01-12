"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-background-warm to-background py-20 md:py-32 overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary leading-tight">
                Stop Guessing.
                <br />
                <span className="text-accent">Start Decorating</span>
                <br />
                with Confidence.
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-xl">
                Pre-coordinated art collections designed to flow seamlessly through your entire home
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quiz" className="btn-primary text-center">
                Find Your Perfect Collection
              </Link>
              <Link href="/collections" className="btn-outline text-center">
                Browse Collections
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <span className="text-sm font-medium">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <span className="text-sm font-medium">30-Day Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <span className="text-sm font-medium">Satisfaction Guaranteed</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Before/After Comparison */}
            <div className="grid grid-cols-2 gap-4">
              {/* Before */}
              <div className="space-y-2">
                <div className="bg-red-100 px-3 py-1 rounded-full inline-block">
                  <span className="text-sm font-medium text-red-700">Before</span>
                </div>
                <div className="card p-4 space-y-3">
                  <div className="aspect-[3/4] bg-gray-200 rounded relative overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400"
                      alt="Mismatched art"
                      fill
                      className="object-cover opacity-60"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600">❌ Decision Paralysis</p>
                    <p className="text-sm font-medium text-gray-600">❌ Mismatched Styles</p>
                    <p className="text-sm font-medium text-gray-600">❌ Hours Wasted</p>
                  </div>
                </div>
              </div>

              {/* After */}
              <div className="space-y-2">
                <div className="bg-green-100 px-3 py-1 rounded-full inline-block">
                  <span className="text-sm font-medium text-green-700">After</span>
                </div>
                <div className="card p-4 space-y-3 ring-2 ring-accent">
                  <div className="aspect-[3/4] bg-gray-100 rounded relative overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400"
                      alt="Coordinated collection"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-success">✓ Perfect Harmony</p>
                    <p className="text-sm font-medium text-success">✓ Cohesive Design</p>
                    <p className="text-sm font-medium text-success">✓ Instant Confidence</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}
