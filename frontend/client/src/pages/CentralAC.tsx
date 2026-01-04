import { useEffect } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { InquiryForm } from "@/components/InquiryForm";
import { useCaseStudies } from "@/hooks/use-case-studies";
import { type Testimonial } from "@shared/schema";
import { Snowflake, Thermometer, Wind, Gauge, CheckCircle2, Quote, TrendingDown, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

export default function CentralAC() {
  const { data: projects, isLoading } = useCaseStudies({ division: "Central AC", limit: 3 });

  const { data: testimonialsData } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials", "Central AC"],
    queryFn: async () => {
      const res = await fetch(`/api/testimonials?division=Central AC`);
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return res.json();
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      icon: Snowflake,
      title: "Chiller Systems",
      description: "Advanced water-cooled and air-cooled chiller installations for maximum efficiency"
    },
    {
      icon: Wind,
      title: "VRV/VRF Systems",
      description: "Variable refrigerant flow technology for precise temperature control"
    },
    {
      icon: Thermometer,
      title: "Ducting & Ventilation",
      description: "Custom-designed ductwork ensuring optimal air distribution"
    },
    {
      icon: Gauge,
      title: "Building Management Systems",
      description: "Automated climate control with real-time monitoring and adjustments"
    }
  ];

  const features = [
    { label: "Energy Efficiency", value: "Up to 40% savings" },
    { label: "Temperature Control", value: "±0.5°C precision" },
    { label: "Air Quality", value: "HEPA filtration" },
    { label: "Noise Level", value: "<45dB operation" }
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      <div className="bg-secondary text-white pt-2 pb-20">

      </div>

      {/* HERO - Dual Column Layout */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-in slide-in-from-left-10 fade-in duration-700">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <Snowflake className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary">Climate Control Excellence</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-secondary mb-6">
                Central Air Conditioning Solutions
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Engineered climate control systems that combine energy efficiency, precision temperature management,
                and sustainable operation for commercial and industrial spaces.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="group">
                  Request Consultation
                  <Thermometer className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
                </Button>
                <Button size="lg" variant="outline">View Projects</Button>
              </div>
            </div>

            <div className="relative animate-in slide-in-from-right-10 fade-in duration-700">
              <img
                src="https://tse3.mm.bing.net/th/id/OIP.5M8l_SianRfJk98U-IqBFQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="Central AC System"
                className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <TrendingDown className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Energy Savings</p>
                    <p className="text-2xl font-bold text-secondary">40%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL SPECIFICATIONS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <Card key={i} className="border-primary/20 hover:border-primary/50 transition-colors">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">{feature.label}</p>
                  <p className="text-2xl font-bold text-primary">{feature.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES - Icon Grid Layout */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Comprehensive HVAC Services"
            subtitle="From design to installation and maintenance, we deliver complete climate control solutions"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={i}
                  className="group bg-white p-8 rounded-2xl border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                      <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary mb-2">{service.title}</h3>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US - Unique to Central AC */}
      <section className="py-24 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-white text-4xl font-display font-bold mb-6">
                Why Choose Our Central AC Solutions?
              </h2>
              <div className="space-y-4">
                {[
                  "Energy-efficient systems reducing operational costs by up to 40%",
                  "Precision temperature control within ±0.5°C tolerance",
                  "Advanced air filtration for improved indoor air quality",
                  "Smart BMS integration for automated climate management",
                  "Comprehensive maintenance contracts with 24/7 support",
                  "Eco-friendly refrigerants compliant with environmental standards"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <p className="text-white/90 text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
              <Building2 className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Ideal for:</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Commercial Office Buildings</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Shopping Malls & Retail Spaces</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Hotels & Hospitality</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Industrial Facilities</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Healthcare Facilities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonialsData && testimonialsData.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader title="Client Testimonials" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {testimonialsData.map((t) => (
                <Card key={t.id} className="border-border/50">
                  <CardContent className="p-8">
                    <Quote className="w-10 h-10 text-primary/20 mb-4" />
                    <p className="text-lg italic text-muted-foreground mb-6">"{t.content}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                        {t.author[0]}
                      </div>
                      <div>
                        <p className="font-bold text-secondary">{t.author}</p>
                        <p className="text-sm text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROJECTS */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Featured Central AC Projects" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => <div key={i} className="h-[400px] bg-muted animate-pulse rounded-2xl" />)
            ) : projects?.data && projects.data.length > 0 ? (
              projects.data.map(p => <CaseStudyCard key={p.id} item={p} />)
            ) : (
              <div className="col-span-3 text-center py-12 text-muted-foreground">
                No projects found for this division yet.
              </div>
            )}
          </div>

          {projects?.data && projects.data.length > 0 && (
            <div className="text-center mt-12">
              <Link href="/case-studies?division=Central AC">
                <Button variant="outline" size="lg">View All Central AC Projects</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold text-secondary mb-6">
                Get Expert Climate Control Consultation
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Our certified HVAC engineers are ready to design the perfect cooling solution
                for your facility. From load calculations to system selection, we ensure optimal
                comfort and efficiency.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                  <Thermometer className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-semibold text-secondary">Free Energy Audit</p>
                    <p className="text-sm text-muted-foreground">Evaluate your current system efficiency</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                  <Gauge className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-semibold text-secondary">24/7 Emergency Support</p>
                    <p className="text-sm text-muted-foreground">Round-the-clock technical assistance</p>
                  </div>
                </div>
              </div>
            </div>
            <InquiryForm division="Central AC" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
