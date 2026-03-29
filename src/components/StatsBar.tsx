const stats = [
  { value: "2,500+", label: "Active Tutors" },
  { value: "150+", label: "Universities" },
  { value: "500+", label: "Courses" },
  { value: "4.8★", label: "Avg. Rating" },
];

const StatsBar = () => (
  <div className="w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
    {stats.map((s) => (
      <div key={s.label} className="text-center py-4">
        <div className="font-display font-bold text-2xl text-primary">{s.value}</div>
        <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
      </div>
    ))}
  </div>
);

export default StatsBar;
