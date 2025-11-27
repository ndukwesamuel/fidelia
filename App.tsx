import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  MainTabParamList,
  RootStackParamList,
} from "./src/navigation/navigation";
import SplashScreen from "./src/Splashscreen";
import OnboardingScreen from "./src/Onboardingscreen";
import LoginScreen from "./src/Loginscreen";
import RegisterScreen from "./src/Registerscreen";
import OTPScreen from "./src/Otpscreen";
import HomeScreen from "./src/user/Homescreen";
import SearchScreen from "./src/user/Searchscreen";
import OrdersScreen from "./src/user/Ordersscreen";
import WalletScreen from "./src/user/Walletscreen";
import ProfileScreen from "./src/user/Profilescreen";
import CategoryScreen from "./src/user/Categoryscreen";
import StoreDetailsScreen from "./src/user/Storedetailsscreen";
import ProductDetailsScreen from "./src/user/Productdetailsscreen";
import CartScreen from "./src/user/Cartscreen";
import CheckoutScreen from "./src/user/Checkoutscreen";
import PaymentMethodScreen from "./src/user/Paymentmethodscreen";
import OrderConfirmationScreen from "./src/user/Orderconfirmationscreen";
import AddressesScreen from "./src/user/Addressesscreen";
import RateOrderScreen from "./src/user/Rateorderscreen";
import OrderDetailsScreen from "./src/user/Orderdetailsscreen";
import LiveTrackingScreen from "./src/user/Livetrackingscreen";

// Import all screens
// import SplashScreen from "./screens/SplashScreen";
// import OnboardingScreen from "./screens/OnboardingScreen";
// import LoginScreen from "./screens/LoginScreen";
// import RegisterScreen from "./screens/RegisterScreen";
// import OTPScreen from "./screens/OTPScreen";
// import HomeScreen from "./screens/HomeScreen";
// import SearchScreen from "./screens/SearchScreen";
// import CategoryScreen from "./screens/CategoryScreen";
// import StoreDetailsScreen from "./screens/StoreDetailsScreen";
// import ProductDetailsScreen from "./screens/ProductDetailsScreen";
// import CartScreen from "./screens/CartScreen";
// import CheckoutScreen from "./screens/CheckoutScreen";
// import PaymentMethodScreen from "./screens/PaymentMethodScreen";
// import OrderConfirmationScreen from "./screens/OrderConfirmationScreen";
// import LiveTrackingScreen from "./screens/LiveTrackingScreen";
// import OrderDetailsScreen from "./screens/OrderDetailsScreen";
// import RateOrderScreen from "./screens/RateOrderScreen";
// import OrdersScreen from "./screens/OrdersScreen";
// import WalletScreen from "./screens/WalletScreen";
// import ProfileScreen from "./screens/ProfileScreen";
// import AddressesScreen from "./screens/AddressesScreen";

// import type { RootStackParamList, MainTabParamList } from "./types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Bottom Tab Navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#0066FF",
        tabBarInactiveTintColor: "#666666",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof MaterialCommunityIcons.glyphMap = "home";

          if (route.name === "Home") {
            iconName = "home-variant";
          } else if (route.name === "Search") {
            iconName = "magnify";
          } else if (route.name === "Orders") {
            iconName = "receipt-text";
          } else if (route.name === "Wallet") {
            iconName = "wallet";
          } else if (route.name === "Profile") {
            iconName = "account-circle";
          }

          return (
            <View style={styles.tabIconContainer}>
              {focused && (
                <View style={styles.activeIndicator}>
                  <LinearGradient
                    colors={["#0066FF", "#0052CC"]}
                    style={styles.activeGradient}
                  />
                </View>
              )}
              <MaterialCommunityIcons name={iconName} size={28} color={color} />
              {focused && <View style={styles.activeGlow} />}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />

      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Root Stack Navigator
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="Splash"
        initialRouteName="MainTabs"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#000000" },
          animation: "slide_from_right",
        }}
      >
        {/* Auth Stack */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />

        {/* Main App */}
        <Stack.Screen name="MainTabs" component={MainTabs} />

        {/* Shopping Flow */}
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="StoreDetails" component={StoreDetailsScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
        <Stack.Screen
          name="OrderConfirmation"
          component={OrderConfirmationScreen}
        />

        {/* Tracking */}
        <Stack.Screen name="LiveTracking" component={LiveTrackingScreen} />
        <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
        <Stack.Screen name="RateOrder" component={RateOrderScreen} />

        {/* Profile Screens */}
        <Stack.Screen name="Addresses" component={AddressesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    height: 70,
    backgroundColor: "rgba(10, 10, 10, 0.95)",
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "rgba(0, 102, 255, 0.2)",
    paddingBottom: 8,
    paddingTop: 8,

    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 20,
  },
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
    position: "relative",
  },
  activeIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 28,
    padding: 2,
  },
  activeGradient: {
    flex: 1,
    borderRadius: 28,
    opacity: 0.2,
  },
  activeGlow: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#0066FF",
    opacity: 0.3,
  },
});

export default App;
