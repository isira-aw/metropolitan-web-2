import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from "lucide-react";
import { DIVISIONS } from "@shared/schema";

export function Footer() {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-white text-lg">M</div>
              <span className="font-display font-bold text-xl tracking-tight">METROPOLITAN</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Building the future through sustainable innovation and engineering excellence. We are committed to shaping skylines and communities.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold font-display mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {["Home", "About Us", "News", "Careers", "Contact"].map((link) => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase().replace(" ", "-")}`} className="text-white/70 hover:text-primary transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Divisions */}
          <div>
            <h3 className="text-lg font-bold font-display mb-6">Our Divisions</h3>
            <ul className="space-y-4">
              {DIVISIONS.slice(0, 5).map((div) => (
                <li key={div}>
                  <Link href={`/divisions/${div.toLowerCase()}`} className="text-white/70 hover:text-primary transition-colors text-sm">
                    {div}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/divisions/industrial" className="text-primary font-medium text-sm hover:underline">View All Divisions &rarr;</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold font-display mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70 text-sm">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
                  <MapPin className="w-5 h-5 text-white shrink-0" />
                </div>
                <span>123 Innovation Blvd,<br />Metropolis City, MC 90210</span>
              </li>
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
                  <Phone className="w-5 h-5 text-white shrink-0" />
                </div>

                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
                  <Mail className="w-5 h-5 text-white shrink-0" />
                </div>

                <span>info@metropolitan.co</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-xs">
            © {new Date().getFullYear()} Metropolitan Co. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/50 text-xs hover:text-white">Privacy Policy</a>
            <a href="#" className="text-white/50 text-xs hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
