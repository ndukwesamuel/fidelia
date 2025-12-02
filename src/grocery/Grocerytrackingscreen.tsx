import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../types/navigation";

type GroceryTrackingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "GroceryTracking">;
  route: RouteProp<RootStackParamList, "GroceryTracking">;
};

const GroceryTrackingScreen: React.FC<GroceryTrackingScreenProps> = ({
  navigation,
  route,
}) => {
  const { orderId } = route.params;
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // Pulse animation for shopper icon
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
    status: "shopping",
    statusText: "Shopping in Progress",
    estimatedTime: "25 mins",
    progress: 48,
    itemsPicked: 12,
    totalItems: 25,
  };

  const shopperInfo = {
    name: "Chiamaka Obi",
    phone: "+234 801 234 5678",
    rating: 4.8,
    reviews: 156,
    distance: "0.5 km away",
  };

  const storeInfo = {
    name: "Shoprite",
    address: "10 Admiralty Way, Lekki, Lagos",
  };

  const deliveryAddress = {
    name: "Home",
    address: "15 Allen Avenue, Ikeja, Lagos",
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
      status: "shopping",
      title: "Shopping",
      time: "Now",
      completed: false,
      active: true,
    },
    {
      id: "3",
      status: "packing",
      title: "Packing",
      time: "~2:50 PM",
      completed: false,
    },
    {
      id: "4",
      status: "on_the_way",
      title: "Out for Delivery",
      time: "~3:00 PM",
      completed: false,
    },
    {
      id: "5",
      status: "delivered",
      title: "Delivered",
      time: "~3:25 PM",
      completed: false,
    },
  ];

  const recentlyPicked = [
    { id: "1", name: "Fresh Tomatoes", time: "2 mins ago" },
    { id: "2", name: "White Rice", time: "5 mins ago" },
    { id: "3", name: "Fresh Milk", time: "8 mins ago" },
  ];

  const handleCall = () => {
    // Call shopper logic
  };

  const handleMessage = () => {
    // Message shopper logic
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Map Placeholder */}
        <View style={styles.mapContainer}>
          <LinearGradient
            colors={["#1A1A1A", "#0A0A0A"]}
            style={styles.mapGradient}
          >
            {/* Store Marker */}
            <View style={[styles.marker, styles.storeMarker]}>
              <MaterialCommunityIcons name="store" size={24} color="#00D084" />
            </View>

            {/* Shopper Marker - Animated */}
            <Animated.View
              style={[
                styles.marker,
                styles.shopperMarker,
                { transform: [{ scale: pulseAnim }] },
              ]}
            >
              <MaterialCommunityIcons name="cart" size={28} color="#00D084" />
            </Animated.View>

            {/* Destination Marker */}
            <View style={[styles.marker, styles.destinationMarker]}>
              <MaterialCommunityIcons name="home" size={24} color="#00D084" />
            </View>

            {/* Route Line */}
            <View style={styles.routeLine} />

            <Text style={styles.mapOverlayText}>
              Real-time map will be displayed here
            </Text>
          </LinearGradient>
        </View>

        {/* Shopping Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View style={styles.progressIconContainer}>
              <MaterialCommunityIcons name="cart" size={32} color="#00D084" />
            </View>
            <View style={styles.progressContent}>
              <Text style={styles.progressTitle}>{orderStatus.statusText}</Text>
              <Text style={styles.progressSubtitle}>
                {orderStatus.itemsPicked} of {orderStatus.totalItems} items
                picked
              </Text>
            </View>
            <View style={styles.statusPulse}>
              <View style={styles.statusPulseInner} />
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={["#00D084", "#00B872"]}
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

          {/* ETA */}
          <View style={styles.etaCard}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={20}
              color="#FFB800"
            />
            <Text style={styles.etaText}>
              Estimated delivery: {orderStatus.estimatedTime}
            </Text>
          </View>
        </View>

        {/* Recently Picked Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RECENTLY PICKED</Text>
          <View style={styles.pickedCard}>
            {recentlyPicked.map((item) => (
              <View key={item.id} style={styles.pickedItem}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={20}
                  color="#00D084"
                />
                <View style={styles.pickedInfo}>
                  <Text style={styles.pickedName}>{item.name}</Text>
                  <Text style={styles.pickedTime}>{item.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Shopper Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>YOUR SHOPPER</Text>
          <View style={styles.shopperCard}>
            <View style={styles.shopperAvatar}>
              <Text style={styles.shopperAvatarText}>
                {shopperInfo.name.charAt(0)}
              </Text>
            </View>
            <View style={styles.shopperDetails}>
              <Text style={styles.shopperName}>{shopperInfo.name}</Text>
              <View style={styles.shopperRating}>
                <MaterialCommunityIcons name="star" size={14} color="#FFB800" />
                <Text style={styles.shopperRatingText}>
                  {shopperInfo.rating} ({shopperInfo.reviews})
                </Text>
              </View>
              <Text style={styles.shopperDistance}>{shopperInfo.distance}</Text>
            </View>
            <View style={styles.shopperActions}>
              <TouchableOpacity
                style={styles.shopperActionButton}
                onPress={handleCall}
              >
                <MaterialCommunityIcons
                  name="phone"
                  size={20}
                  color="#00D084"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.shopperActionButton}
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
                  { backgroundColor: "rgba(0, 208, 132, 0.1)" },
                ]}
              >
                <MaterialCommunityIcons
                  name="store"
                  size={20}
                  color="#00D084"
                />
              </View>
              <View style={styles.locationContent}>
                <Text style={styles.locationLabel}>Shopping At</Text>
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
                <MaterialCommunityIcons name="home" size={20} color="#00D084" />
              </View>
              <View style={styles.locationContent}>
                <Text style={styles.locationLabel}>Delivering To</Text>
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
  scrollContent: {
    paddingBottom: 40,
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
    backgroundColor: "rgba(0, 208, 132, 0.2)",
    borderWidth: 3,
    borderColor: "#00D084",
  },
  shopperMarker: {
    top: 120,
    left: "50%",
    backgroundColor: "rgba(0, 208, 132, 0.2)",
    borderWidth: 3,
    borderColor: "#00D084",
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
    backgroundColor: "rgba(0, 208, 132, 0.3)",
    transform: [{ rotate: "45deg" }],
  },
  progressCard: {
    backgroundColor: "#0A0A0A",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  progressIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(0, 208, 132, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  progressContent: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  progressSubtitle: {
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
  progressBarContainer: {
    gap: 8,
    marginBottom: 16,
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
    color: "#00D084",
    letterSpacing: 0.3,
  },
  etaCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 184, 0, 0.1)",
    padding: 12,
    borderRadius: 12,
    gap: 10,
  },
  etaText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFB800",
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
  pickedCard: {
    backgroundColor: "#0A0A0A",
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  pickedItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  pickedInfo: {
    flex: 1,
  },
  pickedName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  pickedTime: {
    fontSize: 11,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  shopperCard: {
    flexDirection: "row",
    backgroundColor: "#0A0A0A",
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  shopperAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#00D084",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  shopperAvatarText: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  shopperDetails: {
    flex: 1,
  },
  shopperName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  shopperRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  shopperRatingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  shopperDistance: {
    fontSize: 12,
    fontWeight: "700",
    color: "#00D084",
    letterSpacing: 0.3,
  },
  shopperActions: {
    gap: 8,
  },
  shopperActionButton: {
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
    backgroundColor: "#00D084",
    borderColor: "#00D084",
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
    color: "#00D084",
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

export default GroceryTrackingScreen;
