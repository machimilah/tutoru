import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { Star, Clock, MapPin, BookOpen, MessageCircle, Calendar, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const fetchTutorInfo = async (tutorId: string) => {
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', tutorId)
    .single();
    
  if (userError) throw userError;

  const { data: classes, error: classesError } = await supabase
    .from('classes')
    .select('*')
    .eq('tutor_id', tutorId);

  if (classesError) throw classesError;

  return { user, classes: classes || [] };
};

const TutorProfile = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['tutor-profile', id],
    queryFn: () => fetchTutorInfo(id as string),
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary opacity-50" />
        </div>
      </div>
    );
  }

  if (error || !data?.user) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold mb-2">Tutor Not Found</h2>
          <p className="text-muted-foreground mb-6">This tutor profile doesn't exist or was removed.</p>
          <Link to="/find-tutors" className="text-primary hover:underline">Browse other tutors</Link>
        </div>
      </div>
    );
  }

  const { user, classes } = data;
  const tutorName = user.username || "Unknown Tutor";
  const avatar = tutorName.substring(0, 2).toUpperCase();
  
  // Aggregate stats from their classes
  const totalReviews = classes.reduce((sum, c) => sum + (c.reviews || 0), 0);
  const avgRating = classes.length > 0 && totalReviews > 0
    ? (classes.reduce((sum, c) => sum + (c.rating || 0), 0) / classes.length).toFixed(1) 
    : "New";
  const minPrice = classes.length > 0 ? Math.min(...classes.map(c => c.price)) : 0;
  
  // Get unique subjects, universities, and areas from classes
  const university = classes[0]?.university || "University";
  const area = classes[0]?.area || "Location varies";

  return (
    <div className="min-h-screen bg-background pt-24">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link to="/find-tutors" className="text-sm text-primary hover:underline underline-offset-4 mb-6 inline-block">← Back to tutors</Link>

        <div className="bg-card border border-border rounded-2xl p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary font-display font-bold flex items-center justify-center text-2xl shrink-0">
              {avatar}
            </div>
            <div className="flex-1">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">{tutorName}</h1>
              <p className="text-muted-foreground mt-1">{university}</p>
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="text-sm font-semibold">{avgRating}</span>
                  <span className="text-xs text-muted-foreground">({totalReviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4" />
                  {area}
                </div>
              </div>
            </div>
            <div className="text-right">
              {classes.length > 0 && (
                <>
                  <span className="text-muted-foreground text-sm mr-2">from</span>
                  <span className="font-display font-bold text-3xl text-foreground">${minPrice}</span>
                  <span className="text-muted-foreground">/hr</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-display text-lg font-semibold text-foreground mb-3">About</h2>
              <p className="text-muted-foreground leading-relaxed">
                Contact this tutor to learn more about their teaching style and experience. 
                They specialize in providing quality peer-to-peer education.
              </p>
            </div>
            
            {classes.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-lg font-semibold text-foreground">Classes Offered</h2>
                </div>
                <div className="space-y-3">
                  {classes.map((c: any) => (
                    <div key={c.id} className="flex justify-between items-center p-3 sm:p-4 rounded-xl border border-border bg-background/50">
                      <div>
                        <div className="font-medium text-foreground">{c.subject}</div>
                        <div className="text-xs text-muted-foreground">{c.area}</div>
                      </div>
                      <div className="font-semibold text-primary whitespace-nowrap">
                        ${c.price}/hr
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Availability
              </h2>
              <ul className="space-y-2">
                 <li className="flex items-center gap-2 text-sm text-muted-foreground">
                   <Clock className="w-3.5 h-3.5 text-primary" />
                   Available upon request
                 </li>
              </ul>
            </div>
            <Button variant="hero" size="lg" className="w-full rounded-2xl">
              <MessageCircle className="w-4 h-4 mr-2" /> Book a Session
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
