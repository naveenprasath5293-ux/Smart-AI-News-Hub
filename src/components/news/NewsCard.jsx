import { memo, useState } from "react";
import { ExternalLink, Sparkles } from "lucide-react";
import { formatRelativeTime } from "../../utils/formatDate";

const FALLBACK_IMAGE =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='240' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23121826'/%3E%3Cpath d='M0 200 L100 140 L180 180 L260 100 L400 160' stroke='%23232c40' stroke-width='2' fill='none'/%3E%3Ccircle cx='200' cy='120' r='24' fill='none' stroke='%233fe0d0' stroke-width='2' opacity='0.5'/%3E%3C/svg%3E";

function NewsCard({ article, onScan }) {
  const [imgSrc, setImgSrc] = useState(article.image || FALLBACK_IMAGE);

  return (
    <article className="group glass flex flex-col overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:border-signal/40">
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={imgSrc}
          alt={article.title}
          loading="lazy"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-void/90 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-void/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-signal backdrop-blur">
          {article.source?.name || "Unknown"}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-display text-base font-semibold leading-snug text-ink line-clamp-2">
          {article.title}
        </h3>
        {article.description && (
          <p className="text-sm text-ink-dim line-clamp-2">{article.description}</p>
        )}

        <div className="mt-auto flex items-center justify-between pt-2 font-mono text-[11px] text-ink-dim">
          <span>{formatRelativeTime(article.publishedAt)}</span>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-line py-2 text-xs font-medium text-ink transition hover:border-signal hover:text-signal"
          >
            Read Article <ExternalLink size={13} />
          </a>
          <button
            onClick={() => onScan?.(article)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-signal/10 py-2 text-xs font-medium text-signal transition hover:bg-signal/20 glow-signal"
          >
            <Sparkles size={13} /> AI Scan
          </button>
        </div>
      </div>
    </article>
  );
}

export default memo(NewsCard);
