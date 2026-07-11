import { Mic } from "lucide-react";

function VoiceOrb({ listening, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={listening ? "Stop listening" : "Talk to Jarvis"}
      className="relative flex h-14 w-14 items-center justify-center rounded-full bg-panel text-signal glow-signal transition hover:scale-105"
    >
      {listening && (
        <>
          <span className="absolute inset-0 animate-ping rounded-full bg-signal/30" />
          <span className="absolute -inset-2 animate-pulse rounded-full border border-signal/30" />
        </>
      )}
      <Mic size={20} className="relative" />
    </button>
  );
}

export default VoiceOrb;
