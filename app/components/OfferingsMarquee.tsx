"use client";

export default function OfferingsMarquee() {
  const items = [
    "🧇 Fresh Stroopwafels",
    "☕ Specialty Coffee",
    "🍵 Japanese Matcha",
    "🫖 Indian Chai",
    "🥤 Fresh Smoothies",
    "🍳 Breakfast & Lunch",
    "🥐 Pastries & Cakes",
    "🍫 Belgian Waffles",
    "🧊 Iced Coffee",
    "✨ V60 Pour-Over",
  ];

  return (
    <div className="relative py-5 bg-caramel overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="mx-8 text-white/90 font-medium text-sm md:text-base">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
