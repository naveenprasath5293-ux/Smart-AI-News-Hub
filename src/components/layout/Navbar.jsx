import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Search, Menu, X, Radio } from "lucide-react";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/trending", label: "Trending" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function Navbar({ onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(searchValue.trim());
    setMenuOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-signal" : "text-ink-dim hover:text-ink"
    }`;

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-signal/10 text-signal glow-signal">
            <Radio size={18} />
          </span>
          <span className="font-display text-lg font-semibold text-ink">
            Smart<span className="text-signal">AI</span> News Hub
          </span>
        </NavLink>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === "/"}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <form onSubmit={handleSubmit} className="hidden max-w-xs flex-1 items-center md:flex">
          <div className="flex w-full items-center gap-2 rounded-full border border-line bg-panel px-4 py-2 transition focus-within:border-signal">
            <Search size={16} className="text-ink-dim" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search news..."
              className="w-full bg-transparent text-sm text-ink placeholder:text-ink-dim focus:outline-none"
            />
          </div>
        </form>

        <button
          className="text-ink md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-line px-4 pb-4 pt-2 md:hidden">
          <form onSubmit={handleSubmit} className="mb-3 flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2">
            <Search size={16} className="text-ink-dim" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search news..."
              className="w-full bg-transparent text-sm text-ink placeholder:text-ink-dim focus:outline-none"
            />
          </form>
          <nav className="flex flex-col gap-3">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClass}
                end={link.to === "/"}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
