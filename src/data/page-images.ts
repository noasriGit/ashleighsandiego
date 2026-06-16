/** Marketing page hero and split-section image paths (see image-manifest.json). */
export const marketingHeroes = {
  home: {
    src: "/images/heroes/home.jpg",
    alt: "San Diego skyline across the bay on a clear day",
    position: "object-top",
    panX: -8,
  },
  neighborhoods: {
    src: "/images/heroes/neighborhoods.jpg",
    alt: "Coastal San Diego neighborhood hills overlooking the Pacific Ocean",
  },
  searchHomes: {
    src: "/images/heroes/search-homes.jpg",
    alt: "Palm-lined residential street in San Diego at golden hour",
  },
  contact: {
    src: "/images/heroes/contact.jpg",
    alt: "Balboa Park California Tower and gardens in San Diego",
  },
  relocating: {
    src: "/images/heroes/relocating.jpg",
    alt: "San Diego skyline viewed across the bay",
  },
  movingToLaJolla: {
    src: "/images/heroes/moving-to-la-jolla.jpg",
    alt: "Ocean waves at La Jolla Cove, San Diego",
  },
  militaryVa: {
    src: "/images/heroes/military-va.jpg",
    alt: "San Diego-Coronado Bridge over the bay",
  },
  firstTimeBuyer: {
    src: "/images/heroes/first-time-buyer.jpg",
    alt: "Pacific Beach shoreline on a sunny San Diego day",
  },
} as const;

export const splitSections = {
  "home/military-va": {
    src: "/images/sections/home/military-va.jpg",
    alt: "San Diego-Coronado Bridge connecting to naval installations",
  },
  "home/first-time-buyer": {
    src: "/images/sections/home/first-time-buyer.jpg",
    alt: "Residential palm-lined street in San Diego",
  },
  "moving-to-la-jolla/village": {
    src: "/images/sections/moving-to-la-jolla/village.jpg",
    alt: "La Jolla Cove sandy beach and coastal cliffs",
  },
  "moving-to-la-jolla/subareas": {
    src: "/images/sections/moving-to-la-jolla/subareas.jpg",
    alt: "Waves crashing near La Jolla pier and coastline",
  },
  "moving-to-la-jolla/housing": {
    src: "/images/sections/moving-to-la-jolla/housing.jpg",
    alt: "Modern architecture and housing near UC San Diego",
  },
  "moving-to-la-jolla/lifestyle": {
    src: "/images/sections/moving-to-la-jolla/lifestyle.jpg",
    alt: "Sunset ocean waves at La Jolla Cove",
  },
  "military-va-relocation-san-diego/va-buyer-education": {
    src: "/images/sections/military-va-relocation-san-diego/va-buyer-education.jpg",
    alt: "Point Loma lighthouse and coastal peninsula, San Diego",
  },
} as const;
