import { Link } from "wouter";
import { ArrowRight, Building2, Globe2, Lightbulb, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { InquiryForm } from "@/components/InquiryForm";
import { Button } from "@/components/ui/button";
import { useCaseStudies } from "@/hooks/use-case-studies";
import { Card } from "@/components/ui/card";

export default function Home() {
  const { data: latestProjects } = useCaseStudies({ limit: 3 });

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax-like fixed attachment */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')` 
            /* unsplash: metropolitan city skyline skyscrapers */
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 z-10 bg-secondary/80 mix-blend-multiply" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-10 duration-1000">
            Building the <span className="text-primary">Future</span><br />
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">Excellence</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
            A global leader in sustainable urban development, infrastructure, and innovative construction solutions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <Link href="/case-studies">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30">
                Explore Projects
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-2 border-white text-white hover:bg-white hover:text-secondary bg-transparent backdrop-blur-sm">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* WELCOME / VISION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-wide uppercase mb-6">
                Who We Are
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary mb-6 leading-tight">
                Shaping the skylines of tomorrow with precision and passion.
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                For over three decades, Metropolitan has been at the forefront of urban innovation. We combine cutting-edge technology with sustainable practices to create environments that thrive.
              </p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Our vision is to build infrastructure that not only meets the needs of today but anticipates the challenges of tomorrow, fostering communities that are resilient, connected, and vibrant.
              </p>
              <Link href="/about">
                <Button variant="link" className="p-0 text-primary font-bold text-lg h-auto">
                  Learn More About Us <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop" 
                  alt="Construction Site" 
                  /* unsplash: construction workers reviewing plans */
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-primary text-white p-8 rounded-2xl shadow-xl hidden md:block max-w-xs">
                <p className="text-4xl font-bold font-display mb-1">30+</p>
                <p className="text-sm font-medium opacity-90">Years of delivering excellence across global markets.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Why Metropolitan" 
            subtitle="Driven by values that ensure success in every project."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "Quality Assurance", desc: "Uncompromising standards in every brick and beam." },
              { icon: Lightbulb, title: "Innovation", desc: "Pioneering technologies for smarter construction." },
              { icon: Globe2, title: "Sustainability", desc: "Eco-friendly solutions for a greener planet." },
              { icon: Building2, title: "Global Expertise", desc: "International experience with local understanding." },
            ].map((feature, idx) => (
              <Card key={idx} className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-secondary mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST PROJECTS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-secondary mb-4">Featured Projects</h2>
              <p className="text-muted-foreground text-lg">Highlighting our recent contributions to the urban landscape.</p>
            </div>
            <Link href="/case-studies" className="hidden md:flex items-center text-primary font-bold hover:underline">
              View All Projects <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestProjects?.data?.map((project) => (
              <CaseStudyCard key={project.id} item={project} />
            )) || (
              // Loading skeletons
              Array(3).fill(0).map((_, i) => (
                 <div key={i} className="h-[400px] bg-muted animate-pulse rounded-2xl" />
              ))
            )}
          </div>
          
          <div className="mt-8 text-center md:hidden">
             <Link href="/case-studies">
              <Button variant="outline" className="w-full">View All Projects</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* INQUIRY SECTION */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Let's Build Something Extraordinary Together</h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Whether you have a complex infrastructure project or a sustainable residential development in mind, our team is ready to bring your vision to life.
              </p>
              <ul className="space-y-4 mb-10">
                {["Free consultation and project estimation", "Comprehensive feasibility studies", "End-to-end project management"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
