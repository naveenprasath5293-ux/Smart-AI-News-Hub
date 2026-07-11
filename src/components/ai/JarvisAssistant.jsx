import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import VoiceOrb from "./VoiceOrb";

const SpeechRecognitionApi =
  typeof window !== "undefined"
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null;

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

/**
 * Floating voice assistant. Understands a small fixed command grammar
 * and either navigates, triggers a search, scrolls, or summarizes
 * the currently featured article.
 */
function JarvisAssistant({ onSearch, onSummarizeFeatured }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [supported, setSupported] = useState(Boolean(SpeechRecognitionApi));
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  const handleCommand = useCallback(
    (raw) => {
      const cmd = raw.toLowerCase().trim();

      if (cmd.includes("latest ai news") || cmd.includes("search openai") || cmd.startsWith("search")) {
        const term = cmd.includes("openai")
          ? "OpenAI"
          : cmd.includes("latest ai news")
          ? "AI"
          : cmd.replace("search", "").trim();
        onSearch?.(term);
        navigate("/");
        speak(`Searching for ${term}`);
        return;
      }
      if (cmd.includes("technology news")) {
        navigate("/");
        onSearch?.("");
        speak("Showing technology news");
        return;
      }
      if (cmd.includes("summarize")) {
        onSummarizeFeatured?.();
        speak("Scanning the featured article now");
        return;
      }
      if (cmd.includes("open featured")) {
        document.getElementById("featured-news")?.scrollIntoView({ behavior: "smooth" });
        speak("Opening featured news");
        return;
      }
      if (cmd.includes("scroll down")) {
        window.scrollBy({ top: 600, behavior: "smooth" });
        speak("Scrolling down");
        return;
      }
      if (cmd.includes("scroll top") || cmd.includes("scroll up")) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        speak("Back to the top");
        return;
      }
      if (cmd.includes("trending")) {
        navigate("/trending");
        speak("Opening trending");
        return;
      }

      speak("I didn't catch that command.");
      toast.error(`Unrecognized command: "${raw}"`);
    },
    [navigate, onSearch, onSummarizeFeatured]
  );

  useEffect(() => {
    if (!SpeechRecognitionApi) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognitionApi();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      handleCommand(text);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    return () => recognition.abort();
  }, [handleCommand]);

  const toggleListening = () => {
    if (!supported) {
      toast.error("Voice recognition isn't supported in this browser.");
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
    } else {
      setTranscript("");
      recognitionRef.current?.start();
      setListening(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      <AnimatePresence>
        {listening && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="glass flex max-w-[220px] items-center gap-2 rounded-full px-4 py-2 text-xs text-ink-dim"
          >
            <Sparkles size={13} className="text-signal" />
            {transcript || "Listening..."}
          </motion.div>
        )}
      </AnimatePresence>
      <VoiceOrb listening={listening} onClick={toggleListening} />
    </div>
  );
}

export default JarvisAssistant;
