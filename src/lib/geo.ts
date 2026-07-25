export type Unit = "metric" | "imperial";

export type GeocodeResult = {
  name: string;
  country: string;
  admin1?: string;
  lat: number;
  lng: number;
};

export type Conditions = {
  time: string | null;
  waveHeightM: number | null;
  wavePeriodS: number | null;
  waveDirectionDeg: number | null;
  windSpeedKmh: number | null;
  windDirectionDeg: number | null;
  airTempC: number | null;
};

export type NearbyShop = {
  name: string;
  lat: number;
  lng: number;
  kind: string;
  distanceKm: number;
};

const GEOCODE_URL = "https://geocoding-api.open-meteo.com/v1/search";
const MARINE_URL = "https://marine-api.open-meteo.com/v1/marine";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";
const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

export function degToCompass(deg: number | null): string {
  if (deg === null || Number.isNaN(deg)) return "—";
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return directions[Math.round(deg / 22.5) % 16];
}

export function metersToFeet(m: number | null): number | null {
  return m === null ? null : m * 3.28084;
}

export function kmhToMph(kmh: number | null): number | null {
  return kmh === null ? null : kmh * 0.621371;
}

export function celsiusToFahrenheit(c: number | null): number | null {
  return c === null ? null : (c * 9) / 5 + 32;
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const TIMEOUT_MS = 15000;

function fetchWithTimeout(input: string, init?: RequestInit): Promise<Response> {
  return fetch(input, { ...init, signal: AbortSignal.timeout(TIMEOUT_MS) });
}

export async function geocodeLocation(query: string): Promise<GeocodeResult[]> {
  const url = `${GEOCODE_URL}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error("Location search failed");
  const data = await res.json();
  const results = (data.results ?? []) as Array<{
    name: string;
    country?: string;
    admin1?: string;
    latitude: number;
    longitude: number;
  }>;
  return results.map((r) => ({
    name: r.name,
    country: r.country ?? "",
    admin1: r.admin1,
    lat: r.latitude,
    lng: r.longitude,
  }));
}

export async function getConditions(lat: number, lng: number): Promise<Conditions> {
  const [marineRes, weatherRes] = await Promise.all([
    fetchWithTimeout(
      `${MARINE_URL}?latitude=${lat}&longitude=${lng}&hourly=wave_height,wave_period,wave_direction&timezone=auto&forecast_days=1`
    ).catch(() => null),
    fetchWithTimeout(
      `${WEATHER_URL}?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m,wind_direction_10m&timezone=auto`
    ).catch(() => null),
  ]);

  if ((!marineRes || !marineRes.ok) && (!weatherRes || !weatherRes.ok)) {
    throw new Error("Conditions lookup failed");
  }

  let waveHeightM: number | null = null;
  let wavePeriodS: number | null = null;
  let waveDirectionDeg: number | null = null;
  let time: string | null = null;

  if (marineRes && marineRes.ok) {
    const marine = await marineRes.json();
    const times: string[] = marine?.hourly?.time ?? [];
    const now = Date.now();
    let idx = 0;
    for (let i = 0; i < times.length; i++) {
      if (new Date(times[i]).getTime() <= now) idx = i;
    }
    waveHeightM = marine?.hourly?.wave_height?.[idx] ?? null;
    wavePeriodS = marine?.hourly?.wave_period?.[idx] ?? null;
    waveDirectionDeg = marine?.hourly?.wave_direction?.[idx] ?? null;
    time = times[idx] ?? null;
  }

  let windSpeedKmh: number | null = null;
  let windDirectionDeg: number | null = null;
  let airTempC: number | null = null;

  if (weatherRes && weatherRes.ok) {
    const weather = await weatherRes.json();
    windSpeedKmh = weather?.current?.wind_speed_10m ?? null;
    windDirectionDeg = weather?.current?.wind_direction_10m ?? null;
    airTempC = weather?.current?.temperature_2m ?? null;
    time = time ?? weather?.current?.time ?? null;
  }

  return { time, waveHeightM, wavePeriodS, waveDirectionDeg, windSpeedKmh, windDirectionDeg, airTempC };
}

export async function getNearbyShops(lat: number, lng: number, radiusMeters = 25000): Promise<NearbyShop[]> {
  const query = `
    [out:json][timeout:20];
    (
      node["shop"="surf"](around:${radiusMeters},${lat},${lng});
      way["shop"="surf"](around:${radiusMeters},${lat},${lng});
      node["sport"="surfing"]["shop"](around:${radiusMeters},${lat},${lng});
    );
    out center 20;
  `;

  const res = await fetchWithTimeout(OVERPASS_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: query,
  });
  if (!res.ok) throw new Error("Nearby shop search failed");
  const data = await res.json();
  const elements = (data.elements ?? []) as Array<{
    tags?: Record<string, string>;
    lat?: number;
    lon?: number;
    center?: { lat: number; lon: number };
  }>;

  const shops: NearbyShop[] = elements
    .map((el) => {
      const elLat = el.lat ?? el.center?.lat;
      const elLng = el.lon ?? el.center?.lon;
      if (elLat === undefined || elLng === undefined) return null;
      return {
        name: el.tags?.name || "Unnamed surf shop",
        lat: elLat,
        lng: elLng,
        kind: el.tags?.shop === "surf" ? "Surf shop" : "Surf-related",
        distanceKm: haversineKm(lat, lng, elLat, elLng),
      };
    })
    .filter((s): s is NearbyShop => s !== null)
    .sort((a, b) => a.distanceKm - b.distanceKm);

  return shops;
}
