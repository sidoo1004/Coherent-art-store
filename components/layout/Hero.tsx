"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const heroImages = [
  "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1582201957195-65f5e6d9f96a?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=1200&h=800&fit=crop",
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effect - images move faster than scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Rotate images as you scroll
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      // Change image every 20% scroll
      const newIndex = Math.floor(latest * 5) % heroImages.length;
      setCurrentIndex(newIndex);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // Get 4 consecutive images starting from current index
  const visibleImages = [
    heroImages[currentIndex % heroImages.length],
    heroImages[(currentIndex + 1) % heroImages.length],
    heroImages[(currentIndex + 2) % heroImages.length],
    heroImages[(currentIndex + 3) % heroImages.length],
  ];

  return (
    <div ref={containerRef} className="relative h-[100vh] overflow-hidden">
      {/* Image Container with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 flex flex-col"
      >
        {visibleImages.map((image, index) => (
          <motion.div
            key={`${currentIndex}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative flex-1 min-h-0"
          >
            {/* Image */}
            <div className="absolute inset-0">
              <Image
                src={image}
                alt={`Art collection ${index + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
              />
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
          </motion.div>
        ))}
      </motion.div>

      {/* Headline Text - Centered */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-4">
            Stop Guessing.
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6">
            Start Decorating
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
            with Confidence.
          </h2>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/quiz"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent hover:text-white transition-all duration-300 shadow-xl"
            >
              Find Your Perfect Collection
            </a>
            <a
              href="/collections"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-all duration-300"
            >
              Browse Collections
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Soft Fade at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />
    </div>
  );
}
