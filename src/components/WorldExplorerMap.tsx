"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet.markercluster";
import type { Spot } from "@/data/spots";
import { getBeachesInBounds, MIN_BEACH_QUERY_ZOOM, type OsmBeach } from "@/lib/osmBeaches";

export type Selected = { kind: "curated"; spot: Spot } | { kind: "osm"; beach: OsmBeach };

const DEBOUNCE_MS = 600;

function curatedIcon() {
  return L.divIcon({
    className: "",
    html: `<span style="display:block;width:20px;height:20px;border-radius:9999px;background:#0e7490;border:3px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.5);"></span>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

function beachIcon() {
  return L.divIcon({
    className: "",
    html: `<span style="display:block;width:12px;height:12px;border-radius:9999px;background:#0891b2;border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.4);"></span>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
}

export default function WorldExplorerMap({
  curatedSpots,
  onSelect,
}: {
  curatedSpots: Spot[];
  onSelect: (selected: Selected) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const beachClusterRef = useRef<L.MarkerClusterGroup | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const onSelectRef = useRef(onSelect);
  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  const [loading, setLoading] = useState(false);
  const [zoomTooLow, setZoomTooLow] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, { scrollWheelZoom: true, minZoom: 2 }).setView([20, 0], 2);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    const curatedLayer = L.layerGroup().addTo(map);
    curatedSpots.forEach((spot) => {
      const marker = L.marker([spot.lat, spot.lng], { icon: curatedIcon(), zIndexOffset: 1000 }).addTo(curatedLayer);
      marker.bindTooltip(`⭐ ${spot.name}`);
      marker.on("click", () => onSelectRef.current({ kind: "curated", spot }));
    });

    const beachCluster = L.markerClusterGroup({ maxClusterRadius: 50, disableClusteringAtZoom: 15 });
    beachCluster.addTo(map);
    beachClusterRef.current = beachCluster;

    async function loadBeaches() {
      const zoom = map.getZoom();
      if (zoom < MIN_BEACH_QUERY_ZOOM) {
        setZoomTooLow(true);
        beachCluster.clearLayers();
        return;
      }
      setZoomTooLow(false);

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const bounds = map.getBounds();
      setLoading(true);
      setLoadError(null);
      try {
        const beaches = await getBeachesInBounds(
          {
            north: bounds.getNorth(),
            south: bounds.getSouth(),
            east: bounds.getEast(),
            west: bounds.getWest(),
          },
          controller.signal
        );
        if (controller.signal.aborted) return;
        beachCluster.clearLayers();
        if (beaches) {
          beaches.forEach((beach) => {
            const marker = L.marker([beach.lat, beach.lng], { icon: beachIcon() });
            marker.bindTooltip(beach.name);
            marker.on("click", () => onSelectRef.current({ kind: "osm", beach }));
            beachCluster.addLayer(marker);
          });
        }
      } catch {
        if (!controller.signal.aborted) {
          setLoadError("Couldn't load beaches in this area — the map data service may be unreachable right now.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    function scheduleLoad() {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(loadBeaches, DEBOUNCE_MS);
    }

    map.on("moveend", scheduleLoad);
    scheduleLoad();

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      abortRef.current?.abort();
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative">
      <div ref={containerRef} className="h-[60vh] min-h-[420px] w-full overflow-hidden rounded-2xl border border-black/10 dark:border-white/10" />

      <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-2">
        {zoomTooLow && (
          <div className="pointer-events-auto rounded-full bg-slate-900/85 px-3 py-1.5 text-xs font-medium text-white shadow">
            🔍 Zoom in to load individual beaches — showing editor&apos;s picks for now
          </div>
        )}
        {loading && (
          <div className="pointer-events-auto rounded-full bg-cyan-700/90 px-3 py-1.5 text-xs font-medium text-white shadow">
            Loading beaches…
          </div>
        )}
        {loadError && (
          <div className="pointer-events-auto max-w-xs rounded-lg bg-rose-700/90 px-3 py-1.5 text-xs font-medium text-white shadow">
            {loadError}
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute bottom-3 left-3 flex gap-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 shadow dark:bg-black/70 dark:text-slate-200">
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-full border-2 border-white bg-[#0e7490]" /> Editor&apos;s pick
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2.5 w-2.5 rounded-full border-2 border-white bg-[#0891b2]" /> Mapped beach
        </span>
      </div>
    </div>
  );
}
