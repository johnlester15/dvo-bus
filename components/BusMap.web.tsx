import React, { useMemo, useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const isBrowser = typeof window !== 'undefined';

let MapContainer: any, TileLayer: any, Polyline: any, Marker: any, Popup: any, useMap: any, CircleMarker: any, L: any;

if (isBrowser) {
  const RL = require('react-leaflet');
  MapContainer = RL.MapContainer;
  TileLayer = RL.TileLayer;
  Polyline = RL.Polyline;
  Marker = RL.Marker;
  Popup = RL.Popup;
  useMap = RL.useMap;
  CircleMarker = RL.CircleMarker;
  L = require('leaflet');
  require('leaflet/dist/leaflet.css');
}

function FitBounds({ coords }: { coords: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (!isBrowser || !coords || coords.length === 0) return;
    map.whenReady(() => {
      try { map.fitBounds(coords as any, { padding: [40, 40] }); } catch (err) {}
    });
  }, [coords, map]);
  return null;
}

function CenterOn({ coords, zoom = 15 }: { coords: [number, number]; zoom?: number }) {
  const map = useMap();
  useEffect(() => {
    if (!isBrowser || !coords) return;
    map.whenReady(() => {
      try { map.setView(coords as any, zoom, { animate: true }); } catch (err) {}
    });
  }, [coords, zoom, map]);
  return null;
}

export default function BusMap({ activeRoute, viewMode, onIndexChange }: any) {
  if (!isBrowser) return <View style={styles.container}><ActivityIndicator size="large" color="#007AFF" /></View>;

  const coords = useMemo(() => activeRoute?.path?.map((p: any) => [p.latitude, p.longitude]) || [], [activeRoute]);
  const [routedCoords, setRoutedCoords] = useState<[number, number][]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = activeRoute?.path ? (prev + 1) % activeRoute.path.length : 0;
        if (onIndexChange) onIndexChange(next);
        return next;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [activeRoute]);

  const currentPos = coords[index];

  useEffect(() => {
    if (viewMode !== 'route' || !activeRoute?.path) return;
    const fetchRoute = async () => {
      try {
        const coordsParam = activeRoute.path.map((p: any) => `${p.longitude},${p.latitude}`).join(';');
        const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${coordsParam}?overview=full&geometries=geojson`);
        const data = await res.json();
        const osrm = data?.routes?.[0]?.geometry?.coordinates;
        setRoutedCoords(osrm ? osrm.map((c: any) => [c[1], c[0]]) : coords);
      } catch (err) { setRoutedCoords(coords); }
    };
    fetchRoute();
  }, [activeRoute, viewMode]);

  return (
    <View style={styles.container}>
      <MapContainer 
        center={currentPos || [7.1295, 125.4452]} 
        zoom={13} 
        style={styles.map}
        attributionControl={false} 
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {coords.length > 0 && (
          <>
            {viewMode === 'route' && <FitBounds coords={routedCoords.length ? routedCoords : coords} />}
            <Polyline 
              positions={routedCoords.length ? routedCoords : coords} 
              pathOptions={{ color: activeRoute.color, weight: 5, opacity: 0.7 }} 
            />
         
            {activeRoute.traffic?.map((t: any, i: number) => (
               <Polyline key={i} positions={t.coords.map((c: any) => [c.latitude, c.longitude])} pathOptions={{ color: '#E74C3C', weight: 8, opacity: 0.9 }} />
            ))}

           
            {currentPos && (
              <>
                <Marker position={currentPos} icon={L.divIcon({ 
                    html: `<div style="background:${activeRoute.color}; border-radius:50%; width:26px; height:26px; display:flex; align-items:center; justify-content:center; color:#fff; border:2px solid #fff; box-shadow:0 0 15px rgba(0,0,0,0.4)">🚌</div>`,
                    className: '' 
                })} />
                {viewMode === 'bus' && <CenterOn coords={currentPos} zoom={16} />}
              </>
            )}

            {/* Stations */}
            {activeRoute.path.map((p: any, i: number) => (
              <CircleMarker key={i} center={[p.latitude, p.longitude]} radius={i === index ? 8 : 4} pathOptions={{ color: i === index ? activeRoute.color : '#999', fillColor: '#fff', fillOpacity: 1, weight: 2 }} />
            ))}
          </>
        )}
      </MapContainer>
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: { flex: 1, borderRadius: 20, overflow: 'hidden' }, 
  map: { height: '100%', width: '100%' } 
});