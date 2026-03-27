type ScreenshotPlaceholderProps = {
  title: string;
  caption: string;
  compact?: boolean;
};

export function ScreenshotPlaceholder({
  title,
  caption,
  compact = false,
}: ScreenshotPlaceholderProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_24px_80px_rgba(26,26,26,0.12)] ${
        compact ? "min-h-[360px]" : "min-h-[420px]"
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_left,_rgba(245,166,35,0.35),_transparent_55%),radial-gradient(circle_at_top_right,_rgba(255,212,140,0.55),_transparent_45%)]" />
      <div className="relative flex h-full flex-col p-6 sm:p-8">
        <div className="mx-auto mb-6 h-2 w-24 rounded-full bg-black/10" />
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-[#fff6e6] p-4">
            <div className="mb-3 h-3 w-16 rounded-full bg-[#f5a623]/25" />
            <div className="h-16 rounded-2xl border border-dashed border-[#f5a623]/30 bg-white/80" />
          </div>
          <div className="rounded-2xl bg-[#fff0d2] p-4">
            <div className="mb-3 h-3 w-20 rounded-full bg-[#f5a623]/25" />
            <div className="h-16 rounded-2xl border border-dashed border-[#f5a623]/30 bg-white/80" />
          </div>
        </div>
        <div className="flex-1 rounded-[1.5rem] border border-dashed border-[#d5d7da] bg-[#faf7f2] p-6">
          <div className="mb-3 h-3 w-24 rounded-full bg-black/8" />
          <div className="mb-6 h-3 w-3/4 rounded-full bg-black/8" />
          <div className="grid gap-3">
            <div className="h-16 rounded-2xl bg-white" />
            <div className="h-16 rounded-2xl bg-white" />
            <div className="h-16 rounded-2xl bg-white" />
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <p className="text-base font-semibold text-[#1f1f1f]">{title}</p>
          <p className="text-sm leading-6 text-[#5f6368]">{caption}</p>
        </div>
      </div>
    </div>
  );
}
