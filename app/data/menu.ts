// ─── Centralized Menu Data ───────────────────────────────────────────
// Single source of truth for all menu items across the site.
// Both customer-facing pages and the admin dashboard import from here.

export type MenuItem = {
  id: string;
  name: string;
  price: string;
  description?: string;
  image: string;
  badge?: string;
  note?: string;
  active: boolean;
  order: number;
};

export type MenuSection = {
  id: string;
  title: string;
  subtitle?: string;
  emoji?: string;
  note?: string;
  categoryImage?: string;
  items: MenuItem[];
};

let _nextId = 1;
function uid(prefix: string) {
  return `${prefix}_${_nextId++}`;
}

export const menuSections: MenuSection[] = [
  {
    id: "stroopwafels",
    title: "Stroopwafels",
    emoji: "🧇",
    categoryImage: "/food/stroopwafel-classic.png",
    note: "Choose your favourite topping!",
    items: [
      { id: uid("sw"), name: "Stroopwafel Classic", price: "€7.00", image: "/food/stroopwafel-classic.png", active: true, order: 0 },
      { id: uid("sw"), name: "Strawberry Cup", price: "€8.00", image: "/food/stroopwafel-strawberry.png", active: true, order: 1 },
      { id: uid("sw"), name: "Strawberry Choco", price: "€10.00", image: "/food/stroopwafel-strawberry-choco.png", active: true, order: 2 },
      { id: uid("sw"), name: "Dubai Cup", price: "€13.50", image: "/food/stroopwafel-dubai.png", badge: "Premium", note: "Our premium creation", active: true, order: 3 },
    ],
  },
  {
    id: "coffee",
    title: "Coffee",
    emoji: "☕",
    subtitle: "Ethiopian • Colombian • Brazilian",
    categoryImage: "/matcha-coffee.png",
    note: "Ethiopian • Colombian • Brazilian beans",
    items: [
      { id: uid("cf"), name: "Espresso", price: "€3.00", image: "/drinks/espresso.png", active: true, order: 0 },
      { id: uid("cf"), name: "Espresso Macchiato", price: "€3.50", image: "/drinks/espresso-macchiato.png", badge: "Recommended", note: "Recommended", active: true, order: 1 },
      { id: uid("cf"), name: "Americano", price: "€4.00", image: "/drinks/americano.png", active: true, order: 2 },
      { id: uid("cf"), name: "Cortado", price: "€4.00", image: "/drinks/cortado.png", active: true, order: 3 },
      { id: uid("cf"), name: "Latte", price: "€4.50", image: "/drinks/latte.png", active: true, order: 4 },
      { id: uid("cf"), name: "Flat White", price: "€4.50", image: "/drinks/flat-white.png", active: true, order: 5 },
      { id: uid("cf"), name: "Mocha", price: "€5.00", image: "/drinks/mocha.png", badge: "Recommended", note: "Recommended", active: true, order: 6 },
      { id: uid("cf"), name: "Cappuccino", price: "€5.00", image: "/drinks/cappuccino.png", active: true, order: 7 },
      { id: uid("cf"), name: "Brown Sugar Latte", price: "€5.50", image: "/drinks/brown-sugar-latte.png", active: true, order: 8 },
      { id: uid("cf"), name: "Hot Chocolate", price: "€6.00", image: "/drinks/hot-chocolate.png", active: true, order: 9 },
    ],
  },
  {
    id: "iced",
    title: "Iced Coffee",
    emoji: "🧊",
    categoryImage: "/matcha-coffee.png",
    note: "Extras: Oat / Almond / Soya / Coconut milk +€0.50 • Coffee shot +€1.00 • Syrup +€0.50",
    items: [
      { id: uid("ic"), name: "Iced Americano", price: "€5.00", image: "/drinks/iced-americano.png", active: true, order: 0 },
      { id: uid("ic"), name: "Iced Latte", price: "€6.50", image: "/drinks/iced-latte.png", active: true, order: 1 },
      { id: uid("ic"), name: "Iced Mocha", price: "€7.00", image: "/drinks/iced-mocha.png", active: true, order: 2 },
      { id: uid("ic"), name: "Iced Mocha White", price: "€7.50", image: "/drinks/iced-mocha-white.png", active: true, order: 3 },
      { id: uid("ic"), name: "Iced Caramel Latte", price: "€7.50", image: "/drinks/iced-caramel-latte.png", active: true, order: 4 },
      { id: uid("ic"), name: "Iced Vanilla Latte", price: "€7.50", image: "/drinks/iced-vanilla-latte.png", active: true, order: 5 },
      { id: uid("ic"), name: "Iced Pistachio Latte", price: "€7.50", image: "/drinks/iced-pistachio.png", active: true, order: 6 },
    ],
  },
  {
    id: "specialty",
    title: "Specialty Coffee",
    emoji: "✨",
    subtitle: "Ethiopian • Colombian • Brazilian",
    categoryImage: "/matcha-coffee.png",
    items: [
      { id: uid("sp"), name: "V60 Filter Coffee", price: "€6.50", image: "/drinks/v60.png", active: true, order: 0 },
      { id: uid("sp"), name: "Cold Brew", price: "€7.50", image: "/drinks/cold-brew.png", active: true, order: 1 },
      { id: uid("sp"), name: "Spanish Latte", price: "€6.50", image: "/drinks/spanish-latte.png", active: true, order: 2 },
    ],
  },
  {
    id: "matcha",
    title: "Matcha & Hojicha",
    emoji: "🍵",
    subtitle: "Best Matcha in Amsterdam",
    categoryImage: "/matcha-coffee.png",
    note: "Best matcha in Amsterdam!",
    items: [
      { id: uid("mt"), name: "Matcha Latte", price: "€6.50", image: "/drinks/matcha-latte.png", active: true, order: 0 },
      { id: uid("mt"), name: "Matcha Vanilla", price: "€7.50", image: "/drinks/matcha-vanilla.png", active: true, order: 1 },
      { id: uid("mt"), name: "Matcha Strawberry", price: "€7.50", image: "/drinks/matcha-strawberry.png", active: true, order: 2 },
      { id: uid("mt"), name: "Matcha Mango", price: "€7.50", image: "/drinks/matcha-mango.png", active: true, order: 3 },
      { id: uid("mt"), name: "Hojicha Latte", price: "€6.50", image: "/drinks/hojicha.png", active: true, order: 4 },
    ],
  },
  {
    id: "chai",
    title: "Indian Chai",
    emoji: "🫖",
    categoryImage: "/matcha-coffee.png",
    items: [
      { id: uid("ch"), name: "Chai Latte", price: "€6.00", image: "/drinks/chai-latte.png", active: true, order: 0 },
      { id: uid("ch"), name: "Chai Masala", price: "€6.00", image: "/drinks/chai-masala.png", active: true, order: 1 },
      { id: uid("ch"), name: "Chai Vanilla", price: "€6.00", image: "/drinks/chai-vanilla.png", active: true, order: 2 },
      { id: uid("ch"), name: "Chai Lemon Grass", price: "€7.00", image: "/drinks/chai-lemongrass.png", active: true, order: 3 },
      { id: uid("ch"), name: "Dirty Chai", price: "€7.00", image: "/drinks/chai.png", badge: "Coffee + Chai", active: true, order: 4 },
    ],
  },
  {
    id: "tea",
    title: "Tea",
    emoji: "🫖",
    categoryImage: "/matcha-coffee.png",
    items: [
      { id: uid("te"), name: "Tea (choose our flavours)", price: "€3.50", image: "/drinks/tea-selection.png", active: true, order: 0 },
      { id: uid("te"), name: "Fresh Mint Tea", price: "€3.50", image: "/drinks/tea-mint.png", active: true, order: 1 },
      { id: uid("te"), name: "Fresh Ginger Tea", price: "€3.50", image: "/drinks/tea-ginger.png", active: true, order: 2 },
      { id: uid("te"), name: "Fresh Lemon Tea", price: "€3.50", image: "/drinks/tea-lemon.png", active: true, order: 3 },
      { id: uid("te"), name: "Fresh Combination", price: "€4.50 / €5.50", image: "/drinks/tea.png", active: true, order: 4 },
    ],
  },
  {
    id: "waffles",
    title: "Waffles",
    emoji: "🍫",
    categoryImage: "/food/waffle-classic.png",
    items: [
      { id: uid("wf"), name: "Waffle Classic", price: "€6.50", image: "/food/waffle-classic.png", active: true, order: 0 },
      { id: uid("wf"), name: "Waffle Ice Cream & Sauce", price: "€11.00", image: "/food/waffle-icecream.png", active: true, order: 1 },
      { id: uid("wf"), name: "Waffle Strawberry Choco-Dream", price: "€11.50", image: "/food/waffle-strawberry-choco.png", active: true, order: 2 },
      { id: uid("wf"), name: "Waffle Choco-Cream + Strawberry", price: "€11.00", image: "/food/waffle-chococream.png", active: true, order: 3 },
    ],
  },
  {
    id: "smoothies",
    title: "Smoothies",
    emoji: "🥤",
    categoryImage: "/food/smoothie-sunshine.png",
    items: [
      { id: uid("sm"), name: "Sunshine (Pineapple + Mango + Strawberry)", price: "€8.50", image: "/food/smoothie-sunshine.png", active: true, order: 0 },
      { id: uid("sm"), name: "Paradise (Mango + Banana)", price: "€8.50", image: "/food/smoothie-paradise.png", active: true, order: 1 },
      { id: uid("sm"), name: "Tropical (Strawberry + Banana)", price: "€8.50", image: "/food/smoothie-tropical.png", active: true, order: 2 },
      { id: uid("sm"), name: "Açaí (Açaí + Banana)", price: "€8.50", image: "/food/smoothie-acai.png", active: true, order: 3 },
    ],
  },
  {
    id: "breakfast",
    title: "Breakfast & Lunch",
    emoji: "🍳",
    categoryImage: "/food/toast-peanut-banana.png",
    items: [
      { id: uid("br"), name: "Toast Peanut Butter & Banana", price: "€5.50", image: "/food/toast-peanut-banana.png", active: true, order: 0 },
      { id: uid("br"), name: "Toast Cheese & Ham", price: "€7.00", image: "/food/toast-cheese-ham.png", active: true, order: 1 },
      { id: uid("br"), name: "Toast Cheese & Tomato", price: "€7.00", image: "/food/toast-cheese-tomato.png", active: true, order: 2 },
      { id: uid("br"), name: "Toast Tuna Cream & Fresh Fruit", price: "€5.50", image: "/food/toast-tuna-fruit.png", active: true, order: 3 },
      { id: uid("br"), name: "Yoghurt, Granola & Fresh Fruit", price: "€9.50", image: "/food/yoghurt-granola.png", active: true, order: 4 },
    ],
  },
  {
    id: "pastries",
    title: "Pastries",
    emoji: "🥐",
    categoryImage: "/food/pastry-flat-croissant.png",
    items: [
      { id: uid("ps"), name: "Flat Croissants", price: "€5.50", image: "/food/pastry-flat-croissant.png", active: true, order: 0 },
      { id: uid("ps"), name: "Gluten-Free Brownies", price: "€6.00", image: "/food/pastry-brownie.png", active: true, order: 1 },
      { id: uid("ps"), name: "NY Cheesecake", price: "€6.50", image: "/food/pastry-cheesecake.png", active: true, order: 2 },
      { id: uid("ps"), name: "Dutch Apple Pie + Whipped Cream", price: "€6.50", image: "/food/pastry-apple-pie.png", active: true, order: 3 },
    ],
  },
];

export const toppings = [
  "Fresh fruit", "Pistachio sauce", "Bueno sauce", "Whipped cream",
  "Scoop Ice cream", "Lotus sauce", "Crumble Oreo", "White chocolate sauce",
  "Nutella", "Caramel", "Dark chocolate",
];

// ─── Helper: get only active items for customer-facing pages ─────────
export function getActiveMenuSections(): MenuSection[] {
  return menuSections
    .map((section) => ({
      ...section,
      items: section.items
        .filter((item) => item.active)
        .sort((a, b) => a.order - b.order),
    }))
    .filter((section) => section.items.length > 0);
}

// ─── Helper: find the drink-specific sections for /coffeepastry ──────
export function getDrinkSections(): MenuSection[] {
  const drinkIds = ["coffee", "iced", "specialty", "matcha", "chai", "tea"];
  return getActiveMenuSections().filter((s) => drinkIds.includes(s.id));
}
