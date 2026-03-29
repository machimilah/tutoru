import Navbar from "@/components/Navbar";
import SearchFilters from "@/components/SearchFilters";
import StatsBar from "@/components/StatsBar";
import FeaturedTutors from "@/components/FeaturedTutors";
import Scene3D from "@/components/Scene3D";

const Index = () => (
  <div className="min-h-screen bg-background pt-24">
    <Navbar />

    {/* Hero Section */}
    <section className="relative overflow-hidden min-h-[520px]">
      <Scene3D />
      <div className="relative z-10 flex flex-col items-center pt-20 pb-16 px-4">
        <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground text-center max-w-3xl leading-tight">
          Learn from students
          <span className="text-primary"> who get it</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl text-center max-w-xl mt-5 mb-10">
          Find affordable tutors from your university who've aced the same courses you're taking.
        </p>
        <SearchFilters />
      </div>
    </section>

    {/* Stats */}
    <div className="py-8 border-y border-border/50">
      <StatsBar />
    </div>

    {/* Featured Tutors */}
    <section className="py-16 px-4">
      <FeaturedTutors />
    </section>

    {/* Footer */}
    <footer className="border-t border-border py-8 px-6 text-center text-sm text-muted-foreground">
      © 2026 StudyMate. Built by students, for students.
    </footer>
  </div>
);

export default Index;
