import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import DivisionsIntro from "@/pages/DivisionsIntro";
import CentralAC from "@/pages/CentralAC";
import Elevators from "@/pages/Elevators";
import FireProtection from "@/pages/FireProtection";
import Generator from "@/pages/Generator";
import Solar from "@/pages/Solar";
import ELV from "@/pages/ELV";
import CaseStudies from "@/pages/CaseStudies";
import CaseStudyDetail from "@/pages/CaseStudyDetail";
import News from "@/pages/News";
import NewsDetail from "@/pages/NewsDetail";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";
import About from "@/pages/About";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/divisions" component={DivisionsIntro} />
      <Route path="/divisions/central-ac" component={CentralAC} />
      <Route path="/divisions/elevators-and-travelators" component={Elevators} />
      <Route path="/divisions/fire-detection-&-protection" component={FireProtection} />
      <Route path="/divisions/generator" component={Generator} />
      <Route path="/divisions/solar" component={Solar} />
      <Route path="/divisions/elv" component={ELV} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/case-studies/:id" component={CaseStudyDetail} />
      <Route path="/news" component={News} />
      <Route path="/news/:id" component={NewsDetail} />
      <Route path="/careers" component={Careers} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
