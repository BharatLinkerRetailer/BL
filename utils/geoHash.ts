// utils/geohash.ts

const BASE32 = "0123456789bcdefghjkmnpqrstuvwxyz";

// ─── Encode ───────────────────────────────────────────────────────────────────
export function encodeGeohash(lat: number, lng: number, precision = 9): string {
  let idx = 0, bit = 0, even = true, hash = "";
  let minLat = -90, maxLat = 90, minLng = -180, maxLng = 180;

  while (hash.length < precision) {
    if (even) {
      const mid = (minLng + maxLng) / 2;
      if (lng > mid) { idx = (idx << 1) | 1; minLng = mid; }
      else           { idx = idx << 1;        maxLng = mid; }
    } else {
      const mid = (minLat + maxLat) / 2;
      if (lat > mid) { idx = (idx << 1) | 1; minLat = mid; }
      else           { idx = idx << 1;        maxLat = mid; }
    }
    even = !even;
    if (++bit === 5) { hash += BASE32[idx]; bit = 0; idx = 0; }
  }
  return hash;
}

// ─── Distance between two coords (Haversine) ─────────────────────────────────
export function distanceBetweenKm(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R    = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ─── Get geohash prefix for a bounding box ───────────────────────────────────
// Finds the common prefix of the 4 corners of the bounding box
function commonPrefix(a: string, b: string): string {
  let i = 0;
  while (i < a.length && a[i] === b[i]) i++;
  return a.slice(0, i);
}

// ─── Get [start, end] geohash range for querying ─────────────────────────────
export function getGeohashRange(
  latitude: number,
  longitude: number,
  radiusKm: number
): { start: string; end: string } {
  // 1 degree lat ≈ 111 km
  const latDelta = radiusKm / 111;
  const lngDelta = radiusKm / (111 * Math.cos((latitude * Math.PI) / 180));

  const minLat = latitude  - latDelta;
  const maxLat = latitude  + latDelta;
  const minLng = longitude - lngDelta;
  const maxLng = longitude + lngDelta;

  // Encode all 4 corners of bounding box
  const swHash = encodeGeohash(minLat, minLng);
  const neHash = encodeGeohash(maxLat, maxLng);
  const nwHash = encodeGeohash(maxLat, minLng);
  const seHash = encodeGeohash(minLat, maxLng);

  const prefix = commonPrefix(
    commonPrefix(swHash, neHash),
    commonPrefix(nwHash, seHash)
  );

  // Use prefix as range — all geohashes in area share this prefix
  const start = prefix;
  const end   = prefix + "\uf8ff"; // highest unicode char = "get all after prefix"

  return { start, end };
}