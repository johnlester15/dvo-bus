import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BusMap({ activeRoute, viewMode, onIndexChange }: any) {
  const mapRef = useRef<MapView>(null);
  const [index, setIndex] = useState(0);

  // Kuhaon nato ang tanang coordinates para sa linya sa rota
  const routeCoordinates = activeRoute.path.map((p: any) => ({
    latitude: p.latitude,
    longitude: p.longitude
  }));

  const origin = activeRoute.path[0];
  const destination = activeRoute.path[activeRoute.path.length - 1];

  // 1. AUTOMATIC ZOOM & FIT (Manual Fix)
  // Tungod kay wala nay 'onReady' sa Directions, gamiton nato ang useEffect
  useEffect(() => {
    if (viewMode === 'route' && routeCoordinates.length > 0) {
      mapRef.current?.fitToCoordinates(routeCoordinates, {
        edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
        animated: true,
      });
    }
    // Reset simulation index kung magbalhin og rota
    setIndex(0);
  }, [activeRoute, viewMode]);

  // 2. BUS SIMULATION logic
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % activeRoute.path.length;
        onIndexChange(next); 
        return next;
      });
    }, 4000); // 4 seconds interval
    return () => clearInterval(interval);
  }, [activeRoute]);

  const currentPos = activeRoute.path[index];

  // 3. AUTO-FOLLOW BUS
  useEffect(() => {
    if (viewMode === 'bus' && currentPos) {
      mapRef.current?.animateToRegion({
        ...currentPos,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      }, 1000);
    }
  }, [currentPos, viewMode]);

  return (
    <MapView 
      ref={mapRef} 
      style={styles.map} 
      provider={PROVIDER_GOOGLE}
      // I-set ang initial region para dili mawala ang mapa sa sugod
      initialRegion={{
        ...origin,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      
      {/* MAIN ROUTE LINE - Kini ang kapuli sa MapViewDirections */}
      <Polyline 
        coordinates={routeCoordinates}
        strokeColor={activeRoute.color}
        strokeWidth={4}
        lineDashPattern={[0]} // Solid line
      />

      {/* START & END MARKERS */}
      <Marker coordinate={origin} title="Start">
        <Ionicons name="location" size={28} color="#27AE60" />
      </Marker>
      
      <Marker coordinate={destination} title="End">
        <Ionicons name="flag" size={28} color="#E74C3C" />
      </Marker>

      {/* LIVE BUS MARKER */}
      {currentPos && (
        <Marker 
          coordinate={currentPos} 
          anchor={{ x: 0.5, y: 0.5 }} 
          zIndex={10}
        >
          <View style={[styles.busMarker, { backgroundColor: activeRoute.color }]}>
            <Ionicons name="bus" size={18} color="white" />
          </View>
        </Marker>
      )}

      {/* STOPS INDICATOR (Gagmay nga tuldok sa kada station) */}
      {activeRoute.path.map((stop: any, i: number) => (
        <Marker key={i} coordinate={stop} tappable={false}>
          <View style={[
            styles.stopDot, 
            i <= index ? {backgroundColor: activeRoute.color, borderColor: '#fff'} : {backgroundColor: '#fff'}
          ]} />
        </Marker>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { width: '100%', height: '100%' },
  busMarker: { 
    padding: 6, 
    borderRadius: 20, 
    borderWidth: 2, 
    borderColor: '#fff', 
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  stopDot: { 
    width: 10, 
    height: 10, 
    borderRadius: 5, 
    backgroundColor: '#fff', 
    borderWidth: 2, 
    borderColor: '#666' 
  }
});