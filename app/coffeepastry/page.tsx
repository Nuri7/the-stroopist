"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const PREFIX = "";

type MenuItem = {
  name: string;
  price: string;
  image: string;
  badge?: string;
};

type MenuSection = {
  title: string;
  subtitle?: string;
  note?: string;
  items: MenuItem[];
};

const menuSections: MenuSection[] = [
  {
    title: "Coffee",
    subtitle: "Ethiopian • Colombian • Brazilian",
    items: [
      { name: "Espresso", price: "€3.00", image: `${PREFIX}/drinks/espresso.png` },
      { name: "Espresso Macchiato", price: "€3.50", image: `${PREFIX}/drinks/espresso.png`, badge: "Recommended" },
      { name: "Americano", price: "€4.00", image: `${PREFIX}/drinks/espresso.png` },
      { name: "Cortado", price: "€4.00", image: `${PREFIX}/drinks/espresso.png` },
      { name: "Latte", price: "€4.50", image: `${PREFIX}/drinks/cappuccino.png` },
      { name: "Flat White", price: "€4.50", image: `${PREFIX}/drinks/cappuccino.png` },
      { name: "Mocha", price: "€5.00", image: `${PREFIX}/drinks/mocha.png`, badge: "Recommended" },
      { name: "Cappuccino", price: "€5.00", image: `${PREFIX}/drinks/cappuccino.png` },
      { name: "Brown Sugar Latte", price: "€5.50", image: `${PREFIX}/drinks/brown-sugar-latte.png` },
      { name: "Hot Chocolate", price: "€6.00", image: `${PREFIX}/drinks/hot-chocolate.png` },
    ],
  },
  {
    title: "Iced Coffee",
    note: "Extras: Oat / Almond / Soya / Coconut milk +€0.50 • Coffee shot +€1.00 • Syrup +€0.50",
    items: [
      { name: "Iced Americano", price: "€5.00", image: `${PREFIX}/drinks/iced-coffee.png` },
      { name: "Iced Latte", price: "€6.50", image: `${PREFIX}/drinks/iced-coffee.png` },
      { name: "Iced Mocha", price: "€7.00", image: `${PREFIX}/drinks/iced-coffee.png` },
      { name: "Iced Mocha White", price: "€7.50", image: `${PREFIX}/drinks/iced-coffee.png` },
      { name: "Iced Caramel Latte", price: "€7.50", image: `${PREFIX}/drinks/iced-pistachio.png` },
      { name: "Iced Vanilla Latte", price: "€7.50", image: `${PREFIX}/drinks/iced-pistachio.png` },
      { name: "Iced Pistachio Latte", price: "€7.50", image: `${PREFIX}/drinks/iced-pistachio.png` },
    ],
  },
  {
    title: "Specialty Coffee",
    subtitle: "Ethiopian • Colombian • Brazilian",
    items: [
      { name: "V60 Filter Coffee", price: "€6.50", image: `${PREFIX}/drinks/v60.png` },
      { name: "Cold Brew", price: "€7.50", image: `${PREFIX}/drinks/cold-brew.png` },
      { name: "Spanish Latte", price: "€6.50", image: `${PREFIX}/drinks/brown-sugar-latte.png` },
    ],
  },
  {
    title: "Matcha & Hojicha",
    subtitle: "Best Matcha in Amsterdam",
    items: [
      { name: "Matcha Latte", price: "€6.50", image: `${PREFIX}/drinks/matcha-latte.png` },
      { name: "Matcha Vanilla", price: "€7.50", image: `${PREFIX}/drinks/matcha-latte.png` },
      { name: "Matcha Strawberry", price: "€7.50", image: `${PREFIX}/drinks/matcha-strawberry.png` },
      { name: "Matcha Mango", price: "€7.50", image: `${PREFIX}/drinks/matcha-strawberry.png` },
      { name: "Hojicha Latte", price: "€6.50", image: `${PREFIX}/drinks/hojicha.png` },
    ],
  },
  {
    title: "Indian Chai",
    items: [
      { name: "Chai Latte", price: "€6.00", image: `${PREFIX}/drinks/chai.png` },
      { name: "Chai Masala", price: "€6.00", image: `${PREFIX}/drinks/chai.png` },
      { name: "Chai Vanilla", price: "€6.00", image: `${PREFIX}/drinks/chai.png` },
      { name: "Chai Lemon Grass", price: "€7.00", image: `${PREFIX}/drinks/chai.png` },
      { name: "Dirty Chai", price: "€7.00", image: `${PREFIX}/drinks/chai.png`, badge: "Coffee + Chai" },
    ],
  },
  {
    title: "Tea",
    items: [
      { name: "Tea (choose our flavours)", price: "€3.50", image: `${PREFIX}/drinks/tea.png` },
      { name: "Fresh Mint Tea", price: "€3.50", image: `${PREFIX}/drinks/tea.png` },
      { name: "Fresh Ginger Tea", price: "€3.50", image: `${PREFIX}/drinks/tea.png` },
      { name: "Fresh Lemon Tea", price: "€3.50", image: `${PREFIX}/drinks/tea.png` },
      { name: "Fresh Combination", price: "€4.50 / €5.50", image: `${PREFIX}/drinks/tea.png` },
    ],
  },
];

export default function CoffeePastryPage() {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg">
      {/* Hero Header */}
      <div className="relative bg-coffee-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-coffee-dark/90 to-coffee-dark" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <a href="/" className="inline-flex items-center gap-2 mb-6 text-caramel-light hover:text-caramel transition-colors text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </a>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-cream mb-4">
              Coffee &amp; <span className="text-caramel">Pastry</span>
            </h1>
            <p className="text-cream/70 text-lg max-w-xl mx-auto">
              Specialty coffee, Japanese matcha, Indian chai &amp; fresh tea — all made with love at The Stroopist.
            </p>
          </motion.div>
        </div>
        <div className="h-1 bg-gradient-to-r from-caramel via-gold to-caramel" />
      </div>

      {/* Section Tabs */}
      <div className="sticky top-0 z-30 bg-cream/95 dark:bg-dark-bg/95 backdrop-blur-md border-b border-caramel/10 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {menuSections.map((section, i) => (
              <button
                key={section.title}
                onClick={() => {
                  setActiveSection(i);
                  document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeSection === i
                    ? "bg-caramel text-white shadow-md shadow-caramel/25"
                    : "text-coffee-medium dark:text-dark-text-muted hover:bg-caramel/10 hover:text-caramel"
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {menuSections.map((section, sectionIdx) => (
          <motion.section
            key={section.title}
            id={`section-${sectionIdx}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="mb-16 scroll-mt-24"
            onViewportEnter={() => setActiveSection(sectionIdx)}
          >
            {/* Section Header */}
            <div className="mb-8">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-coffee-dark dark:text-dark-text">
                {section.title}
              </h2>
              {section.subtitle && (
                <p className="text-caramel font-medium mt-1">{section.subtitle}</p>
              )}
              {section.note && (
                <p className="text-sm text-warm-gray dark:text-dark-text-muted mt-2 bg-caramel/5 dark:bg-caramel/10 rounded-lg px-4 py-2 inline-block">
                  {section.note}
                </p>
              )}
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {section.items.map((item, itemIdx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: itemIdx * 0.05 }}
                  className="group relative bg-white dark:bg-dark-card rounded-2xl overflow-hidden border border-caramel/10 dark:border-dark-border hover:shadow-xl hover:shadow-caramel/10 hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Badge */}
                  {item.badge && (
                    <div className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-full bg-caramel text-white text-[10px] font-semibold uppercase tracking-wider">
                      {item.badge}
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-warm-white dark:bg-dark-surface">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-coffee-dark dark:text-dark-text leading-tight mb-1">
                      {item.name}
                    </h3>
                    <p className="text-caramel font-bold text-sm">
                      {item.price}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}

        {/* Extras Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-caramel/10 to-gold/10 dark:from-caramel/20 dark:to-gold/20 border border-caramel/15"
        >
          <h3 className="font-serif text-2xl font-bold text-coffee-dark dark:text-dark-text mb-4">
            Extras &amp; Add-ons
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 dark:bg-dark-card/60">
              <span className="text-2xl">🥛</span>
              <div>
                <p className="font-medium text-sm text-coffee-dark dark:text-dark-text">Alt Milk</p>
                <p className="text-xs text-warm-gray dark:text-dark-text-muted">Oat / Almond / Soya / Coconut</p>
                <p className="text-caramel font-bold text-sm">+€0.50</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 dark:bg-dark-card/60">
              <span className="text-2xl">☕</span>
              <div>
                <p className="font-medium text-sm text-coffee-dark dark:text-dark-text">Extra Coffee Shot</p>
                <p className="text-xs text-warm-gray dark:text-dark-text-muted">Double up your caffeine</p>
                <p className="text-caramel font-bold text-sm">+€1.00</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 dark:bg-dark-card/60">
              <span className="text-2xl">🍯</span>
              <div>
                <p className="font-medium text-sm text-coffee-dark dark:text-dark-text">Syrup</p>
                <p className="text-xs text-warm-gray dark:text-dark-text-muted">Vanilla / Caramel / Hazelnut</p>
                <p className="text-caramel font-bold text-sm">+€0.50</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back to home */}
        <div className="text-center mt-16">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-caramel hover:bg-caramel-dark text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-caramel/25 hover:shadow-caramel/40"
          >
            ← Back to The Stroopist
          </a>
        </div>
      </div>
    </div>
  );
}
