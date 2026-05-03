// ─── Drink Prompt Intelligence ──────────────────────────────────────
// Maps each drink to detailed visual descriptors so the AI always
// generates accurate, text-free product photography.

type DrinkVisual = {
  vessel: string;         // cup/glass type
  appearance: string;     // what the drink looks like
  colors: string;         // dominant color palette
  garnish?: string;       // optional topping/garnish details
  temperature: "hot" | "iced";
  size: "small" | "medium" | "tall";
};

// ─── Keyword-based drink matching ────────────────────────────────────
// Rather than matching IDs (which are auto-generated), we match by name keywords.
const DRINK_VISUALS: { keywords: string[]; visual: DrinkVisual }[] = [
  // ── Espresso-based (small, hot) ──
  {
    keywords: ["espresso"],
    visual: {
      vessel: "small white ceramic demitasse cup on a matching saucer",
      appearance: "a single or double shot of espresso with a thick golden-brown crema layer on top",
      colors: "deep mahogany brown espresso with golden crema, white ceramic",
      size: "small",
      temperature: "hot",
    },
  },
  {
    keywords: ["macchiato"],
    visual: {
      vessel: "small white ceramic demitasse cup on a matching saucer",
      appearance: "espresso shot topped with a small dollop of steamed milk foam, creating a 'stained' effect on the crema",
      colors: "dark brown espresso, golden crema with a white foam dot",
      size: "small",
      temperature: "hot",
    },
  },
  {
    keywords: ["cortado"],
    visual: {
      vessel: "small glass tumbler (Gibraltar glass) or small ceramic cup",
      appearance: "equal parts espresso and velvety steamed milk, creating a warm tan color throughout with thin crema on top",
      colors: "warm tan, caramel brown, creamy white milk blend",
      size: "small",
      temperature: "hot",
    },
  },
  // ── Medium hot drinks ──
  {
    keywords: ["americano"],
    visual: {
      vessel: "medium white ceramic coffee cup on a saucer",
      appearance: "long black coffee with a thin layer of crema floating on top, clear dark liquid",
      colors: "dark black-brown coffee, thin golden crema",
      size: "medium",
      temperature: "hot",
    },
  },
  {
    keywords: ["cappuccino"],
    visual: {
      vessel: "wide white ceramic cappuccino cup on a saucer",
      appearance: "espresso with thick, glossy steamed milk and a generous dome of micro-foam, optionally with latte art",
      colors: "white foam dome, warm brown espresso visible through milk, possible latte art pattern",
      size: "medium",
      temperature: "hot",
    },
  },
  {
    keywords: ["flat white"],
    visual: {
      vessel: "medium white ceramic cup on a saucer",
      appearance: "espresso with velvety micro-foam milk, smooth flat surface with fine latte art, thinner foam layer than cappuccino",
      colors: "creamy tan surface with brown latte art, thin glossy micro-foam",
      size: "medium",
      temperature: "hot",
    },
  },
  {
    keywords: ["latte"],
    visual: {
      vessel: "tall ceramic latte cup or glass latte mug",
      appearance: "espresso with generous steamed milk, smooth and creamy with a thin foam layer and optional latte art",
      colors: "light tan, creamy beige, thin layer of white foam on top",
      size: "tall",
      temperature: "hot",
    },
  },
  {
    keywords: ["mocha"],
    visual: {
      vessel: "medium ceramic cup, optionally clear glass to show chocolate layers",
      appearance: "espresso blended with rich chocolate and steamed milk, topped with whipped cream or foam, may have cocoa powder dusting",
      colors: "rich dark chocolate brown, creamy milk, white whipped cream top, cocoa powder dusting",
      size: "medium",
      temperature: "hot",
    },
  },
  {
    keywords: ["brown sugar"],
    visual: {
      vessel: "tall glass or ceramic cup showing layered colors",
      appearance: "latte with brown sugar syrup creating a gradient from dark amber bottom to creamy milk top, caramelized sugar visible",
      colors: "amber-brown sugar base, creamy beige milk, warm golden tones",
      size: "tall",
      temperature: "hot",
    },
  },
  {
    keywords: ["hot chocolate"],
    visual: {
      vessel: "large ceramic mug or cup",
      appearance: "thick, rich hot chocolate topped with whipped cream or marshmallows, steaming",
      colors: "deep dark chocolate brown, white whipped cream, possible cocoa powder sprinkle",
      size: "medium",
      temperature: "hot",
    },
  },
  {
    keywords: ["spanish latte"],
    visual: {
      vessel: "clear glass cup showing distinct layers",
      appearance: "condensed milk at the bottom with espresso and steamed milk on top, creating beautiful visible layers",
      colors: "white condensed milk base, amber-brown espresso middle, light tan milk top",
      size: "medium",
      temperature: "hot",
    },
  },
  // ── Iced drinks ──
  {
    keywords: ["iced americano"],
    visual: {
      vessel: "tall clear glass filled with ice cubes",
      appearance: "dark espresso poured over crystal clear ice cubes, with condensation on the glass exterior",
      colors: "dark black-brown coffee, clear ice, glass condensation",
      size: "tall",
      temperature: "iced",
    },
  },
  {
    keywords: ["iced latte"],
    visual: {
      vessel: "tall clear glass filled with ice",
      appearance: "espresso and cold milk over ice, creating a beautiful gradient from dark espresso to light milk",
      colors: "brown espresso swirling into white milk, clear ice cubes",
      size: "tall",
      temperature: "iced",
    },
  },
  {
    keywords: ["iced mocha"],
    visual: {
      vessel: "tall clear glass with ice",
      appearance: "chocolate, espresso, and cold milk over ice, possibly topped with whipped cream and chocolate drizzle",
      colors: "dark chocolate brown, creamy milk, white whipped cream, ice cubes",
      size: "tall",
      temperature: "iced",
    },
  },
  {
    keywords: ["iced caramel"],
    visual: {
      vessel: "tall clear glass with ice",
      appearance: "espresso and cold milk with caramel syrup drizzle, beautiful swirl patterns visible through the glass",
      colors: "golden caramel drizzle, brown espresso, white milk, ice",
      size: "tall",
      temperature: "iced",
    },
  },
  {
    keywords: ["iced vanilla"],
    visual: {
      vessel: "tall clear glass with ice",
      appearance: "espresso and cold milk with vanilla syrup over ice, creamy and smooth appearance",
      colors: "light tan, creamy white, subtle vanilla hue, ice",
      size: "tall",
      temperature: "iced",
    },
  },
  {
    keywords: ["iced pistachio"],
    visual: {
      vessel: "tall clear glass with ice",
      appearance: "espresso with pistachio-flavored milk creating a subtle green-tinted creamy drink over ice",
      colors: "subtle sage green pistachio milk, brown espresso, ice cubes",
      size: "tall",
      temperature: "iced",
    },
  },
  // ── Specialty ──
  {
    keywords: ["v60", "filter coffee", "pour over"],
    visual: {
      vessel: "elegant clear glass carafe or ceramic pour-over cup, V60 dripper may be visible nearby as prop",
      appearance: "clean, transparent light amber filter coffee, much lighter than espresso, crystal clear",
      colors: "translucent amber-gold, light honey brown",
      size: "medium",
      temperature: "hot",
    },
  },
  {
    keywords: ["cold brew"],
    visual: {
      vessel: "tall clear glass with ice, possibly a mason jar or specialty cold brew glass",
      appearance: "smooth, dark cold-steeped coffee concentrate over ice, no crema, very smooth surface",
      colors: "deep dark brown-black, clear ice cubes, glass condensation",
      size: "tall",
      temperature: "iced",
    },
  },
  // ── Matcha & Hojicha ──
  {
    keywords: ["matcha latte"],
    visual: {
      vessel: "ceramic cup or clear glass showing the vibrant green color",
      appearance: "vibrant green matcha blended with steamed milk, smooth and creamy with possible latte art or foam",
      colors: "vivid emerald green matcha, white foam, creamy jade green blend",
      size: "medium",
      temperature: "hot",
    },
  },
  {
    keywords: ["matcha vanilla"],
    visual: {
      vessel: "ceramic cup or clear glass",
      appearance: "matcha latte with vanilla, slightly lighter green hue, creamy and smooth",
      colors: "soft mint green, creamy vanilla white, light foam",
      size: "medium",
      temperature: "hot",
    },
  },
  {
    keywords: ["matcha strawberry"],
    visual: {
      vessel: "clear glass showing beautiful color gradient",
      appearance: "layered drink with pink strawberry base and green matcha top, creating a stunning two-tone effect",
      colors: "pink strawberry base, emerald green matcha top, white milk layer between",
      size: "tall",
      temperature: "iced",
    },
  },
  {
    keywords: ["matcha mango"],
    visual: {
      vessel: "clear glass showing vibrant color layers",
      appearance: "layered drink with golden mango base and green matcha top, tropical and vibrant",
      colors: "golden yellow-orange mango base, emerald green matcha top",
      size: "tall",
      temperature: "iced",
    },
  },
  {
    keywords: ["hojicha"],
    visual: {
      vessel: "ceramic cup or clear glass",
      appearance: "roasted Japanese tea latte with warm caramel-like color, smooth and creamy",
      colors: "warm reddish-brown, toasted caramel tan, white foam",
      size: "medium",
      temperature: "hot",
    },
  },
  // ── Chai ──
  {
    keywords: ["chai latte", "chai masala", "chai vanilla"],
    visual: {
      vessel: "ceramic cup or glass mug",
      appearance: "spiced Indian chai blended with steamed milk, warm and creamy with a dusting of cinnamon or spice on top",
      colors: "warm amber-brown, creamy tan, cinnamon spice dust on foam",
      size: "medium",
      temperature: "hot",
    },
  },
  {
    keywords: ["chai lemon grass"],
    visual: {
      vessel: "ceramic cup or clear glass",
      appearance: "chai infused with lemongrass, slightly lighter color with aromatic herbs visible",
      colors: "warm golden-brown, creamy foam, hint of yellow-green",
      size: "medium",
      temperature: "hot",
    },
  },
  {
    keywords: ["dirty chai"],
    visual: {
      vessel: "ceramic cup or glass mug",
      appearance: "chai latte with a shot of espresso added, darker than regular chai with a richer color",
      colors: "darker brown than regular chai, espresso swirl, creamy foam top",
      size: "medium",
      temperature: "hot",
    },
  },
  // ── Tea ──
  {
    keywords: ["mint tea"],
    visual: {
      vessel: "clear glass teacup or tall glass, fresh mint leaves visible",
      appearance: "light golden-green tea with fresh mint sprigs floating, aromatic and refreshing look",
      colors: "pale golden-green liquid, vibrant green mint leaves",
      size: "medium",
      temperature: "hot",
    },
  },
  {
    keywords: ["ginger tea"],
    visual: {
      vessel: "clear glass teacup or ceramic cup, ginger slices visible",
      appearance: "warm amber-golden tea with fresh ginger slices floating, possibly a lemon wedge",
      colors: "warm amber-gold liquid, beige ginger slices",
      size: "medium",
      temperature: "hot",
    },
  },
  {
    keywords: ["lemon tea"],
    visual: {
      vessel: "clear glass teacup with lemon slice",
      appearance: "light amber tea with a bright yellow lemon wheel floating or on the rim",
      colors: "light golden amber, bright yellow lemon",
      size: "medium",
      temperature: "hot",
    },
  },
  {
    keywords: ["tea"],
    visual: {
      vessel: "elegant ceramic teacup on a saucer, or clear glass teacup",
      appearance: "beautifully brewed tea with warm amber color, possibly with a tea bag string or loose leaf visible",
      colors: "warm amber-gold liquid, white or pastel ceramic",
      size: "medium",
      temperature: "hot",
    },
  },
  // ── Food items ──
  {
    keywords: ["stroopwafel"],
    visual: {
      vessel: "wooden board or decorative plate",
      appearance: "fresh round Dutch stroopwafel with caramel filling visible from the side, golden-brown waffle pattern, possibly with toppings",
      colors: "golden-brown waffle, dark caramel filling, powdered sugar or toppings",
      size: "medium",
      temperature: "hot",
    },
  },
  {
    keywords: ["waffle"],
    visual: {
      vessel: "ceramic plate or wooden serving board",
      appearance: "golden Belgian waffle with toppings like whipped cream, strawberries, chocolate sauce, or ice cream",
      colors: "golden-brown waffle, colorful toppings, white whipped cream",
      size: "medium",
      temperature: "hot",
    },
  },
  {
    keywords: ["smoothie", "sunshine", "paradise", "tropical", "açaí"],
    visual: {
      vessel: "tall clear glass or mason jar with a straw",
      appearance: "thick, creamy blended fruit smoothie with vibrant natural colors, possibly layered",
      colors: "vibrant fruit colors — pink, orange, yellow, or deep purple for açaí",
      size: "tall",
      temperature: "iced",
    },
  },
  {
    keywords: ["toast", "croissant", "brownie", "cheesecake", "apple pie"],
    visual: {
      vessel: "ceramic plate or wooden board",
      appearance: "freshly prepared café food item, appetizing and well-presented",
      colors: "warm golden-brown tones, fresh ingredient colors",
      size: "medium",
      temperature: "hot",
    },
  },
  {
    keywords: ["yoghurt", "granola"],
    visual: {
      vessel: "ceramic bowl or glass jar",
      appearance: "creamy white yoghurt topped with golden granola clusters and fresh colorful fruit",
      colors: "white yoghurt, golden granola, colorful fresh fruit",
      size: "medium",
      temperature: "iced",
    },
  },
];

// ─── Match a drink name to its visual descriptor ─────────────────────
function findDrinkVisual(drinkName: string): DrinkVisual | null {
  const lower = drinkName.toLowerCase();
  // Try most specific match first (longest keyword array)
  const sorted = [...DRINK_VISUALS].sort(
    (a, b) => b.keywords.join(" ").length - a.keywords.join(" ").length
  );
  for (const entry of sorted) {
    if (entry.keywords.some((kw) => lower.includes(kw.toLowerCase()))) {
      return entry.visual;
    }
  }
  return null;
}

// ─── Style preset camera/lighting descriptions ──────────────────────
const STYLE_DESCRIPTIONS: Record<string, string> = {
  product: [
    "Shot in a professional studio environment.",
    "Clean, neutral off-white or light marble surface.",
    "Soft diffused studio lighting from the top-left, creating gentle shadows.",
    "Minimal props — only the drink and its vessel.",
    "Shallow depth of field (f/2.8), the background is a smooth, clean gradient.",
  ].join(" "),

  lifestyle: [
    "Shot on location in a cozy, modern specialty café.",
    "Warm natural window light streaming in from the side.",
    "Rustic wooden table surface or marble counter.",
    "Subtle background bokeh showing café interior — shelves, plants, warm lighting.",
    "Lifestyle feel — inviting, as if someone just sat down to enjoy the drink.",
  ].join(" "),

  flatlay: [
    "Shot directly from above (90° angle flat lay).",
    "Beautiful textured surface — linen cloth, wooden board, or marble slab.",
    "Styled with complementary props: a spoon, napkin, coffee beans, or a small pastry.",
    "Even, shadow-free lighting for a clean editorial feel.",
    "Instagram-worthy composition with intentional negative space.",
  ].join(" "),

  moody: [
    "Shot with dramatic, low-key lighting.",
    "Very dark, almost black background — charcoal or dark wood surface.",
    "Single directional light source creating strong contrast and highlights.",
    "Mysterious, premium atmosphere — like a high-end cocktail bar menu.",
    "Rich, deep shadows with bright highlights on the liquid surface.",
  ].join(" "),
};

// ─── GLOBAL rules appended to every prompt ──────────────────────────
const GLOBAL_RULES = [
  "CRITICAL: The image must contain ABSOLUTELY NO TEXT, NO WORDS, NO LETTERS, NO NUMBERS, NO LOGOS, NO WATERMARKS, NO LABELS, NO BRAND NAMES anywhere in the image.",
  "Do not render any writing on cups, surfaces, signs, or backgrounds.",
  "The image should look like a real photograph taken with a professional DSLR camera (Canon 5D Mark IV or Sony A7III).",
  "Resolution: ultra high quality, 4K, photorealistic.",
  "Color grading: warm café tones with rich browns, creams, and golden highlights.",
  "The subject must be perfectly centered and be the clear focal point.",
  "Aspect ratio: square (1:1).",
].join(" ");

// ─── Main prompt builder ─────────────────────────────────────────────
export function buildSmartPrompt(
  drinkName: string,
  presetId: string,
): string {
  const visual = findDrinkVisual(drinkName);
  const styleDesc = STYLE_DESCRIPTIONS[presetId] || STYLE_DESCRIPTIONS.product;

  if (!visual) {
    // Fallback for unknown items
    return [
      `Ultra-realistic professional product photography of "${drinkName}" from The Stroopist, a specialty café in Amsterdam.`,
      `The item should look freshly prepared, appetizing, and premium.`,
      styleDesc,
      GLOBAL_RULES,
    ].join("\n\n");
  }

  return [
    `Ultra-realistic professional product photography of a "${drinkName}".`,
    ``,
    `DRINK DETAILS:`,
    `- Served in: ${visual.vessel}`,
    `- Appearance: ${visual.appearance}`,
    `- Color palette: ${visual.colors}`,
    visual.garnish ? `- Garnish: ${visual.garnish}` : null,
    `- Temperature: ${visual.temperature === "hot" ? "Hot — show gentle steam wisps rising" : "Iced — show condensation droplets on the glass exterior, glistening ice cubes"}`,
    ``,
    `PHOTOGRAPHY STYLE:`,
    styleDesc,
    ``,
    `RULES:`,
    GLOBAL_RULES,
  ]
    .filter(Boolean)
    .join("\n");
}

export { STYLE_DESCRIPTIONS, GLOBAL_RULES, findDrinkVisual };
