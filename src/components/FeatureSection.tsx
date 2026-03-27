import Image from "next/image";

type FeatureSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: readonly string[];
  screenshot: string;
  screenshotAlt: string;
  reverse?: boolean;
};

export function FeatureSection({
  eyebrow,
  title,
  description,
  bullets,
  screenshot,
  screenshotAlt,
  reverse = false,
}: FeatureSectionProps) {
  return (
    <section className="border-t border-black/6 bg-[#fcfbf7]">
      <div
        className={`mx-auto grid max-w-7xl gap-14 px-6 py-18 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-24 ${
          reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
        }`}
      >
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#915400]">
            {eyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-[#1d1d1f] sm:text-5xl">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f6368]">
            {description}
          </p>
          <div className="mt-8 space-y-4">
            {bullets.map((bullet) => (
              <div key={bullet} className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#f5a623]" />
                <p className="text-base leading-7 text-[#383f45]">{bullet}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative w-[280px] overflow-hidden rounded-[2.5rem] border border-black/8 bg-white shadow-[0_24px_80px_rgba(26,26,26,0.12)]">
            <Image
              src={screenshot}
              alt={screenshotAlt}
              width={430}
              height={932}
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
