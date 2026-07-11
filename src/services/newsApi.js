const BASE_URL = "https://newsdata.io/api/1/latest";
const API_KEY = import.meta.env.VITE_NEWSDATA_API_KEY;

export const CATEGORIES = [
  "top",
  "technology",
  "business",
  "science",
  "health",
  "sports",
];

class NewsApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

function normalizeArticle(article, index) {
  return {
    id: article.article_id || article.link || index,
    title: article.title || "No Title",
    description: article.description || "",
    content: article.content || "",
    url: article.link,
    image: article.image_url,
    publishedAt: article.pubDate,
    source: {
      name: article.source_name || "Unknown",
    },
  };
}

async function request(params = {}) {
  if (!API_KEY) {
    throw new NewsApiError(
      "Missing VITE_NEWSDATA_API_KEY",
      401
    );
  }

  const query = new URLSearchParams({
    apikey: API_KEY,
    language: "en",
    ...params,
  });

  const response = await fetch(`${BASE_URL}?${query}`);

  const data = await response.json();

  if (!response.ok) {
    throw new NewsApiError(
      data.results?.message ||
      data.message ||
      "Failed to fetch news",
      response.status
    );
  }

  return {
    articles: (data.results || []).map(normalizeArticle),
  };
}

export async function getTopHeadlines({
  category = "top",
} = {}) {
  return request({
    category,
  });
}

export async function searchNews(query) {
  return request({
    q: query,
  });
}