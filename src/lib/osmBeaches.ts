export type OsmBeach = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

export type Bounds = {
  north: number;
  south: number;
  east: number;
  west: number;
};

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

/** Below this zoom level, an Overpass bbox query would cover too much area to be a good citizen of the free API. */
export const MIN_BEACH_QUERY_ZOOM = 9;

const MAX_RESULTS = 300;

function boundsAreaDeg2(bounds: Bounds): number {
  return Math.max(0, bounds.north - bounds.south) * Math.max(0, bounds.east - bounds.west);
}

/** Roughly matches what MIN_BEACH_QUERY_ZOOM allows, used as a defensive cap independent of the map's reported zoom. */
const MAX_AREA_DEG2 = 4;

export async function getBeachesInBounds(bounds: Bounds, signal?: AbortSignal): Promise<OsmBeach[] | null> {
  if (boundsAreaDeg2(bounds) > MAX_AREA_DEG2) {
    return null;
  }

  const bbox = `${bounds.south},${bounds.west},${bounds.north},${bounds.east}`;
  const query = `
    [out:json][timeout:25];
    (
      node["natural"="beach"]["name"](${bbox});
      way["natural"="beach"]["name"](${bbox});
    );
    out center ${MAX_RESULTS};
  `;

  const res = await fetch(OVERPASS_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: query,
    signal,
  });
  if (!res.ok) throw new Error("Beach search failed");
  const data = await res.json();
  const elements = (data.elements ?? []) as Array<{
    id: number;
    tags?: Record<string, string>;
    lat?: number;
    lon?: number;
    center?: { lat: number; lon: number };
  }>;

  const seen = new Set<string>();
  const beaches: OsmBeach[] = [];
  for (const el of elements) {
    const lat = el.lat ?? el.center?.lat;
    const lng = el.lon ?? el.center?.lon;
    const name = el.tags?.name;
    if (lat === undefined || lng === undefined || !name) continue;
    const key = `${name}|${lat.toFixed(3)}|${lng.toFixed(3)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    beaches.push({ id: `${el.id}`, name, lat, lng });
  }

  return beaches;
}
