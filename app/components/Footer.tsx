"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-coffee-dark text-cream/80 overflow-hidden">
      {/* Top gradient line */}
      <div className="h-1 bg-gradient-to-r from-caramel via-gold to-caramel" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-caramel flex items-center justify-center text-cream font-serif font-bold text-lg">
                S
              </div>
              <span className="font-serif text-xl font-bold text-cream">
                The <span className="text-caramel">Stroopist</span>
              </span>
            </div>
            <p className="text-sm text-cream/60 leading-relaxed mb-4">
              A cozy specialty café in the heart of Amsterdam&apos;s De Wallen. Fresh stroopwafels, specialty coffee, Japanese matcha &amp; more.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/the_stroopist/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-cream/10 hover:bg-caramel/30 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.tripadvisor.com/Restaurant_Review-g188590-d33750485-Reviews-The_stroopist-Amsterdam_North_Holland_Province.html"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-cream/10 hover:bg-sage/30 flex items-center justify-center transition-colors"
                aria-label="TripAdvisor"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-13a3 3 0 100 6 3 3 0 000-6zm5 3a3 3 0 10-6 0 3 3 0 006 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-cream mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "#home" },
                { label: "About Us", href: "#about" },
                { label: "Menu", href: "#menu" },
                { label: "Reviews", href: "#reviews" },
                { label: "Visit Us", href: "#visit" },
                { label: "Instagram", href: "#instagram" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-cream/60 hover:text-caramel transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Menu */}
          <div>
            <h3 className="font-semibold text-cream mb-4 text-sm uppercase tracking-wider">Our Menu</h3>
            <ul className="space-y-3">
              {[
                "Fresh Stroopwafels",
                "Specialty Coffee",
                "Iced Coffee",
                "Japanese Matcha",
                "Indian Chai",
                "Fresh Smoothies",
                "Breakfast & Lunch",
                "Pastries & Cakes",
              ].map((item) => (
                <li key={item}>
                  <a href="#menu" className="text-sm text-cream/60 hover:text-caramel transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-cream mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-cream/60">Warmoesstraat 143</p>
                <p className="text-cream/60">1012 JB Amsterdam</p>
                <p className="text-cream/60">The Netherlands</p>
              </div>
              <div>
                <a href="tel:+31685619233" className="text-caramel hover:text-caramel-light transition-colors">
                  +31 6 85619233
                </a>
              </div>
              <div>
                <p className="text-cream/60">Open daily: 8:00 AM – 10:00 PM</p>
              </div>
              <a
                href="https://maps.app.goo.gl/D9WgFFpiVcaMY7s59"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-caramel hover:text-caramel-light transition-colors"
              >
                Get Directions →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-cream/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-cream/40">
              © {currentYear} The Stroopist. All rights reserved. Warmoesstraat 143, Amsterdam.
            </p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-cream/40">
              <span>Best Stroopwafel Amsterdam Center</span>
              <span>•</span>
              <span>Fresh Stroopwafel Red Light District</span>
              <span>•</span>
              <span>Custom Stroopwafel near Dam Square</span>
              <span>•</span>
              <span>Specialty Coffee Amsterdam</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
