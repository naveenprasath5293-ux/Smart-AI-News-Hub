import { memo } from "react";
import { formatRelativeTime } from "../../utils/formatDate";

function TrendingNews({ articles, onScan }) {
  return (
    <ol className="space-y-3">
      {articles.map((article, index) => (
        <li key={article.id}>
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="group glass flex items-center gap-4 rounded-2xl p-3 transition hover:border-signal/40"
          >
            <span className="font-display w-8 shrink-0 text-center text-xl font-semibold text-ink-dim group-hover:text-signal">
              {String(index + 1).padStart(2, "0")}
            </span>
            <img
              src={article.image}
              alt=""
              loading="lazy"
              className="h-16 w-20 shrink-0 rounded-xl object-cover"
              onError={(e) => (e.currentTarget.style.visibility = "hidden")}
            />
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm font-medium text-ink">{article.title}</p>
              <p className="mt-1 font-mono text-[11px] text-ink-dim">
                {article.source?.name} &middot; {formatRelativeTime(article.publishedAt)}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                onScan?.(article);
              }}
              className="shrink-0 rounded-full bg-signal/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide text-signal transition hover:bg-signal/20"
            >
              Scan
            </button>
          </a>
        </li>
      ))}
    </ol>
  );
}

export default memo(TrendingNews);
