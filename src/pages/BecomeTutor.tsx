import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Users, BookOpen, DollarSign } from "lucide-react";

const steps = [
  { icon: <Users className="w-6 h-6" />, title: "Create Your Profile", desc: "Sign up and list the courses you can tutor, your availability, and hourly rate." },
  { icon: <BookOpen className="w-6 h-6" />, title: "Get Matched", desc: "Students search by course, university, or area and find you based on ratings and reviews." },
  { icon: <DollarSign className="w-6 h-6" />, title: "Start Earning", desc: "Set your own schedule, teach what you love, and earn money helping fellow students." },
];

const BecomeTutor = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <span className="inline-block bg-primary/10 text-primary font-medium text-sm px-4 py-1.5 rounded-full mb-6">
        🎓 Share your knowledge
      </span>
      <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">Become a Tutor</h1>
      <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-12">
        Help fellow students succeed while earning money on your own schedule. No teaching degree required — just your expertise.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {steps.map((step, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-6 text-left">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
              {step.icon}
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl p-8 text-left max-w-lg mx-auto">
        <h2 className="font-display text-xl font-bold text-foreground mb-4">Why tutor with StudyMate?</h2>
        <ul className="space-y-3">
          {["Flexible schedule — you choose when", "Set your own hourly rate", "Build teaching experience for your resume", "Help peers and make a real impact"].map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm text-foreground">
              <CheckCircle className="w-4 h-4 text-primary shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <Link to="/signup">
          <Button variant="hero" size="lg" className="w-full mt-6 rounded-xl">Get Started</Button>
        </Link>
      </div>
    </div>
  </div>
);

export default BecomeTutor;
