import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Linking, 
  ImageBackground, 
  StatusBar 
} from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  let [fontsLoaded] = useFonts({
    'Poppins-Bold': Poppins_700Bold,
    'Poppins-Semi': Poppins_600SemiBold,
    'Mont-Reg': Montserrat_400Regular,
    'Mont-Med': Montserrat_500Medium,
    'Mont-Semi': Montserrat_600SemiBold,
    'Mont-Bold': Montserrat_700Bold,
  });

  if (!fontsLoaded) return null;

  const features = [
    { icon: 'location', title: 'Live Tracking', desc: 'Sunda ang real-time nga lokasyon sa mga bus.', color: '#E0F7F9' },
    { icon: 'map', title: 'Route Overview', desc: 'Tan-awa ang tibuok rota sa dili pa mobiyahe.', color: '#E0F7F9' },
    { icon: 'time', title: 'ETA Updates', desc: 'Saktong banabana sa oras sa pag-abot.', color: '#E0F7F9' },
    { icon: 'notifications', title: 'Smart Alerts', desc: 'Pahibalo bahin sa traffic o delay.', color: '#E0F7F9' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" />

      {/* HEADER BANNER - Kani lang ang naay picture sa luyo */}
      <ImageBackground 
        source={{ uri: 'https://davaocity.gov.ph/wp-content/uploads/2025/10/DC-bus-feet-arrives-in-Davao.webp' }}
        style={styles.heroBanner}
      >
        <View style={styles.overlay}>
          <View style={styles.iconCircle}>
            <Ionicons name="bus" size={40} color="#00A8B5" />
          </View>
          <Text style={styles.appName}>Davao Bus <Text style={{color: '#00A8B5'}}>Explore</Text></Text>
          <Text style={styles.version}>Version 1.0.4 (Beta)</Text>
        </View>
      </ImageBackground>

      {/* MAIN CONTENT AREA */}
      <View style={styles.content}>
        
        {/* ATONG MISYON SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Atong Misyon</Text>
          <Text style={styles.paragraph}>
            Ang <Text style={styles.boldText}>Davao Bus Explore</Text> gihimo aron mapadali ang pagbiyahe sa matag Davaoeño. 
            Gisumpay namo ang teknolohiya ug transportasyon aron mamenosan ang paghulat sa dalan ug 
            mahimong planado ang matag biyahe nimo sa dakbayan.
          </Text>
        </View>

        {/* FEATURES GRID SECTION */}
        <Text style={styles.sectionTitle}>Unsay Naa sa App?</Text>
        <View style={styles.featuresContainer}>
          {features.map((item, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={[styles.featureIconContainer, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon as any} size={22} color="#00A8B5" />
              </View>
              <Text style={styles.featureTitle}>{item.title}</Text>
              <Text style={styles.featureDesc}>{item.desc}</Text>
            </View>
          ))}
        </View>

        {/* NAA KAY PANGUTANA FOOTER CARD */}
        <View style={styles.footerCard}>
          <Text style={styles.footerTitle}>Naa kay pangutana?</Text>
          <Text style={styles.footerText}>Suportahan nato ang modernong Davao! I-follow mi sa social media o kontaka ang among team.</Text>
          
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn} onPress={() => Linking.openURL('https://facebook.com')}>
              <Ionicons name="logo-facebook" size={24} color="#1877F2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn} onPress={() => Linking.openURL('mailto:support@davaobus.com')}>
              <Ionicons name="mail" size={24} color="#1A2138" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn} onPress={() => Linking.openURL('https://twitter.com')}>
              <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.copyright}>© 2026 Davao Bus Explore. City Government of Davao.</Text>
        <View style={{height: 40}} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  
  heroBanner: { 
    width: '100%', 
    height: 250, 
    borderBottomLeftRadius: 35, 
    borderBottomRightRadius: 35, 
    overflow: 'hidden' 
  },
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0, 0, 0, 0.55)', 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingTop: 30
  },
  iconCircle: { 
    width: 75, 
    height: 75, 
    borderRadius: 38, 
    backgroundColor: 'rgba(255,255,255,0.95)', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 12,
    elevation: 8
  },
  appName: { fontSize: 24, fontFamily: 'Poppins-Bold', color: '#FFFFFF' },
  version: { fontSize: 12, fontFamily: 'Mont-Reg', color: 'rgba(255,255,255,0.8)' },

  content: { padding: 25 },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 18, fontFamily: 'Poppins-Semi', color: '#1A1A1A', marginBottom: 12 },
  paragraph: { fontSize: 14, fontFamily: 'Mont-Reg', color: '#546E7A', lineHeight: 22 },
  boldText: { fontFamily: 'Mont-Bold', color: '#1A2138' },

  featuresContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    marginTop: 5,
    marginBottom: 30 
  },
  featureCard: { 
    width: '48%', 
    backgroundColor: '#FFFFFF', 
    padding: 15, 
    borderRadius: 20, 
    marginBottom: 15, 
    borderWidth: 1,
    borderColor: '#F0F2F5',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  featureIconContainer: { 
    width: 45, 
    height: 45, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  featureTitle: { fontSize: 14, fontFamily: 'Mont-Bold', color: '#1A2138' },
  featureDesc: { fontSize: 11, fontFamily: 'Mont-Reg', color: '#78909C', marginTop: 4, lineHeight: 16 },

  footerCard: { 
    backgroundColor: '#1A2138', 
    padding: 25, 
    borderRadius: 30, 
    alignItems: 'center',
    marginTop: 10
  },
  footerTitle: { color: '#FFFFFF', fontSize: 18, fontFamily: 'Poppins-Semi' },
  footerText: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontFamily: 'Mont-Reg', textAlign: 'center', marginTop: 10, lineHeight: 18 },
  socialRow: { flexDirection: 'row', marginTop: 20, gap: 15 },
  socialBtn: { 
    width: 45, 
    height: 45, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  
  copyright: { textAlign: 'center', marginTop: 30, fontSize: 11, fontFamily: 'Mont-Med', color: '#B0BEC5' }
});