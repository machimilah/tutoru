import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => (
  <nav className="w-full px-6 py-4 flex items-center justify-between bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
    <div className="flex items-center gap-2">
      <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
        <GraduationCap className="w-5 h-5 text-primary-foreground" />
      </div>
      <span className="font-display font-bold text-xl text-foreground">StudyMate</span>
    </div>
    <div className="hidden md:flex items-center gap-6">
      <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Find Tutors</a>
      <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Become a Tutor</a>
      <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
    </div>
    <div className="flex items-center gap-3">
      <Button variant="ghost" size="sm">Log in</Button>
      <Button variant="hero" size="sm">Sign up</Button>
    </div>
  </nav>
);

export default Navbar;
