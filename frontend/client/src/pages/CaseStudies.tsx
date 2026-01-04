import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { useCaseStudies } from "@/hooks/use-case-studies";
import { DIVISIONS } from "@shared/schema";
import { cn } from "@/lib/utils";

export default function CaseStudies() {
  const [selectedDivision, setSelectedDivision] = useState<string | undefined>();
  const { data, isLoading } = useCaseStudies({ division: selectedDivision });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="bg-secondary text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Our Projects</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Explore our portfolio of landmark projects that have transformed communities.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          <Button 
            variant={!selectedDivision ? "default" : "outline"}
            onClick={() => setSelectedDivision(undefined)}
            className={cn("rounded-full", !selectedDivision && "bg-primary hover:bg-primary/90")}
          >
            All Projects
          </Button>
          {DIVISIONS.map(div => (
            <Button
              key={div}
              variant={selectedDivision === div ? "default" : "outline"}
              onClick={() => setSelectedDivision(div)}
              className={cn("rounded-full", selectedDivision === div && "bg-primary hover:bg-primary/90")}
            >
              {div}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="h-[400px] bg-muted animate-pulse rounded-2xl" />
            ))
          ) : data?.data && data.data.length > 0 ? (
            data.data.map(item => (
              <CaseStudyCard key={item.id} item={item} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-xl text-muted-foreground">No projects found in this category.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
