"use client";

import Image from "next/image";
import Link from "next/link";
import { Collection } from "@/types";
import { motion } from "framer-motion";

interface CollectionCardProps {
  collection: Collection;
  priority?: boolean;
}

export default function CollectionCard({ collection, priority = false }: CollectionCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link href={`/collections/${collection.id}`}>
        <div className="card overflow-hidden">
          {/* Image Container */}
          <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
            <Image
              src={collection.images.main}
              alt={collection.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm mb-2">{collection.roomCount} pieces</p>
                <p className="text-xs opacity-90 line-clamp-2">{collection.description}</p>
              </div>
            </div>

            {/* Style Badge */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
              {collection.style}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-serif font-semibold text-primary mb-1">
                  {collection.name}
                </h3>
                <p className="text-sm text-gray-600">{collection.theme}</p>
              </div>
            </div>

            {/* Color Palette Preview */}
            <div className="flex gap-1 mb-3">
              {collection.colorPalette.slice(0, 5).map((color, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full border border-gray-200"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            {/* Price and CTA */}
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-primary">
                From ${collection.price.budget.price}
              </p>
              <span className="text-accent font-medium group-hover:underline">
                View Collection →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
