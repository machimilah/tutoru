import Navbar from "@/components/Navbar";
import SearchFilters from "@/components/SearchFilters";
import StatsBar from "@/components/StatsBar";
import FeaturedTutors from "@/components/FeaturedTutors";
import Scene3D from "@/components/Scene3D";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background pt-24">
    <Navbar />

    {/* Hero Section */}
    <section className="relative overflow-hidden min-h-[420px] md:min-h-[520px]">
      <Scene3D />
      <div className="relative z-10 flex flex-col items-center pt-12 md:pt-20 pb-12 md:pb-16 px-4 md:px-8">
        <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-foreground text-center max-w-3xl leading-tight">
          Learn from students
          <span className="text-primary"> who get it</span>
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg md:text-xl text-center max-w-xl mt-4 md:mt-5 mb-8 md:mb-10">
          Find affordable tutors from your university who've aced the same courses you're taking.
        </p>
        <SearchFilters />
      </div>
    </section>

    {/* Stats */}
    <div className="py-6 md:py-8 border-y border-border/50">
      <StatsBar />
    </div>

    {/* Featured Tutors */}
    <section className="py-12 md:py-16 px-4">
      <FeaturedTutors />
    </section>

    {/* Contact Us Section */}
    <section className="py-12 md:py-16 px-4 bg-primary/5 border-y border-border/50">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">Have any doubts?</h2>
        <p className="text-muted-foreground text-sm md:text-base mb-8 md:mb-10">
          We're here to help! If you have any questions about finding tutors, become a tutor, or how TutorU works, don't hesitate to reach out.
        </p>
        <Button variant="hero" size="lg" onClick={() => setContactOpen(true)} className="text-sm md:text-base">
          Contact Us
        </Button>
      </div>
    </section>

    <ContactForm isOpen={contactOpen} onClose={() => setContactOpen(false)} />

    {/* Footer */}
    <footer className="border-t border-border py-6 md:py-8 px-4 md:px-6 text-center text-xs md:text-sm text-muted-foreground">
      © 2026 TutorU. Built by students, for students.
    </footer>
    </div>
  );
};

export default Index;
