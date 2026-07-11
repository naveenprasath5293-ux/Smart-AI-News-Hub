function LoaderOverlay({ label = "Syncing live feed" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 rounded-full border-2 border-line" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-signal" />
        <div className="absolute inset-3 rounded-full bg-signal/10" />
      </div>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-dim">
        {label}
      </p>
    </div>
  );
}

export default LoaderOverlay;
