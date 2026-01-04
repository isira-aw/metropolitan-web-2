import { useEffect } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { InquiryForm } from "@/components/InquiryForm";
import { useCaseStudies } from "@/hooks/use-case-studies";
import { type Testimonial } from "@shared/schema";
import { Camera, Lock, Wifi, Radio, CheckCircle2, Quote, Shield, Network, MonitorPlay, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

export default function ELV() {
  const { data: projects, isLoading } = useCaseStudies({ division: "ELV", limit: 3 });

  const { data: testimonialsData } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials", "ELV"],
    queryFn: async () => {
      const res = await fetch(`/api/testimonials?division=ELV`);
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return res.json();
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const systems = [
    {
      icon: Camera,
      title: "CCTV & Video Surveillance",
      description: "Advanced IP and analog camera systems with AI-powered analytics",
      technologies: [
        "4K Ultra HD IP cameras",
        "AI object detection & tracking",
        "Cloud & local storage options",
        "Mobile app remote viewing",
        "24/7 recording with motion detection",
        "Facial recognition capabilities"
      ]
    },
    {
      icon: Lock,
      title: "Access Control Systems",
      description: "Intelligent entry management for enhanced security and monitoring",
      technologies: [
        "Biometric fingerprint & face scanners",
        "RFID & proximity card readers",
        "Time & attendance integration",
        "Multi-level access permissions",
        "Real-time monitoring dashboard",
        "Audit trail & reporting"
      ]
    },
    {
      icon: Network,
      title: "Structured Cabling",
      description: "Enterprise-grade network infrastructure for seamless connectivity",
      technologies: [
        "Cat 6/6A/7 copper cabling",
        "Fiber optic backbone",
        "Certified installations",
        "Cable management systems",
        "Testing & documentation",
        "Future-proof design"
      ]
    },
    {
      icon: Radio,
      title: "Public Address Systems",
      description: "Crystal-clear audio distribution for communication and emergency alerts",
      technologies: [
        "Zone-based audio control",
        "Emergency broadcast integration",
        "IP-based networked speakers",
        "Background music systems",
        "Paging & intercom",
        "Integrated with fire alarms"
      ]
    }
  ];

  const integrations = [
    { name: "Building Management Systems (BMS)", icon: MonitorPlay },
    { name: "Fire Alarm Integration", icon: Shield },
    { name: "Smart Lighting Control", icon: Wifi },
    { name: "HVAC Automation", icon: Network }
  ];

  const industries = [
    "Corporate Offices",
    "Shopping Malls",
    "Hotels & Resorts",
    "Educational Institutions",
    "Hospitals & Healthcare",
    "Residential Complexes",
    "Industrial Facilities",
    "Government Buildings"
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      <div className="bg-secondary text-white pt-2 pb-20">

      </div>

      {/* HERO - Tech-focused Design */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-in slide-in-from-left-10 fade-in duration-700">
              <Badge className="mb-4 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-blue-500/30">
                <Network className="w-3 h-3 mr-1" />
                Intelligent Building Technology
              </Badge>
              <h1 className="text-6xl md:text-7xl font-display font-bold mb-6">
                ELV Systems
              </h1>
              <p className="text-xl text-white/90 leading-relaxed mb-2">
                <span className="text-blue-300 font-semibold">Extra Low Voltage</span> Systems
              </p>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                Cutting-edge security, communication, and connectivity solutions that transform
                buildings into smart, secure, and efficient environments.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Explore Solutions
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                  System Integration
                </Button>
              </div>
            </div>

            <div className="relative animate-in slide-in-from-right-10 fade-in duration-700">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
                  alt="ELV Systems"
                  className="rounded-3xl shadow-2xl w-full h-[500px] object-cover border-4 border-white/10"
                />
                <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-blue-600 to-cyan-600 p-6 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-white/80">Systems Integrated</p>
                      <p className="text-2xl font-bold text-white">1000+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTEGRATIONS BANNER */}
      <section className="bg-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Network className="w-6 h-6" />
            <h3 className="font-bold text-lg">Seamless System Integration</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {integrations.map((integration, i) => {
              const Icon = integration.icon;
              return (
                <div key={i} className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{integration.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SYSTEMS - Detailed Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Comprehensive ELV Solutions"
            subtitle="Integrated low-voltage systems for modern buildings"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            {systems.map((system, i) => {
              const Icon = system.icon;
              return (
                <div
                  key={i}
                  className="group bg-gradient-to-br from-slate-50 to-blue-50/30 p-8 rounded-3xl border-2 border-slate-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all">
                      <Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-secondary mb-2 group-hover:text-blue-600 transition-colors">
                        {system.title}
                      </h3>
                      <p className="text-muted-foreground">{system.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {system.technologies.map((tech, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-sm text-secondary/80">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SMART BUILDING VISION */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <Wifi className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-4xl font-display font-bold mb-4">Building the Future of Smart Infrastructure</h2>
            <p className="text-white/80 text-lg max-w-3xl mx-auto">
              ELV systems are the nervous system of modern buildings, enabling communication,
              security, and automation that make spaces smarter and more efficient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Enhanced Security",
                description: "24/7 monitoring, access control, and intrusion detection keep your property and people safe"
              },
              {
                icon: Network,
                title: "Seamless Connectivity",
                description: "High-speed network infrastructure supporting IoT devices, communication, and data transfer"
              },
              {
                icon: Users,
                title: "Operational Efficiency",
                description: "Centralized control and monitoring reduce costs and improve facility management"
              }
            ].map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div key={i} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 text-center">
                  <Icon className="w-14 h-14 text-blue-400 mx-auto mb-6" />
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-white/80">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INDUSTRIES SERVED */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Industries We Serve" subtitle="Trusted ELV solutions across diverse sectors" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {industries.map((industry, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border-2 border-border hover:border-blue-400 hover:shadow-lg transition-all text-center cursor-pointer"
              >
                <p className="font-semibold text-secondary">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonialsData && testimonialsData.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader title="Client Testimonials" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {testimonialsData.map((t) => (
                <div key={t.id} className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all">
                  <Quote className="w-8 h-8 text-blue-600/30 mb-4" />
                  <p className="text-muted-foreground italic mb-6">"{t.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
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
          <SectionHeader title="Featured ELV Projects" />

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
              <Link href="/case-studies?division=ELV">
                <Button variant="outline" size="lg">View All ELV Projects</Button>
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
                Transform Your Building with Smart ELV Solutions
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Our certified ELV engineers will assess your facility and design an integrated
                system that meets your security, communication, and connectivity requirements.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Camera, title: "Security Assessment", desc: "Identify vulnerabilities and design comprehensive protection" },
                  { icon: Network, title: "Network Infrastructure", desc: "Plan scalable cabling and connectivity solutions" },
                  { icon: Wifi, title: "System Integration", desc: "Seamlessly connect all building systems" }
                ].map((service, i) => {
                  const Icon = service.icon;
                  return (
                    <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-secondary mb-1">{service.title}</p>
                        <p className="text-sm text-muted-foreground">{service.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <InquiryForm division="ELV" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
