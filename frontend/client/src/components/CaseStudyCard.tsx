import { Link } from "wouter";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { type CaseStudy } from "@shared/schema";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface CaseStudyCardProps {
  item: CaseStudy;
  className?: string;
}

export function CaseStudyCard({ item, className }: CaseStudyCardProps) {
  return (
    <Link href={`/case-studies/${item.id}`} className={cn("group block h-full", className)}>
      <div className="h-full bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
        {/* Image */}
        <div className="relative h-48 sm:h-60 overflow-hidden">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary/90 text-white hover:bg-primary border-none text-xs font-semibold uppercase tracking-wider">
              {item.division}
            </Badge>
          </div>
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
             {item.location && (
               <div className="flex items-center gap-1">
                 <MapPin className="w-3 h-3" /> {item.location}
               </div>
             )}
             {item.completionDate && (
               <div className="flex items-center gap-1">
                 <Calendar className="w-3 h-3" /> {item.completionDate}
               </div>
             )}
          </div>
          
          <h3 className="text-xl font-display font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          
          <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">
            {item.description}
          </p>

          <div className="flex items-center text-primary font-semibold text-sm mt-auto group-hover:translate-x-1 transition-transform">
            View Project <ArrowRight className="w-4 h-4 ml-2" />
          </div>
        </div>
      </div>
    </Link>
  );
}
