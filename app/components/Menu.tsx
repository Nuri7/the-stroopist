"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

interface MenuItem { name: string; price: string; note?: string; }
interface MenuCategory { id: string; label: string; emoji: string; image: string; imageAlt: string; items: MenuItem[]; note?: string; }

const menuCategories: MenuCategory[] = [
  {
    id: "stroopwafels", label: "Stroopwafels", emoji: "🧇",
    image: "/stroopwafel-toppings.png",
    imageAlt: "Assorted stroopwafels with creative toppings",
    note: "Choose your favourite topping!",
    items: [
      { name: "Stroopwafel Classic", price: "€7.00" },
      { name: "Strawberry Cup", price: "€8.00" },
      { name: "Strawberry Choco", price: "€10.00" },
      { name: "Dubai Cup", price: "€13.50", note: "Premium" },
    ],
  },
  {
    id: "coffee", label: "Coffee", emoji: "☕",
    image: "/matcha-coffee.png",
    imageAlt: "Specialty coffee at The Stroopist Amsterdam",
    note: "Ethiopian • Colombian • Brazilian beans",
    items: [
      { name: "Espresso", price: "€3.00" },
      { name: "Espresso Macchiato", price: "€3.50", note: "Recommended" },
      { name: "Americano", price: "€4.00" },
      { name: "Cortado", price: "€4.00" },
      { name: "Latte", price: "€4.50" },
      { name: "Flat White", price: "€4.50" },
      { name: "Mocha", price: "€5.00", note: "Recommended" },
      { name: "Cappuccino", price: "€5.00" },
      { name: "Brown Sugar Latte", price: "€5.50" },
      { name: "Hot Chocolate", price: "€6.00" },
    ],
  },
  {
    id: "iced", label: "Iced Coffee", emoji: "🧊",
    image: "/matcha-coffee.png",
    imageAlt: "Iced specialty coffee drinks",
    items: [
      { name: "Iced Americano", price: "€5.00" },
      { name: "Iced Latte", price: "€6.50" },
      { name: "Iced Mocha", price: "€7.00" },
      { name: "Iced Mocha White", price: "€7.50" },
      { name: "Iced Caramel Latte", price: "€7.50" },
      { name: "Iced Vanilla Latte", price: "€7.50" },
      { name: "Iced Pistachio Latte", price: "€7.50" },
    ],
  },
  {
    id: "specialty", label: "Specialty", emoji: "✨",
    image: "/matcha-coffee.png", imageAlt: "V60 pour-over and cold brew",
    items: [
      { name: "V60 Filter Coffee", price: "€6.50" },
      { name: "Cold Brew", price: "€7.50" },
      { name: "Spanish Latte", price: "€6.50" },
    ],
  },
  {
    id: "matcha", label: "Matcha & Hojicha", emoji: "🍵",
    image: "/matcha-coffee.png",
    imageAlt: "Japanese matcha latte — one of the best in Amsterdam",
    note: "Best matcha in Amsterdam!",
    items: [
      { name: "Matcha Latte", price: "€6.50" },
      { name: "Matcha Vanilla", price: "€7.50" },
      { name: "Matcha Strawberry", price: "€7.50" },
      { name: "Matcha Mango", price: "€7.50" },
      { name: "Hojicha Latte", price: "€6.50" },
    ],
  },
  {
    id: "chai", label: "Indian Chai", emoji: "🫖",
    image: "/matcha-coffee.png", imageAlt: "Authentic Indian chai latte",
    items: [
      { name: "Chai Latte", price: "€6.00" },
      { name: "Chai Masala", price: "€6.00" },
      { name: "Chai Vanilla", price: "€6.00" },
      { name: "Chai Lemon Grass", price: "€7.00" },
      { name: "Dirty Chai", price: "€7.00" },
    ],
  },
  {
    id: "waffles", label: "Waffles", emoji: "🍫",
    image: "/breakfast-spread.png", imageAlt: "Belgian waffles with toppings",
    items: [
      { name: "Waffle Classic", price: "€6.50" },
      { name: "Waffle Ice Cream & Sauce", price: "€11.00" },
      { name: "Waffle Strawberry Choco-Dream", price: "€11.50" },
      { name: "Waffle Choco-Cream + Strawberry", price: "€11.00" },
    ],
  },
  {
    id: "smoothies", label: "Smoothies", emoji: "🥤",
    image: "/breakfast-spread.png", imageAlt: "Fresh fruit smoothies",
    items: [
      { name: "Sunshine (Pineapple + Mango + Strawberry)", price: "€8.50" },
      { name: "Paradise (Mango + Banana)", price: "€8.50" },
      { name: "Tropical (Strawberry + Banana)", price: "€8.50" },
      { name: "Açaí (Açaí + Banana)", price: "€8.50" },
    ],
  },
  {
    id: "breakfast", label: "Breakfast & Lunch", emoji: "🍳",
    image: "/breakfast-spread.png", imageAlt: "Fresh breakfast spread",
    items: [
      { name: "Toast Peanut Butter & Banana", price: "€5.50" },
      { name: "Toast Cheese & Ham", price: "€7.00" },
      { name: "Toast Cheese & Tomato", price: "€7.00" },
      { name: "Toast Tuna Cream & Fresh Fruit", price: "€5.50" },
      { name: "Yoghurt, Granola & Fresh Fruit", price: "€9.50" },
    ],
  },
  {
    id: "pastries", label: "Pastries", emoji: "🥐",
    image: "/breakfast-spread.png", imageAlt: "Pastries and cakes",
    items: [
      { name: "Flat Croissants", price: "€5.50" },
      { name: "Gluten-Free Brownies", price: "€6.00" },
      { name: "NY Cheesecake", price: "€6.50" },
      { name: "Dutch Apple Pie + Whipped Cream", price: "€6.50" },
    ],
  },
];

const toppings = [
  "Fresh fruit","Pistachio sauce","Bueno sauce","Whipped cream",
  "Scoop Ice cream","Lotus sauce","Crumble Oreo","White chocolate sauce",
  "Nutella","Caramel","Dark chocolate",
];

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
