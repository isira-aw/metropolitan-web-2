import { useEffect } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { InquiryForm } from "@/components/InquiryForm";
import { useCaseStudies } from "@/hooks/use-case-studies";
import { type Testimonial } from "@shared/schema";
import { ArrowUp, Shield, Wrench, Zap, Users, Clock, Award, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

export default function Elevators() {
  const { data: projects, isLoading } = useCaseStudies({ division: "Elevators and Travelators", limit: 3 });

  const { data: testimonialsData } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials", "Elevators and Travelators"],
    queryFn: async () => {
      const res = await fetch(`/api/testimonials?division=Elevators and Travelators`);
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return res.json();
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const solutions = [
    {
      title: "Passenger Elevators",
      description: "High-speed vertical transportation for residential and commercial buildings",
      features: ["Speed up to 4m/s", "Capacity: 6-24 persons", "Energy-efficient motors", "Smooth ride quality"]
    },
    {
      title: "Freight Elevators",
      description: "Heavy-duty cargo transport for industrial and commercial applications",
      features: ["Load capacity up to 5000kg", "Reinforced cabins", "Wide door openings", "Durable construction"]
    },
    {
      title: "Escalators & Travelators",
      description: "Continuous flow people movers for high-traffic areas",
      features: ["Step width: 600-1000mm", "Auto-lubrication systems", "Emergency stop safety", "Low noise operation"]
    },
    {
      title: "Modernization Services",
      description: "Upgrade existing systems with latest technology and safety features",
      features: ["Controller upgrades", "New cabin designs", "Energy optimization", "Extended lifespan"]
    }
  ];

  const safetyFeatures = [
    { icon: Shield, text: "Overload protection sensors" },
    { icon: Zap, text: "Emergency backup power systems" },
    { icon: Users, text: "Anti-entrapment safety edges" },
    { icon: Clock, text: "Automatic rescue devices" }
  ];

  const stats = [
    { value: "1500+", label: "Elevators Installed" },
    { value: "99.8%", label: "Uptime Rate" },
    { value: "24/7", label: "Support Available" },
    { value: "50+", label: "Certified Technicians" }
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* HERO - Full Width with Overlay Stats */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1516733968668-dbdce39c46ef?q=80&w=2070&auto=format&fit=crop')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl animate-in slide-in-from-left-10 fade-in duration-700">
            <Badge className="mb-4 bg-primary/20 text-primary hover:bg-primary/30 border-primary/30">
              <ArrowUp className="w-3 h-3 mr-1" />
              Vertical Transportation Experts
            </Badge>
            <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-6">
              Elevators &
              <span className="text-primary"> Travelators</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Safe, reliable, and efficient vertical transportation solutions engineered for
              seamless movement in modern urban environments.
            </p>
            <div className="flex gap-4">
              <Button size="lg" variant="secondary">Explore Solutions</Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                Modernize Existing
              </Button>
            </div>
          </div>

          {/* Floating Stats Card */}
          <div className="absolute bottom-8 right-8 hidden lg:block">
            <div className="bg-white p-6 rounded-2xl shadow-2xl border border-border w-80">
              <div className="grid grid-cols-2 gap-4">
                {stats.slice(0, 2).map((stat, i) => (
                  <div key={i}>
                    <p className="text-3xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-primary text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 100}ms` }}>
                <p className="text-4xl font-bold mb-1">{stat.value}</p>
                <p className="text-white/80 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS - Card Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Comprehensive Vertical Transportation"
            subtitle="From installation to maintenance, we deliver complete elevator and escalator solutions"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {solutions.map((solution, i) => (
              <div
                key={i}
                className="group bg-gradient-to-br from-muted/50 to-muted/30 p-8 rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <h3 className="text-2xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
                  {solution.title}
                </h3>
                <p className="text-muted-foreground mb-6">{solution.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {solution.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span className="text-secondary/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAFETY FIRST - Unique Section */}
      <section className="py-24 bg-gradient-to-br from-secondary to-secondary/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <Award className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-4xl font-display font-bold mb-4">Safety is Our Priority</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Every elevator and escalator we install meets the highest international safety standards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyFeatures.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center">
                  <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="text-white font-medium">{feature.text}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex flex-wrap gap-3 justify-center">
              {["EN 81-20/50 Certified", "ISO 9001 Quality", "CE Marked", "ASME A17.1 Compliant"].map((cert, i) => (
                <Badge key={i} variant="outline" className="bg-white/10 border-white/30 text-white px-4 py-2">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonialsData && testimonialsData.length > 0 && (
        <section className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader title="What Our Clients Say" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
              {testimonialsData.map((t) => (
                <div key={t.id} className="bg-white p-8 rounded-2xl shadow-md border border-border">
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />
                  <p className="text-muted-foreground italic mb-6">"{t.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
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
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Featured Installation Projects" />

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
              <Link href="/case-studies?division=Elevators and Travelators">
                <Button variant="outline" size="lg">View All Projects</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold text-secondary mb-6">
                Ready to Elevate Your Building?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Whether you need new installations or want to modernize existing systems, our team of
                certified engineers is ready to help. Get a free consultation and site assessment today.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-border">
                  <Wrench className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-semibold text-secondary">Maintenance Contracts</p>
                    <p className="text-sm text-muted-foreground">Preventive care for maximum uptime</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-border">
                  <ArrowUp className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-semibold text-secondary">Modernization Services</p>
                    <p className="text-sm text-muted-foreground">Upgrade old systems to modern standards</p>
                  </div>
                </div>
              </div>
            </div>
            <InquiryForm division="Elevators and Travelators" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
