"use client";

import { useState } from "react";

type ListingGalleryProps = {
  images: string[];
  address: string;
};

export function ListingGallery({ images, address }: ListingGalleryProps) {
  const [current, setCurrent] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex h-80 w-full items-center justify-center rounded-xl bg-rose/40 text-sm text-espresso/50 sm:h-96">
        No photos available
      </div>
    );
  }

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div className="space-y-3">
      <div
        className="relative overflow-hidden rounded-xl bg-rose/20"
        role="region"
        aria-label={`Photo gallery for ${address}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- external MLS image host */}
        <img
          src={images[current]}
          alt={`${address}, photo ${current + 1} of ${images.length}`}
          className="h-80 w-full object-cover sm:h-[28rem]"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-espresso/60 p-2 text-white transition-colors hover:bg-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-espresso/60"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-espresso/60 p-2 text-white transition-colors hover:bg-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-espresso/60"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-espresso/70 px-3 py-1 text-xs font-medium text-white" aria-live="polite">
              {current + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Photo thumbnails">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              onClick={() => setCurrent(i)}
              aria-label={`Photo ${i + 1} of ${images.length}`}
              aria-selected={i === current}
              className={`shrink-0 overflow-hidden rounded-md transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cabernet focus-visible:ring-offset-2 ${
                i === current
                  ? "ring-2 ring-cabernet ring-offset-1 opacity-100"
                  : "opacity-60 hover:opacity-90"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- external MLS image host */}
              <img
                src={src}
                alt=""
                className="h-16 w-24 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
