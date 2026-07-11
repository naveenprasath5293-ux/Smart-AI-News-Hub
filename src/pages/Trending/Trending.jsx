import { useState } from "react";
import { Loader2, TrendingUp } from "lucide-react";
import TrendingNews from "../../components/news/TrendingNews";
import NewsCardSkeleton from "../../components/loader/NewsCardSkeleton";
import AIBrainScanner from "../../components/ai/AIBrainScanner";
import { useNews } from "../../hooks/useNews";

function Trending() {
  const [scanArticle, setScanArticle] = useState(null);
  const { articles, loading, loadingMore, error, hasMore, loadMore, retry } = useNews({
    category: "general",
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-2">
        <TrendingUp size={20} className="text-signal" />
        <h1 className="font-display text-2xl font-semibold text-ink">Trending Now</h1>
      </div>

      {loading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <p className="text-sm text-alert">{error}</p>
          <button
            onClick={retry}
            className="rounded-full border border-line px-5 py-2 text-sm font-medium text-ink transition hover:border-signal hover:text-signal"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <TrendingNews articles={articles} onScan={setScanArticle} />

          {hasMore && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="flex items-center gap-2 rounded-full border border-line px-6 py-2.5 text-sm font-medium text-ink transition hover:border-signal hover:text-signal disabled:opacity-50"
              >
                {loadingMore && <Loader2 size={15} className="animate-spin" />}
                {loadingMore ? "Loading" : "Load More"}
              </button>
            </div>
          )}
        </>
      )}

      {scanArticle && (
        <AIBrainScanner article={scanArticle} onClose={() => setScanArticle(null)} />
      )}
    </div>
  );
}

export default Trending;
