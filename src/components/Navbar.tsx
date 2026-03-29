import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 flex items-center justify-between bg-white border border-border/50 rounded-full shadow-lg z-50 w-auto">
    <Link to="/" className="flex items-center gap-2">
      <img src="/logo.png" alt="StudyMate" className="w-8 h-8" />
      <span className="font-display font-bold text-lg text-foreground hidden sm:inline">TutorU</span>
    </Link>
    <div className="hidden md:flex items-center gap-6 mx-8">
      <Link to="/find-tutors" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Find Tutors</Link>
      <Link to="/become-tutor" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Become a Tutor</Link>
      <Link to="/how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How it Works</Link>
    </div>
    <div className="flex items-center gap-2">
      <Link to="/login"><Button variant="ghost" size="sm">Log in</Button></Link>
      <Link to="/signup"><Button variant="hero" size="sm">Sign up</Button></Link>
    </div>
  </nav>
);

export default Navbar;
