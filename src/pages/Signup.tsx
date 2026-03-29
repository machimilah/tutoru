import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";

const Signup = () => (
  <div className="min-h-screen bg-background pt-24">
    <Navbar />
    <div className="flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8">
        <h1 className="font-display text-2xl font-bold text-foreground text-center mb-2">Create your account</h1>
        <p className="text-muted-foreground text-sm text-center mb-8">Join thousands of students on TutorU</p>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Full name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="John Doe" className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm font-body" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="email" placeholder="you@university.edu" className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm font-body" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm font-body" />
            </div>
          </div>
          <Button variant="hero" size="lg" className="w-full rounded-xl">Create Account</Button>
        </div>

        <p className="text-sm text-muted-foreground text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline underline-offset-4">Log in</Link>
        </p>
      </div>
    </div>
  </div>
);

export default Signup;
