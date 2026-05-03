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
  metadataBase: new URL("https://thestroopist.nl"),
  title: "The Stroopist – Best Stroopwafel Amsterdam Center",
  description:
    "Looking for the best stroopwafel in Amsterdam Center? The Stroopist serves fresh, made-to-order stroopwafels with creative toppings, plus specialty coffee and matcha in De Wallen near Dam Square.",
  keywords:
    "best stroopwafel amsterdam center, fresh stroopwafel amsterdam, the stroopist amsterdam, custom stroopwafel near dam square, stroopwafel red light district, specialty coffee amsterdam",
  openGraph: {
    title: "The Stroopist – Best Stroopwafel Amsterdam Center",
    description:
      "Looking for the best stroopwafel in Amsterdam Center? Fresh stroopwafels made to order with creative toppings near Dam Square.",
    url: "https://thestroopist.nl",
    siteName: "The Stroopist",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/hero.png",
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
    images: ["/hero.png"],
  },
  alternates: {
    canonical: 'https://thestroopist.nl',
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
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#C8874D" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="The Stroopist" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CafeOrCoffeeShop",
              name: "The Stroopist",
              image: "https://thestroopist.nl/hero.png",
              "@id": "https://thestroopist.nl",
              url: "https://thestroopist.nl",
              telephone: "+31685619233",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Warmoesstraat 143",
                addressLocality: "Amsterdam",
                postalCode: "1012 JB",
                addressCountry: "NL"
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 52.3757,
                longitude: 4.8965
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                  ],
                  opens: "08:00",
                  closes: "22:00"
                }
              ]
            })
          }}
        />
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function() {});
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
