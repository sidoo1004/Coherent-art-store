"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Take Our Style Quiz",
      description: "Answer 8 quick questions to discover your perfect match. Takes just 2 minutes.",
      icon: "✨",
      cta: { text: "Start Quiz", href: "/quiz" }
    },
    {
      number: "02",
      title: "Preview in Your Space",
      description: "See realistic room mockups showing exactly how each piece looks in context.",
      icon: "🏠",
      cta: { text: "See Examples", href: "/collections" }
    },
    {
      number: "03",
      title: "Order with Confidence",
      description: "Choose your quality tier and we'll deliver ready-to-hang art designed to work together.",
      icon: "📦",
      cta: { text: "Browse Collections", href: "/collections" }
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
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
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From overwhelmed to overjoyed in three simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Connector Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-accent to-transparent -z-10" />
              )}

              <div className="text-center space-y-4">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full text-4xl mb-4">
                  {step.icon}
                </div>

                {/* Number */}
                <div className="text-5xl font-serif font-bold text-accent/20">
                  {step.number}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-serif font-semibold text-primary">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600">
                  {step.description}
                </p>

                {/* CTA */}
                <Link
                  href={step.cta.href}
                  className="inline-block text-accent font-medium hover:underline"
                >
                  {step.cta.text} →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center bg-gradient-to-br from-primary to-primary-light text-white rounded-2xl p-12"
        >
          <h3 className="text-3xl font-serif font-bold mb-4">
            Ready to Transform Your Home?
          </h3>
          <p className="text-lg mb-8 opacity-90">
            Take our 2-minute style quiz and get personalized collection recommendations
          </p>
          <Link href="/quiz" className="btn-secondary inline-block">
            Find Your Perfect Collection
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
