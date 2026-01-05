import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Montserrat_500Medium, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { ActivityIndicator, View } from 'react-native';

export default function TabLayout() {
  // Pag-load sa fonts para sa Tab Labels
  let [fontsLoaded] = useFonts({
    'Poppins-Semi': Poppins_600SemiBold,
    'Mont-Med': Montserrat_500Medium,
    'Mont-Semi': Montserrat_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#005aab" />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false, 
        tabBarActiveTintColor: '#005aab', // Davao Bus Blue
        tabBarInactiveTintColor: '#8F9BB3', // Modern Gray
        
        // Gigamit ang Montserrat para klaro basahon bisan gamay (size 9)
        tabBarLabelStyle: { 
          fontFamily: 'Mont-Semi', 
          fontSize: 8.5, 
          marginBottom: 8,
          letterSpacing: -0.2 // Tighter spacing para sa 8 items
        },
        
        // Gi-adjust ang height para dili huot tan-awon
        tabBarStyle: { 
          height: 70, 
          paddingBottom: 5,
          paddingTop: 10,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F0F2F5',
          elevation: 10, // Shadow para sa Android
          shadowColor: '#000', // Shadow para sa iOS
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="routes"
        options={{
          title: 'Routes',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "bus" : "bus-outline"} size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "time" : "time-outline"} size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          title: 'Route Map',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "map" : "map-outline"} size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="fares"
        options={{
          title: 'Fares',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "cash" : "cash-outline"} size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "information-circle" : "information-circle-outline"} size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="blog"
        options={{
          title: 'Blog',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "reader" : "reader-outline"} size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="news"
        options={{
          title: 'News',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "newspaper" : "newspaper-outline"} size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}