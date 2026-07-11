import { useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import JarvisAssistant from "./components/ai/JarvisAssistant";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Home from "./pages/Home/Home";
import Trending from "./pages/Trending/Trending";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  // Bridge ref so Jarvis (outside Home) can trigger a scan on the
  // article currently featured inside Home, without prop-drilling state up.
  const scanFeaturedRef = useRef(null);

  return (
    <div className="flex min-h-screen flex-col">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#121826",
            color: "#e8ecf4",
            border: "1px solid #232c40",
            fontSize: "13px",
          },
        }}
      />

      <Navbar onSearch={setSearchQuery} />

      <main className="flex-1">
        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  searchQuery={searchQuery}
                  onScanFeaturedRequest={scanFeaturedRef}
                />
              }
            />
            <Route path="/trending" element={<Trending />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="*"
              element={
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-32 text-center">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
                    404
                  </p>
                  <h1 className="font-display text-2xl font-semibold text-ink">
                    This signal doesn't exist
                  </h1>
                  <p className="text-sm text-ink-dim">
                    The page you're looking for has moved or was never broadcast.
                  </p>
                </div>
              }
            />
          </Routes>
        </ErrorBoundary>
      </main>

      <Footer />

      <JarvisAssistant
        onSearch={setSearchQuery}
        onSummarizeFeatured={() => scanFeaturedRef.current?.()}
      />
    </div>
  );
}

export default App;
