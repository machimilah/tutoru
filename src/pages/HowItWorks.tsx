import Navbar from "@/components/Navbar";
import { Search, MessageCircle, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  { num: "01", icon: <Search className="w-6 h-6" />, title: "Search", desc: "Filter by course, university, area, or language to find the right tutor." },
  { num: "02", icon: <MessageCircle className="w-6 h-6" />, title: "Connect", desc: "View tutor profiles, check reviews, and book a session that fits your schedule." },
  { num: "03", icon: <Star className="w-6 h-6" />, title: "Learn & Review", desc: "Meet with your tutor, master the material, and leave a review to help others." },
];

const HowItWorks = () => (
  <div className="min-h-screen bg-background pt-24">
    <Navbar />
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">How It Works</h1>
      <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-16">
        Getting help has never been easier. Three simple steps to academic success.
      </p>

      <div className="space-y-8 mb-16">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col md:flex-row items-center gap-6 bg-card border border-border rounded-2xl p-8 text-left">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0">
              {step.icon}
            </div>
            <div className="flex-1">
              <span className="text-xs text-primary font-semibold tracking-wider uppercase">Step {step.num}</span>
              <h3 className="font-display text-xl font-bold text-foreground mt-1">{step.title}</h3>
              <p className="text-muted-foreground mt-1">{step.desc}</p>
            </div>
            {i < steps.length - 1 && <ArrowRight className="hidden md:block w-5 h-5 text-muted-foreground" />}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/find-tutors">
          <Button variant="hero" size="lg" className="rounded-xl">Find a Tutor</Button>
        </Link>
        <Link to="/become-tutor">
          <Button variant="outline" size="lg" className="rounded-xl">Become a Tutor</Button>
        </Link>
      </div>
    </div>
  </div>
);

export default HowItWorks;
