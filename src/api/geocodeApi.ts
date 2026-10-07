const FALLBACK_CITY = 'Vị trí hiện tại';

interface ReverseGeocodeResponse {
  city?: string;
  locality?: string;
  principalSubdivision?: string;
}

function isReverseGeocodeResponse(value: unknown): value is ReverseGeocodeResponse {
  return typeof value === 'object' && value !== null;
}

export async function reverseGeocode(latitude: number, longitude: number, signal?: AbortSignal): Promise<string> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    localityLanguage: 'vi',
  });
  try {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?${params.toString()}`, { signal });
    if (!response.ok) return FALLBACK_CITY;
    const raw: unknown = await response.json();
    if (!isReverseGeocodeResponse(raw)) return FALLBACK_CITY;
    return raw.city ?? raw.locality ?? raw.principalSubdivision ?? FALLBACK_CITY;
  } catch {
    return FALLBACK_CITY;
  }
}
