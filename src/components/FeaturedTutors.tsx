import { Star, MapPin, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const TUTORS = [
  { id: "sarah-chen", name: "Sarah Chen", subject: "Calculus & Linear Algebra", university: "MIT", rating: 4.9, reviews: 47, price: 25, area: "Online", avatar: "SC" },
  { id: "james-okafor", name: "James Okafor", subject: "Organic Chemistry", university: "Stanford", rating: 4.8, reviews: 32, price: 30, area: "Campus Area", avatar: "JO" },
  { id: "maria-garcia", name: "María García", subject: "Spanish Literature", university: "NYU", rating: 5.0, reviews: 28, price: 20, area: "Downtown", avatar: "MG" },
  { id: "alex-kim", name: "Alex Kim", subject: "Computer Science", university: "UCLA", rating: 4.7, reviews: 55, price: 35, area: "Online", avatar: "AK" },
  { id: "priya-patel", name: "Priya Patel", subject: "Microeconomics", university: "Columbia", rating: 4.9, reviews: 41, price: 22, area: "North Side", avatar: "PP" },
  { id: "luca-rossi", name: "Luca Rossi", subject: "Physics I & II", university: "Harvard", rating: 4.8, reviews: 38, price: 28, area: "Online", avatar: "LR" },
];

const TutorCard = ({ tutor }: { tutor: typeof TUTORS[0] }) => (
  <Link to={`/tutor/${tutor.id}`} className="group bg-card border border-border rounded-2xl p-4 md:p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 block">
    <div className="flex items-start gap-3 md:gap-4">
      <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-primary/10 text-primary font-display font-bold flex items-center justify-center text-xs md:text-sm shrink-0">
        {tutor.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-display font-semibold text-sm md:text-base text-foreground truncate">{tutor.name}</h3>
        <p className="text-xs md:text-sm text-muted-foreground truncate">{tutor.university}</p>
      </div>
      <div className="text-right shrink-0">
        <span className="font-display font-bold text-base md:text-lg text-foreground">${tutor.price}</span>
        <span className="text-xs text-muted-foreground">/hr</span>
      </div>
    </div>
    <div className="mt-3 flex items-center gap-2">
      <BookOpen className="w-3 md:w-3.5 h-3 md:h-3.5 text-accent shrink-0" />
      <span className="text-xs md:text-sm font-medium text-foreground truncate">{tutor.subject}</span>
    </div>
    <div className="mt-3 flex items-center justify-between gap-2">
      <div className="flex items-center gap-1.5">
        <Star className="w-3.5 md:w-4 h-3.5 md:h-4 fill-primary text-primary shrink-0" />
        <span className="text-xs md:text-sm font-semibold text-foreground">{tutor.rating}</span>
        <span className="text-xs text-muted-foreground">({tutor.reviews})</span>
      </div>
      <div className="flex items-center gap-1 text-muted-foreground">
        <MapPin className="w-3 md:w-3.5 h-3 md:h-3.5 shrink-0" />
        <span className="text-xs">{tutor.area}</span>
      </div>
    </div>
  </Link>
);

const FeaturedTutors = () => (
  <section className="w-full max-w-6xl mx-auto px-4">
    <div className="flex items-start md:items-center justify-between mb-6 gap-4">
      <div>
        <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">Featured Tutors</h2>
        <p className="text-muted-foreground text-xs md:text-sm mt-1">Top-rated students ready to help you succeed</p>
      </div>
      <Link to="/find-tutors" className="text-xs md:text-sm text-primary font-medium hover:underline underline-offset-4 whitespace-nowrap">View all →</Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {TUTORS.map((tutor) => (
        <TutorCard key={tutor.name} tutor={tutor} />
      ))}
    </div>
  </section>
);

export default FeaturedTutors;
