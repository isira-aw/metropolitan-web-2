import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { useNews } from "@/hooks/use-news";
import { Card } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";

export default function News() {
  const { data, isLoading } = useNews();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="bg-secondary text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader title="News & Insights" subtitle="Updates from across our global operations." light />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="h-[400px] bg-muted animate-pulse rounded-2xl" />
            ))
          ) : data?.data && data.data.length > 0 ? (
            data.data.map(item => (
              <Card key={item.id} className="group overflow-hidden border-border hover:shadow-xl transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-primary font-medium mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {item.date ? format(new Date(item.date), 'MMM d, yyyy') : 'Recent'}
                  </div>
                  <h3 className="text-xl font-bold font-display text-secondary mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
                    {item.summary}
                  </p>
                  <Link href={`/news/${item.id}`}>
                    <span className="inline-flex items-center font-bold text-primary hover:underline cursor-pointer">
                      Read More <ArrowRight className="ml-1 w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </Card>
            ))
          ) : (
             <div className="col-span-full text-center py-20 text-muted-foreground">No news articles found.</div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
