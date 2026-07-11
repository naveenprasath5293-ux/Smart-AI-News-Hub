import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import FeaturedNews from "../../components/news/FeaturedNews";
import NewsCard from "../../components/news/NewsCard";
import CategoryTabs from "../../components/news/CategoryTabs";
import NewsCardSkeleton from "../../components/loader/NewsCardSkeleton";
import AIBrainScanner from "../../components/ai/AIBrainScanner";
import { CATEGORIES } from "../../services/newsApi";
import { useNews } from "../../hooks/useNews";

function Home({ searchQuery, onScanFeaturedRequest }) {
  const [category, setCategory] = useState("top");
  const [scanArticle, setScanArticle] = useState(null);
  const { articles, loading, loadingMore, error, hasMore, loadMore, retry } = useNews({
    category,
    query: searchQuery,
  });

  const [featured, ...rest] = articles;

  // Let the Jarvis assistant trigger a scan of the current featured article.
  useEffect(() => {
    if (onScanFeaturedRequest) {
      onScanFeaturedRequest.current = () => featured && setScanArticle(featured);
    }
  }, [onScanFeaturedRequest, featured]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {searchQuery && (
        <p className="mb-4 font-mono text-xs uppercase tracking-wider text-ink-dim">
          Search results for <span className="text-signal">&ldquo;{searchQuery}&rdquo;</span>
        </p>
      )}

      {!searchQuery && (
        <div className="mb-6">
          <CategoryTabs categories={CATEGORIES} active={category} onChange={setCategory} />
        </div>
      )}

      {loading && (
        <div className="space-y-8">
          <div className="h-72 animate-pulse rounded-3xl bg-panel" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <NewsCardSkeleton key={i} />
            ))}
          </div>
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

      {!loading && !error && articles.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-24 text-center">
          <p className="font-display text-lg text-ink">No signal found</p>
          <p className="text-sm text-ink-dim">Try a different search term or category.</p>
        </div>
      )}

      {!loading && !error && articles.length > 0 && (
        <div className="space-y-8">
          {featured && (
            <div id="featured-news">
              <FeaturedNews article={featured} onScan={setScanArticle} />
            </div>
          )}

          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {rest.map((article) => (
              <motion.div
                key={article.id}
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              >
                <NewsCard article={article} onScan={setScanArticle} />
              </motion.div>
            ))}
          </motion.div>

          {hasMore && (
            <div className="flex justify-center pt-2">
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
        </div>
      )}

      {scanArticle && (
        <AIBrainScanner article={scanArticle} onClose={() => setScanArticle(null)} />
      )}
    </div>
  );
}

export default Home;
