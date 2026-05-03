"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { getActiveMenuSections, toppings } from "../data/menu";

// Build the category list from centralized data
const menuCategories = getActiveMenuSections().map((section) => ({
  id: section.id,
  label: section.title,
  emoji: section.emoji || "📋",
  image: section.categoryImage || "/breakfast-spread.png",
  imageAlt: `${section.title} at The Stroopist Amsterdam`,
  note: section.note,
  items: section.items.map((item) => ({
    name: item.name,
    price: item.price,
    note: item.note,
  })),
}));

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("stroopwafels");
  const active = menuCategories.find((c) => c.id === activeCategory)!;

  return (
    <section id="menu" className="relative py-24 md:py-32 bg-warm-white dark:bg-dark-surface overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-caramel/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-caramel/10 dark:bg-caramel/20 border border-caramel/20">
            <span className="text-caramel text-sm font-medium">Our Menu</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-coffee-dark dark:text-dark-text mb-4">
            Signature <span className="text-caramel">Offerings</span>
          </h2>
          <p className="text-coffee-medium dark:text-dark-text-muted text-lg max-w-2xl mx-auto">
            From our famous made-to-order stroopwafels to specialty coffee from Ethiopia, Colombia &amp; Brazil — every item is crafted with love.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex gap-2 overflow-x-auto pb-4 mb-12 -mx-4 px-4" style={{ scrollbarWidth: "none" }}>
            {menuCategories.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-caramel text-white shadow-lg shadow-caramel/25"
                    : "bg-cream dark:bg-dark-card text-coffee-medium dark:text-dark-text-muted hover:bg-caramel/10 border border-caramel/10 dark:border-dark-border"
                }`}>
                <span>{cat.emoji}</span><span>{cat.label}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="relative rounded-2xl overflow-hidden img-zoom h-64 md:h-80 lg:h-full lg:min-h-[400px]">
              <Image src={active.image} alt={active.imageAlt} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-1">{active.emoji} {active.label}</h3>
                {active.note && <p className="text-cream/80 text-sm">{active.note}</p>}
              </div>
            </div>

            <div className="space-y-1">
              {active.items.map((item, i) => (
                <motion.div key={item.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}
                  className="group flex items-baseline gap-3 py-4 border-b border-caramel/10 dark:border-dark-border last:border-0 hover:bg-caramel/5 -mx-3 px-3 rounded-lg transition-colors">
                  <span className="font-medium text-coffee-dark dark:text-dark-text group-hover:text-caramel transition-colors">{item.name}</span>
                  {item.note && <span className="text-xs px-2 py-0.5 rounded-full bg-caramel/10 text-caramel font-medium">{item.note}</span>}
                  <span className="flex-1 border-b border-dotted border-caramel/20 dark:border-dark-border mx-1 mb-1" />
                  <span className="font-semibold text-caramel whitespace-nowrap">{item.price}</span>
                </motion.div>
              ))}

              {activeCategory === "stroopwafels" && (
                <div className="mt-8 p-5 rounded-xl bg-cream dark:bg-dark-card border border-caramel/10 dark:border-dark-border">
                  <h4 className="font-semibold text-coffee-dark dark:text-dark-text mb-3">🎨 Customise Your Toppings — €2.00 – €3.00</h4>
                  <div className="flex flex-wrap gap-2">
                    {toppings.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-lg bg-caramel/10 text-sm text-coffee-medium dark:text-dark-text-muted">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {(activeCategory === "coffee" || activeCategory === "iced") && (
                <div className="mt-8 p-5 rounded-xl bg-cream dark:bg-dark-card border border-caramel/10 dark:border-dark-border">
                  <h4 className="font-semibold text-coffee-dark dark:text-dark-text mb-3">➕ Extras</h4>
                  <div className="space-y-2 text-sm text-coffee-medium dark:text-dark-text-muted">
                    <div className="flex justify-between"><span>Oat / Almond / Soya / Coconut milk</span><span className="font-semibold text-caramel">+€0.50</span></div>
                    <div className="flex justify-between"><span>Extra coffee shot</span><span className="font-semibold text-caramel">+€1.00</span></div>
                    <div className="flex justify-between"><span>Syrup (any flavour)</span><span className="font-semibold text-caramel">+€0.50</span></div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
