function NewsCardSkeleton() {
  return (
    <div className="glass overflow-hidden rounded-2xl">
      <div className="h-44 w-full animate-pulse bg-panel-light" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-20 animate-pulse rounded bg-panel-light" />
        <div className="h-4 w-full animate-pulse rounded bg-panel-light" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-panel-light" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-panel-light" />
      </div>
    </div>
  );
}

export default NewsCardSkeleton;
