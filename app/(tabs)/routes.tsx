import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator, Dimensions } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_600SemiBold, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import BusMap from '../../components/BusMap'; 
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Interfaces para sa TypeScript safety
export interface BusStop {
  latitude: number;
  longitude: number;
  title: string;
}

export interface Route {
  id: string;
  name: string;
  color: string;
  stopsCount: number;
  eta: string;
  path: BusStop[];
}

const ROUTES: Route[] = [
  { 
    id: 'R103', 
    name: 'Calinan - Roxas', 
    color: '#007AFF',
    stopsCount: 7,
    eta: '45 mins',
    path: [
      { latitude: 7.1295, longitude: 125.4452, title: 'Calinan Terminal' },
      { latitude: 7.1050, longitude: 125.4750, title: 'Mintal Proper' }, 
      { latitude: 7.0914, longitude: 125.5039, title: 'Mintal Junction' },
      { latitude: 7.0825, longitude: 125.5511, title: 'Ulas Junction' },
      { latitude: 7.0750, longitude: 125.5750, title: 'Bangkal' },
      { latitude: 7.0654, longitude: 125.5947, title: 'Matina Crossing' },
      { latitude: 7.0732, longitude: 125.6141, title: 'Roxas Ave' },
    ],
  },
  { 
    id: 'R102', 
    name: 'Toril - Roxas', 
    color: '#E74C3C',
    stopsCount: 5,
    eta: '40 mins',
    path: [
      { latitude: 7.0133, longitude: 125.4907, title: 'Toril Terminal' },
      { latitude: 7.0450, longitude: 125.5450, title: 'Puan' },
      { latitude: 7.0520, longitude: 125.5650, title: 'Talomo' },
      { latitude: 7.0654, longitude: 125.5947, title: 'Matina Crossing' },
      { latitude: 7.0732, longitude: 125.6141, title: 'Roxas Ave' },
    ],
  },
  { 
    id: 'R104', 
    name: 'Toril - GE Torres', 
    color: '#27AE60',
    stopsCount: 5,
    eta: '35 mins',
    path: [
      { latitude: 7.0133, longitude: 125.4907, title: 'Toril Terminal' },
      { latitude: 7.0450, longitude: 125.5450, title: 'Puan' },
      { latitude: 7.0654, longitude: 125.5947, title: 'Matina Crossing' },
      { latitude: 7.0671, longitude: 125.6022, title: 'Sandawa / GE Torres' },
      { latitude: 7.0610, longitude: 125.6010, title: 'GE Torres St.' },
    ],
  },
  { 
    id: 'R106', 
    name: 'Buhangin - Roxas', 
    color: '#F39C12',
    stopsCount: 4,
    eta: '25 mins',
    path: [
      { latitude: 7.1120, longitude: 125.6150, title: 'Buhangin Gym' },
      { latitude: 7.0940, longitude: 125.6180, title: 'Bajada (SPMC)' },
      { latitude: 7.0850, longitude: 125.6150, title: 'Victoria Plaza' },
      { latitude: 7.0732, longitude: 125.6141, title: 'Roxas Ave' },
    ],
  }
];

export default function ExploreScreen() {
  const [selectedRoute, setSelectedRoute] = useState(ROUTES[0]);
  const [currentStopIndex, setCurrentStopIndex] = useState(2); 
  const [viewMode, setViewMode] = useState<'bus' | 'route'>('route');

  let [fontsLoaded] = useFonts({
    'Poppins-Bold': Poppins_700Bold,
    'Poppins-Semi': Poppins_600SemiBold,
    'Poppins-Med': Poppins_500Medium,
    'Mont-Reg': Montserrat_400Regular,
    'Mont-Med': Montserrat_500Medium,
    'Mont-Semi': Montserrat_600SemiBold,
    'Mont-Bold': Montserrat_700Bold,
  });

  if (!fontsLoaded) return <ActivityIndicator size="large" color="#005aab" style={{flex: 1}} />;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Maayong Adlaw!</Text>
            <Text style={styles.title}>Davao Bus <Text style={{color: '#00A8B5'}}>Explore</Text></Text>
          </View>
          <TouchableOpacity style={styles.notifBtn}>
            <Ionicons name="notifications-outline" size={22} color="#1A1A1A" />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipScroll}>
          {ROUTES.map((route) => (
            <TouchableOpacity 
              key={route.id} 
              style={[styles.chip, selectedRoute.id === route.id && {backgroundColor: route.color, elevation: 8, shadowColor: route.color}]}
              onPress={() => { setSelectedRoute(route); setViewMode('route'); }}
            >
              <Ionicons name="bus" size={14} color={selectedRoute.id === route.id ? '#fff' : '#90A4AE'} style={{marginRight: 6}} />
              <Text style={[styles.chipText, selectedRoute.id === route.id && {color: '#fff'}]}>{route.id}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.modeContainer}>
        <View style={styles.modeWrapper}>
          <TouchableOpacity 
            style={[styles.modeBtn, viewMode === 'route' && styles.activeBtn]} 
            onPress={() => setViewMode('route')}
          >
            <Ionicons name="map-outline" size={14} color={viewMode === 'route' ? '#fff' : '#8F9BB3'} />
            <Text style={[styles.modeText, viewMode === 'route' && {color: '#fff'}]}>Overview</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.modeBtn, viewMode === 'bus' && styles.activeBtn]} 
            onPress={() => setViewMode('bus')}
          >
            <Ionicons name="navigate-circle-outline" size={16} color={viewMode === 'bus' ? '#fff' : '#8F9BB3'} />
            <Text style={[styles.modeText, viewMode === 'bus' && {color: '#fff'}]}>Live Track</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mapArea}>
        <BusMap activeRoute={selectedRoute} viewMode={viewMode} onIndexChange={setCurrentStopIndex} />
        {/* Ang floating controls (zoom/locate) gikuha na dinhi para malimpyo ang map view */}
      </View>

      <View style={styles.bottomSheet}>
        <View style={[styles.heroCard, {backgroundColor: selectedRoute.color}]}>
          <View style={styles.heroInfo}>
            <Text style={styles.heroName}>{selectedRoute.name}</Text>
            <View style={styles.heroStats}>
              <View style={styles.statItem}>
                <Ionicons name="location" size={12} color="rgba(255,255,255,0.8)" />
                <Text style={styles.statText}>{selectedRoute.stopsCount} Stops</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="time" size={12} color="rgba(255,255,255,0.8)" />
                <Text style={styles.statText}>{selectedRoute.eta}</Text>
              </View>
            </View>
          </View>
          <View style={styles.liveBadgeHero}>
            <Text style={styles.liveBadgeText}>ON TIME</Text>
          </View>
        </View>

        <ScrollView style={styles.stopList} showsVerticalScrollIndicator={false}>
          {selectedRoute.path.map((stop, index) => {
            const isPassed = index < currentStopIndex;
            const isActive = index === currentStopIndex;
            return (
              <View key={index} style={styles.stopItem}>
                <View style={styles.timeline}>
                  <View style={[
                    styles.dot, 
                    isPassed ? {backgroundColor: selectedRoute.color} : {backgroundColor: '#E0E0E0'},
                    isActive && {backgroundColor: selectedRoute.color, width: 18, height: 18, borderRadius: 9, borderWidth: 3, borderColor: '#fff', elevation: 5}
                  ]}>
                    {isActive && <View style={styles.pulseInner} />}
                  </View>
                  {index !== selectedRoute.path.length - 1 && (
                    <View style={[
                        styles.line, 
                        isPassed ? {backgroundColor: selectedRoute.color} : styles.dashedLine,
                        isActive && {backgroundColor: selectedRoute.color}
                    ]} />
                  )}
                </View>
                <View style={styles.stopInfo}>
                  <Text style={[
                    styles.stopTitle, 
                    isPassed && {color: '#B0BEC5'}, 
                    isActive && {color: selectedRoute.color, fontFamily: 'Mont-Bold', fontSize: 16}
                  ]}>
                    {stop.title}
                  </Text>
                  <Text style={styles.stopSubtitle}>
                    {isActive ? "Current Bus Location" : isPassed ? "Passed" : "Upcoming Stop"}
                  </Text>
                </View>
                {isActive && (
                  <View style={[styles.liveBadge, {backgroundColor: selectedRoute.color}]}>
                    <Text style={styles.liveBadgeText}>LIVE</Text>
                  </View>
                )}
              </View>
            );
          })}
          <View style={{height: 40}} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  header: { 
    paddingHorizontal: 25, 
    paddingTop: 55, 
    paddingBottom: 20, 
    backgroundColor: '#fff', 
    borderBottomLeftRadius: 35, 
    borderBottomRightRadius: 35,
    elevation: 8,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  greeting: { fontFamily: 'Mont-Med', fontSize: 12, color: '#90A4AE', textTransform: 'uppercase' },
  title: { fontSize: 24, fontFamily: 'Poppins-Bold', color: '#1A1A1A' },
  notifBtn: { padding: 10, backgroundColor: '#F5F7FA', borderRadius: 12 },
  notifDot: { position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF3D71', borderWidth: 1.5, borderColor: '#fff' },
  
  chipScroll: { paddingRight: 20 },
  chip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: '#F1F3F6', marginRight: 12 },
  chipText: { fontFamily: 'Mont-Bold', fontSize: 13, color: '#90A4AE' },
  
  modeContainer: { alignItems: 'center', marginVertical: 15 },
  modeWrapper: { flexDirection: 'row', backgroundColor: '#EDF1F7', borderRadius: 20, padding: 5, width: '85%' },
  modeBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 16 },
  activeBtn: { backgroundColor: '#1A2138', elevation: 4 }, 
  modeText: { fontSize: 12, fontFamily: 'Mont-Semi', marginLeft: 8, color: '#8F9BB3' },
  
  mapArea: { 
    height: 240, 
    marginHorizontal: 20, 
    borderRadius: 30, 
    overflow: 'hidden', 
    backgroundColor: '#fff',
    elevation: 10,
  },
  
  bottomSheet: { 
    flex: 1, 
    backgroundColor: '#fff', 
    borderTopLeftRadius: 45, 
    borderTopRightRadius: 45, 
    marginTop: 15, 
    padding: 25,
    elevation: 25,
  },
  heroCard: { borderRadius: 25, padding: 20, marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  heroName: { color: '#fff', fontSize: 18, fontFamily: 'Poppins-Semi', marginBottom: 5 },
  heroStats: { flexDirection: 'row', alignItems: 'center' },
  heroInfo: { flex: 1 },
  statItem: { flexDirection: 'row', alignItems: 'center' },
  statText: { color: 'rgba(255,255,255,0.8)', fontSize: 11, fontFamily: 'Mont-Med', marginLeft: 5 },
  statDivider: { width: 1, height: 12, backgroundColor: 'rgba(255,255,255,0.3)', marginHorizontal: 15 },
  liveBadgeHero: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },

  stopList: { flex: 1 },
  stopItem: { flexDirection: 'row', height: 75, alignItems: 'flex-start' },
  timeline: { alignItems: 'center', width: 30, height: '100%' },
  dot: { width: 12, height: 12, borderRadius: 6, zIndex: 1, marginTop: 5, justifyContent: 'center', alignItems: 'center' },
  pulseInner: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff' },
  line: { width: 3, flex: 1, backgroundColor: '#F0F2F5', marginTop: -2 },
  dashedLine: { backgroundColor: 'transparent', borderLeftWidth: 2, borderStyle: 'dashed', borderColor: '#E0E0E0' },
  
  stopInfo: { marginLeft: 20, flex: 1 },
  stopTitle: { fontSize: 15, fontFamily: 'Mont-Med', color: '#2E3A59' },
  stopSubtitle: { fontSize: 11, fontFamily: 'Mont-Reg', color: '#8F9BB3', marginTop: 2 },
  liveBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  liveBadgeText: { color: '#fff', fontSize: 9, fontFamily: 'Poppins-Bold' }
});