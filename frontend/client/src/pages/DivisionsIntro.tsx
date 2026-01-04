import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { DIVISIONS } from "@shared/schema";
import { ArrowRight, Zap, Shield, Waves, Building2, Sun, Cpu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const DIVISION_ICONS: Record<string, any> = {
  "Central AC": Waves,
  "Elevators and Travelators": Building2,
  "Fire Detection & Protection": Shield,
  "Generator": Zap,
  "Solar": Sun,
  "ELV": Cpu,
};

const DIVISION_SUMMARIES: Record<string, string> = {
  "Central AC": "Advanced climate control solutions for commercial and industrial scale.",
  "Elevators and Travelators": "Safe and efficient vertical and horizontal transportation systems.",
  "Fire Detection & Protection": "Comprehensive fire safety and suppression technologies.",
  "Generator": "Reliable power backup and energy management solutions.",
  "Solar": "Sustainable renewable energy systems for clean power.",
  "ELV": "Integrated low voltage systems for smart buildings.",
};

export default function DivisionsIntro() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
              <div className="bg-secondary text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader title="Our Divisions" subtitle="Three decades of engineering excellence." light />
        </div>
      </div>
      <div className=" pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {DIVISIONS.map((div) => {
              const Icon = DIVISION_ICONS[div] || Building2;
              const summary = DIVISION_SUMMARIES[div] || "Expert solutions for metropolitan infrastructure.";
              const path = `/divisions/${div.toLowerCase().replace(/\s+/g, '-')}`;
              
              return (
                <Link key={div} href={path}>
                  <Card className="group hover-elevate cursor-pointer overflow-hidden border-border/50 transition-all hover:border-primary/50">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-display font-bold text-secondary mb-4">{div}</h3>
                      <p className="text-muted-foreground mb-6 line-clamp-2">
                        {summary}
                      </p>
                      <div className="flex items-center text-primary font-bold group-hover:translate-x-2 transition-transform">
                        Learn More <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
