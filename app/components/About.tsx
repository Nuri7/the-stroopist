"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-caramel rounded-full blur-[128px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sage rounded-full blur-[96px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden img-zoom warm-glow">
                <Image
                  src="/the-stroopist/cafe-interior.png"
                  alt="The cozy interior of The Stroopist café in Amsterdam"
                  width={640}
                  height={480}
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-caramel text-white p-5 rounded-2xl shadow-xl shadow-caramel/20">
                <div className="text-center">
                  <div className="text-3xl font-bold font-serif">5.0</div>
                  <div className="flex gap-0.5 justify-center my-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-xs font-medium opacity-90">TripAdvisor</div>
                </div>
              </div>
              {/* Decorative corner accent */}
              <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-caramel/30 rounded-2xl" />
            </div>
          </ScrollReveal>

          {/* Text side */}
          <ScrollReveal direction="right" delay={0.15}>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-sage/10 dark:bg-sage/20 border border-sage/20">
                <span className="text-sage dark:text-sage-light text-sm font-medium">Our Story</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-coffee-dark dark:text-dark-text leading-tight mb-6">
                A Taste of{" "}
                <span className="text-caramel">Dutch Heritage</span>{" "}
                in Every Bite
              </h2>

              <div className="space-y-5 text-coffee-medium dark:text-dark-text-muted text-lg leading-relaxed">
                <p>
                  The Stroopist is a charming specialty café located in the vibrant heart of Amsterdam.
                  We celebrate Dutch tradition with our fresh, made-to-order stroopwafels while pairing
                  them with world-class specialty coffee, Japanese matcha, Indian chai, and fresh smoothies.
                </p>
                <p>
                  Whether you&apos;re grabbing a quick takeaway waffle on your way to Dam Square, settling in
                  for a relaxing breakfast, or enjoying a peaceful matcha moment, The Stroopist offers
                  warm hospitality and high-quality ingredients in a cozy, welcoming space.
                </p>
                <p className="font-medium text-coffee-dark dark:text-dark-text">
                  Come experience why locals and travelers keep coming back for our signature
                  stroopwafels and exceptional drinks!
                </p>
              </div>

              {/* Features grid */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { icon: "🧇", label: "Made-to-Order Waffles" },
                  { icon: "☕", label: "Specialty Coffee" },
                  { icon: "🍵", label: "Japanese Matcha" },
                  { icon: "🥤", label: "Fresh Smoothies" },
                ].map((feature) => (
                  <div
                    key={feature.label}
                    className="flex items-center gap-3 p-3 rounded-xl bg-cream dark:bg-dark-card border border-caramel/10 dark:border-dark-border"
                  >
                    <span className="text-2xl">{feature.icon}</span>
                    <span className="text-sm font-medium text-coffee-dark dark:text-dark-text">
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
