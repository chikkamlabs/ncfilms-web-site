"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import ncFilmsLogo from "@/public/ncfilms_logo.png";
import { ContactModal } from "./contactCard";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/ourwork" },
  { label: "Why choose us", href: "/#why-choose-us" },
  { label: "Our Team", href: "/#our-team" },
  { label: "Contact us", href: "/#contact" },
];

interface HeaderProps {
  services?: string[];
}

export default function Header({ services }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ${
          isScrolled
            ? "bg-jet-black/65 backdrop-blur-md border-b border-pure-white/15 shadow-lg"
            : "bg-transparent border-b border-transparent"
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between gap-4 lg:gap-8">
        {/* Left: Circular Logo + NC Films (Tapping opens Home page) */}
        <Link
          href="/"
          className="flex items-center gap-3 whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-beige rounded-sm"
        >
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-champagne-beige/60 bg-charcoal shrink-0 transition-transform duration-200 group-hover:scale-105">
            <Image
              src={ncFilmsLogo}
              alt="NC Films Logo"
              fill
              sizes="44px"
              referrerPolicy="no-referrer"
              className="object-cover"
              priority
            />
          </div>
          <span className="text-lg sm:text-xl font-serif font-semibold tracking-wide text-pure-white group-hover:text-champagne-beige transition-colors duration-200 whitespace-nowrap shrink-0">
            NC Films
          </span>
        </Link>

        {/* Center: Desktop Navigation Menu */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-6 xl:gap-8"
        >
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative text-xs xl:text-sm font-medium tracking-wide text-soft-white/90 hover:text-champagne-beige transition-colors duration-200 whitespace-nowrap shrink-0 py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-champagne-beige hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-beige rounded-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: Get Quote Button + Mobile Menu Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              setQuoteModalOpen(true);
            }}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-champagne-beige hover:bg-champagne-beige/90 text-charcoal text-xs font-semibold uppercase tracking-widest rounded-sm transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pure-white"
          >
            Get Quote
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-sm border border-stone-grey/30 bg-charcoal/40 backdrop-blur-sm text-pure-white hover:text-champagne-beige hover:border-champagne-beige/60 transition-colors duration-200 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile & Tablet Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-charcoal/95 backdrop-blur-md border-t border-b border-stone-grey/15"
          >
            <nav
              aria-label="Mobile Navigation"
              className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-2"
            >
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-3 text-sm font-medium tracking-wide text-soft-white hover:text-champagne-beige hover:bg-pure-white/5 rounded-sm transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-3 mt-2 border-t border-stone-grey/15 sm:hidden">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setQuoteModalOpen(true);
                  }}
                  className="w-full py-3 px-6 bg-champagne-beige hover:bg-champagne-beige/90 text-charcoal text-xs font-semibold uppercase tracking-widest rounded-sm transition-colors duration-200 cursor-pointer"
                >
                  Get Quote
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      </header>

      <ContactModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        services={services}
      />
    </>
  );
}
