import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { useApplyJob } from "@/hooks/use-careers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertJobApplicationSchema, type InsertJobApplication } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Briefcase, MapPin, Clock } from "lucide-react";

// Hardcoded jobs for UI
const JOBS = [
  { title: "Senior Structural Engineer", location: "New York, NY", type: "Full-time", dept: "Infrastructure" },
  { title: "Project Manager", location: "London, UK", type: "Full-time", dept: "Commercial" },
  { title: "Sustainability Consultant", location: "Berlin, DE", type: "Full-time", dept: "Energy" },
];

export default function Careers() {
  const mutation = useApplyJob();
  
  const form = useForm<InsertJobApplication>({
    resolver: zodResolver(insertJobApplicationSchema),
    defaultValues: {
      name: "",
      email: "",
      position: "",
      portfolioUrl: "",
      coverLetter: "",
    },
  });

  function onSubmit(data: InsertJobApplication) {
    mutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      <div className="bg-secondary text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader title="Join Our Team" subtitle="Build your career with a global leader." light />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Job Listings */}
          <div>
            <h2 className="text-3xl font-display font-bold text-secondary mb-8">Open Positions</h2>
            <div className="space-y-6">
              {JOBS.map((job, i) => (
                <Card key={i} className="hover:shadow-lg transition-all cursor-pointer border-l-4  shadow-2xl   hover:border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-secondary">{job.title}</h3>
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">{job.dept}</span>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {job.location}</span>
                      <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {job.type}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 p-8 bg-muted/30 rounded-2xl">
              <h3 className="text-xl font-bold text-secondary mb-4">Why Metropolitan?</h3>
              <ul className="space-y-3">
                {["Competitive salary and benefits", "Global mobility opportunities", "Professional development programs", "Inclusive and diverse culture"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-primary" />
                     <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Application Form */}
          <div>
             <Card className="shadow-xl">
               <CardContent className="p-8">
                 <h2 className="text-2xl font-display font-bold text-secondary mb-6">Apply Now</h2>
                 <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position Applying For</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Senior Structural Engineer" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="portfolioUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Portfolio URL (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://linkedin.com/in/..." {...field} value={field.value || ''} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="coverLetter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cover Letter</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us why you're a good fit..." 
                              className="min-h-[150px]" 
                              {...field} 
                              value={field.value || ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full h-12 text-lg bg-primary hover:bg-primary/90"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? <Loader2 className="animate-spin" /> : "Submit Application"}
                    </Button>
                  </form>
                 </Form>
               </CardContent>
             </Card>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
