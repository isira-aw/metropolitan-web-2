import { useRoute } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCaseStudy } from "@/hooks/use-case-studies";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin, Building } from "lucide-react";
import { Link } from "wouter";

export default function CaseStudyDetail() {
  const [, params] = useRoute("/case-studies/:id");
  const id = parseInt(params?.id || "0");
  const { data: project, isLoading, error } = useCaseStudy(id);

  if (isLoading) return <div className="min-h-screen bg-white flex items-center justify-center"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"/></div>;
  if (error || !project) return <div className="min-h-screen bg-white flex items-center justify-center">Project not found</div>;

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Hero Image */}
      <div className="relative h-[60vh] min-h-[500px]">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            <Link href="/case-studies">
              <Button variant="link" className="text-white pl-0 mb-4 hover:text-primary">
                <ArrowLeft className="mr-2 w-4 h-4" /> Back to Projects
              </Button>
            </Link>
            <div className="flex flex-wrap gap-3 mb-4">
              <Badge className="bg-primary text-white hover:bg-primary border-none text-sm py-1 px-3">{project.division}</Badge>
              {project.completionDate && (
                <Badge variant="outline" className="text-white border-white/30 bg-black/30 backdrop-blur-sm">
                  <Calendar className="w-3 h-3 mr-1" /> {project.completionDate}
                </Badge>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">{project.title}</h1>
            {project.location && (
              <p className="text-xl text-white/80 flex items-center">
                <MapPin className="w-5 h-5 mr-2" /> {project.location}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-display font-bold text-secondary mb-6">Project Overview</h2>
            <div className="prose prose-lg text-muted-foreground max-w-none leading-relaxed">
              {project.description.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-muted/30 border border-border rounded-2xl p-8 sticky top-24">
              <h3 className="text-xl font-bold text-secondary mb-6">Project Details</h3>
              
              <div className="space-y-6">
                {project.client && (
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Client</p>
                    <p className="text-lg font-medium text-foreground flex items-center">
                      <Building className="w-4 h-4 mr-2 text-primary" /> {project.client}
                    </p>
                  </div>
                )}
                
                <div>
                   <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Status</p>
                   <p className="text-lg font-medium text-foreground">Completed</p>
                </div>

                <div className="pt-6 border-t border-border">
                  <Link href="/contact">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg">
                      Discuss Similar Project
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
