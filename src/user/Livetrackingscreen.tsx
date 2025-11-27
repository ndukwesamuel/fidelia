import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../types/navigation";

type LiveTrackingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "LiveTracking">;
  route: RouteProp<RootStackParamList, "LiveTracking">;
};

const LiveTrackingScreen: React.FC<LiveTrackingScreenProps> = ({
  navigation,
  route,
}) => {
  const { orderId } = route.params;
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // Pulse animation for rider icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const orderStatus = {
    status: "on_the_way",
    statusText: "Out for Delivery",
    estimatedTime: "15 mins",
    progress: 75,
  };

  const riderInfo = {
    name: "Emeka Johnson",
    phone: "+234 801 234 5678",
    rating: 4.9,
    reviews: 245,
    vehicleNumber: "LAG-123-XY",
    distance: "1.2 km away",
  };

  const deliveryAddress = {
    name: "Home",
    address: "15 Allen Avenue, Ikeja, Lagos",
  };

  const storeInfo = {
    name: "Mama Put Kitchen",
    address: "28 Opebi Road, Ikeja, Lagos",
  };

  const timeline = [
    {
      id: "1",
      status: "confirmed",
      title: "Order Confirmed",
      time: "2:30 PM",
      completed: true,
    },
    {
      id: "2",
      status: "preparing",
      title: "Preparing Order",
      time: "2:35 PM",
      completed: true,
    },
    {
      id: "3",
      status: "ready",
      title: "Order Ready",
      time: "2:50 PM",
      completed: true,
    },
    {
      id: "4",
      status: "picked_up",
      title: "Picked Up",
      time: "2:55 PM",
      completed: true,
    },
    {
      id: "5",
      status: "on_the_way",
      title: "On The Way",
      time: "Now",
      completed: false,
      active: true,
    },
    {
      id: "6",
      status: "delivered",
      title: "Delivered",
      time: "~3:10 PM",
      completed: false,
    },
  ];

  const handleCall = () => {
    // Call rider logic
  };

  const handleMessage = () => {
    // Message rider logic
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <LinearGradient
        colors={["#000000", "#0A0A0A", "#000000"]}
        style={styles.background}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>LIVE TRACKING</Text>
          <Text style={styles.headerSubtitle}>{orderId}</Text>
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Map Placeholder */}
        <View style={styles.mapContainer}>
          <LinearGradient
            colors={["#1A1A1A", "#0A0A0A"]}
            style={styles.mapGradient}
          >
            {/* Store Marker */}
            <View style={[styles.marker, styles.storeMarker]}>
              <MaterialCommunityIcons name="store" size={24} color="#FF6B00" />
            </View>

            {/* Rider Marker - Animated */}
            <Animated.View
              style={[
                styles.marker,
                styles.riderMarker,
                { transform: [{ scale: pulseAnim }] },
              ]}
            >
              <MaterialCommunityIcons
                name="bike-fast"
                size={28}
                color="#0066FF"
              />
            </Animated.View>

            {/* Destination Marker */}
            <View style={[styles.marker, styles.destinationMarker]}>
              <MaterialCommunityIcons
                name="map-marker"
                size={24}
                color="#00D084"
              />
            </View>

            {/* Route Line Simulation */}
            <View style={styles.routeLine} />

            <Text style={styles.mapOverlayText}>
              Real-time map will be displayed here
            </Text>
          </LinearGradient>
        </View>

        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.statusIconContainer}>
              <MaterialCommunityIcons
                name="bike-fast"
                size={32}
                color="#0066FF"
              />
            </View>
            <View style={styles.statusContent}>
              <Text style={styles.statusTitle}>{orderStatus.statusText}</Text>
              <Text style={styles.statusSubtitle}>
                Estimated arrival: {orderStatus.estimatedTime}
              </Text>
            </View>
            <View style={styles.statusPulse}>
              <View style={styles.statusPulseInner} />
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={["#0066FF", "#0052CC"]}
                style={[
                  styles.progressFill,
                  { width: `${orderStatus.progress}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {orderStatus.progress}% Complete
            </Text>
          </View>
        </View>

        {/* Rider Info Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>YOUR RIDER</Text>
          <View style={styles.riderCard}>
            <View style={styles.riderAvatar}>
              <Text style={styles.riderAvatarText}>
                {riderInfo.name.charAt(0)}
              </Text>
            </View>
            <View style={styles.riderDetails}>
              <Text style={styles.riderName}>{riderInfo.name}</Text>
              <View style={styles.riderRating}>
                <MaterialCommunityIcons name="star" size={14} color="#FFB800" />
                <Text style={styles.riderRatingText}>
                  {riderInfo.rating} ({riderInfo.reviews})
                </Text>
              </View>
              <Text style={styles.riderVehicle}>
                Vehicle: {riderInfo.vehicleNumber}
              </Text>
              <Text style={styles.riderDistance}>{riderInfo.distance}</Text>
            </View>
            <View style={styles.riderActions}>
              <TouchableOpacity
                style={styles.riderActionButton}
                onPress={handleCall}
              >
                <MaterialCommunityIcons
                  name="phone"
                  size={20}
                  color="#00D084"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.riderActionButton}
                onPress={handleMessage}
              >
                <MaterialCommunityIcons name="chat" size={20} color="#0066FF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Locations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LOCATIONS</Text>

          <View style={styles.locationCard}>
            <View style={styles.locationItem}>
              <View
                style={[
                  styles.locationIcon,
                  { backgroundColor: "rgba(255, 107, 0, 0.1)" },
                ]}
              >
                <MaterialCommunityIcons
                  name="store"
                  size={20}
                  color="#FF6B00"
                />
              </View>
              <View style={styles.locationContent}>
                <Text style={styles.locationLabel}>Pick-up</Text>
                <Text style={styles.locationName}>{storeInfo.name}</Text>
                <Text style={styles.locationAddress}>{storeInfo.address}</Text>
              </View>
            </View>

            <View style={styles.locationDivider}>
              <View style={styles.locationDots} />
            </View>

            <View style={styles.locationItem}>
              <View
                style={[
                  styles.locationIcon,
                  { backgroundColor: "rgba(0, 208, 132, 0.1)" },
                ]}
              >
                <MaterialCommunityIcons
                  name="map-marker"
                  size={20}
                  color="#00D084"
                />
              </View>
              <View style={styles.locationContent}>
                <Text style={styles.locationLabel}>Drop-off</Text>
                <Text style={styles.locationName}>{deliveryAddress.name}</Text>
                <Text style={styles.locationAddress}>
                  {deliveryAddress.address}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Order Timeline */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ORDER TIMELINE</Text>
          <View style={styles.timelineCard}>
            {timeline.map((item, index) => (
              <View key={item.id}>
                <View style={styles.timelineItem}>
                  <View
                    style={[
                      styles.timelineDot,
                      item.completed && styles.timelineDotCompleted,
                      item.active && styles.timelineDotActive,
                    ]}
                  >
                    {item.completed ? (
                      <MaterialCommunityIcons
                        name="check"
                        size={14}
                        color="#FFFFFF"
                      />
                    ) : item.active ? (
                      <View style={styles.timelineDotActivePulse} />
                    ) : (
                      <View style={styles.timelineDotEmpty} />
                    )}
                  </View>
                  <View style={styles.timelineContent}>
                    <Text
                      style={[
                        styles.timelineTitle,
                        item.active && styles.timelineTitleActive,
                      ]}
                    >
                      {item.title}
                    </Text>
                    <Text style={styles.timelineTime}>{item.time}</Text>
                  </View>
                </View>
                {index < timeline.length - 1 && (
                  <View
                    style={[
                      styles.timelineConnector,
                      item.completed && styles.timelineConnectorCompleted,
                    ]}
                  />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Help Card */}
        <View style={styles.helpCard}>
          <MaterialCommunityIcons
            name="help-circle"
            size={24}
            color="#FFB800"
          />
          <Text style={styles.helpText}>Having issues with your order?</Text>
          <TouchableOpacity style={styles.helpButton}>
            <Text style={styles.helpButtonText}>Get Help</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#0A0A0A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
    marginTop: 2,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#0A0A0A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  mapContainer: {
    height: 300,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 24,
    overflow: "hidden",
  },
  mapGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  mapOverlayText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666666",
    letterSpacing: 0.3,
  },
  marker: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  storeMarker: {
    top: 40,
    left: 40,
    backgroundColor: "rgba(255, 107, 0, 0.2)",
    borderWidth: 3,
    borderColor: "#FF6B00",
  },
  riderMarker: {
    top: 120,
    left: "50%",
    backgroundColor: "rgba(0, 102, 255, 0.2)",
    borderWidth: 3,
    borderColor: "#0066FF",
  },
  destinationMarker: {
    bottom: 40,
    right: 40,
    backgroundColor: "rgba(0, 208, 132, 0.2)",
    borderWidth: 3,
    borderColor: "#00D084",
  },
  routeLine: {
    position: "absolute",
    width: 2,
    height: 180,
    backgroundColor: "rgba(0, 102, 255, 0.3)",
    transform: [{ rotate: "45deg" }],
  },
  statusCard: {
    backgroundColor: "#0A0A0A",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  statusIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  statusContent: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  statusSubtitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  statusPulse: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#00D084",
  },
  statusPulseInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#00D084",
  },
  progressContainer: {
    gap: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0066FF",
    letterSpacing: 0.3,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  riderCard: {
    flexDirection: "row",
    backgroundColor: "#0A0A0A",
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  riderAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0066FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  riderAvatarText: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  riderDetails: {
    flex: 1,
  },
  riderName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  riderRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  riderRatingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  riderVehicle: {
    fontSize: 11,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  riderDistance: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0066FF",
    letterSpacing: 0.3,
  },
  riderActions: {
    gap: 8,
  },
  riderActionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  locationCard: {
    backgroundColor: "#0A0A0A",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  locationItem: {
    flexDirection: "row",
    gap: 12,
  },
  locationIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  locationContent: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  locationName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 12,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
    lineHeight: 18,
  },
  locationDivider: {
    paddingVertical: 12,
    paddingLeft: 22,
  },
  locationDots: {
    width: 2,
    height: 24,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  timelineCard: {
    backgroundColor: "#0A0A0A",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  timelineItem: {
    flexDirection: "row",
    gap: 12,
  },
  timelineDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  timelineDotCompleted: {
    backgroundColor: "#00D084",
    borderColor: "#00D084",
  },
  timelineDotActive: {
    backgroundColor: "#0066FF",
    borderColor: "#0066FF",
  },
  timelineDotEmpty: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#666666",
  },
  timelineDotActivePulse: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  timelineTitleActive: {
    color: "#0066FF",
  },
  timelineTime: {
    fontSize: 11,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  timelineConnector: {
    width: 2,
    height: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginLeft: 13,
    marginVertical: 4,
  },
  timelineConnectorCompleted: {
    backgroundColor: "#00D084",
  },
  helpCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 184, 0, 0.05)",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    marginBottom: 40,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 184, 0, 0.2)",
  },
  helpText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  helpButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "rgba(255, 184, 0, 0.1)",
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "rgba(255, 184, 0, 0.3)",
  },
  helpButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFB800",
    letterSpacing: 0.3,
  },
});

export default LiveTrackingScreen;
