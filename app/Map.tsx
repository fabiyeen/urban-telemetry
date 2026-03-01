'use client';

import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map({ readings }: { readings: any[] }) {
  // Center the map right on South Tangerang
  const center: [number, number] = [-6.28, 106.71];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-2 shadow-xl mb-8 z-0 relative">
      <MapContainer 
        center={center} 
        zoom={13} 
        style={{ height: '400px', width: '100%', borderRadius: '0.5rem', zIndex: 0 }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {readings.map((reading) => {
          // Color code: Green (Good), Orange (Moderate), Red (Unhealthy)
          const isBad = reading.value > 80;
          const isOkay = reading.value > 50 && reading.value <= 80;
          
          return (
            <CircleMarker
              key={reading.id}
              center={[reading.lat, reading.lng]}
              radius={isBad ? 12 : 8}
              pathOptions={{
                color: isBad ? '#ef4444' : isOkay ? '#f59e0b' : '#10b981',
                fillColor: isBad ? '#ef4444' : isOkay ? '#f59e0b' : '#10b981',
                fillOpacity: 0.6,
              }}
            >
              <Popup className="text-slate-900">
                <div className="font-bold border-b pb-1 mb-1">{reading.sensor_id}</div>
                <div>PM2.5: <strong>{reading.value.toFixed(2)}</strong></div>
                <div className="text-xs text-slate-500 mt-1">
                  {new Date(reading.created_at).toLocaleTimeString('id-ID')}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}