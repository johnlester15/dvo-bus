import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';

const SCHEDULE_DATA = [
  {
    id: 'R102',
    name: 'Toril - GE Torres',
    color: '#9C27B0',
    am: { time: '6:00 AM - 10:00 AM', start: 'Toril District Hall', end: 'GE Torres (Sandawa)' },
    pm: { time: '4:00 PM - 9:00 PM', start: 'Ecoland Terminal', end: 'Toril District Hall' }
  },
  {
    id: 'R103',
    name: 'Toril - Roxas',
    color: '#FF9800',
    am: { time: '6:00 AM - 10:00 AM', start: 'Toril District Hall', end: 'Red Cross Roxas' },
    pm: { time: '4:00 PM - 9:00 PM', start: 'Davao Light (C. Bangoy St.)', end: 'Toril District Hall' }
  },
  {
    id: 'R402',
    name: 'Mintal - GE Torres',
    color: '#2196F3',
    am: { time: '6:00 AM - 10:00 AM', start: 'Mintal Palengke', end: 'GE Torres (Sandawa)' },
    pm: { time: '4:00 PM - 9:00 PM', start: 'Ecoland Terminal', end: 'Mintal Palengke' }
  },
  {
    id: 'R603',
    name: 'Buhangin - Roxas',
    color: '#E91E63',
    am: { time: '6:00 AM - 10:00 AM', start: 'Citymall Northtown', end: 'Red Cross Roxas' },
    pm: { time: '4:00 PM - 9:00 PM', start: 'Red Cross Roxas', end: 'Citymall Northtown' }
  }
];

export default function ScheduleScreen() {
  let [fontsLoaded] = useFonts({
    'Poppins-Bold': Poppins_700Bold,
    'Poppins-Semi': Poppins_600SemiBold,
    'Mont-Reg': Montserrat_400Regular,
    'Mont-Med': Montserrat_500Medium,
    'Mont-Semi': Montserrat_600SemiBold,
    'Mont-Bold': Montserrat_700Bold,
  });

  if (!fontsLoaded) return <ActivityIndicator size="large" color="#005aab" style={{ flex: 1 }} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DC Bus Route <Text style={{color: '#00A8B5'}}>Schedules</Text></Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {SCHEDULE_DATA.map((route) => (
          <View key={route.id} style={styles.routeCard}>
            {/* Route Title Badge */}
            <View style={styles.routeHeader}>
              <View style={[styles.badge, { backgroundColor: route.color }]}>
                <Text style={styles.badgeText}>{route.id}</Text>
              </View>
              <Text style={styles.routeName}>{route.id} - {route.name}</Text>
            </View>

            <View style={styles.timeContainer}>
              {/* AM BLOCK */}
              <View style={[styles.timeBlock, styles.amBorder]}>
                <View style={styles.timeHeader}>
                  <View style={styles.amTag}><Text style={styles.tagText}>AM</Text></View>
                  <Text style={styles.timeRange}>{route.am.time}</Text>
                </View>
                <View style={styles.locationDetail}>
                  <View style={styles.indicatorContainer}>
                    <View style={[styles.dot, {backgroundColor: '#FFB800'}]} />
                    <View style={styles.verticalLine} />
                    <View style={[styles.dot, {backgroundColor: '#FFB800'}]} />
                  </View>
                  <View>
                    <Text style={styles.locLabel}>Starting Point</Text>
                    <Text style={styles.locName}>{route.am.start}</Text>
                    <Text style={[styles.locLabel, {marginTop: 15}]}>Endpoint</Text>
                    <Text style={styles.locName}>{route.am.end}</Text>
                  </View>
                </View>
              </View>

              {/* PM BLOCK */}
              <View style={[styles.timeBlock, styles.pmBorder]}>
                <View style={styles.timeHeader}>
                  <View style={styles.pmTag}><Text style={styles.tagText}>PM</Text></View>
                  <Text style={styles.timeRange}>{route.pm.time}</Text>
                </View>
                <View style={styles.locationDetail}>
                  <View style={styles.indicatorContainer}>
                    <View style={[styles.dot, {backgroundColor: '#2196F3'}]} />
                    <View style={styles.verticalLine} />
                    <View style={[styles.dot, {backgroundColor: '#2196F3'}]} />
                  </View>
                  <View>
                    <Text style={styles.locLabel}>Starting Point</Text>
                    <Text style={styles.locName}>{route.pm.start}</Text>
                    <Text style={[styles.locLabel, {marginTop: 15}]}>Endpoint</Text>
                    <Text style={styles.locName}>{route.pm.end}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { padding: 25, paddingTop: 40, backgroundColor: '#fff', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 20, fontFamily: 'Poppins-Bold', color: '#333' },
  scrollContent: { padding: 15 },
  
  routeCard: { backgroundColor: '#fff', borderRadius: 15, padding: 15, marginBottom: 20, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
  routeHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, marginRight: 10 },
  badgeText: { color: '#fff', fontFamily: 'Mont-Bold', fontSize: 12 },
  routeName: { fontSize: 16, fontFamily: 'Poppins-Semi', color: '#2E3A59' },

  timeContainer: { flexDirection: 'column' },
  timeBlock: { padding: 15, borderRadius: 12, borderWidth: 1, marginBottom: 10 },
  amBorder: { borderColor: '#FFE082', backgroundColor: '#FFFDE7' },
  pmBorder: { borderColor: '#BBDEFB', backgroundColor: '#E3F2FD' },
  
  timeHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  amTag: { backgroundColor: '#FFB800', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, marginRight: 8 },
  pmTag: { backgroundColor: '#2196F3', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, marginRight: 8 },
  tagText: { color: '#fff', fontSize: 10, fontFamily: 'Mont-Bold' },
  timeRange: { fontSize: 12, fontFamily: 'Mont-Bold', color: '#444' },

  locationDetail: { flexDirection: 'row' },
  indicatorContainer: { width: 20, alignItems: 'center', marginRight: 10, paddingTop: 5 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  verticalLine: { width: 1, height: 35, backgroundColor: '#DDD', marginVertical: 2 },
  locLabel: { fontSize: 10, fontFamily: 'Mont-Reg', color: '#888' },
  locName: { fontSize: 12, fontFamily: 'Mont-Semi', color: '#333' }
});