import { useEffect, useState, useCallback } from "react";
import {
  getTopHeadlines,
  searchNews,
} from "../services/newsApi";

export function useNews({
  category = "top",
  query = "",
} = {}) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = query
        ? await searchNews(query)
        : await getTopHeadlines({ category });

      setArticles(result.articles);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }, [category, query]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return {
    articles,
    loading,
    loadingMore,
    error,
    hasMore: false,
    loadMore: () => {},
    retry: fetchNews,
  };
}