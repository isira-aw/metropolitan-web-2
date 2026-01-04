import { useEffect } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { InquiryForm } from "@/components/InquiryForm";
import { useCaseStudies } from "@/hooks/use-case-studies";
import { type Testimonial } from "@shared/schema";
import { Flame, Bell, Droplets, ShieldAlert, CheckCircle2, Quote, AlertTriangle, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

export default function FireProtection() {
  const { data: projects, isLoading } = useCaseStudies({ division: "Fire Detection & Protection", limit: 3 });

  const { data: testimonialsData } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials", "Fire Detection & Protection"],
    queryFn: async () => {
      const res = await fetch(`/api/testimonials?division=Fire Detection & Protection`);
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return res.json();
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const systems = [
    {
      icon: Bell,
      title: "Addressable Fire Alarm Systems",
      description: "Intelligent detection with pinpoint accuracy for rapid response",
      specs: ["Multi-sensor detection", "Zone identification", "Remote monitoring", "Auto-dialer integration"]
    },
    {
      icon: Droplets,
      title: "Automatic Sprinkler Systems",
      description: "Water-based suppression for comprehensive fire protection",
      specs: ["Wet & dry pipe systems", "Pre-action systems", "Deluge systems", "ESFR sprinklers"]
    },
    {
      icon: Flame,
      title: "FM-200 Gas Suppression",
      description: "Clean agent systems for sensitive equipment protection",
      specs: ["Zero residue discharge", "Safe for electronics", "Rapid suppression", "Eco-friendly agents"]
    },
    {
      icon: ShieldAlert,
      title: "Fire Hydrant & Hose Reel",
      description: "Manual firefighting equipment strategically positioned",
      specs: ["Indoor hydrant systems", "Outdoor yard hydrants", "First-aid hose reels", "Pressure testing"]
    }
  ];

  const compliance = [
    "NFPA Standards Compliant",
    "Local Fire Department Approved",
    "BS EN 54 Certified Systems",
    "UL Listed Components",
    "FM Global Approved",
    "ISO 9001:2015 Quality Management"
  ];

  const responseSteps = [
    { step: "01", title: "Detection", desc: "Sensors identify smoke, heat, or flame instantly" },
    { step: "02", title: "Alert", desc: "Audible and visual alarms activate throughout facility" },
    { step: "03", title: "Suppression", desc: "Automatic systems engage to control fire spread" },
    { step: "04", title: "Notification", desc: "Fire department and authorities notified automatically" }
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      <div className="bg-secondary text-white pt-2 pb-20">

      </div>

      {/* HERO - Split with Emergency Banner */}
      <section className="relative">
        {/* Emergency Banner */}
        <div className="bg-red-600 text-white py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-3 text-sm font-semibold">
              <AlertTriangle className="w-5 h-5" />
              <span>24/7 Emergency Fire Safety Support: +1 (555) 123-FIRE</span>
            </div>
          </div>
        </div>

        {/* Main Hero */}
        <div className="bg-gradient-to-br from-red-50 via-orange-50 to-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-in slide-in-from-left-10 fade-in duration-700">
                <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-6">
                  <Flame className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-semibold text-red-700">Life Safety Systems</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-display font-bold text-secondary mb-6">
                  Fire Detection &<br />
                  <span className="text-red-600">Protection Systems</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  State-of-the-art fire safety solutions designed to protect lives, assets, and business
                  continuity. From detection to suppression, we provide comprehensive protection.
                </p>
                <div className="flex gap-4">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700">
                    Request Safety Audit
                  </Button>
                  <Button size="lg" variant="outline">View Certifications</Button>
                </div>
              </div>

              <div className="relative animate-in slide-in-from-right-10 fade-in duration-700">
                <img
                  src="https://tse3.mm.bing.net/th/id/OIP.rE9gqmAhPfHXfo137zM1GwHaHa?w=626&h=626&rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt="Fire Protection System"
                  className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border-2 border-red-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <ShieldAlert className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Response Time</p>
                      <p className="text-2xl font-bold text-secondary">&lt; 30 sec</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FIRE RESPONSE TIMELINE - Unique to Fire Protection */}
      <section className="py-20 bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-center mb-12">Emergency Response Flow</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {responseSteps.map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                  <div className="text-5xl font-bold text-red-400 mb-3">{item.step}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.desc}</p>
                </div>
                {i < responseSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-red-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SYSTEMS - Grid Layout */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Comprehensive Fire Safety Solutions"
            subtitle="Advanced detection and suppression systems tailored to your facility's unique needs"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {systems.map((system, i) => {
              const Icon = system.icon;
              return (
                <Card key={i} className="border-2 hover:border-red-200 transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center">
                        <Icon className="w-7 h-7 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{system.title}</CardTitle>
                        <p className="text-muted-foreground text-sm">{system.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {system.specs.map((spec, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                          <span className="text-sm text-secondary/80">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPLIANCE & CERTIFICATIONS */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <FileCheck className="w-16 h-16 text-red-600 mb-6" />
              <h2 className="text-4xl font-display font-bold text-secondary mb-6">
                Certified & Compliant Systems
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                All our fire protection installations meet or exceed international safety standards.
                We work closely with local authorities to ensure full compliance and approval.
              </p>
              <div className="space-y-3">
                {compliance.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-border">
                    <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0" />
                    <span className="font-medium text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-600 to-orange-600 text-white p-10 rounded-3xl">
              <h3 className="text-3xl font-bold mb-6">Why Fire Safety Matters</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="text-4xl font-bold">90%</div>
                  <div>
                    <p className="font-semibold">Fire Casualties Preventable</p>
                    <p className="text-white/80 text-sm">With proper detection systems in place</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-4xl font-bold">60s</div>
                  <div>
                    <p className="font-semibold">Average Escape Time</p>
                    <p className="text-white/80 text-sm">Early warning is critical for safety</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-4xl font-bold">24/7</div>
                  <div>
                    <p className="font-semibold">Continuous Protection</p>
                    <p className="text-white/80 text-sm">Automated systems never sleep</p>
                  </div>
                </div>
              </div>
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
                <div key={t.id} className="bg-muted/30 p-8 rounded-2xl border border-border">
                  <Quote className="w-10 h-10 text-red-600/30 mb-4" />
                  <p className="text-lg italic text-muted-foreground mb-6">"{t.content}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-lg">
                      {t.author[0]}
                    </div>
                    <div>
                      <p className="font-bold text-secondary">{t.author}</p>
                      <p className="text-sm text-muted-foreground">{t.role}</p>
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
          <SectionHeader title="Featured Fire Protection Projects" />

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
              <Link href="/case-studies?division=Fire Detection & Protection">
                <Button variant="outline" size="lg">View All Fire Safety Projects</Button>
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
                Protect Your Assets with Expert Fire Safety
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Don't wait for disaster to strike. Our certified fire protection engineers will assess
                your facility and design a comprehensive safety system tailored to your needs.
              </p>
              <div className="bg-red-50 border-2 border-red-200 p-6 rounded-2xl">
                <h4 className="font-bold text-secondary mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Emergency Services
                </h4>
                <p className="text-muted-foreground mb-4">
                  For fire safety emergencies or urgent system repairs, contact our 24/7 hotline
                </p>
                <p className="text-3xl font-bold text-red-600">+1 (555) 123-FIRE</p>
              </div>
            </div>
            <InquiryForm division="Fire Detection & Protection" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
