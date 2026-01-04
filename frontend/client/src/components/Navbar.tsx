import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { DIVISIONS } from "@shared/schema";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Divisions", href: "/divisions" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "News", href: "/news" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md py-2 border-border/50" : "bg-transparent py-4 text-white"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
            <div className={cn(
                "w-10 h-10 rounded bg-primary flex items-center justify-center font-bold text-white text-xl shadow-lg transition-transform group-hover:scale-105",
                 scrolled ? "" : "shadow-black/20"
            )}>
              M
            </div>
            <span className={cn(
              "font-display font-bold text-2xl tracking-tight transition-colors",
              scrolled ? "text-secondary" : "text-white"
            )}>
              METRO<span className="text-primary">POLITAN</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/divisions" className={cn(
                  "text-sm font-medium transition-all duration-200 hover:-translate-y-0.5",
                  location.startsWith("/divisions")
                    ? "text-[20px] rounded-full px-6 font-bold active:translate-y-0"
                    : scrolled
                    ? "text-secondary hover:text-primary"
                    : "text-white/90 hover:text-white"
                )}>
              Divisions
            </Link>

            {NAV_ITEMS.filter(i => i.label !== "Divisions").map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-all duration-200 hover:-translate-y-0.5",
                  location === item.href
                    ? "text-[20px] rounded-full px-6 font-bold active:translate-y-0"
                    : scrolled
                    ? "text-secondary hover:text-primary"
                    : "text-white/90 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            ))}

            <Link href="/contact">
              <Button 
                variant={scrolled ? "default" : "secondary"}
                className={cn(
                    "font-semibold rounded-full px-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0",
                    !scrolled && "bg-white text-primary hover:bg-white/90 border-none"
                )}
              >
                Get a Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "p-2 rounded-md focus:outline-none",
                scrolled ? "text-secondary hover:bg-muted" : "text-white hover:bg-white/10"
              )}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-border shadow-xl animate-in slide-in-from-top-5">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <div className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">Divisions</div>
            {DIVISIONS.map((div) => (
              <Link 
                key={div} 
                href={`/divisions/${div.toLowerCase()}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-muted"
              >
                {div}
              </Link>
            ))}
            <div className="border-t border-border my-2"></div>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium hover:bg-muted",
                  location === item.href ? "text-primary bg-muted/50" : "text-secondary"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4">
               <Link href="/contact">
                <Button className="w-full bg-primary text-white rounded-xl shadow-md">Get a Quote</Button>
               </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
