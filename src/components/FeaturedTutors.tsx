import { Star, MapPin, BookOpen, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const fetchClasses = async () => {
  const { data, error } = await supabase
    .from('classes')
    .select('*, users(username)');
  
  if (error) throw error;
  return data;
};

const TutorCard = ({ classItem }: { classItem: any }) => {
  const tutorName = classItem.users?.username || "Unknown Tutor";
  const avatar = tutorName.substring(0, 2).toUpperCase();

  return (
    <Link to={`/tutor/${classItem.tutor_id}`} className="group bg-card border border-border rounded-2xl p-4 md:p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 block">
      <div className="flex items-start gap-3 md:gap-4">
        <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-primary/10 text-primary font-display font-bold flex items-center justify-center text-xs md:text-sm shrink-0">
          {avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-sm md:text-base text-foreground truncate">{tutorName}</h3>
          <p className="text-xs md:text-sm text-muted-foreground truncate">{classItem.university || "University"}</p>
        </div>
        <div className="text-right shrink-0">
          <span className="font-display font-bold text-base md:text-lg text-foreground">${classItem.price}</span>
          <span className="text-xs text-muted-foreground">/hr</span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <BookOpen className="w-3 md:w-3.5 h-3 md:h-3.5 text-accent shrink-0" />
        <span className="text-xs md:text-sm font-medium text-foreground truncate">{classItem.subject}</span>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Star className="w-3.5 md:w-4 h-3.5 md:h-4 fill-primary text-primary shrink-0" />
          <span className="text-xs md:text-sm font-semibold text-foreground">{classItem.rating || "New"}</span>
          <span className="text-xs text-muted-foreground">({classItem.reviews || 0})</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="w-3 md:w-3.5 h-3 md:h-3.5 shrink-0" />
          <span className="text-xs">{classItem.area || "Online"}</span>
        </div>
      </div>
    </Link>
  );
};

const FeaturedTutors = () => {
  const { data: classes, isLoading, error } = useQuery({
    queryKey: ['featured-classes'],
    queryFn: fetchClasses
  });

  return (
    <section className="w-full max-w-6xl mx-auto px-4">
      <div className="flex items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">Featured Tutors</h2>
          <p className="text-muted-foreground text-xs md:text-sm mt-1">Top-rated students ready to help you succeed</p>
        </div>
        <Link to="/find-tutors" className="text-xs md:text-sm text-primary font-medium hover:underline underline-offset-4 whitespace-nowrap">View all →</Link>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {classes.map((classItem) => (
            <TutorCard key={classItem.id} classItem={classItem} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-border rounded-2xl bg-card/50">
          <BookOpen className="w-10 h-10 text-muted-foreground opacity-20 mx-auto mb-3" />
          <p className="text-muted-foreground">No classes available yet. Be the first to tutor!</p>
        </div>
      )}
    </section>
  );
};

export default FeaturedTutors;
