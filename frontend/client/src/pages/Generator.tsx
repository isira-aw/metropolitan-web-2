import { useEffect } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { InquiryForm } from "@/components/InquiryForm";
import { useCaseStudies } from "@/hooks/use-case-studies";
import { type Testimonial } from "@shared/schema";
import { Zap, Battery, Volume2, Settings, CheckCircle2, Quote, Power, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

export default function Generator() {
  const { data: projects, isLoading } = useCaseStudies({ division: "Generator", limit: 3 });

  const { data: testimonialsData } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials", "Generator"],
    queryFn: async () => {
      const res = await fetch(`/api/testimonials?division=Generator`);
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return res.json();
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      title: "Diesel Generator Sets",
      power: "50 kVA - 3000 kVA",
      features: [
        "Prime & standby power ratings",
        "Tier 3/4 emission compliant engines",
        "Weather-proof enclosures",
        "Remote monitoring ready"
      ],
      icon: Power
    },
    {
      title: "Soundproof Enclosures",
      power: "Super Silent < 65dB",
      features: [
        "Custom-designed canopies",
        "Acoustic insulation panels",
        "Ventilation optimization",
        "Corrosion-resistant materials"
      ],
      icon: Volume2
    },
    {
      title: "AMF Panel Systems",
      power: "Automatic Transfer",
      features: [
        "Seamless power switching",
        "Real-time monitoring",
        "Load management",
        "Smart grid integration"
      ],
      icon: Settings
    },
    {
      title: "Parallel & Sync Systems",
      power: "Load Sharing",
      features: [
        "Multiple genset synchronization",
        "N+1 redundancy configuration",
        "Active power balancing",
        "Peak demand management"
      ],
      icon: TrendingUp
    }
  ];

  const industries = [
    { name: "Hospitals & Healthcare", uptime: "99.99%" },
    { name: "Data Centers", uptime: "99.999%" },
    { name: "Manufacturing Plants", uptime: "99.9%" },
    { name: "Commercial Buildings", uptime: "99.95%" },
    { name: "Telecommunications", uptime: "99.999%" },
    { name: "Hotels & Hospitality", uptime: "99.98%" }
  ];

  const specifications = [
    { label: "Power Range", value: "50 - 3000 kVA" },
    { label: "Fuel Type", value: "Diesel / Gas" },
    { label: "Voltage", value: "230V - 11kV" },
    { label: "Frequency", value: "50Hz / 60Hz" }
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* HERO - Dark Theme with Stats Overlay */}
      <section className="relative h-[75vh] min-h-[650px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=2070&auto=format&fit=crop')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/95 to-secondary/80" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3 animate-in slide-in-from-left-10 fade-in duration-700">
              <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border-yellow-500/30">
                <Zap className="w-3 h-3 mr-1" />
                Uninterrupted Power Solutions
              </Badge>
              <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-6">
                Generator
                <span className="text-yellow-400"> Power</span> Systems
              </h1>
              <p className="text-xl text-white/90 leading-relaxed mb-8 max-w-2xl">
                Mission-critical backup power solutions ensuring business continuity when you need it most.
                From hospitals to data centers, we keep your operations running 24/7.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-secondary">
                  Calculate Power Needs
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                  View Catalog
                </Button>
              </div>
            </div>

            <div className="lg:col-span-2 animate-in slide-in-from-right-10 fade-in duration-700">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
                <div className="text-center mb-6">
                  <Battery className="w-16 h-16 text-yellow-400 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-white">Power Availability</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Average Uptime", value: "99.98%" },
                    { label: "Transfer Time", value: "< 10 sec" },
                    { label: "Fuel Efficiency", value: "Optimized" },
                    { label: "Service Response", value: "< 2 hours" }
                  ].map((stat, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-white/80">{stat.label}</span>
                      <span className="text-yellow-400 font-bold">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIFICATIONS BAR */}
      <section className="bg-yellow-500 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {specifications.map((spec, i) => (
              <div key={i}>
                <p className="text-secondary/70 text-sm mb-1">{spec.label}</p>
                <p className="text-2xl font-bold text-secondary">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS - Modern Card Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Complete Generator Solutions"
            subtitle="From standalone units to complex parallel systems, we have the right solution for your power needs"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {products.map((product, i) => {
              const Icon = product.icon;
              return (
                <div
                  key={i}
                  className="group bg-gradient-to-br from-muted/30 to-white p-8 rounded-3xl border-2 border-border hover:border-yellow-500/50 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-secondary mb-2 group-hover:text-yellow-600 transition-colors">
                        {product.title}
                      </h3>
                      <Badge variant="outline" className="border-yellow-500/50 text-yellow-700">
                        {product.power}
                      </Badge>
                    </div>
                    <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center group-hover:bg-yellow-500 group-hover:scale-110 transition-all">
                      <Icon className="w-7 h-7 text-yellow-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    {product.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INDUSTRIES SERVED */}
      <section className="py-24 bg-gradient-to-br from-secondary to-secondary/95 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4">Critical Applications Powered</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Industries that depend on us for reliable backup power and continuous operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-lg mb-1">{industry.name}</p>
                    <p className="text-white/70 text-sm">Required Uptime</p>
                  </div>
                  <div className="text-3xl font-bold text-yellow-400">{industry.uptime}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop"
                alt="Generator Installation"
                className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>

            <div className="order-1 lg:order-2">
              <Zap className="w-16 h-16 text-yellow-600 mb-6" />
              <h2 className="text-4xl font-display font-bold text-secondary mb-6">
                Why Choose Our Generator Solutions?
              </h2>
              <div className="space-y-4">
                {[
                  "Tier 1 manufacturers: Cummins, Perkins, Caterpillar, MTU",
                  "Complete turnkey installation including civil, mechanical & electrical",
                  "Advanced AMF panels with remote monitoring capabilities",
                  "Fuel-efficient engines meeting EPA/Euro emission standards",
                  "Comprehensive maintenance contracts with guaranteed response times",
                  "24/7 emergency support and spare parts availability",
                  "Load bank testing and commissioning services",
                  "Parallel operation for scalable power solutions"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-border">
                    <CheckCircle2 className="w-6 h-6 text-yellow-600 shrink-0 mt-0.5" />
                    <p className="text-secondary">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonialsData && testimonialsData.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader title="Client Success Stories" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
              {testimonialsData.map((t) => (
                <div key={t.id} className="bg-muted/30 p-8 rounded-2xl border border-border hover:border-yellow-500/50 transition-all">
                  <Quote className="w-8 h-8 text-yellow-600/30 mb-4" />
                  <p className="text-muted-foreground italic mb-6">"{t.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold">
                      {t.author[0]}
                    </div>
                    <div>
                      <p className="font-bold text-secondary text-sm">{t.author}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROJECTS */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Featured Generator Installations" />

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
              <Link href="/case-studies?division=Generator">
                <Button variant="outline" size="lg">View All Generator Projects</Button>
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
                Power Your Business with Confidence
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Let our power system engineers design the perfect backup solution for your facility.
                We'll assess your load requirements and recommend the optimal generator configuration.
              </p>
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                <h4 className="font-bold text-secondary mb-3 flex items-center gap-2">
                  <Power className="w-5 h-5 text-yellow-600" />
                  Free Power Assessment
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-600" />
                    <span>Load calculation & sizing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-600" />
                    <span>Fuel consumption analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-600" />
                    <span>ROI & cost-benefit evaluation</span>
                  </li>
                </ul>
              </div>
            </div>
            <InquiryForm division="Generator" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
