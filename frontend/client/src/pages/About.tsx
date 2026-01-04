import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      <div className="bg-secondary text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader title="About Metropolitan" subtitle="Three decades of engineering excellence." light />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
           <div>
             <h2 className="text-3xl font-display font-bold text-secondary mb-6">Our Legacy</h2>
             <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
               Founded in 1990, Metropolitan began as a small structural engineering firm with a big vision. Today, we are a global multidisciplinary powerhouse, shaping the environments where people live, work, and play.
             </p>
             <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
               We believe that great infrastructure is the backbone of society. From towering skyscrapers to sustainable energy grids, our projects stand as testaments to human ingenuity and resilience.
             </p>
           </div>
           <div className="grid grid-cols-2 gap-4">
             <div className="space-y-4 mt-8">
                <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop" className="rounded-2xl shadow-lg w-full h-64 object-cover" alt="Construction" />
                <img src="https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=2009&auto=format&fit=crop" className="rounded-2xl shadow-lg w-full h-40 object-cover" alt="Planning" />
             </div>
             <div className="space-y-4">
                <img src="https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?q=80&w=2070&auto=format&fit=crop" className="rounded-2xl shadow-lg w-full h-40 object-cover" alt="Meeting" />
                <img src="https://pixabay.com/get/g74b492a782dfbac40e172bf86be0fc32b40e9824f45f7478a6d4063d67718a920fd8a8de2f9f7d330e1e0138ba8ddb394a870201c22fa5b97a4f780cc173d740_1280.jpg" className="rounded-2xl shadow-lg w-full h-64 object-cover" alt="Workers" />
             </div>
           </div>
        </div>

        <SectionHeader title="Leadership Team" subtitle="The visionaries guiding our path." />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
           {[
             { name: "Robert Vance", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" },
             { name: "Elena Rodriguez", role: "Chief Architect", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" },
             { name: "David Chen", role: "Head of Engineering", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" },
           ].map((person, i) => (
             <Card key={i} className="overflow-hidden border-none shadow-lg">
                <div className="h-80 overflow-hidden">
                  <img src={person.img} alt={person.name} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold font-display text-secondary">{person.name}</h3>
                  <p className="text-primary font-medium">{person.role}</p>
                </div>
             </Card>
           ))}
        </div>

        <div className="bg-primary text-white rounded-3xl p-12 text-center">
           <h2 className="text-3xl font-bold font-display mb-6">Our Core Values</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {["Safety First", "Sustainability", "Integrity"].map((v, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold">{v}</h3>
                </div>
              ))}
           </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
