import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Issue {
  id: string;
  type: string;
  status: string;
  title: string;
  location: string;
  priority: string;
  date: string;
  icon: string;
  lat: number;
  lng: number;
}

interface LeafletMapProps {
  issues: Issue[];
  selectedFilter: string;
}

const LeafletMap = ({ issues, selectedFilter }: LeafletMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup>(new L.LayerGroup());

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([40.7128, -74.0060], 12);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add markers layer
    markersRef.current.addTo(map);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.clearLayers();

    // Filter issues
    const filteredIssues = selectedFilter === 'all' 
      ? issues 
      : issues.filter(issue => issue.type === selectedFilter);

    // Add markers for filtered issues
    filteredIssues.forEach((issue) => {
      const getMarkerColor = (status: string) => {
        switch (status) {
          case 'resolved': return '#10b981'; // green
          case 'in-progress': return '#f59e0b'; // yellow
          case 'urgent': return '#ef4444'; // red
          default: return '#6b7280'; // gray
        }
      };

      // Create custom icon
      const customIcon = L.divIcon({
        html: `
          <div style="
            width: 32px;
            height: 32px;
            background-color: ${getMarkerColor(issue.status)};
            border: 3px solid white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            animation: bounce 0.6s ease-out;
          ">
            ${issue.icon}
          </div>
        `,
        className: 'custom-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      // Add marker
      const marker = L.marker([issue.lat, issue.lng], { icon: customIcon })
        .bindPopup(`
          <div style="font-family: system-ui, sans-serif; min-width: 200px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="font-size: 20px;">${issue.icon}</span>
              <strong style="font-size: 16px; color: #1f2937;">${issue.title}</strong>
            </div>
            <div style="margin-bottom: 4px; color: #6b7280; font-size: 14px;">
              📍 ${issue.location}
            </div>
            <div style="margin-bottom: 4px; color: #6b7280; font-size: 14px;">
              📅 ${issue.date}
            </div>
            <div style="
              display: inline-block;
              padding: 4px 8px;
              border-radius: 12px;
              font-size: 12px;
              font-weight: 600;
              text-transform: capitalize;
              background-color: ${getMarkerColor(issue.status)}20;
              color: ${getMarkerColor(issue.status)};
              border: 1px solid ${getMarkerColor(issue.status)}40;
            ">
              ${issue.status.replace('-', ' ')}
            </div>
          </div>
        `);

      markersRef.current.addLayer(marker);
    });

    // Auto-fit map to markers (areas with most problems)
    const coordinates: [number, number][] = filteredIssues
      .filter((i) => typeof i.lat === 'number' && typeof i.lng === 'number')
      .map((i) => [i.lat, i.lng]);
    if (coordinates.length > 0) {
      const bounds = L.latLngBounds(coordinates);
      mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [issues, selectedFilter]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[600px] rounded-lg shadow-lg border border-border overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--accent)) 100%)'
      }}
    />
  );
};

export default LeafletMap;