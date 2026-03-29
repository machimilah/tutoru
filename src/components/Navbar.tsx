import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-3 md:top-4 left-1/2 transform -translate-x-1/2 px-3 md:px-6 py-2 md:py-3 flex items-center justify-between bg-white border border-border/50 rounded-full shadow-lg z-50 w-auto max-w-[95vw]">
        <Link to="/" className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
          <img src="/logo.png" alt="TutorU" className="w-7 h-7 md:w-8 md:h-8" />
          <span className="font-display font-bold text-base md:text-lg text-foreground hidden sm:inline">TutorU</span>
        </Link>
        <div className="hidden md:flex items-center gap-4 lg:gap-6 mx-6 lg:mx-8 flex-1">
          <Link to="/find-tutors" className="text-xs lg:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Find Tutors</Link>
          <Link to="/become-tutor" className="text-xs lg:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Become a Tutor</Link>
          <Link to="/how-it-works" className="text-xs lg:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How it Works</Link>
        </div>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 ml-4 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-foreground" />
          ) : (
            <Menu className="w-5 h-5 text-foreground" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-16 left-1/4 right-1/4 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 md:hidden bg-white border border-border/50 rounded-2xl shadow-lg z-40 md:w-auto md:max-w-xs animate-fade-up">
          <div className="flex flex-col p-4 space-y-2">
            <Link
              to="/find-tutors"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              Find Tutors
            </Link>
            <Link
              to="/become-tutor"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              Become a Tutor
            </Link>
            <Link
              to="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              How it Works
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
