import Navbar from "@/components/Navbar";
import SearchFilters from "@/components/SearchFilters";
import { Star, MapPin, BookOpen, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TUTORS = [
  { id: "sarah-chen", name: "Sarah Chen", subject: "Calculus & Linear Algebra", university: "MIT", rating: 4.9, reviews: 47, price: 25, area: "Online", avatar: "SC", language: "English" },
  { id: "james-okafor", name: "James Okafor", subject: "Organic Chemistry", university: "Stanford", rating: 4.8, reviews: 32, price: 30, area: "Campus Area", avatar: "JO", language: "English" },
  { id: "maria-garcia", name: "María García", subject: "Spanish Literature", university: "NYU", rating: 5.0, reviews: 28, price: 20, area: "Downtown", avatar: "MG", language: "Spanish" },
  { id: "alex-kim", name: "Alex Kim", subject: "Computer Science", university: "UCLA", rating: 4.7, reviews: 55, price: 35, area: "Online", avatar: "AK", language: "English" },
  { id: "priya-patel", name: "Priya Patel", subject: "Microeconomics", university: "Columbia", rating: 4.9, reviews: 41, price: 22, area: "North Side", avatar: "PP", language: "English" },
  { id: "luca-rossi", name: "Luca Rossi", subject: "Physics I & II", university: "Harvard", rating: 4.8, reviews: 38, price: 28, area: "Online", avatar: "LR", language: "Italian" },
  { id: "emma-wilson", name: "Emma Wilson", subject: "Psychology 101", university: "Yale", rating: 4.6, reviews: 22, price: 18, area: "Online", avatar: "EW", language: "English" },
  { id: "chen-wei", name: "Chen Wei", subject: "Engineering Dynamics", university: "Princeton", rating: 4.9, reviews: 61, price: 32, area: "Campus Area", avatar: "CW", language: "Mandarin" },
  { id: "sofia-martin", name: "Sofia Martin", subject: "French Literature", university: "Columbia", rating: 4.7, reviews: 19, price: 24, area: "Downtown", avatar: "SM", language: "French" },
];

const FindTutors = () => (
  <div className="min-h-screen bg-background pt-24">
    <Navbar />
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Find Tutors</h1>
      <p className="text-muted-foreground mb-8">Browse all available student tutors and find the perfect match.</p>

      <div className="mb-10">
        <SearchFilters />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TUTORS.map((tutor) => (
          <Link to={`/tutor/${tutor.id}`} key={tutor.id} className="group bg-card border border-border rounded-2xl p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-display font-bold flex items-center justify-center text-sm shrink-0">
                {tutor.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-foreground truncate">{tutor.name}</h3>
                <p className="text-sm text-muted-foreground truncate">{tutor.university}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="font-display font-bold text-foreground text-lg">${tutor.price}</span>
                <span className="text-xs text-muted-foreground">/hr</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-accent" />
              <span className="text-sm font-medium text-foreground">{tutor.subject}</span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="text-sm font-semibold text-foreground">{tutor.rating}</span>
                <span className="text-xs text-muted-foreground">({tutor.reviews})</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-xs">{tutor.area}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default FindTutors;
