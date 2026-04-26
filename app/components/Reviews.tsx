"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const reviews = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "Best matcha I had in Amsterdam… fresh stroopwafels were great… cheap price… staff very helpful.",
    source: "TripAdvisor",
    date: "March 2026",
  },
  {
    name: "Lucas T.",
    rating: 5,
    text: "I loved the stroopwafel with caramel and chocolate – warm, sweet, and so tasty! The cappuccino was smooth and creamy.",
    source: "TripAdvisor",
    date: "February 2026",
  },
  {
    name: "Emma K.",
    rating: 5,
    text: "Cozy small coffee shop… quiet place… friendly service. Perfect for a morning break while exploring Amsterdam.",
    source: "Google",
    date: "January 2026",
  },
  {
    name: "James R.",
    rating: 5,
    text: "Made-to-order warm stroopwafel… perfect pit stop after walking around. The staff remembered our order from last time!",
    source: "TripAdvisor",
    date: "December 2025",
  },
];

const praises = [
  "Quality Coffee & Matcha",
  "Fresh Waffles",
  "Warm & Inviting",
  "Helpful Staff",
  "Central Location",
  "Great Value",
];

export default function Reviews() {
  return (
    <section id="reviews" className="relative py-24 md:py-32 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-gold rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-caramel rounded-full blur-[96px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gold/10 dark:bg-gold/20 border border-gold/20">
            <span className="text-gold text-sm font-medium">Guest Reviews</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-coffee-dark dark:text-dark-text mb-4">
            Why Guests <span className="text-caramel">Love Us</span>
          </h2>
          <p className="text-coffee-medium dark:text-dark-text-muted text-lg max-w-2xl mx-auto">
            100% excellent ratings on TripAdvisor &amp; Google. Ranked in the top 30% of Amsterdam restaurants.
          </p>
        </ScrollReveal>

        {/* Rating hero */}
        <ScrollReveal delay={0.1} className="mb-16">
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { platform: "TripAdvisor", rating: "5.0", reviews: "10 reviews", color: "bg-sage" },
              { platform: "Google", rating: "5.0", reviews: "Aggregated", color: "bg-caramel" },
            ].map((p) => (
              <div key={p.platform} className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-cream dark:bg-dark-card border border-caramel/10 dark:border-dark-border">
                <div className={`w-12 h-12 ${p.color} rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
                  {p.rating}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-sm text-coffee-medium dark:text-dark-text-muted">
                    <span className="font-semibold text-coffee-dark dark:text-dark-text">{p.platform}</span> · {p.reviews}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Review cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((review, i) => (
            <ScrollReveal key={review.name} delay={0.1 * i}>
              <motion.div
                whileHover={{ y: -4 }}
                className="p-6 md:p-8 rounded-2xl bg-cream dark:bg-dark-card border border-caramel/10 dark:border-dark-border shadow-sm hover:shadow-lg hover:shadow-caramel/5 transition-all duration-300"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-coffee-dark dark:text-dark-text text-lg leading-relaxed mb-6 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-caramel/20 flex items-center justify-center text-caramel font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-coffee-dark dark:text-dark-text text-sm">{review.name}</div>
                      <div className="text-xs text-warm-gray dark:text-dark-text-muted">{review.date}</div>
                    </div>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-sage/10 text-sage dark:text-sage-light font-medium">{review.source}</span>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Common praises */}
        <ScrollReveal delay={0.3} className="mt-12">
          <div className="text-center">
            <p className="text-sm text-warm-gray dark:text-dark-text-muted mb-4 font-medium uppercase tracking-wider">What guests love most</p>
            <div className="flex flex-wrap justify-center gap-3">
              {praises.map((p) => (
                <span key={p} className="px-4 py-2 rounded-full bg-caramel/10 dark:bg-caramel/15 text-caramel-dark dark:text-caramel-light font-medium text-sm border border-caramel/15">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
