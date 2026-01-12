"use client";

import Link from "next/link";
import { mockCollections } from "@/lib/data/mockData";
import CollectionCard from "@/components/ui/CollectionCard";
import { motion } from "framer-motion";

export default function CollectionPreview() {
  const featuredCollections = mockCollections.filter(c => c.featured).slice(0, 3);

  return (
    <section className="py-20 bg-background-warm">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Featured Collections
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Each collection is thoughtfully curated to create perfect harmony across your spaces
          </p>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCollections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CollectionCard collection={collection} priority={index === 0} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link href="/collections" className="btn-primary inline-block">
            View All Collections
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
