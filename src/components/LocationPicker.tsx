import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Input } from "@/components/ui/input";

type Props = {
  value?: { lat: number; lng: number; label: string } | null;
  onChange: (loc: { lat: number; lng: number; label: string } | null) => void;
  height?: number;
};

export default function LocationPicker({ value, onChange, height = 300 }: Props) {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Array<{ label: string; lat: number; lon: number }>>([]);
  const [loading, setLoading] = useState(false);
  const searchAbort = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!mapDivRef.current || mapRef.current) return;
    const map = L.map(mapDivRef.current).setView([value?.lat ?? 20.5937, value?.lng ?? 78.9629], value ? 14 : 5);
    mapRef.current = map;
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    map.on("click", (e: L.LeafletMouseEvent) => {
      setMarker(e.latlng.lat, e.latlng.lng, "Pinned location");
    });

    if (value) {
      setMarker(value.lat, value.lng, value.label);
    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const setMarker = (lat: number, lng: number, label: string) => {
    if (!mapRef.current) return;
    if (markerRef.current) markerRef.current.remove();
    const m = L.marker([lat, lng]).addTo(mapRef.current);
    m.bindPopup(label);
    markerRef.current = m;
    onChange({ lat, lng, label });
  };

  const runSearch = async (text: string) => {
    if (!text || text.length < 3) {
      setSuggestions([]);
      return;
    }
    if (searchAbort.current) searchAbort.current.abort();
    const ac = new AbortController();
    searchAbort.current = ac;
    const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(text)}&addressdetails=1&limit=5`; 
    setLoading(true);
    try {
      const res = await fetch(url, {
        mode: "cors",
        headers: { "Accept-Language": "en", Accept: "application/json" },
        signal: ac.signal,
      });
      if (!res.ok) throw new Error(`Search failed (${res.status})`);
      const data: any[] = await res.json();
      setSuggestions(
        data.map((d) => ({ label: d.display_name as string, lat: parseFloat(d.lat), lon: parseFloat(d.lon) }))
      );
    } catch (e) {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => runSearch(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  return (
    <div>
      <div className="mb-2 relative">
        <Input
          placeholder="Search a place (min 3 chars)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {(loading || suggestions.length > 0) && (
          <div className="absolute z-50 mt-1 w-full bg-card border border-border rounded-md shadow-lg max-h-64 overflow-auto">
            {loading && <div className="px-3 py-2 text-xs text-muted-foreground">Searching…</div>}
            {suggestions.map((s, idx) => (
              <div
                key={`${s.lat}-${s.lon}-${idx}`}
                className="px-3 py-2 hover:bg-muted cursor-pointer text-sm"
                onClick={() => {
                  setQuery(s.label);
                  setSuggestions([]);
                  if (mapRef.current) {
                    mapRef.current.setView([s.lat, s.lon], 15);
                  }
                  setMarker(s.lat, s.lon, s.label);
                }}
              >
                {s.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <div ref={mapDivRef} style={{ height }} className="rounded-md border border-border z-0" />
    </div>
  );
}


