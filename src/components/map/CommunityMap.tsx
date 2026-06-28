"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Map, {
  Layer,
  NavigationControl,
  Popup,
  Source,
  type MapLayerMouseEvent,
  type MapRef,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import type { ExpressionSpecification } from "maplibre-gl";
import { CommunityMapPopup } from "@/components/map/CommunityMapPopup";
import type { Community, LifestyleTag } from "@/data/communities";
import {
  COMMUNITY_BOUNDARIES_URL,
  getMapStyleUrl,
  TIER_FILL_COLORS,
  type CommunityBoundaryCollection,
} from "@/data/community-boundaries";

const SOURCE_ID = "communities";
const FILL_LAYER_ID = "community-fill";
const OUTLINE_LAYER_ID = "community-outline";

/** ~12-mile service area around La Jolla Beach. */
const MAP_BOUNDS: [[number, number], [number, number]] = [
  [-117.5, 32.65],
  [-117.04, 33.03],
];

type CommunityMapProps = {
  communities: Community[];
  activeFilter: LifestyleTag | "all";
  highlightedSlug?: string | null;
  onCommunityHover?: (slug: string | null) => void;
};

function tierFillColorExpression(): ExpressionSpecification {
  return [
    "match",
    ["get", "tier"],
    1,
    TIER_FILL_COLORS[1],
    2,
    TIER_FILL_COLORS[2],
    3,
    TIER_FILL_COLORS[3],
    TIER_FILL_COLORS[1],
  ];
}

function fillOpacityExpression(
  visibleSlugs: string[],
  showDimmed: boolean,
): ExpressionSpecification {
  const tierOpacity: ExpressionSpecification = [
    "match",
    ["get", "tier"],
    1,
    0.22,
    2,
    0.38,
    3,
    0.48,
    0.22,
  ];

  if (!showDimmed) {
    return [
      "case",
      ["==", ["feature-state", "hover"], true],
      0.72,
      ["==", ["feature-state", "highlight"], true],
      0.65,
      tierOpacity,
    ];
  }

  return [
    "case",
    ["==", ["feature-state", "hover"], true],
    0.72,
    ["==", ["feature-state", "highlight"], true],
    0.65,
    ["in", ["get", "slug"], ["literal", visibleSlugs]],
    tierOpacity,
    0.08,
  ];
}

export function CommunityMap({
  communities,
  activeFilter,
  highlightedSlug = null,
  onCommunityHover,
}: CommunityMapProps) {
  const router = useRouter();
  const mapRef = useRef<MapRef>(null);
  const hoveredRef = useRef<string | null>(null);
  const selectedRef = useRef<string | null>(null);
  const highlightRef = useRef<string | null>(null);

  const [geojson, setGeojson] = useState<CommunityBoundaryCollection | null>(null);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [popupCoords, setPopupCoords] = useState<[number, number] | null>(null);
  const [selectedPopupCoords, setSelectedPopupCoords] = useState<[number, number] | null>(null);
  const [loadError, setLoadError] = useState(false);

  const communityBySlug = useMemo(
    () => Object.fromEntries(communities.map((c) => [c.slug, c])),
    [communities],
  );

  const visibleSlugs = useMemo(() => {
    const filtered =
      activeFilter === "all"
        ? communities
        : communities.filter((c) => c.lifestyles.includes(activeFilter));
    return filtered.map((c) => c.slug);
  }, [communities, activeFilter]);

  const showDimmed = activeFilter !== "all";

  useEffect(() => {
    const mobileMedia = window.matchMedia("(max-width: 767px)");
    const coarseMedia = window.matchMedia("(pointer: coarse)");
    const update = () =>
      setIsCoarsePointer(mobileMedia.matches || coarseMedia.matches);
    update();
    mobileMedia.addEventListener("change", update);
    coarseMedia.addEventListener("change", update);
    return () => {
      mobileMedia.removeEventListener("change", update);
      coarseMedia.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(COMMUNITY_BOUNDARIES_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load boundaries");
        return res.json() as Promise<CommunityBoundaryCollection>;
      })
      .then((data) => {
        if (!cancelled) setGeojson(data);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const clearFeatureState = useCallback((id: string, key: "hover" | "highlight") => {
    const map = mapRef.current?.getMap();
    if (!map?.getSource(SOURCE_ID)) return;
    try {
      map.setFeatureState({ source: SOURCE_ID, id }, { [key]: false });
    } catch {
      // Source may not be ready yet.
    }
  }, []);

  const setFeatureState = useCallback(
    (id: string, key: "hover" | "highlight", value: boolean) => {
      const map = mapRef.current?.getMap();
      if (!map?.getSource(SOURCE_ID)) return;
      try {
        map.setFeatureState({ source: SOURCE_ID, id }, { [key]: value });
      } catch {
        // Source may not be ready yet.
      }
    },
    [],
  );

  useEffect(() => {
    if (highlightRef.current && highlightRef.current !== highlightedSlug) {
      clearFeatureState(highlightRef.current, "highlight");
    }
    if (highlightedSlug) {
      setFeatureState(highlightedSlug, "highlight", true);
      highlightRef.current = highlightedSlug;
    } else {
      highlightRef.current = null;
    }
  }, [highlightedSlug, clearFeatureState, setFeatureState]);

  const clearSelectedState = useCallback(() => {
    if (selectedRef.current) {
      clearFeatureState(selectedRef.current, "hover");
      selectedRef.current = null;
    }
    setSelectedSlug(null);
    setSelectedPopupCoords(null);
  }, [clearFeatureState]);

  const selectCommunity = useCallback(
    (slug: string, coords: [number, number]) => {
      if (selectedRef.current && selectedRef.current !== slug) {
        clearFeatureState(selectedRef.current, "hover");
      }
      setFeatureState(slug, "hover", true);
      selectedRef.current = slug;
      setSelectedSlug(slug);
      setSelectedPopupCoords(coords);
      onCommunityHover?.(slug);
    },
    [clearFeatureState, setFeatureState, onCommunityHover],
  );

  const onMouseMove = useCallback(
    (event: MapLayerMouseEvent) => {
      if (isCoarsePointer) return;

      const map = mapRef.current?.getMap();
      if (!map) return;

      const feature = event.features?.[0];
      const slug = feature?.properties?.slug as string | undefined;

      if (hoveredRef.current && hoveredRef.current !== slug) {
        clearFeatureState(hoveredRef.current, "hover");
      }

      if (slug) {
        setFeatureState(slug, "hover", true);
        hoveredRef.current = slug;
        setHoveredSlug(slug);
        setPopupCoords([event.lngLat.lng, event.lngLat.lat]);
        onCommunityHover?.(slug);
        map.getCanvas().style.cursor = "pointer";
      } else {
        hoveredRef.current = null;
        setHoveredSlug(null);
        setPopupCoords(null);
        onCommunityHover?.(null);
        map.getCanvas().style.cursor = "";
      }
    },
    [clearFeatureState, setFeatureState, onCommunityHover, isCoarsePointer],
  );

  const onMouseLeave = useCallback(() => {
    if (isCoarsePointer) return;

    const map = mapRef.current?.getMap();
    if (hoveredRef.current) {
      clearFeatureState(hoveredRef.current, "hover");
      hoveredRef.current = null;
    }
    setHoveredSlug(null);
    setPopupCoords(null);
    onCommunityHover?.(null);
    if (map) map.getCanvas().style.cursor = "";
  }, [clearFeatureState, onCommunityHover, isCoarsePointer]);

  const onClick = useCallback(
    (event: MapLayerMouseEvent) => {
      const slug = event.features?.[0]?.properties?.slug as string | undefined;

      if (isCoarsePointer) {
        if (!slug || !communityBySlug[slug]) {
          clearSelectedState();
          onCommunityHover?.(null);
          return;
        }

        if (selectedSlug === slug) {
          router.push(`/neighborhoods/${slug}`);
          return;
        }

        selectCommunity(slug, [event.lngLat.lng, event.lngLat.lat]);
        return;
      }

      if (slug && communityBySlug[slug]) {
        router.push(`/neighborhoods/${slug}`);
      }
    },
    [
      communityBySlug,
      router,
      isCoarsePointer,
      selectedSlug,
      selectCommunity,
      clearSelectedState,
      onCommunityHover,
    ],
  );

  const activeSlug = isCoarsePointer ? selectedSlug : hoveredSlug;
  const activePopupCoords = isCoarsePointer ? selectedPopupCoords : popupCoords;
  const activeCommunity = activeSlug ? communityBySlug[activeSlug] : undefined;

  if (loadError) {
    return (
      <div
        className="flex h-full min-h-[420px] items-center justify-center rounded-2xl bg-blush/30 px-6 text-center text-sm text-espresso/80 ring-1 ring-cabernet/10"
        role="status"
      >
        Map unavailable. Browse the neighborhood grid below.
      </div>
    );
  }

  return (
    <div
      className="relative h-[420px] overflow-hidden rounded-2xl ring-1 ring-cabernet/10 md:h-[520px]"
      aria-label="Interactive map of San Diego communities near La Jolla"
    >
      {!geojson && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-blush/20 text-sm text-espresso/70">
          Loading map…
        </div>
      )}
      <Map
        ref={mapRef}
        mapStyle={getMapStyleUrl()}
        initialViewState={{
          longitude: -117.27,
          latitude: 32.85,
          zoom: 10.5,
        }}
        maxBounds={MAP_BOUNDS}
        minZoom={9.5}
        maxZoom={15}
        style={{ width: "100%", height: "100%" }}
        interactiveLayerIds={[FILL_LAYER_ID]}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        attributionControl={false}
      >
        <NavigationControl position="top-right" showCompass={false} />
        {geojson && (
          <Source id={SOURCE_ID} type="geojson" data={geojson} promoteId="slug">
            <Layer
              id={FILL_LAYER_ID}
              type="fill"
              paint={{
                "fill-color": tierFillColorExpression(),
                "fill-opacity": fillOpacityExpression(visibleSlugs, showDimmed),
                "fill-antialias": true,
              }}
            />
            <Layer
              id={OUTLINE_LAYER_ID}
              type="line"
              layout={{
                "line-join": "round",
                "line-cap": "round",
              }}
              paint={{
                "line-color": [
                  "case",
                  ["==", ["feature-state", "hover"], true],
                  "#670038",
                  ["==", ["feature-state", "highlight"], true],
                  "#670038",
                  ["in", ["get", "slug"], ["literal", visibleSlugs]],
                  "#ffffff",
                  "#aa979c",
                ],
                "line-width": [
                  "case",
                  ["==", ["feature-state", "hover"], true],
                  2.5,
                  ["==", ["feature-state", "highlight"], true],
                  2,
                  [
                    "match",
                    ["get", "tier"],
                    1,
                    1.25,
                    2,
                    1.5,
                    3,
                    1.75,
                    1.25,
                  ],
                ],
                "line-opacity": [
                  "case",
                  ["==", ["feature-state", "hover"], true],
                  1,
                  ["==", ["feature-state", "highlight"], true],
                  0.95,
                  ["in", ["get", "slug"], ["literal", visibleSlugs]],
                  0.9,
                  0.2,
                ],
              }}
            />
          </Source>
        )}
        {activeCommunity && activePopupCoords && (
          <Popup
            longitude={activePopupCoords[0]}
            latitude={activePopupCoords[1]}
            closeButton={false}
            closeOnClick={false}
            anchor="bottom"
            offset={12}
            className="community-map-popup"
          >
            <CommunityMapPopup
              community={activeCommunity}
              showTapHint={isCoarsePointer}
            />
          </Popup>
        )}
      </Map>
    </div>
  );
}
