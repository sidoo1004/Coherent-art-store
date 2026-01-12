"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { mockCollections } from "@/lib/data/mockData";
import CollectionCard from "@/components/ui/CollectionCard";
import { motion } from "framer-motion";
import { Suspense } from "react";

function QuizResultsContent() {
  const searchParams = useSearchParams();
  const style = searchParams.get("style");
  const mood = searchParams.get("mood");
  const budget = searchParams.get("budget");

  // Filter collections based on quiz answers
  const matchedCollections = mockCollections.filter((collection) => {
    let matches = 0;

    // Style match (most important)
    if (style && collection.style === style) {
      matches += 3;
    }

    // Budget match
    if (budget?.includes("Budget") && collection.price.budget.price < 150) {
      matches += 2;
    } else if (budget?.includes("Premium") && collection.price.premium.price < 250) {
      matches += 2;
    } else if (budget?.includes("Luxury")) {
      matches += 2;
    }

    return matches > 0;
  });

  // Sort by match score and take top 3
  const topMatches = matchedCollections.slice(0, 3);

  const getMatchPercentage = (index: number) => {
    if (index === 0) return 95;
    if (index === 1) return 87;
    return 82;
  };

  const getMatchReasons = (collection: typeof mockCollections[0]) => {
    const reasons: string[] = [];

    if (collection.style === style) {
      reasons.push(`Matches your ${style} preference`);
    }

    if (mood?.includes("Calming") && collection.theme === "Water Journey") {
      reasons.push("Creates the calming atmosphere you desire");
    }

    if (collection.roomCount >= 5) {
      reasons.push("Covers multiple rooms for cohesive flow");
    }

    reasons.push("Pre-coordinated for instant confidence");

    return reasons;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent to-accent-dark text-white py-20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4">
              <span className="text-6xl">🎉</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              Your Perfect Matches
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Based on your style preferences, we've found {topMatches.length} collections that are perfect for you
            </p>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="container-custom">
          <div className="space-y-12">
            {topMatches.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="grid md:grid-cols-5 gap-8 p-8">
                  {/* Collection Preview */}
                  <div className="md:col-span-2">
                    <CollectionCard collection={collection} priority={index === 0} />
                  </div>

                  {/* Match Details */}
                  <div className="md:col-span-3 flex flex-col justify-center space-y-6">
                    {/* Match Badge */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
                          <span className="text-2xl font-bold text-accent">
                            {getMatchPercentage(index)}%
                          </span>
                        </div>
                        {index === 0 && (
                          <div className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">
                            Best Match
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-2xl font-serif font-bold text-primary">
                          {collection.name}
                        </h3>
                        <p className="text-gray-600">{collection.style}</p>
                      </div>
                    </div>

                    {/* Why This Matches */}
                    <div>
                      <h4 className="font-semibold text-primary mb-3">Why we matched you:</h4>
                      <ul className="space-y-2">
                        {getMatchReasons(collection).map((reason, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-success mt-1">✓</span>
                            <span className="text-gray-700">{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="flex gap-4">
                      <Link
                        href={`/collections/${collection.id}`}
                        className="btn-primary"
                      >
                        View Collection
                      </Link>
                      <Link
                        href="/collections"
                        className="btn-outline"
                      >
                        See All Options
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Explore More */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center bg-gradient-to-br from-primary to-primary-light text-white rounded-2xl p-12"
          >
            <h2 className="text-3xl font-serif font-bold mb-4">
              Want to Explore More?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              These are your top matches, but we have many more beautiful collections to discover
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/collections" className="btn-secondary">
                Browse All Collections
              </Link>
              <Link href="/quiz" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
                Retake Quiz
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default function QuizResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading your results...</div>}>
      <QuizResultsContent />
    </Suspense>
  );
}
