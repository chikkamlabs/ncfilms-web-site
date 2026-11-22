import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Film } from "lucide-react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import ncFilmsLogo from "@/public/ncfilms_logo.png";

const primaryLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#our-work" },
  { label: "Why choose us", href: "#why-choose-us" },
  { label: "Our Team", href: "#our-team" },
  { label: "Contact us", href: "#contact" },
];

const serviceLinks = [
  { label: "Wedding Cinematography", href: "#services" },
  { label: "Candid Photography", href: "#services" },
  { label: "Pre-Wedding Stories", href: "#our-work" },
  { label: "Bridal Portraits", href: "#our-work" },
  { label: "Destination Coverage", href: "#why-choose-us" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="bg-charcoal text-soft-white border-t border-stone-grey/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <Link
              href="#home"
              className="inline-flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-beige rounded-sm"
            >
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-champagne-beige/60 bg-charcoal shrink-0">
                <Image
                  src={ncFilmsLogo}
                  alt="NC Films Logo"
                  fill
                  sizes="44px"
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-serif font-semibold tracking-wide text-pure-white group-hover:text-champagne-beige transition-colors duration-200">
                NC Films
              </span>
            </Link>

            <p className="text-sm text-stone-grey leading-relaxed max-w-sm">
              Crafting timeless wedding films and fine-art photography with
              cinematic storytelling, authentic emotion, and refined artistry.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href="#our-work"
                aria-label="NC Films FaInstagram"
                className="w-10 h-10 rounded-sm border border-stone-grey/25 flex items-center justify-center text-stone-grey hover:text-champagne-beige hover:border-champagne-beige/60 transition-colors duration-200"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="#our-work"
                aria-label="NC Films FaYoutube"
                className="w-10 h-10 rounded-sm border border-stone-grey/25 flex items-center justify-center text-stone-grey hover:text-champagne-beige hover:border-champagne-beige/60 transition-colors duration-200"
              >
                <FaYoutube className="w-4 h-4" />
              </a>
              <a
                href="#services"
                aria-label="NC Films Showreel"
                className="w-10 h-10 rounded-sm border border-stone-grey/25 flex items-center justify-center text-stone-grey hover:text-champagne-beige hover:border-champagne-beige/60 transition-colors duration-200"
              >
                <Film className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-champagne-beige">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {primaryLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-warm-grey/85 hover:text-champagne-beige transition-colors duration-200 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-champagne-beige">
              Specialties
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-warm-grey/85 hover:text-champagne-beige transition-colors duration-200 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-champagne-beige">
              Studio Inquiries
            </h3>
            <ul className="space-y-3 text-sm text-stone-grey">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-champagne-beige shrink-0 mt-0.5" />
                <span>Studio Collective · Available Worldwide</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-champagne-beige shrink-0" />
                <a
                  href="tel:+919949224331"
                  className="hover:text-pure-white transition-colors duration-200"
                >
                  +91 99492 24331
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-champagne-beige shrink-0" />
                <a
                  href="mailto:hello@ncfilms.studio"
                  className="hover:text-pure-white transition-colors duration-200"
                >
                  hello@ncfilms.studio
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="mt-12 pt-6 border-t border-stone-grey/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-grey">
          <p>&copy; {currentYear} NC Films. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="#home"
              className="hover:text-champagne-beige transition-colors duration-200"
            >
              Back to Top
            </a>
            <a
              href="#services"
              className="hover:text-champagne-beige transition-colors duration-200"
            >
              Services
            </a>
            <a
              href="#our-work"
              className="hover:text-champagne-beige transition-colors duration-200"
            >
              Portfolio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
