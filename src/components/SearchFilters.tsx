import { Search, MapPin, GraduationCap, Building2, Globe, ChevronDown, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

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
  const [search, setSearch] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const dropdownWidth = Math.max(rect.width, 220);
      let left = rect.left;

      // Adjust for viewport overflow on mobile
      if (left + dropdownWidth > window.innerWidth - 16) {
        left = window.innerWidth - dropdownWidth - 16;
      }

      setPos({ top: rect.bottom + 8, left, width: dropdownWidth });
    }
  }, [open]);

  useEffect(() => {
    if (!open) { setSearch(""); return; }
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const filtered = options.filter(o => o.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-full border transition-all duration-200 font-body text-xs md:text-sm
          ${value
            ? "bg-primary/10 border-primary/30 text-primary font-medium"
            : "bg-card border-border text-muted-foreground hover:border-primary/30 hover:bg-card/80"
          }
        `}
      >
        <span className="shrink-0">{icon}</span>
        <span className="truncate max-w-[90px] md:max-w-[120px]">{value || label}</span>
        {value ? (
          <X className="w-3 md:w-3.5 h-3 md:h-3.5 shrink-0 hover:text-foreground" onClick={(e) => { e.stopPropagation(); onChange(""); }} />
        ) : (
          <ChevronDown className={`w-3 md:w-3.5 h-3 md:h-3.5 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        )}
      </button>

      {open && createPortal(
        <div
          ref={panelRef}
          className="fixed z-[100] bg-popover border border-border rounded-2xl shadow-2xl overflow-hidden animate-fade-up"
          style={{ top: pos.top, left: pos.left, width: pos.width }}
        >
          {/* Search inside dropdown */}
          <div className="p-2 border-b border-border">
            <input
              autoFocus
              type="text"
              placeholder={`Search ${label.toLowerCase()}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-muted/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none font-body"
            />
          </div>
          <div className="max-h-52 overflow-y-auto p-1">
            {filtered.length === 0 && (
              <div className="px-3 py-4 text-sm text-muted-foreground text-center">No results found</div>
            )}
            {filtered.map((opt) => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`w-full flex items-center gap-2 text-left px-3 py-2.5 text-sm rounded-xl transition-colors
                  ${value === opt ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-muted/60"}
                `}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                  ${value === opt ? "border-primary bg-primary" : "border-border"}`}
                >
                  {value === opt && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
                </div>
                {opt}
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

const SearchFilters = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [course, setCourse] = useState("");
  const [university, setUniversity] = useState("");
  const [area, setArea] = useState("");
  const [language, setLanguage] = useState("");

  const handleSearch = () => navigate("/find-tutors");

  return (
    <div className="w-full max-w-4xl mx-auto px-2 md:px-0">
      {/* Main search bar */}
      <div className="relative mb-3 md:mb-5">
        <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 md:w-5 h-4 md:h-5" />
        <input
          type="text"
          placeholder="Search for a tutor..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full pl-11 md:pl-14 pr-24 md:pr-32 py-3 md:py-4 bg-card border border-border rounded-2xl text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 font-body shadow-sm transition-all"
        />
        <Button variant="hero" size="lg" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl text-xs md:text-sm h-8 md:h-10 px-3 md:px-4" onClick={handleSearch}>
          Search
        </Button>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 justify-center">
        <FilterDropdown label="Course" icon={<GraduationCap className="w-3.5 md:w-4 h-3.5 md:h-4" />} options={COURSES} value={course} onChange={setCourse} />
        <FilterDropdown label="University" icon={<Building2 className="w-3.5 md:w-4 h-3.5 md:h-4" />} options={UNIVERSITIES} value={university} onChange={setUniversity} />
        <FilterDropdown label="Area" icon={<MapPin className="w-3.5 md:w-4 h-3.5 md:h-4" />} options={AREAS} value={area} onChange={setArea} />
        <FilterDropdown label="Language" icon={<Globe className="w-3.5 md:w-4 h-3.5 md:h-4" />} options={LANGUAGES} value={language} onChange={setLanguage} />
      </div>
    </div>
  );
};

export default SearchFilters;
