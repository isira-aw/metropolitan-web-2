import { useEffect } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { InquiryForm } from "@/components/InquiryForm";
import { useCaseStudies } from "@/hooks/use-case-studies";
import { type Testimonial } from "@shared/schema";
import { Sun, Leaf, DollarSign, TrendingDown, CheckCircle2, Quote, Lightbulb, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

export default function Solar() {
  const { data: projects, isLoading } = useCaseStudies({ division: "Solar", limit: 3 });

  const { data: testimonialsData } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials", "Solar"],
    queryFn: async () => {
      const res = await fetch(`/api/testimonials?division=Solar`);
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return res.json();
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const solutions = [
    {
      title: "Rooftop Solar PV Systems",
      description: "Maximize your roof space with high-efficiency photovoltaic panels",
      icon: Sun,
      benefits: [
        "Monocrystalline & polycrystalline options",
        "Efficiency up to 22%",
        "25+ year performance warranty",
        "Net metering compatible"
      ]
    },
    {
      title: "Solar Street Lighting",
      description: "Self-sufficient outdoor lighting solutions powered by the sun",
      icon: Lightbulb,
      benefits: [
        "Zero electricity bills",
        "Automatic dusk-to-dawn operation",
        "Maintenance-free LED fixtures",
        "Battery backup for 3-5 days"
      ]
    },
    {
      title: "On-Grid & Off-Grid Systems",
      description: "Flexible solar solutions tailored to your energy independence goals",
      icon: DollarSign,
      benefits: [
        "Grid-tied with feed-in tariff",
        "Hybrid systems with battery storage",
        "Standalone off-grid installations",
        "Smart inverters with monitoring"
      ]
    },
    {
      title: "Solar Water Heating",
      description: "Eco-friendly water heating reducing conventional energy consumption",
      icon: TrendingDown,
      benefits: [
        "Evacuated tube collectors",
        "Flat plate collectors",
        "60-80% energy savings",
        "Integrated backup heating"
      ]
    }
  ];

  const environmentalImpact = [
    { icon: Leaf, value: "2.5M kg", label: "CO₂ Offset Annually" },
    { icon: Sun, value: "500+", label: "Solar Installations" },
    { icon: TrendingDown, value: "40-60%", label: "Average Bill Reduction" },
    { icon: Users, value: "1000+", label: "Happy Customers" }
  ];

  const processSteps = [
    { step: "1", title: "Site Assessment", desc: "Evaluate roof orientation, shading, and structural capacity" },
    { step: "2", title: "System Design", desc: "Custom design optimized for maximum energy yield" },
    { step: "3", title: "Installation", desc: "Professional mounting, wiring, and commissioning" },
    { step: "4", title: "Grid Connection", desc: "Net metering setup and utility approval coordination" },
    { step: "5", title: "Monitoring", desc: "Real-time performance tracking and maintenance support" }
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* HERO - Bright & Green Theme */}
      <section className="relative bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-200 border-green-300">
              <Leaf className="w-3 h-3 mr-1" />
              Sustainable Energy Solutions
            </Badge>
            <h1 className="text-6xl md:text-7xl font-display font-bold text-secondary mb-6">
              Harness the Power of the
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500"> Sun</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Join the renewable energy revolution with our comprehensive solar solutions.
              Reduce your carbon footprint while slashing electricity costs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                <Sun className="mr-2 w-5 h-5" />
                Get Solar Quote
              </Button>
              <Button size="lg" variant="outline">
                Calculate Savings
              </Button>
            </div>
          </div>

          {/* Environmental Impact Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {environmentalImpact.map((item, i) => {
              const Icon = item.icon;
              return (
                <Card key={i} className="border-green-200 bg-white/80 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 100}ms` }}>
                  <CardContent className="p-6 text-center">
                    <Icon className="w-10 h-10 text-green-600 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-secondary mb-1">{item.value}</p>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Comprehensive Solar Solutions"
            subtitle="From residential rooftops to large-scale commercial installations"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {solutions.map((solution, i) => {
              const Icon = solution.icon;
              return (
                <div
                  key={i}
                  className="group relative bg-gradient-to-br from-white to-green-50/30 p-8 rounded-3xl border-2 border-green-100 hover:border-green-400 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/10 rounded-full blur-2xl group-hover:bg-green-400/20 transition-all" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-secondary mb-2 group-hover:text-green-700 transition-colors">
                          {solution.title}
                        </h3>
                        <p className="text-muted-foreground">{solution.description}</p>
                      </div>
                      <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-600 group-hover:scale-110 transition-all ml-4">
                        <Icon className="w-7 h-7 text-green-600 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      {solution.benefits.map((benefit, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                          <span className="text-secondary/80">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY GO SOLAR - Unique Visual Section */}
      <section className="py-24 bg-gradient-to-br from-green-600 to-green-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Why Invest in Solar Energy?</h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Solar power is more than just an energy source—it's an investment in your future
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: DollarSign,
                title: "Significant Cost Savings",
                points: [
                  "Reduce electricity bills by 40-60%",
                  "Protection against rising energy costs",
                  "Attractive ROI within 4-6 years",
                  "Government incentives & tax benefits"
                ]
              },
              {
                icon: Leaf,
                title: "Environmental Benefits",
                points: [
                  "Zero greenhouse gas emissions",
                  "Reduce carbon footprint significantly",
                  "Clean, renewable energy source",
                  "Combat climate change"
                ]
              },
              {
                icon: TrendingDown,
                title: "Energy Independence",
                points: [
                  "Less reliance on grid power",
                  "Protection from power outages",
                  "Sell excess power back to grid",
                  "Increase property value"
                ]
              }
            ].map((section, i) => {
              const Icon = section.icon;
              return (
                <div key={i} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                  <Icon className="w-12 h-12 text-yellow-300 mb-6" />
                  <h3 className="text-2xl font-bold mb-6">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2 text-white/90">
                        <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-yellow-300" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INSTALLATION PROCESS */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Simple Installation Process" subtitle="From assessment to activation in 5 easy steps" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-12">
            {processSteps.map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-white p-6 rounded-2xl border-2 border-border hover:border-green-400 transition-all h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-secondary mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-6 -right-3 w-6 h-1 bg-green-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonialsData && testimonialsData.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader title="Customer Success Stories" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {testimonialsData.map((t) => (
                <div key={t.id} className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border border-green-200 hover:shadow-lg transition-all">
                  <Quote className="w-8 h-8 text-green-600/30 mb-4" />
                  <p className="text-muted-foreground italic mb-6">"{t.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
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
          <SectionHeader title="Featured Solar Projects" />

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
              <Link href="/case-studies?division=Solar">
                <Button variant="outline" size="lg">View All Solar Projects</Button>
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
                Ready to Go Solar?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Our solar experts will design a customized system for your property, calculate your
                potential savings, and guide you through available incentives and financing options.
              </p>
              <div className="bg-gradient-to-br from-green-50 to-yellow-50 p-8 rounded-3xl border-2 border-green-200">
                <h4 className="font-bold text-secondary mb-4 flex items-center gap-2">
                  <Sun className="w-6 h-6 text-green-600" />
                  Free Solar Assessment Includes:
                </h4>
                <ul className="space-y-3">
                  {[
                    "Roof analysis & shading study",
                    "Energy consumption review",
                    "Custom system design & 3D modeling",
                    "Financial analysis with ROI calculation",
                    "Available incentives & rebates overview"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <InquiryForm division="Solar" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
