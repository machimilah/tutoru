import { Search, MapPin, GraduationCap, Building2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const COURSES = ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Economics", "Literature", "History", "Psychology", "Engineering"];
const UNIVERSITIES = ["MIT", "Stanford", "Harvard", "Oxford", "Cambridge", "UCLA", "NYU", "Columbia", "Yale", "Princeton"];
const AREAS = ["Downtown", "Campus Area", "Online", "North Side", "South Side", "East Side", "West Side"];
const LANGUAGES = ["English", "Spanish", "French", "Mandarin", "German", "Portuguese", "Japanese", "Korean", "Arabic", "Italian"];

interface FilterDropdownProps {
  label: string;
  icon: React.ReactNode;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

const FilterDropdown = ({ label, icon, options, value, onChange }: FilterDropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex-1 min-w-[160px]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-4 py-3 bg-card rounded-lg border border-border hover:border-primary/40 transition-colors text-left font-body"
      >
        <span className="text-muted-foreground">{icon}</span>
        <span className={value ? "text-foreground font-medium" : "text-muted-foreground"}>
          {value || label}
        </span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-2 left-0 right-0 z-20 bg-popover border border-border rounded-lg shadow-xl max-h-48 overflow-y-auto">
            <button
              onClick={() => { onChange(""); setOpen(false); }}
              className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-accent/10 transition-colors"
            >
              All {label}s
            </button>
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-primary/10 transition-colors"
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const SearchFilters = () => {
  const [query, setQuery] = useState("");
  const [course, setCourse] = useState("");
  const [university, setUniversity] = useState("");
  const [area, setArea] = useState("");
  const [language, setLanguage] = useState("");

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main search bar */}
      <div className="relative mb-4">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <input
          type="text"
          placeholder="Search for a tutor, subject, or topic..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-14 pr-32 py-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 text-base font-body shadow-sm transition-all"
        />
        <Button variant="hero" size="lg" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg">
          Search
        </Button>
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap gap-3">
        <FilterDropdown label="Course" icon={<GraduationCap className="w-4 h-4" />} options={COURSES} value={course} onChange={setCourse} />
        <FilterDropdown label="University" icon={<Building2 className="w-4 h-4" />} options={UNIVERSITIES} value={university} onChange={setUniversity} />
        <FilterDropdown label="Area" icon={<MapPin className="w-4 h-4" />} options={AREAS} value={area} onChange={setArea} />
        <FilterDropdown label="Language" icon={<Globe className="w-4 h-4" />} options={LANGUAGES} value={language} onChange={setLanguage} />
      </div>
    </div>
  );
};

export default SearchFilters;
