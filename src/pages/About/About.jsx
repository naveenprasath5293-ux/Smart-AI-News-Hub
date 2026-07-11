import { Radio, Sparkles, Mic, ShieldCheck } from "lucide-react";

const POINTS = [
  {
    icon: Radio,
    title: "Live wire, always on",
    text: "Headlines are pulled straight from GNews across technology, business, science, health, and sports.",
  },
  {
    icon: Sparkles,
    title: "AI Brain Scanner",
    text: "Gemini reads every article and returns a summary, key highlights, why it matters, and what happens next.",
  },
  {
    icon: Mic,
    title: "Jarvis, your co-pilot",
    text: "A floating voice assistant that searches, navigates, and summarizes hands-free.",
  },
  {
    icon: ShieldCheck,
    title: "Built to hold up",
    text: "Error boundaries, retry states, and lazy-loaded images keep the feed steady even when a request fails.",
  },
];

function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">About</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
        A newsroom that reads the news for you.
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-ink-dim sm:text-base">
        Smart AI News Hub pairs a live news feed with an AI analyst. Instead of
        skimming ten headlines to find the two that matter, scan any article
        and get the takeaway in seconds.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {POINTS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="glass rounded-2xl p-5">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-signal/10 text-signal">
              <Icon size={17} />
            </div>
            <h3 className="font-display text-sm font-semibold text-ink">{title}</h3>
            <p className="mt-1.5 text-sm text-ink-dim">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
