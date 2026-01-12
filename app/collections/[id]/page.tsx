"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { mockCollections } from "@/lib/data/mockData";
import PriceTierSelector from "@/components/ui/PriceTierSelector";
import RoomMockup from "@/components/ui/RoomMockup";
import TrustBadge from "@/components/ui/TrustBadge";
import { useCartStore } from "@/lib/store/cartStore";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CollectionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const collection = mockCollections.find((c) => c.id === id);

  const [selectedTier, setSelectedTier] = useState<"budget" | "premium" | "luxury">("premium");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  if (!collection) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem(collection, selectedTier);
    // Show success message or redirect
    alert("Collection added to cart!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span>/</span>
            <Link href="/collections" className="hover:text-accent">Collections</Link>
            <span>/</span>
            <span className="text-primary font-medium">{collection.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={collection.images.gallery[selectedImageIndex]}
                alt={collection.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-3 gap-4">
              {collection.images.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                    selectedImageIndex === index
                      ? "ring-2 ring-accent scale-105"
                      : "ring-1 ring-gray-200 hover:ring-accent"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${collection.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Collection Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Title and Theme */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                  {collection.style}
                </span>
                <span className="text-gray-600">{collection.roomCount} pieces</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-3">
                {collection.name}
              </h1>
              <p className="text-xl text-gray-600">{collection.theme} Collection</p>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">
              {collection.description}
            </p>

            {/* Color Palette */}
            <div>
              <h3 className="text-sm font-semibold text-primary mb-3">Color Palette</h3>
              <div className="flex gap-2">
                {collection.colorPalette.map((color, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 rounded-lg border-2 border-gray-200 shadow-sm"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3">
              <TrustBadge
                icon="🚚"
                text="Free Shipping"
                subtext="On all orders"
              />
              <TrustBadge
                icon="↩️"
                text="Easy Returns"
                subtext="30-day guarantee"
              />
              <TrustBadge
                icon="✓"
                text="Quality Assured"
                subtext="Premium materials"
              />
              <TrustBadge
                icon="🎨"
                text="Pre-Coordinated"
                subtext="Works together"
              />
            </div>

            {/* Quick Add to Cart */}
            <div className="bg-accent/5 rounded-xl p-6 space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">
                  ${collection.price[selectedTier].price}
                </span>
                <span className="text-gray-600">{selectedTier} tier</span>
              </div>
              <button
                onClick={handleAddToCart}
                className="btn-primary w-full"
              >
                Add to Cart
              </button>
              <p className="text-sm text-gray-600 text-center">
                Choose your quality tier below
              </p>
            </div>
          </motion.div>
        </div>

        {/* Pricing Tiers */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-primary text-center mb-8">
            Choose Your Quality Tier
          </h2>
          <PriceTierSelector
            pricing={collection.price}
            onSelect={setSelectedTier}
            selectedTier={selectedTier}
          />
        </motion.section>

        {/* What's Included */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-primary mb-8">
            What's Included
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collection.pieces.map((piece) => (
              <div key={piece.id} className="card p-4">
                <div className="relative aspect-[3/4] mb-4 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={piece.thumbnail}
                    alt={piece.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="font-semibold text-primary mb-2">{piece.name}</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">Room:</span> {piece.room}
                  </p>
                  <p>
                    <span className="font-medium">Size:</span> {piece.dimensions.width}" × {piece.dimensions.height}"
                  </p>
                  <p>
                    <span className="font-medium">Placement:</span> {piece.recommendedPlacement}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Room Mockups */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-primary mb-4">
            See It in Your Space
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Explore how each piece looks in different rooms. Click through the room tabs to see
            realistic mockups with dimensions and placement recommendations.
          </p>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <RoomMockup pieces={collection.pieces} />
          </div>
        </motion.section>

        {/* Style Consistency Promise */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-primary to-primary-light text-white rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-serif font-bold mb-4">
            Designed as a Set, Not as Separate Pieces
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Every collection is carefully curated with color harmony, style consistency, and flow
            in mind. No more guesswork—just beautiful, cohesive design throughout your home.
          </p>
          <button
            onClick={handleAddToCart}
            className="btn-secondary"
          >
            Add Complete Collection to Cart
          </button>
        </motion.section>
      </div>
    </div>
  );
}
