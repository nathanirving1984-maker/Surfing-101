"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";

export type MapMarker = {
  lat: number;
  lng: number;
  label: string;
  kind?: "spot" | "shop" | "location";
  href?: string;
};

const MARKER_COLORS: Record<string, string> = {
  spot: "#0e7490",
  shop: "#d97706",
  location: "#be123c",
};

function makeIcon(kind: string) {
  const color = MARKER_COLORS[kind] ?? MARKER_COLORS.spot;
  return L.divIcon({
    className: "",
    html: `<span style="display:block;width:16px;height:16px;border-radius:9999px;background:${color};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4);"></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -8],
  });
}

export default function WorldMap({
  markers,
  center,
  zoom = 3,
}: {
  markers: MapMarker[];
  center?: { lat: number; lng: number };
  zoom?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      scrollWheelZoom: false,
    }).setView(center ? [center.lat, center.lng] : [20, 0], center ? zoom : 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const layerGroup = L.layerGroup().addTo(map);

    markers.forEach((marker) => {
      const m = L.marker([marker.lat, marker.lng], { icon: makeIcon(marker.kind ?? "spot") }).addTo(layerGroup);
      m.bindPopup(
        marker.href
          ? `<a href="${marker.href}" style="font-weight:600;">${marker.label}</a>`
          : `<span style="font-weight:600;">${marker.label}</span>`
      );
    });

    if (center) {
      map.setView([center.lat, center.lng], zoom);
    } else if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng] as [number, number]));
      map.fitBounds(bounds.pad(0.2));
    }

    return () => {
      layerGroup.remove();
    };
  }, [markers, center, zoom]);

  return (
    <div
      ref={containerRef}
      className="h-80 w-full overflow-hidden rounded-2xl border border-black/10 sm:h-96 dark:border-white/10"
    />
  );
}
