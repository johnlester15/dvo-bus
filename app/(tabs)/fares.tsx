import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Ionicons } from '@expo/vector-icons';

export default function FaresScreen() {
  let [fontsLoaded] = useFonts({
    'Poppins-Bold': Poppins_700Bold,
    'Poppins-Semi': Poppins_600SemiBold,
    'Mont-Reg': Montserrat_400Regular,
    'Mont-Med': Montserrat_500Medium,
    'Mont-Semi': Montserrat_600SemiBold,
    'Mont-Bold': Montserrat_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HEADER SECTION */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Davao Bus <Text style={{color: '#00A8B5'}}>Fares</Text></Text>
          <Text style={styles.subtext}>Impormasyon bahin sa pamaagi sa pagbayad ug pletehan.</Text>
        </View>

        {/* PROMINENT FREE STATUS CARD */}
        <View style={styles.freeCard}>
          <View style={styles.freeHeader}>
            <View style={styles.iconCircle}>
              <Ionicons name="megaphone" size={26} color="#2e7d32" />
            </View>
            <View>
              <Text style={styles.statusLabel}>MAAYONG BALITA!</Text>
              <Text style={styles.statusValue}>LIBRENG SAKAY</Text>
            </View>
          </View>
          
          <View style={styles.dividerLight} />
          
          <Text style={styles.freeDetails}>
            Ang <Text style={styles.boldGreen}>DC Bus Interim Service</Text> kay kasamtangang <Text style={styles.boldGreen}>WALAY BAYAD</Text> alang sa tanang sumasakay. 
          </Text>
          
          <View style={styles.infoRow}>
            <Ionicons name="checkmark-circle" size={18} color="#2e7d32" />
            <Text style={styles.infoText}>Para sa tanang rota sa Davao Bus.</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="checkmark-circle" size={18} color="#2e7d32" />
            <Text style={styles.infoText}>Walay plete nga kolektahon sa pagkakaron.</Text>
          </View>
        </View>

        {/* NOTICE SECTION */}
        <View style={styles.noticeSection}>
          <Text style={styles.sectionHeader}>Pahinumdom sa mga Sumasakay</Text>
          
          <View style={styles.noticeCard}>
            <Ionicons name="information-circle" size={24} color="#00A8B5" />
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.noticeTitle}>Nganong Libre?</Text>
              <Text style={styles.noticeDesc}>
                Kini usa ka inisyatibo sa City Government of Davao aron matabangan ang mga commuter samtang wala pa hingpit nga napatuman ang HPBS (High Priority Bus System).
              </Text>
            </View>
          </View>

          <View style={styles.noticeCard}>
            <Ionicons name="people" size={24} color="#00A8B5" />
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.noticeTitle}>Priority Seating</Text>
              <Text style={styles.noticeDesc}>
                Bisan libre, palihog hatagan og prayoridad sa lingkoranan ang mga Senior Citizens, PWDs, ug mga mabdos.
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.footerNote}>© 2026 Davao Bus Explore • City Government of Davao</Text>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  headerContainer: { padding: 25, paddingTop: 30, backgroundColor: '#fff' },
  header: { fontSize: 28, fontFamily: 'Poppins-Bold', color: '#1A1A1A' },
  subtext: { fontFamily: 'Mont-Reg', fontSize: 13, color: '#666', marginTop: 5 },

  // Free Card Styles
  freeCard: { 
    margin: 20, 
    backgroundColor: '#E8F5E9', 
    borderRadius: 25, 
    padding: 25, 
    borderWidth: 2, 
    borderColor: '#C8E6C9',
    elevation: 5,
    shadowColor: '#2e7d32',
    shadowOpacity: 0.1,
    shadowRadius: 10
  },
  freeHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  iconCircle: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    backgroundColor: '#fff', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 15,
    elevation: 2
  },
  statusLabel: { fontFamily: 'Mont-Bold', fontSize: 11, color: '#2e7d32', letterSpacing: 1.5 },
  statusValue: { fontFamily: 'Poppins-Bold', fontSize: 26, color: '#1B5E20' },
  dividerLight: { height: 1, backgroundColor: '#C8E6C9', marginVertical: 15 },
  freeDetails: { fontFamily: 'Mont-Reg', fontSize: 15, color: '#2E3A59', lineHeight: 22, marginBottom: 20 },
  boldGreen: { fontFamily: 'Mont-Bold', color: '#1B5E20' },
  
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  infoText: { fontFamily: 'Mont-Med', fontSize: 13, color: '#44546A', marginLeft: 10 },

  // Notice Section
  noticeSection: { paddingHorizontal: 25, marginTop: 10 },
  sectionHeader: { fontSize: 18, fontFamily: 'Poppins-Semi', color: '#333', marginBottom: 15 },
  noticeCard: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 20, 
    marginBottom: 15,
    alignItems: 'flex-start',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5
  },
  noticeTitle: { fontFamily: 'Poppins-Semi', fontSize: 15, color: '#1A1A1A' },
  noticeDesc: { fontFamily: 'Mont-Reg', fontSize: 12, color: '#666', lineHeight: 18, marginTop: 4 },

  footerNote: { textAlign: 'center', fontFamily: 'Mont-Med', fontSize: 11, color: '#B0BEC5', marginTop: 10 }
});