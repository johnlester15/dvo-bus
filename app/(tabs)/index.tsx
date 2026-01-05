import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Dimensions, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { useFonts, Poppins_700Bold, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  let [fontsLoaded] = useFonts({
    'Poppins-Bold': Poppins_700Bold,
    'Poppins-Semi': Poppins_600SemiBold,
    'Poppins-Reg': Poppins_400Regular,
    'Mont-Reg': Montserrat_400Regular,
    'Mont-Med': Montserrat_500Medium,
    'Mont-Semi': Montserrat_600SemiBold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#005aab" style={{ flex: 1 }} />;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* HERO SECTION WITH BACKGROUND */}
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop' }} 
        style={styles.hero}
      >
        <View style={styles.overlay}>
          <Text style={styles.heroTitle}>Modern Transit for {'\n'}<Text style={{color: '#FF8C00'}}>Davao City</Text></Text>
          <Text style={styles.heroSubtitle}>
            Davao City's public transportation network offers convenient and affordable travel options across the city. 
            With DC Bus interim services operating during peak hours and the upcoming Davao BRT system, 
            commuters have reliable choices for their daily journeys.
          </Text>
          
          <View style={styles.heroButtons}>
            <TouchableOpacity style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>View Routes →</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>Check Schedule</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/* STATISTICS SECTION */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>50K+</Text>
          <Text style={styles.statLabel}>Daily Passengers</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Active Routes</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>45</Text>
          <Text style={styles.statLabel}>Stations</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>80</Text>
          <Text style={styles.statLabel}>Fleet Size</Text>
        </View>
      </View>

      {/* WHY CHOOSE DAVAO BRT SECTION */}
      <View style={styles.brtSection}>
        <Text style={styles.brtLabel}>Why Choose Davao BRT?</Text>
        <View style={styles.blueDivider} />
        <Text style={styles.brtDescription}>
          Experience the future of public transportation with our modern, efficient, and eco-friendly bus rapid transit system. 
          The Davao BRT is designed to reduce traffic congestion and provide a world-class commuting experience for every Davaoeño.
        </Text>

        <View style={styles.featureGrid}>
          <View style={styles.featureItem}>
            <Ionicons name="time-outline" size={30} color="#005aab" />
            <Text style={styles.featureTitle}>Faster Travel</Text>
            <Text style={styles.featureText}>Dedicated lanes mean no more getting stuck in traffic.</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="leaf-outline" size={30} color="#005aab" />
            <Text style={styles.featureTitle}>Eco-Friendly</Text>
            <Text style={styles.featureText}>Modern fleet designed to reduce carbon emissions.</Text>
          </View>
        </View>
      </View>

      {/* SERVICE STATUS CARD */}
      <View style={styles.content}>
        <Text style={styles.sectionHeader}>Service Status</Text>
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>DC Bus Interim Service is Operational</Text>
          </View>
          <Text style={styles.statusSub}>Free rides are available during peak hours (6AM-9AM & 4PM-7PM).</Text>
          
          <Link href="/modal" asChild>
            <TouchableOpacity style={styles.opHoursBtn}>
              <Text style={styles.opHoursText}>View Operating Hours</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
      
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  
  // Hero Styles
  hero: { height: 450, width: width },
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0, 40, 80, 0.7)', 
    padding: 30, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  heroTitle: { 
    color: 'white', 
    fontSize: 34, 
    fontFamily: 'Poppins-Bold', 
    textAlign: 'center',
    lineHeight: 40
  },
  heroSubtitle: { 
    color: 'rgba(255,255,255,0.9)', 
    fontSize: 14, 
    fontFamily: 'Mont-Reg', 
    textAlign: 'center', 
    marginTop: 15,
    lineHeight: 22
  },
  heroButtons: { flexDirection: 'row', marginTop: 25 },
  primaryBtn: { backgroundColor: '#FFFFFF', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 5, marginRight: 10 },
  primaryBtnText: { color: '#005aab', fontFamily: 'Mont-Semi', fontSize: 13 },
  secondaryBtn: { backgroundColor: '#00A8B5', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 5 },
  secondaryBtnText: { color: 'white', fontFamily: 'Mont-Semi', fontSize: 13 },

  // Stats Styles
  statsContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    padding: 20, 
    backgroundColor: '#f8f9fa',
    justifyContent: 'space-around'
  },
  statBox: { width: '45%', alignItems: 'center', marginVertical: 15 },
  statNumber: { fontSize: 28, fontFamily: 'Poppins-Bold', color: '#005aab' },
  statLabel: { fontSize: 12, fontFamily: 'Mont-Med', color: '#666', marginTop: 5 },

  // BRT Section
  brtSection: { padding: 30, alignItems: 'center' },
  brtLabel: { fontSize: 22, fontFamily: 'Poppins-Bold', color: '#333' },
  blueDivider: { width: 60, height: 4, backgroundColor: '#005aab', marginTop: 10, marginBottom: 20 },
  brtDescription: { 
    fontFamily: 'Mont-Reg', 
    fontSize: 14, 
    color: '#555', 
    textAlign: 'center', 
    lineHeight: 22 
  },
  featureGrid: { flexDirection: 'row', marginTop: 30, justifyContent: 'space-between' },
  featureItem: { width: '48%', alignItems: 'center' },
  featureTitle: { fontFamily: 'Poppins-Semi', fontSize: 15, marginTop: 10, color: '#005aab' },
  featureText: { fontFamily: 'Mont-Reg', fontSize: 11, textAlign: 'center', color: '#777', marginTop: 5 },

  // Service Status
  content: { padding: 20 },
  sectionHeader: { fontSize: 18, fontFamily: 'Poppins-Semi', marginBottom: 15, color: '#333' },
  statusCard: { 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 15, 
    borderWidth: 1, 
    borderColor: '#eee',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10
  },
  statusHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  statusDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#2e7d32', marginRight: 10 },
  statusText: { fontSize: 15, fontFamily: 'Mont-Semi', color: '#2e7d32' },
  statusSub: { color: '#666', fontFamily: 'Mont-Reg', fontSize: 13, lineHeight: 20 },
  opHoursBtn: { marginTop: 15, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 15, alignItems: 'center' },
  opHoursText: { color: '#005aab', fontFamily: 'Mont-Semi', fontSize: 14 }
});