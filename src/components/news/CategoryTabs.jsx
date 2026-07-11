const LABELS = {
  top: "Top Stories",
  technology: "Technology",
  business: "Business",
  science: "Science",
  health: "Health",
  sports: "Sports",
};

function CategoryTabs({ categories, active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {categories.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`shrink-0 rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition ${
              isActive
                ? "border-signal bg-signal/10 text-signal"
                : "border-line text-ink-dim hover:border-ink-dim hover:text-ink"
            }`}
          >
            {LABELS[cat] || cat}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryTabs;
