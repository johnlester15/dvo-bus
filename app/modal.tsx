import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { Ionicons } from '@expo/vector-icons';

export default function ScheduleModal() {
  let [fontsLoaded] = useFonts({
    'Poppins-Bold': Poppins_700Bold,
    'Poppins-Semi': Poppins_600SemiBold,
    'Mont-Reg': Montserrat_400Regular,
    'Mont-Med': Montserrat_500Medium,
    'Mont-Semi': Montserrat_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      {/* DRAG HANDLE FOR MODAL */}
      <View style={styles.dragHandle} />

      <View style={styles.headerRow}>
        <Text style={styles.header}>Operating Hours</Text>
        <Ionicons name="time" size={24} color="#005aab" />
      </View>
      
      <Text style={styles.subtext}>
        The DC Bus interim service operates specifically during peak hours to assist Davao City commuters.
      </Text>

      {/* AM SCHEDULE CARD */}
      <View style={[styles.timeCard, styles.amCard]}>
        <View style={styles.iconCircle}>
          <Ionicons name="sunny" size={20} color="#FF8C00" />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.periodText}>Morning Peak (AM)</Text>
          <Text style={styles.timeText}>6:00 AM — 10:00 AM</Text>
          <Text style={styles.availability}>Daily Operations</Text>
        </View>
      </View>

      {/* PM SCHEDULE CARD */}
      <View style={[styles.timeCard, styles.pmCard]}>
        <View style={[styles.iconCircle, { backgroundColor: '#E3F2FD' }]}>
          <Ionicons name="moon" size={20} color="#005aab" />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.periodText}>Afternoon Peak (PM)</Text>
          <Text style={styles.timeText}>4:00 PM — 9:00 PM</Text>
          <Text style={styles.availability}>Daily Operations</Text>
        </View>
      </View>

      {/* IMPORTANT NOTE SECTION */}
      <View style={styles.noteBox}>
        <Ionicons name="alert-circle" size={18} color="#666" style={{ marginRight: 8 }} />
        <Text style={styles.note}>
          Please be advised that the service is currently unavailable during off-peak hours (10:00 AM - 4:00 PM).
        </Text>
      </View>

      <TouchableOpacity style={styles.closeBtn}>
        <Text style={styles.closeBtnText}>Got it!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 30, 
    backgroundColor: '#FFFFFF', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30 
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 25
  },
  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  header: { 
    fontSize: 24, 
    fontFamily: 'Poppins-Bold', 
    color: '#1A1A1A' 
  },
  subtext: {
    fontFamily: 'Mont-Reg',
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
    marginBottom: 25
  },
  timeCard: { 
    flexDirection: 'row',
    padding: 20, 
    borderRadius: 20, 
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1
  },
  amCard: { 
    backgroundColor: '#FFF9EB', 
    borderColor: '#FFE0B2' 
  },
  pmCard: { 
    backgroundColor: '#F0F7FF', 
    borderColor: '#BBDEFB' 
  },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  cardContent: {
    flex: 1
  },
  periodText: { 
    fontFamily: 'Mont-Semi', 
    fontSize: 12, 
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  timeText: { 
    fontSize: 20, 
    fontFamily: 'Poppins-Semi', 
    color: '#1A1A1A',
    marginVertical: 2
  },
  availability: {
    fontFamily: 'Mont-Med',
    fontSize: 11,
    color: '#005aab'
  },
  noteBox: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 12,
    marginTop: 10
  },
  note: { 
    flex: 1,
    color: '#666', 
    fontFamily: 'Mont-Reg', 
    fontSize: 12, 
    lineHeight: 18 
  },
  closeBtn: {
    backgroundColor: '#005aab',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 30
  },
  closeBtnText: {
    color: 'white',
    fontFamily: 'Mont-Semi',
    fontSize: 16
  }
});