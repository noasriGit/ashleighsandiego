"use client";

import Image from "next/image";
import { useState } from "react";

type ListingGalleryProps = {
  images: string[];
  address: string;
};

export function ListingGallery({ images, address }: ListingGalleryProps) {
  const [current, setCurrent] = useState(0);
  const thumbnailWindow = 3;

  if (images.length === 0) {
    return (
      <div className="flex h-80 w-full items-center justify-center rounded-xl bg-rose/40 text-sm text-espresso/50 sm:h-96">
        No photos available
      </div>
    );
  }

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  const currentSrc = images[current];
  const optimizeCurrent = currentSrc?.includes("cdn.realtyfeed.com");
  const visibleThumbnails = images.map((src, index) => ({ src, index })).filter(({ index }) => {
    if (Math.abs(index - current) <= thumbnailWindow) return true;
    return false;
  });

  return (
    <div className="space-y-3">
      <div
        className="relative overflow-hidden rounded-2xl border border-dove/30 bg-rose/20 shadow-sm"
        role="region"
        aria-label={`Photo gallery for ${address}`}
      >
        <div className="relative h-[28rem] w-full sm:h-[36rem]">
          {optimizeCurrent ? (
            <Image
              src={currentSrc}
              alt={`${address}, photo ${current + 1} of ${images.length}`}
              fill
              priority={current === 0}
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="object-cover"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element -- external MLS image host can vary by feed
            <img
              src={currentSrc}
              alt={`${address}, photo ${current + 1} of ${images.length}`}
              className="h-[28rem] w-full object-cover sm:h-[36rem]"
              loading="lazy"
            />
          )}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-espresso/70 p-3 text-white transition-colors hover:bg-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-espresso/60"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-espresso/70 p-3 text-white transition-colors hover:bg-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-espresso/60"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <span className="absolute bottom-4 right-4 rounded-full bg-espresso/70 px-3 py-1 text-xs font-medium text-white" aria-live="polite">
              {current + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Photo thumbnails">
          {visibleThumbnails.map(({ src, index: i }) => (
            <button
              key={i}
              type="button"
              role="tab"
              onClick={() => setCurrent(i)}
              aria-label={`Photo ${i + 1} of ${images.length}`}
              aria-selected={i === current}
              className={`shrink-0 overflow-hidden rounded-lg border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cabernet focus-visible:ring-offset-2 ${
                i === current
                  ? "border-cabernet ring-2 ring-cabernet ring-offset-1 opacity-100"
                  : "border-transparent opacity-60 hover:opacity-90"
              }`}
            >
              <div className="relative h-16 w-24">
                {src.includes("cdn.realtyfeed.com") ? (
                  <Image
                    src={src}
                    alt=""
                    fill
                    loading="lazy"
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element -- external MLS image host can vary by feed
                  <img
                    src={src}
                    alt=""
                    className="h-16 w-24 object-cover"
                    loading="lazy"
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
