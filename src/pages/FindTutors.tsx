import Navbar from "@/components/Navbar";
import SearchFilters from "@/components/SearchFilters";
import { Star, MapPin, BookOpen, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const fetchAllClasses = async () => {
  const { data, error } = await supabase
    .from('classes')
    .select('*, users(username)');
  
  if (error) throw error;
  return data;
};

const FindTutors = () => {
  const { data: classes, isLoading, error } = useQuery({
    queryKey: ['all-classes'],
    queryFn: fetchAllClasses
  });

  return (
    <div className="min-h-screen bg-background pt-24">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Find Tutors</h1>
        <p className="text-muted-foreground mb-8">Browse all available student tutors and find the perfect match.</p>

        <div className="mb-10">
          <SearchFilters />
        </div>

        {isLoading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary opacity-50" />
          </div>
        ) : error ? (
          <div className="text-center py-10 text-destructive text-sm opacity-80">
            Failed to load tutors at this time.
          </div>
        ) : classes && classes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.map((c: any) => {
              const tutorName = c.users?.username || "Unknown Tutor";
              const avatar = tutorName.substring(0, 2).toUpperCase();

              return (
                <Link to={`/tutor/${c.tutor_id}`} key={c.id} className="group bg-card border border-border rounded-2xl p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-display font-bold flex items-center justify-center text-sm shrink-0">
                      {avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-foreground truncate">{tutorName}</h3>
                      <p className="text-sm text-muted-foreground truncate">{c.university || "University"}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-display font-bold text-foreground text-lg">${c.price}</span>
                      <span className="text-xs text-muted-foreground">/hr</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span className="text-sm font-medium text-foreground truncate">{c.subject}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-primary text-primary shrink-0" />
                      <span className="text-sm font-semibold text-foreground">{c.rating || "New"}</span>
                      <span className="text-xs text-muted-foreground">({c.reviews || 0})</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="text-xs">{c.area || "Online"}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-border rounded-2xl bg-card/50">
            <BookOpen className="w-10 h-10 text-muted-foreground opacity-20 mx-auto mb-3" />
            <p className="text-muted-foreground">No tutors are currently offering classes. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindTutors;
