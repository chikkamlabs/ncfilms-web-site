"use client";

import { motion } from "motion/react";
import { Phone, Mail, ArrowUpRight } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import ContactCard from "./contactCard";

interface ContactUsProps {
  services?: string[];
}

export default function ContactUs({ services }: ContactUsProps) {
  return (
    <section
      id="contact"
      className="bg-pure-white text-charcoal py-16 sm:py-20 lg:py-28 border-t border-warm-grey overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Side: Direct Call, Mobile Number, Email & FaInstagram */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono text-champagne-beige tracking-[0.28em] uppercase">
                  Connect With Us
                </span>
                <motion.span
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.75,
                    delay: 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-[1px] w-12 bg-champagne-beige/70 origin-left"
                />
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif font-bold text-charcoal tracking-tight leading-tight text-balance">
                Contact Us
              </h2>

              <p className="mt-4 text-sm sm:text-base text-muted-grey leading-relaxed">
                Have a celebration on the horizon? Reach out directly by phone,
                email, or FaInstagram, or share your event details to receive a
                tailored studio quote.
              </p>
            </div>

            {/* Call Button + Mobile Number */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="p-5 sm:p-6 bg-soft-white border border-stone-grey/50 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-champagne-beige block">
                  Mobile Number
                </span>
                <a
                  href="tel:8886427192"
                  className="mt-1 inline-block text-xl sm:text-2xl font-serif font-semibold text-charcoal hover:text-champagne-beige tabular-nums transition-colors duration-200"
                >
                  8886427192
                </a>
              </div>

              <a
                href="tel:8886427192"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-charcoal hover:bg-champagne-beige text-pure-white hover:text-charcoal text-xs font-semibold uppercase tracking-widest rounded-sm transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-beige"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </motion.div>

            {/* Email & FaInstagram Redirect Cards */}
            <div className="space-y-3">
              <motion.a
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: 0.16,
                  ease: [0.16, 1, 0.3, 1],
                }}
                href="mailto:ncfilmsofficial@gmail.com"
                className="group flex items-center justify-between gap-4 p-4 sm:p-5 bg-soft-white hover:bg-warm-grey/50 border border-stone-grey/50 hover:border-champagne-beige rounded-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-beige"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-sm bg-champagne-beige/15 border border-champagne-beige/40 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-champagne-beige" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-grey block">
                      Email
                    </span>
                    <span className="text-sm sm:text-base font-medium text-charcoal group-hover:text-champagne-beige transition-colors duration-200 truncate block">
                      ncfilmsofficial@gmail.com
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-grey group-hover:text-champagne-beige transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </motion.a>

              <motion.a
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: 0.22,
                  ease: [0.16, 1, 0.3, 1],
                }}
                href="https://www.FaInstagram.com/ncfilms/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 p-4 sm:p-5 bg-soft-white hover:bg-warm-grey/50 border border-stone-grey/50 hover:border-champagne-beige rounded-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-beige"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-sm bg-champagne-beige/15 border border-champagne-beige/40 flex items-center justify-center shrink-0">
                    <FaInstagram className="w-4 h-4 text-champagne-beige" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-grey block">
                      FaInstagram
                    </span>
                    <span className="text-sm sm:text-base font-medium text-charcoal group-hover:text-champagne-beige transition-colors duration-200 truncate block">
                      ncfilms
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-grey group-hover:text-champagne-beige transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Side: ContactCard */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.7,
              delay: 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-7"
          >
            <ContactCard services={services} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
