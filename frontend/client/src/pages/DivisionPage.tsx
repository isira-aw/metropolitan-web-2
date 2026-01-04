import { useEffect } from "react";
import { useRoute, Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { InquiryForm } from "@/components/InquiryForm";
import { useCaseStudies } from "@/hooks/use-case-studies";
import { DIVISIONS, type Testimonial } from "@shared/schema";
import { ArrowRight, CheckCircle2, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

// Static data mapping for divisions
const DIVISION_DATA: Record<string, {
  title: string;
  desc: string;
  image: string;
  services: string[];
}> = {
  "central ac": {
    title: "Central AC",
    desc: "Providing advanced climate control solutions for large-scale commercial and industrial spaces.",
    image: "https://tse3.mm.bing.net/th/id/OIP.5M8l_SianRfJk98U-IqBFQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    services: ["Chiller Systems", "VRV/VRF Installation", "Ducting & Ventilation", "Maintenance Contracts"]
  },
  "elevators and travelators": {
    title: "Elevators and Travelators",
    desc: "Seamless vertical and horizontal transportation solutions for modern urban environments.",
    image: "https://images.unsplash.com/photo-1516733968668-dbdce39c46ef?q=80&w=2070&auto=format&fit=crop",
    services: ["Passenger Elevators", "Freight Elevators", "Travelators & Escalators", "Modernization Services"]
  },
  "fire detection & protection": {
    title: "Fire Detection & Protection",
    desc: "State-of-the-art safety systems to protect lives and infrastructure from fire hazards.",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ec4?q=80&w=2070&auto=format&fit=crop",
    services: ["Addressable Fire Alarms", "Automatic Sprinklers", "FM-200 Suppression", "Hydrant Systems"]
  },
  "generator": {
    title: "Generator",
    desc: "Reliable power backup solutions to ensure business continuity in any situation.",
    image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=2070&auto=format&fit=crop",
    services: ["Diesel Generator Sets", "Soundproof Enclosures", "AMF Panel Installation", "Synchronizing Systems"]
  },
  "solar": {
    title: "Solar",
    desc: "Harnessing the sun's power with sustainable energy solutions for a greener future.",
    image: "https://images.unsplash.com/photo-1509391366360-fe5bb6585828?q=80&w=2070&auto=format&fit=crop",
    services: ["Rooftop Solar PV", "Solar Street Lighting", "On-Grid & Off-Grid Systems", "Solar Water Heating"]
  },
  "elv": {
    title: "ELV",
    desc: "Integrating intelligent building technologies for enhanced connectivity and security.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    services: ["CCTV & Surveillance", "Access Control Systems", "Structure Cabling", "Public Address Systems"]
  }
};

export default function DivisionPage() {
  const [, params] = useRoute("/divisions/:name");
  const divisionKey = params?.name?.toLowerCase().replace(/-/g, ' ') || "central ac";
  const data = DIVISION_DATA[divisionKey] || DIVISION_DATA["central ac"];
  
  // Fetch projects for this division
  const capitalizedDivision = divisionKey === "elv" ? "ELV" : divisionKey.charAt(0).toUpperCase() + divisionKey.slice(1);
  const { data: projects, isLoading } = useCaseStudies({ division: capitalizedDivision, limit: 3 });

  const { data: testimonialsData } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials", capitalizedDivision],
    queryFn: async () => {
      const res = await fetch(`/api/testimonials?division=${capitalizedDivision}`);
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return res.json();
    }
  });

  // Scroll to top on change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [divisionKey]);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      {/* HERO */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${data.image}')` }}
        />
        <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl animate-in slide-in-from-left-10 fade-in duration-700">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
              {data.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-8">
              {data.desc}
            </p>
            <div className="h-2 w-24 bg-primary rounded-full" />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader 
                title="Our Expertise" 
                subtitle={`Leading the way in ${data.title.toLowerCase()} development.`} 
                align="left"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.services.map((service, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/50 transition-colors">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <span className="font-medium text-secondary">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-muted p-8 rounded-3xl relative overflow-hidden">
               <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
               <h3 className="text-2xl font-display font-bold text-secondary mb-6 relative z-10">Client Testimonials</h3>
               <div className="space-y-8 relative z-10">
                 {testimonialsData && testimonialsData.length > 0 ? (
                   testimonialsData.map((t) => (
                     <div key={t.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                       <Quote className="w-8 h-8 text-primary/20 mb-2" />
                       <blockquote className="text-lg italic text-muted-foreground mb-4">
                         "{t.content}"
                       </blockquote>
                       <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                           {t.author[0]}
                         </div>
                         <div>
                           <p className="font-bold text-secondary text-sm">{t.author}</p>
                           <p className="text-xs text-muted-foreground">{t.role}</p>
                         </div>
                       </div>
                     </div>
                   ))
                 ) : (
                   <div className="text-muted-foreground italic">
                     "Metropolitan's expertise in the {data.title.toLowerCase()} sector is unmatched. They delivered our project ahead of schedule and with exceptional quality."
                   </div>
                 )}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Featured Projects" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
               <Link href={`/case-studies?division=${capitalizedDivision}`}>
                 <Button variant="outline" size="lg">View All {data.title} Projects</Button>
               </Link>
             </div>
          )}
        </div>
      </section>

      {/* OTHER DIVISIONS */}
      <section className="py-24 bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Explore Other Divisions" light />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
             {DIVISIONS.filter(d => d.toLowerCase() !== divisionKey).slice(0, 6).map(div => (
                <Link key={div} href={`/divisions/${div.toLowerCase()}`}>
                  <div className="group p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-primary transition-all cursor-pointer text-center h-full flex flex-col items-center justify-center">
                    <span className="font-semibold text-sm">{div}</span>
                    <ArrowRight className="w-4 h-4 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
             ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-display font-bold text-secondary mb-6">
                Consult with our {data.title} Experts
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Ready to start your next project? Our specialized team is here to help you navigate the complexities of {data.title.toLowerCase()} development.
              </p>
              <div className="p-6 bg-muted/30 rounded-2xl border border-border">
                <h4 className="font-bold text-secondary mb-2">Direct Contact</h4>
                <p className="text-primary font-bold text-xl">+1 (555) {divisionKey.length}23-4567</p>
                <p className="text-muted-foreground">{divisionKey}@metropolitan.co</p>
              </div>
            </div>
            <InquiryForm division={capitalizedDivision} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
