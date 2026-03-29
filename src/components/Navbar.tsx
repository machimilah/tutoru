import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="w-full px-6 py-4 flex items-center justify-between bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
    <Link to="/" className="flex items-center gap-2">
      <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
        <GraduationCap className="w-5 h-5 text-primary-foreground" />
      </div>
      <span className="font-display font-bold text-xl text-foreground">StudyMate</span>
    </Link>
    <div className="hidden md:flex items-center gap-6">
      <Link to="/find-tutors" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Find Tutors</Link>
      <Link to="/become-tutor" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Become a Tutor</Link>
      <Link to="/how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How it Works</Link>
    </div>
    <div className="flex items-center gap-3">
      <Link to="/login"><Button variant="ghost" size="sm">Log in</Button></Link>
      <Link to="/signup"><Button variant="hero" size="sm">Sign up</Button></Link>
    </div>
  </nav>
);

export default Navbar;
