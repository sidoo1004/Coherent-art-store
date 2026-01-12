"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
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
              About CoherentArt
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Making home decoration simple, confident, and beautiful
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-serif font-bold text-primary mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We noticed a common problem: homeowners were spending hours—sometimes weeks—trying
                  to coordinate art for their spaces. Endless scrolling, decision paralysis, and the
                  nagging worry: "Will these pieces actually work together?"
                </p>
                <p>
                  The result? Beautiful art sitting in carts, never purchased. Walls staying bare.
                  Homes missing that final touch that makes them feel complete.
                </p>
                <p>
                  So we created a solution: pre-coordinated art collections designed by AI and curated
                  by design experts. Each collection is thoughtfully composed to work harmoniously
                  across multiple rooms, taking the guesswork out of home decoration.
                </p>
                <p className="font-semibold text-primary">
                  No more decision paralysis. No more coordination confusion. Just confident,
                  beautiful choices.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800"
                alt="Beautiful home interior"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Collections Matter */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-primary mb-4">
              Why Collections Matter
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The psychology and benefits of cohesive design
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🧠",
                title: "Reduces Decision Fatigue",
                description: "Studies show that too many choices lead to decision paralysis. Our collections eliminate 90% of the decisions, letting you focus on what you love."
              },
              {
                icon: "⏰",
                title: "Saves Hours of Time",
                description: "The average homeowner spends 8+ hours coordinating art. Our collections do that work for you, condensing your decision to just minutes."
              },
              {
                icon: "✨",
                title: "Creates Visual Flow",
                description: "Professional designers know: cohesive color palettes and styles create harmony. Our collections bring that professional touch to your home."
              },
              {
                icon: "💡",
                title: "Builds Confidence",
                description: "No more second-guessing. You'll know with certainty that your art will work together beautifully before you buy."
              },
              {
                icon: "🎨",
                title: "Ensures Quality",
                description: "Each piece is AI-generated and expertly curated, ensuring consistent quality and style throughout your collection."
              },
              {
                icon: "🏠",
                title: "Transforms Spaces",
                description: "Coordinated art doesn't just decorate walls—it transforms your entire home into a cohesive, intentional space you'll love."
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-serif font-semibold text-primary mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-700">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-primary mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              How we create collections that work
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "1",
                title: "AI Generation",
                description: "We use advanced AI to generate unique, high-quality art pieces based on proven design principles and color theory."
              },
              {
                step: "2",
                title: "Expert Curation",
                description: "Our design team reviews each piece, ensuring quality and selecting combinations that work harmoniously together."
              },
              {
                step: "3",
                title: "Collection Assembly",
                description: "We group pieces by theme, style, and color palette, creating collections designed to flow through your entire home."
              },
              {
                step: "4",
                title: "Room Mockup Creation",
                description: "We create realistic room mockups so you can see exactly how each piece will look in context before you buy."
              },
              {
                step: "5",
                title: "Quality Printing",
                description: "Collections are printed on premium materials with museum-quality inks for vibrant, long-lasting beauty."
              }
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {process.step}
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-semibold text-primary mb-2">
                    {process.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{process.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Commitment */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-serif font-bold text-primary mb-4">
              Our Quality Commitment
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🖼️",
                title: "Premium Materials",
                description: "Museum-quality prints on archival paper"
              },
              {
                icon: "🎨",
                title: "Color Accuracy",
                description: "Professionally calibrated printing process"
              },
              {
                icon: "📦",
                title: "Careful Packaging",
                description: "Protected shipping for perfect arrival"
              },
              {
                icon: "✓",
                title: "Satisfaction Guaranteed",
                description: "30-60 day returns, no questions asked"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary to-primary-light text-white rounded-2xl p-12 text-center"
          >
            <h2 className="text-4xl font-serif font-bold mb-4">
              Ready to Transform Your Home?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Take our 2-minute style quiz and discover your perfect collection
            </p>
            <Link href="/quiz" className="btn-secondary inline-block">
              Find Your Perfect Collection
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
