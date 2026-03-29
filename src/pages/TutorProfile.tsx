import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Clock, MapPin, BookOpen, MessageCircle, Calendar } from "lucide-react";
import { useParams } from "react-router-dom";

const TUTORS: Record<string, any> = {
  "sarah-chen": { name: "Sarah Chen", subject: "Calculus & Linear Algebra", university: "MIT", rating: 4.9, reviews: 47, price: 25, area: "Online", avatar: "SC", language: "English", bio: "Junior at MIT majoring in Mathematics. I've tutored over 50 students in calculus and linear algebra with a 95% satisfaction rate. I break down complex concepts into simple, digestible steps.", availability: ["Mon 2-6pm", "Wed 3-7pm", "Sat 10am-2pm"] },
  "james-okafor": { name: "James Okafor", subject: "Organic Chemistry", university: "Stanford", rating: 4.8, reviews: 32, price: 30, area: "Campus Area", avatar: "JO", language: "English", bio: "Pre-med student at Stanford passionate about making organic chemistry approachable. I use visual models and real-world examples to help concepts stick.", availability: ["Tue 1-5pm", "Thu 2-6pm", "Sun 11am-3pm"] },
  "maria-garcia": { name: "María García", subject: "Spanish Literature", university: "NYU", rating: 5.0, reviews: 28, price: 20, area: "Downtown", avatar: "MG", language: "Spanish", bio: "Native Spanish speaker studying comparative literature at NYU. I help students with Spanish language skills and literature analysis.", availability: ["Mon 4-8pm", "Fri 10am-2pm", "Sat 1-5pm"] },
  "alex-kim": { name: "Alex Kim", subject: "Computer Science", university: "UCLA", rating: 4.7, reviews: 55, price: 35, area: "Online", avatar: "AK", language: "English", bio: "CS senior at UCLA with internship experience at top tech companies. I tutor data structures, algorithms, and intro programming courses.", availability: ["Mon-Fri 6-9pm", "Sat 10am-4pm"] },
  "priya-patel": { name: "Priya Patel", subject: "Microeconomics", university: "Columbia", rating: 4.9, reviews: 41, price: 22, area: "North Side", avatar: "PP", language: "English", bio: "Economics major at Columbia with a knack for making supply-demand curves and game theory fun and intuitive.", availability: ["Tue 3-7pm", "Thu 3-7pm", "Sat 9am-1pm"] },
  "luca-rossi": { name: "Luca Rossi", subject: "Physics I & II", university: "Harvard", rating: 4.8, reviews: 38, price: 28, area: "Online", avatar: "LR", language: "Italian", bio: "Physics major at Harvard. I specialize in mechanics and electromagnetism, with a focus on problem-solving strategies for exams.", availability: ["Wed 2-6pm", "Fri 2-6pm", "Sun 10am-2pm"] },
};

const TutorProfile = () => {
  const { id } = useParams();
  const tutor = TUTORS[id || ""] || TUTORS["sarah-chen"];

  return (
    <div className="min-h-screen bg-background pt-24">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link to="/find-tutors" className="text-sm text-primary hover:underline underline-offset-4 mb-6 inline-block">← Back to tutors</Link>

        <div className="bg-card border border-border rounded-2xl p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary font-display font-bold flex items-center justify-center text-2xl shrink-0">
              {tutor.avatar}
            </div>
            <div className="flex-1">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">{tutor.name}</h1>
              <p className="text-muted-foreground mt-1">{tutor.university}</p>
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="text-sm font-semibold">{tutor.rating}</span>
                  <span className="text-xs text-muted-foreground">({tutor.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4" />
                  {tutor.area}
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <BookOpen className="w-4 h-4" />
                  {tutor.language}
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="font-display font-bold text-3xl text-foreground">${tutor.price}</span>
              <span className="text-muted-foreground">/hr</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-display text-lg font-semibold text-foreground mb-3">About</h2>
              <p className="text-muted-foreground leading-relaxed">{tutor.bio}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-display text-lg font-semibold text-foreground mb-3">Subject</h2>
              <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1.5 rounded-full">{tutor.subject}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Availability
              </h2>
              <ul className="space-y-2">
                {tutor.availability.map((slot: string) => (
                  <li key={slot} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    {slot}
                  </li>
                ))}
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
