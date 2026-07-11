import { motion } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";
import { formatRelativeTime } from "../../utils/formatDate";

function FeaturedNews({ article, onScan }) {
  if (!article) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass relative overflow-hidden rounded-3xl"
    >
      <div className="grid gap-0 md:grid-cols-2">
        <div className="relative h-64 md:h-full">
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent md:bg-gradient-to-r" />
        </div>

        <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-signal">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
            Featured signal &middot; {article.source?.name}
          </div>

          <h2 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
            {article.title}
          </h2>

          {article.description && (
            <p className="text-sm text-ink-dim sm:text-base line-clamp-3">
              {article.description}
            </p>
          )}

          <div className="flex items-center gap-3 pt-2 font-mono text-xs text-ink-dim">
            {formatRelativeTime(article.publishedAt)}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition hover:border-signal hover:text-signal"
            >
              Read Full Article <ExternalLink size={14} />
            </a>
            <button
              onClick={() => onScan?.(article)}
              className="flex items-center gap-1.5 rounded-full bg-signal px-5 py-2.5 text-sm font-semibold text-void transition hover:bg-signal/90"
            >
              <Sparkles size={15} /> AI Brain Scanner
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default FeaturedNews;
