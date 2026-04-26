import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nuri7.github.io"),
  title: "The Stroopist – Fresh Stroopwafels & Specialty Coffee in Amsterdam",
  description:
    "The Stroopist is a cozy specialty café in Amsterdam's De Wallen, famous for made-to-order fresh stroopwafels with creative toppings, specialty coffee, Japanese matcha, Indian chai, and fresh smoothies. Visit us at Warmoesstraat 143.",
  keywords:
    "the stroopist amsterdam, stroopwafel amsterdam, best stroopwafel near dam square, specialty coffee amsterdam red light district, japanese matcha amsterdam, warmoesstraat 143, fresh stroopwafels amsterdam, breakfast amsterdam centre",
  openGraph: {
    title: "The Stroopist – Fresh Stroopwafels & Specialty Coffee in Amsterdam",
    description:
      "A cozy café in Amsterdam's De Wallen. Fresh stroopwafels made to order, specialty coffee, Japanese matcha & more. 5-star rated on TripAdvisor & Google.",
    url: "https://nuri7.github.io/the-stroopist",
    siteName: "The Stroopist",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/the-stroopist/hero.png",
        width: 1200,
        height: 630,
        alt: "Fresh stroopwafel with caramel and pistachio at The Stroopist Amsterdam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Stroopist – Fresh Stroopwafels & Specialty Coffee",
    description:
      "Made-to-order stroopwafels with creative toppings, specialty coffee, matcha & more in the heart of Amsterdam.",
    images: ["/the-stroopist/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
