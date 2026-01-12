"use client";

import { PriceTier } from "@/types";
import { useState } from "react";

interface PriceTierSelectorProps {
  pricing: PriceTier;
  onSelect: (tier: "budget" | "premium" | "luxury") => void;
  selectedTier?: "budget" | "premium" | "luxury";
}

export default function PriceTierSelector({
  pricing,
  onSelect,
  selectedTier = "premium"
}: PriceTierSelectorProps) {
  const [selected, setSelected] = useState<"budget" | "premium" | "luxury">(selectedTier);

  const handleSelect = (tier: "budget" | "premium" | "luxury") => {
    setSelected(tier);
    onSelect(tier);
  };

  const tiers = [
    { id: "budget", name: "Budget", data: pricing.budget, popular: false },
    { id: "premium", name: "Premium", data: pricing.premium, popular: true },
    { id: "luxury", name: "Luxury", data: pricing.luxury, popular: false },
  ] as const;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {tiers.map((tier) => (
        <button
          key={tier.id}
          onClick={() => handleSelect(tier.id)}
          className={`
            relative p-6 rounded-lg border-2 text-left transition-all duration-200
            ${selected === tier.id
              ? "border-accent bg-accent/5 shadow-lg scale-105"
              : "border-gray-200 hover:border-gray-300 hover:shadow-md"
            }
          `}
        >
          {/* Most Popular Badge */}
          {tier.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
              Most Popular
            </div>
          )}

          {/* Tier Name */}
          <h3 className="text-xl font-serif font-semibold text-primary mb-2">
            {tier.name}
          </h3>

          {/* Price */}
          <div className="mb-4">
            <span className="text-3xl font-bold text-primary">${tier.data.price}</span>
          </div>

          {/* Features */}
          <ul className="space-y-2">
            {tier.data.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-success mt-0.5">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* Selection Indicator */}
          <div className={`
            mt-4 pt-4 border-t border-gray-200 text-center font-medium
            ${selected === tier.id ? "text-accent" : "text-gray-500"}
          `}>
            {selected === tier.id ? "Selected ✓" : "Select"}
          </div>
        </button>
      ))}
    </div>
  );
}
