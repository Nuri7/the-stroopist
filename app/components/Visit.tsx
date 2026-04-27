"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

export default function Visit() {
  return (
    <section id="visit" className="relative py-24 md:py-32 bg-warm-white dark:bg-dark-surface overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-caramel/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-terracotta/10 dark:bg-terracotta/20 border border-terracotta/20">
            <span className="text-terracotta text-sm font-medium">Find Us</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-coffee-dark dark:text-dark-text mb-4">
            Visit <span className="text-caramel">The Stroopist</span>
          </h2>
          <p className="text-coffee-medium dark:text-dark-text-muted text-lg max-w-2xl mx-auto">
            In the heart of Amsterdam&apos;s De Wallen, just a 5-minute walk from Dam Square.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map + Exterior image */}
          <ScrollReveal direction="left">
            <div className="space-y-6">
              {/* Google Maps embed */}
              <div className="rounded-2xl overflow-hidden shadow-lg h-72 md:h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2435.8!2d4.8965!3d52.3757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609b9610a4b0f%3A0x6ec3c07d1f285e8!2sWarmoesstraat%20143%2C%201012%20JB%20Amsterdam!5e0!3m2!1sen!2snl!4v1700000000000!5m2!1sen!2snl"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Stroopist location on Google Maps - Warmoesstraat 143, Amsterdam"
                />
              </div>

              {/* Exterior photo */}
              <div className="rounded-2xl overflow-hidden img-zoom">
                <Image
                  src="/cafe-exterior.png"
                  alt="The Stroopist café exterior on Warmoesstraat, Amsterdam"
                  width={640}
                  height={360}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Info cards */}
          <ScrollReveal direction="right" delay={0.15}>
            <div className="space-y-6">
              {/* Address card */}
              <div className="p-6 rounded-2xl bg-cream dark:bg-dark-card border border-caramel/10 dark:border-dark-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-caramel/10 flex items-center justify-center text-caramel shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-coffee-dark dark:text-dark-text mb-1">Address</h3>
                    <p className="text-coffee-medium dark:text-dark-text-muted">Warmoesstraat 143</p>
                    <p className="text-coffee-medium dark:text-dark-text-muted">1012 JB Amsterdam</p>
                    <p className="text-coffee-medium dark:text-dark-text-muted">The Netherlands</p>
                    <a
                      href="https://maps.app.goo.gl/D9WgFFpiVcaMY7s59"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-caramel hover:text-caramel-dark font-medium text-sm transition-colors"
                    >
                      Get Directions
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours card */}
              <div className="p-6 rounded-2xl bg-cream dark:bg-dark-card border border-caramel/10 dark:border-dark-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sage/10 flex items-center justify-center text-sage shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-coffee-dark dark:text-dark-text mb-3">Opening Hours</h3>
                    <div className="space-y-2">
                      {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((day) => (
                        <div key={day} className="flex justify-between text-sm">
                          <span className="text-coffee-medium dark:text-dark-text-muted">{day}</span>
                          <span className="font-medium text-coffee-dark dark:text-dark-text">8:00 AM – 10:00 PM</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-warm-gray dark:text-dark-text-muted mt-3 italic">
                      Hours may vary — please call to confirm.
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone card */}
              <div className="p-6 rounded-2xl bg-cream dark:bg-dark-card border border-caramel/10 dark:border-dark-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-terracotta/10 flex items-center justify-center text-terracotta shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-coffee-dark dark:text-dark-text mb-1">Phone</h3>
                    <a href="tel:+31685619233" className="text-caramel hover:text-caramel-dark font-medium transition-colors">
                      +31 6 85619233
                    </a>
                    <p className="text-sm text-coffee-medium dark:text-dark-text-muted mt-1">
                      Call us for reservations or questions
                    </p>
                  </div>
                </div>
              </div>

              {/* How to get there */}
              <div className="p-6 rounded-2xl bg-caramel/5 dark:bg-caramel/10 border border-caramel/15">
                <h3 className="font-semibold text-coffee-dark dark:text-dark-text mb-3 flex items-center gap-2">
                  <span>🚶</span> How to Get Here
                </h3>
                <ul className="space-y-2 text-sm text-coffee-medium dark:text-dark-text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-caramel mt-0.5">•</span>
                    <span>5-minute walk from Dam Square</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-caramel mt-0.5">•</span>
                    <span>Located on Warmoesstraat in the De Wallen / Red Light District area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-caramel mt-0.5">•</span>
                    <span>Near Amsterdam Centraal Station (10-minute walk)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-caramel mt-0.5">•</span>
                    <span>Outdoor seating &amp; takeaway available</span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
