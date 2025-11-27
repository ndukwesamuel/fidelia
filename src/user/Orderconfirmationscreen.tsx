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

type OrderConfirmationScreenProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "OrderConfirmation"
  >;
  route: RouteProp<RootStackParamList, "OrderConfirmation">;
};

const OrderConfirmationScreen: React.FC<OrderConfirmationScreenProps> = ({
  navigation,
  route,
}) => {
  const { orderId, total } = route.params;
  const [scaleAnim] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Success animation
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const orderDetails = {
    orderId,
    storeName: "Mama Put Kitchen",
    items: 3,
    total,
    estimatedTime: "30-45 mins",
    deliveryAddress: "15 Allen Avenue, Ikeja, Lagos",
    paymentMethod: "Fidelia Wallet",
    orderDate: new Date().toLocaleString("en-NG", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  const handleTrackOrder = () => {
    navigation.navigate("LiveTracking", { orderId });
  };

  const handleViewOrders = () => {
    navigation.navigate("MainTabs", { screen: "Orders" });
  };

  const handleBackHome = () => {
    navigation.navigate("MainTabs", { screen: "Home" });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <LinearGradient
        colors={["#000000", "#0A0A0A", "#000000"]}
        style={styles.background}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Success Animation */}
        <Animated.View
          style={[
            styles.successContainer,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.successIconContainer}>
            <LinearGradient
              colors={["#00D084", "#00B872"]}
              style={styles.successIconGradient}
            >
              <MaterialCommunityIcons name="check" size={80} color="#FFFFFF" />
            </LinearGradient>
          </View>
        </Animated.View>

        <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
          <Text style={styles.successTitle}>Order Placed! 🎉</Text>
          <Text style={styles.successSubtitle}>
            Your order has been confirmed and will be delivered soon
          </Text>
        </Animated.View>

        {/* Order ID Card */}
        <View style={styles.orderIdCard}>
          <LinearGradient
            colors={["#0066FF", "#0052CC"]}
            style={styles.orderIdGradient}
          >
            <Text style={styles.orderIdLabel}>Order ID</Text>
            <Text style={styles.orderIdText}>{orderId}</Text>
            <View style={styles.orderIdDivider} />
            <View style={styles.orderIdFooter}>
              <View style={styles.orderIdItem}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={18}
                  color="rgba(255, 255, 255, 0.8)"
                />
                <Text style={styles.orderIdItemText}>
                  {orderDetails.estimatedTime}
                </Text>
              </View>
              <View style={styles.orderIdItem}>
                <MaterialCommunityIcons
                  name="package-variant"
                  size={18}
                  color="rgba(255, 255, 255, 0.8)"
                />
                <Text style={styles.orderIdItemText}>
                  {orderDetails.items} items
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleTrackOrder}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={["#0066FF", "#0052CC"]}
              style={styles.primaryButtonGradient}
            >
              <MaterialCommunityIcons
                name="map-marker-path"
                size={24}
                color="#FFFFFF"
              />
              <Text style={styles.primaryButtonText}>Track Order</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleViewOrders}
            activeOpacity={0.9}
          >
            <MaterialCommunityIcons name="receipt" size={20} color="#0066FF" />
            <Text style={styles.secondaryButtonText}>View Orders</Text>
          </TouchableOpacity>
        </View>

        {/* Order Details */}
        <View style={styles.detailsSection}>
          <Text style={styles.detailsTitle}>ORDER DETAILS</Text>

          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <MaterialCommunityIcons
                  name="store"
                  size={20}
                  color="#FF6B00"
                />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Store</Text>
                <Text style={styles.detailValue}>{orderDetails.storeName}</Text>
              </View>
            </View>

            <View style={styles.detailDivider} />

            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={20}
                  color="#00D084"
                />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Delivery Address</Text>
                <Text style={styles.detailValue}>
                  {orderDetails.deliveryAddress}
                </Text>
              </View>
            </View>

            <View style={styles.detailDivider} />

            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <MaterialCommunityIcons
                  name="credit-card"
                  size={20}
                  color="#0066FF"
                />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Payment Method</Text>
                <Text style={styles.detailValue}>
                  {orderDetails.paymentMethod}
                </Text>
              </View>
            </View>

            <View style={styles.detailDivider} />

            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <MaterialCommunityIcons
                  name="calendar"
                  size={20}
                  color="#FFB800"
                />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Order Date</Text>
                <Text style={styles.detailValue}>{orderDetails.orderDate}</Text>
              </View>
            </View>

            <View style={styles.detailDivider} />

            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <MaterialCommunityIcons
                  name="currency-ngn"
                  size={20}
                  color="#00D084"
                />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Total Amount</Text>
                <Text style={styles.totalValue}>
                  ₦{orderDetails.total.toLocaleString("en-NG")}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* What's Next */}
        <View style={styles.timelineSection}>
          <Text style={styles.timelineTitle}>WHAT'S NEXT?</Text>

          <View style={styles.timelineCard}>
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, styles.timelineDotActive]}>
                <View style={styles.timelineDotInner} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineLabel}>Order Confirmed</Text>
                <Text style={styles.timelineText}>
                  Your order has been placed successfully
                </Text>
                <Text style={styles.timelineTime}>Just now</Text>
              </View>
            </View>

            <View style={styles.timelineConnector} />

            <View style={styles.timelineItem}>
              <View style={styles.timelineDot}>
                <MaterialCommunityIcons
                  name="chef-hat"
                  size={16}
                  color="#666666"
                />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineLabel}>Preparing</Text>
                <Text style={styles.timelineText}>
                  The store is preparing your order
                </Text>
                <Text style={styles.timelineTime}>5-10 mins</Text>
              </View>
            </View>

            <View style={styles.timelineConnector} />

            <View style={styles.timelineItem}>
              <View style={styles.timelineDot}>
                <MaterialCommunityIcons
                  name="bike-fast"
                  size={16}
                  color="#666666"
                />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineLabel}>Out for Delivery</Text>
                <Text style={styles.timelineText}>
                  Your order is on the way
                </Text>
                <Text style={styles.timelineTime}>20-30 mins</Text>
              </View>
            </View>

            <View style={styles.timelineConnector} />

            <View style={styles.timelineItem}>
              <View style={styles.timelineDot}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={16}
                  color="#666666"
                />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineLabel}>Delivered</Text>
                <Text style={styles.timelineText}>Enjoy your order!</Text>
                <Text style={styles.timelineTime}>30-45 mins</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Need Help */}
        <View style={styles.helpCard}>
          <MaterialCommunityIcons name="headset" size={32} color="#0066FF" />
          <Text style={styles.helpTitle}>Need Help?</Text>
          <Text style={styles.helpText}>
            Our support team is available 24/7 to assist you
          </Text>
          <TouchableOpacity style={styles.helpButton} activeOpacity={0.9}>
            <MaterialCommunityIcons name="chat" size={20} color="#0066FF" />
            <Text style={styles.helpButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>

        {/* Back to Home */}
        <TouchableOpacity
          style={styles.backHomeButton}
          onPress={handleBackHome}
          activeOpacity={0.9}
        >
          <MaterialCommunityIcons name="home" size={20} color="#888888" />
          <Text style={styles.backHomeText}>Back to Home</Text>
        </TouchableOpacity>
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
  scrollContent: {
    paddingTop: 80,
    paddingBottom: 40,
  },
  successContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  successIconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  successIconGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#00D084",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 16,
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 40,
    marginBottom: 32,
  },
  successTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    marginBottom: 12,
    textAlign: "center",
  },
  successSubtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
    textAlign: "center",
    lineHeight: 22,
  },
  orderIdCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 24,
    overflow: "hidden",
  },
  orderIdGradient: {
    padding: 24,
    alignItems: "center",
  },
  orderIdLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.7)",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  orderIdText: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 1,
    marginBottom: 20,
  },
  orderIdDivider: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: 16,
  },
  orderIdFooter: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 32,
  },
  orderIdItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  orderIdItemText: {
    fontSize: 14,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.9)",
    letterSpacing: 0.3,
  },
  actionsContainer: {
    marginHorizontal: 20,
    marginBottom: 32,
    gap: 12,
  },
  primaryButton: {
    borderRadius: 1000,
  },
  primaryButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 1000,
    gap: 12,
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    borderRadius: 1000,
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(0, 102, 255, 0.3)",
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0066FF",
    letterSpacing: 0.5,
  },
  detailsSection: {
    marginHorizontal: 20,
    marginBottom: 32,
  },
  detailsTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 16,
  },
  detailsCard: {
    backgroundColor: "#0A0A0A",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  detailRow: {
    flexDirection: "row",
    gap: 12,
  },
  detailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    lineHeight: 20,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "900",
    color: "#00D084",
    letterSpacing: 0.5,
  },
  detailDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginVertical: 16,
  },
  timelineSection: {
    marginHorizontal: 20,
    marginBottom: 32,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 16,
  },
  timelineCard: {
    backgroundColor: "#0A0A0A",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  timelineItem: {
    flexDirection: "row",
    gap: 16,
  },
  timelineDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  timelineDotActive: {
    backgroundColor: "#00D084",
    borderColor: "#00D084",
  },
  timelineDotInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 4,
  },
  timelineLabel: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  timelineText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
    marginBottom: 6,
    lineHeight: 18,
  },
  timelineTime: {
    fontSize: 11,
    fontWeight: "600",
    color: "#666666",
    letterSpacing: 0.3,
  },
  timelineConnector: {
    width: 2,
    height: 24,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginLeft: 19,
    marginVertical: 4,
  },
  helpCard: {
    backgroundColor: "rgba(0, 102, 255, 0.05)",
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 102, 255, 0.2)",
    marginBottom: 24,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    marginTop: 12,
    marginBottom: 8,
  },
  helpText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 20,
  },
  helpButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 1000,
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 102, 255, 0.3)",
  },
  helpButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0066FF",
    letterSpacing: 0.3,
  },
  backHomeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    paddingVertical: 14,
    gap: 8,
  },
  backHomeText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#888888",
    letterSpacing: 0.3,
  },
});

export default OrderConfirmationScreen;
