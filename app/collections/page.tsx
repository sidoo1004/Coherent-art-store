"use client";

import { useState } from "react";
import { mockCollections } from "@/lib/data/mockData";
import CollectionCard from "@/components/ui/CollectionCard";
import { motion } from "framer-motion";

export default function CollectionsPage() {
  const [selectedTheme, setSelectedTheme] = useState<string>("All");
  const [selectedStyle, setSelectedStyle] = useState<string>("All");
  const [selectedRoomCount, setSelectedRoomCount] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<string>("All");

  const themes = ["All", "Seasons", "Water", "Urban Life", "Light & Shadow"];
  const styles = ["All", "Abstract Minimalism", "Impressionist Realism", "Bold Contemporary"];
  const roomCounts = ["All", "3 pieces", "5 pieces", "7 pieces"];
  const priceRanges = [
    { label: "All", min: 0, max: Infinity },
    { label: "Budget ($89-149)", min: 89, max: 149 },
    { label: "Premium ($150-249)", min: 150, max: 249 },
    { label: "Luxury ($250-399)", min: 250, max: 399 },
  ];

  // Filter collections
  const filteredCollections = mockCollections.filter((collection) => {
    const themeMatch = selectedTheme === "All" || collection.theme === selectedTheme;
    const styleMatch = selectedStyle === "All" || collection.style === selectedStyle;

    const roomCountMatch =
      selectedRoomCount === "All" ||
      (selectedRoomCount === "3 pieces" && collection.roomCount === 3) ||
      (selectedRoomCount === "5 pieces" && collection.roomCount === 5) ||
      (selectedRoomCount === "7 pieces" && collection.roomCount === 7);

    const selectedPriceRange = priceRanges.find(r => r.label === priceRange);
    const budgetPrice = collection.price.budget.price;
    const priceMatch =
      !selectedPriceRange ||
      priceRange === "All" ||
      (budgetPrice >= selectedPriceRange.min && budgetPrice <= selectedPriceRange.max);

    return themeMatch && styleMatch && roomCountMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-light text-white py-20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              Art Collections
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Discover pre-coordinated collections designed to bring harmony to your entire home
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Collections */}
      <section className="py-12">
        <div className="container-custom">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-12">
            <h2 className="text-xl font-semibold text-primary mb-6">Filter Collections</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Theme Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="input-field"
                >
                  {themes.map((theme) => (
                    <option key={theme} value={theme}>
                      {theme}
                    </option>
                  ))}
                </select>
              </div>

              {/* Style Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Style
                </label>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="input-field"
                >
                  {styles.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </div>

              {/* Room Count Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Count
                </label>
                <select
                  value={selectedRoomCount}
                  onChange={(e) => setSelectedRoomCount(e.target.value)}
                  className="input-field"
                >
                  {roomCounts.map((count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="input-field"
                >
                  {priceRanges.map((range) => (
                    <option key={range.label} value={range.label}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters Summary */}
            {(selectedTheme !== "All" ||
              selectedStyle !== "All" ||
              selectedRoomCount !== "All" ||
              priceRange !== "All") && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Active filters:</span>
                {selectedTheme !== "All" && (
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                    {selectedTheme}
                  </span>
                )}
                {selectedStyle !== "All" && (
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                    {selectedStyle}
                  </span>
                )}
                {selectedRoomCount !== "All" && (
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                    {selectedRoomCount}
                  </span>
                )}
                {priceRange !== "All" && (
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                    {priceRange}
                  </span>
                )}
                <button
                  onClick={() => {
                    setSelectedTheme("All");
                    setSelectedStyle("All");
                    setSelectedRoomCount("All");
                    setPriceRange("All");
                  }}
                  className="text-sm text-accent hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-primary">{filteredCollections.length}</span> collection{filteredCollections.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Collections Grid */}
          {filteredCollections.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCollections.map((collection, index) => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <CollectionCard collection={collection} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-4">
                No collections match your filters
              </p>
              <button
                onClick={() => {
                  setSelectedTheme("All");
                  setSelectedStyle("All");
                  setSelectedRoomCount("All");
                  setPriceRange("All");
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
