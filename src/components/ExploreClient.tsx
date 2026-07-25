"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import {
  geocodeLocation,
  getConditions,
  getNearbyShops,
  degToCompass,
  metersToFeet,
  kmhToMph,
  celsiusToFahrenheit,
  type GeocodeResult,
  type Conditions,
  type NearbyShop,
} from "@/lib/geo";

const WorldMap = dynamic(() => import("@/components/WorldMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-80 items-center justify-center rounded-2xl border border-black/10 bg-black/[0.02] text-sm text-slate-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400">
      Loading map…
    </div>
  ),
});

type Unit = "metric" | "imperial";

type Status = "idle" | "searching" | "loading-results" | "ready" | "error";

export default function ExploreClient() {
  const searchParams = useSearchParams();
  const didAutoLoad = useRef(false);
  const [query, setQuery] = useState("");
  const [unit, setUnit] = useState<Unit>("metric");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<GeocodeResult[]>([]);
  const [location, setLocation] = useState<GeocodeResult | null>(null);
  const [conditions, setConditions] = useState<Conditions | null>(null);
  const [shops, setShops] = useState<NearbyShop[]>([]);
  const [shopsError, setShopsError] = useState<string | null>(null);

  async function loadForLocation(loc: GeocodeResult) {
    setQuery(loc.name);
    setLocation(loc);
    setMatches([]);
    setStatus("loading-results");
    setError(null);
    setShopsError(null);

    const [conditionsResult, shopsResult] = await Promise.allSettled([
      getConditions(loc.lat, loc.lng),
      getNearbyShops(loc.lat, loc.lng),
    ]);

    if (conditionsResult.status === "fulfilled") {
      setConditions(conditionsResult.value);
    } else {
      setConditions(null);
      setError("Couldn't load surf conditions for this location. The forecast service may be unreachable right now — try again in a moment.");
    }

    if (shopsResult.status === "fulfilled") {
      setShops(shopsResult.value);
    } else {
      setShops([]);
      setShopsError("Couldn't load nearby surf shops right now.");
    }

    setStatus("ready");
  }

  useEffect(() => {
    if (didAutoLoad.current) return;
    const lat = parseFloat(searchParams.get("lat") ?? "");
    const lng = parseFloat(searchParams.get("lng") ?? "");
    const name = searchParams.get("name");
    if (!Number.isNaN(lat) && !Number.isNaN(lng) && name) {
      didAutoLoad.current = true;
      queueMicrotask(() => loadForLocation({ name, country: "", lat, lng }));
    }
  }, [searchParams]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setStatus("searching");
    setError(null);
    setConditions(null);
    setShops([]);
    try {
      const results = await geocodeLocation(query.trim());
      if (results.length === 0) {
        setStatus("error");
        setError(`No location found for "${query}". Try a nearby city or beach name.`);
        return;
      }
      if (results.length === 1) {
        await loadForLocation(results[0]);
      } else {
        setMatches(results);
        setStatus("idle");
      }
    } catch {
      setStatus("error");
      setError("Location search failed. The search service may be unreachable right now — try again in a moment.");
    }
  }

  function handleUseMyLocation() {
    if (!("geolocation" in navigator)) {
      setError("Your browser doesn't support geolocation.");
      return;
    }
    setStatus("searching");
    setError(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const loc: GeocodeResult = {
          name: "Your location",
          country: "",
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setQuery("Your location");
        await loadForLocation(loc);
      },
      () => {
        setStatus("error");
        setError("Couldn't get your location — check your browser's location permission and try again.");
      }
    );
  }

  const waveHeight = conditions?.waveHeightM ?? null;
  const windSpeed = conditions?.windSpeedKmh ?? null;
  const airTemp = conditions?.airTempC ?? null;

  const waveHeightDisplay =
    waveHeight === null ? "—" : unit === "metric" ? `${waveHeight.toFixed(1)} m` : `${metersToFeet(waveHeight)!.toFixed(1)} ft`;
  const windSpeedDisplay =
    windSpeed === null ? "—" : unit === "metric" ? `${Math.round(windSpeed)} km/h` : `${Math.round(kmhToMph(windSpeed)!)} mph`;
  const airTempDisplay =
    airTemp === null ? "—" : unit === "metric" ? `${Math.round(airTemp)}°C` : `${Math.round(celsiusToFahrenheit(airTemp)!)}°F`;

  const mapMarkers = [
    ...(location ? [{ lat: location.lat, lng: location.lng, label: location.name, kind: "location" as const }] : []),
    ...shops.map((s) => ({ lat: s.lat, lng: s.lng, label: s.name, kind: "shop" as const })),
  ];

  return (
    <div>
      <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try a beach, city, or country — anywhere in the world"
          className="flex-1 rounded-full border border-black/15 bg-white px-5 py-3 text-sm text-slate-900 shadow-sm focus:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600/30 dark:border-white/20 dark:bg-white/5 dark:text-slate-100"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={status === "searching" || status === "loading-results"}
            className="rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-700 disabled:opacity-60"
          >
            {status === "searching" || status === "loading-results" ? "Searching…" : "Search"}
          </button>
          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={status === "searching" || status === "loading-results"}
            className="rounded-full border border-black/15 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-black/5 disabled:opacity-60 dark:border-white/20 dark:text-slate-200 dark:hover:bg-white/5"
            title="Use my current location"
          >
            📍 Near me
          </button>
        </div>
      </form>

      <div className="mt-3 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
        <span>Units:</span>
        <button
          type="button"
          onClick={() => setUnit("metric")}
          className={`rounded-full px-3 py-1 font-semibold ${unit === "metric" ? "bg-cyan-600 text-white" : "bg-black/5 dark:bg-white/10"}`}
        >
          Metric (m, °C)
        </button>
        <button
          type="button"
          onClick={() => setUnit("imperial")}
          className={`rounded-full px-3 py-1 font-semibold ${unit === "imperial" ? "bg-cyan-600 text-white" : "bg-black/5 dark:bg-white/10"}`}
        >
          Imperial (ft, °F)
        </button>
      </div>

      {matches.length > 0 && (
        <div className="mt-6 rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Multiple matches — pick one:</p>
          <ul className="mt-2 space-y-1">
            {matches.map((m, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => loadForLocation(m)}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-cyan-600/10"
                >
                  {m.name}
                  {m.admin1 ? `, ${m.admin1}` : ""}
                  {m.country ? `, ${m.country}` : ""}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-2xl border border-rose-300/60 bg-rose-50 p-4 text-sm text-rose-900 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
          {error}
        </div>
      )}

      {(status === "loading-results") && (
        <div className="mt-8 animate-pulse rounded-2xl border border-black/10 bg-black/[0.02] p-8 text-center text-sm text-slate-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400">
          Loading conditions and nearby shops…
        </div>
      )}

      {status === "ready" && location && (
        <div className="mt-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {location.name}
              {location.admin1 ? `, ${location.admin1}` : ""}
              {location.country ? `, ${location.country}` : ""}
            </h2>
          </div>

          {conditions && (
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Forecast conditions</h3>
                {conditions.time && (
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {new Date(conditions.time).toLocaleString(undefined, { weekday: "short", hour: "numeric", minute: "2-digit" })}
                  </span>
                )}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500">Wave height</dt>
                  <dd className="mt-1 text-lg font-bold text-cyan-700 dark:text-cyan-400">{waveHeightDisplay}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500">Wave period</dt>
                  <dd className="mt-1 text-lg font-bold text-cyan-700 dark:text-cyan-400">
                    {conditions.wavePeriodS === null ? "—" : `${conditions.wavePeriodS.toFixed(0)} s`}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500">Wind</dt>
                  <dd className="mt-1 text-lg font-bold text-cyan-700 dark:text-cyan-400">
                    {windSpeedDisplay} {degToCompass(conditions.windDirectionDeg)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500">Air temp</dt>
                  <dd className="mt-1 text-lg font-bold text-cyan-700 dark:text-cyan-400">{airTempDisplay}</dd>
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-500 dark:text-slate-500">
                This is a computer-generated forecast (Open-Meteo), not a live buoy reading. Always check a local surf
                report and use your own judgment before paddling out.
              </p>
            </div>
          )}

          <WorldMap
            markers={mapMarkers}
            center={{ lat: location.lat, lng: location.lng }}
            zoom={11}
          />

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Nearby surf shops</h3>
            {shopsError && <p className="mt-2 text-sm text-rose-700 dark:text-rose-300">{shopsError}</p>}
            {!shopsError && shops.length === 0 && (
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                No surf shops found in OpenStreetMap within 25 km of this location. Coverage depends on volunteer
                mapping and can be sparse in some regions.
              </p>
            )}
            {shops.length > 0 && (
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {shops.slice(0, 10).map((shop, i) => (
                  <li
                    key={i}
                    className="rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]"
                  >
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{shop.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {shop.kind} · {shop.distanceKm.toFixed(1)} km away
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
              Shop data comes from OpenStreetMap contributors — great in well-mapped areas, incomplete in others.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
