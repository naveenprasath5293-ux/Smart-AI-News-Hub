import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Volume2, RotateCcw, ExternalLink, Check, ScanLine } from "lucide-react";
import toast from "react-hot-toast";
import { analyzeArticle } from "../../services/geminiApi";

function AIBrainScanner({ article, onClose }) {
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [briefing, setBriefing] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const run = useCallback(async () => {
    setStatus("loading");
    setError("");
    try {
      const result = await analyzeArticle(article);
      setBriefing(result);
      setStatus("ready");
    } catch (err) {
      setError(err.message || "Scan failed.");
      setStatus("error");
    }
  }, [article]);

  useEffect(() => {
    run();
    return () => window.speechSynthesis?.cancel();
  }, [run]);

  const handleCopy = () => {
    if (!briefing) return;
    const text = `${briefing.summary}\n\nKey Highlights:\n${briefing.highlights
      .map((h) => `- ${h}`)
      .join("\n")}\n\nWhy It Matters: ${briefing.whyItMatters}\n\nFuture Impact: ${briefing.futureImpact}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Summary copied");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (!briefing) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(
      `${briefing.summary} ${briefing.whyItMatters}`
    );
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-void/80 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="glass glow-signal max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl p-6"
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-signal">
              <ScanLine size={16} className={status === "loading" ? "animate-pulse" : ""} />
              AI Brain Scanner
            </div>
            <button onClick={onClose} className="text-ink-dim transition hover:text-ink" aria-label="Close">
              <X size={20} />
            </button>
          </div>

          <h3 className="font-display text-lg font-semibold text-ink line-clamp-2">
            {article.title}
          </h3>

          {status === "loading" && (
            <div className="flex flex-col items-center gap-4 py-14">
              <div className="relative h-16 w-16">
                <div className="absolute inset-0 rounded-full border-2 border-line" />
                <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-signal" />
              </div>
              <p className="font-mono text-xs text-ink-dim">Analyzing article signal...</p>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center gap-4 py-14 text-center">
              <p className="text-sm text-alert">{error}</p>
              <button
                onClick={run}
                className="flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-medium text-ink hover:border-signal hover:text-signal"
              >
                <RotateCcw size={13} /> Retry
              </button>
            </div>
          )}

          {status === "ready" && briefing && (
            <div className="mt-5 space-y-5">
              <section>
                <h4 className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-signal">Summary</h4>
                <p className="text-sm leading-relaxed text-ink">{briefing.summary}</p>
              </section>

              <section>
                <h4 className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-signal">Key Highlights</h4>
                <ul className="space-y-1.5">
                  {briefing.highlights?.map((h, i) => (
                    <li key={i} className="flex gap-2 text-sm text-ink">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal" />
                      {h}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-signal">Why It Matters</h4>
                <p className="text-sm leading-relaxed text-ink">{briefing.whyItMatters}</p>
              </section>

              <section>
                <h4 className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-signal">Future Impact</h4>
                <p className="text-sm leading-relaxed text-ink">{briefing.futureImpact}</p>
              </section>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-medium text-ink transition hover:border-signal hover:text-signal"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? "Copied" : "Copy"}
                </button>
                <button
                  onClick={handleSpeak}
                  className="flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-medium text-ink transition hover:border-signal hover:text-signal"
                >
                  <Volume2 size={13} /> {speaking ? "Stop" : "Speak"}
                </button>
                <button
                  onClick={run}
                  className="flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-medium text-ink transition hover:border-signal hover:text-signal"
                >
                  <RotateCcw size={13} /> Regenerate
                </button>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto flex items-center gap-1.5 rounded-full bg-signal px-4 py-2 text-xs font-semibold text-void transition hover:bg-signal/90"
                >
                  Original <ExternalLink size={13} />
                </a>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AIBrainScanner;
