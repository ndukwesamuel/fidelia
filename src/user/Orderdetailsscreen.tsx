import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../types/navigation";

type OrderDetailsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "OrderDetails">;
  route: RouteProp<RootStackParamList, "OrderDetails">;
};

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  customizations: string[];
}

const OrderDetailsScreen: React.FC<OrderDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const { orderId } = route.params;

  const orderDetails = {
    orderId,
    orderNumber: "FDL-2024-001232",
    status: "delivered",
    statusText: "Delivered",
    storeName: "Chicken Republic",
    storeAddress: "45 Admiralty Way, Lekki, Lagos",
    deliveryAddress: {
      name: "Home",
      address: "15 Allen Avenue, Ikeja, Lagos",
      phone: "+234 801 234 5678",
    },
    orderDate: "November 26, 2024",
    orderTime: "7:45 PM",
    deliveredDate: "November 26, 2024",
    deliveredTime: "8:20 PM",
    paymentMethod: "Fidelia Wallet",
    items: [
      {
        id: "1",
        name: "Rotisserie Chicken",
        quantity: 1,
        price: 2800,
        customizations: ["Spicy", "Extra Sauce"],
      },
      {
        id: "2",
        name: "Chicken & Chips",
        quantity: 1,
        price: 1500,
        customizations: ["Regular"],
      },
    ] as OrderItem[],
    subtotal: 4300,
    deliveryFee: 500,
    serviceFee: 200,
    discount: 0,
    total: 5000,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "#00D084";
      case "cancelled":
        return "#DC3545";
      default:
        return "#0066FF";
    }
  };

  const handleReorder = () => {
    // Reorder logic
  };

  const handleGetHelp = () => {
    // Help logic
  };

  const handleDownloadReceipt = () => {
    // Download receipt logic
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
          <Text style={styles.headerTitle}>ORDER DETAILS</Text>
          <Text style={styles.headerSubtitle}>{orderDetails.orderNumber}</Text>
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialCommunityIcons
            name="share-variant"
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusIconContainer}>
            <MaterialCommunityIcons
              name="check-circle"
              size={64}
              color={getStatusColor(orderDetails.status)}
            />
          </View>
          <Text style={styles.statusTitle}>{orderDetails.statusText}</Text>
          <Text style={styles.statusSubtitle}>
            on {orderDetails.deliveredDate} at {orderDetails.deliveredTime}
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleReorder}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={["#0066FF", "#0052CC"]}
              style={styles.primaryButtonGradient}
            >
              <MaterialCommunityIcons
                name="refresh"
                size={20}
                color="#FFFFFF"
              />
              <Text style={styles.primaryButtonText}>Reorder</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleGetHelp}
            activeOpacity={0.9}
          >
            <MaterialCommunityIcons
              name="help-circle"
              size={20}
              color="#0066FF"
            />
            <Text style={styles.secondaryButtonText}>Get Help</Text>
          </TouchableOpacity>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ORDER ITEMS</Text>
          <View style={styles.itemsCard}>
            {/* Store Header */}
            <View style={styles.storeHeader}>
              <View style={styles.storeIconContainer}>
                <MaterialCommunityIcons
                  name="store"
                  size={24}
                  color="#FF6B00"
                />
              </View>
              <View style={styles.storeInfo}>
                <Text style={styles.storeName}>{orderDetails.storeName}</Text>
                <Text style={styles.storeAddress}>
                  {orderDetails.storeAddress}
                </Text>
              </View>
            </View>

            <View style={styles.itemsDivider} />

            {/* Items List */}
            {orderDetails.items.map((item) => (
              <View key={item.id} style={styles.orderItem}>
                <View style={styles.itemQuantityBadge}>
                  <Text style={styles.itemQuantityText}>{item.quantity}x</Text>
                </View>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  {item.customizations.length > 0 && (
                    <View style={styles.customizationsContainer}>
                      {item.customizations.map((custom, index) => (
                        <Text key={index} style={styles.customizationText}>
                          • {custom}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
                <Text style={styles.itemPrice}>
                  ₦{item.price.toLocaleString("en-NG")}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Delivery Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DELIVERY INFORMATION</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <View
                style={[
                  styles.infoIcon,
                  { backgroundColor: "rgba(0, 208, 132, 0.1)" },
                ]}
              >
                <MaterialCommunityIcons
                  name="map-marker"
                  size={20}
                  color="#00D084"
                />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Delivery Address</Text>
                <Text style={styles.infoValue}>
                  {orderDetails.deliveryAddress.name}
                </Text>
                <Text style={styles.infoSubvalue}>
                  {orderDetails.deliveryAddress.address}
                </Text>
                <Text style={styles.infoSubvalue}>
                  {orderDetails.deliveryAddress.phone}
                </Text>
              </View>
            </View>

            <View style={styles.infoDivider} />

            <View style={styles.infoItem}>
              <View
                style={[
                  styles.infoIcon,
                  { backgroundColor: "rgba(0, 102, 255, 0.1)" },
                ]}
              >
                <MaterialCommunityIcons
                  name="calendar"
                  size={20}
                  color="#0066FF"
                />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Order Date & Time</Text>
                <Text style={styles.infoValue}>{orderDetails.orderDate}</Text>
                <Text style={styles.infoSubvalue}>
                  {orderDetails.orderTime}
                </Text>
              </View>
            </View>

            <View style={styles.infoDivider} />

            <View style={styles.infoItem}>
              <View
                style={[
                  styles.infoIcon,
                  { backgroundColor: "rgba(255, 184, 0, 0.1)" },
                ]}
              >
                <MaterialCommunityIcons
                  name="credit-card"
                  size={20}
                  color="#FFB800"
                />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Payment Method</Text>
                <Text style={styles.infoValue}>
                  {orderDetails.paymentMethod}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bill Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BILL SUMMARY</Text>
          <View style={styles.billCard}>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>
                Subtotal ({orderDetails.items.length} items)
              </Text>
              <Text style={styles.billValue}>
                ₦{orderDetails.subtotal.toLocaleString("en-NG")}
              </Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Delivery Fee</Text>
              <Text style={styles.billValue}>
                ₦{orderDetails.deliveryFee.toLocaleString("en-NG")}
              </Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Service Fee</Text>
              <Text style={styles.billValue}>
                ₦{orderDetails.serviceFee.toLocaleString("en-NG")}
              </Text>
            </View>
            {orderDetails.discount > 0 && (
              <View style={styles.billRow}>
                <Text style={[styles.billLabel, styles.discountLabel]}>
                  Discount
                </Text>
                <Text style={[styles.billValue, styles.discountValue]}>
                  -₦{orderDetails.discount.toLocaleString("en-NG")}
                </Text>
              </View>
            )}
            <View style={styles.billDivider} />
            <View style={styles.billRow}>
              <Text style={styles.billTotalLabel}>Total Paid</Text>
              <Text style={styles.billTotalValue}>
                ₦{orderDetails.total.toLocaleString("en-NG")}
              </Text>
            </View>
          </View>
        </View>

        {/* Download Receipt */}
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={handleDownloadReceipt}
          activeOpacity={0.9}
        >
          <MaterialCommunityIcons name="download" size={20} color="#0066FF" />
          <Text style={styles.downloadButtonText}>Download Receipt</Text>
        </TouchableOpacity>

        {/* Order ID Footer */}
        <View style={styles.footerCard}>
          <Text style={styles.footerLabel}>Order ID</Text>
          <Text style={styles.footerValue}>{orderDetails.orderNumber}</Text>
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
  statusCard: {
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 24,
    paddingVertical: 32,
  },
  statusIconContainer: {
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  statusSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  actionsContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 32,
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    borderRadius: 1000,
  },
  primaryButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 1000,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  secondaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    borderRadius: 1000,
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 102, 255, 0.3)",
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0066FF",
    letterSpacing: 0.5,
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
  itemsCard: {
    backgroundColor: "#0A0A0A",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  storeHeader: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  storeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 107, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  storeAddress: {
    fontSize: 12,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
    lineHeight: 18,
  },
  itemsDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  itemQuantityBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 102, 255, 0.3)",
  },
  itemQuantityText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#0066FF",
    letterSpacing: 0.3,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  customizationsContainer: {
    gap: 2,
  },
  customizationText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "800",
    color: "#00D084",
    letterSpacing: 0.3,
  },
  infoCard: {
    backgroundColor: "#0A0A0A",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  infoItem: {
    flexDirection: "row",
    gap: 12,
  },
  infoIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  infoSubvalue: {
    fontSize: 12,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
    lineHeight: 18,
  },
  infoDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginVertical: 16,
  },
  billCard: {
    backgroundColor: "#0A0A0A",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  billLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
  },
  billValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  discountLabel: {
    color: "#00D084",
  },
  discountValue: {
    color: "#00D084",
  },
  billDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginVertical: 12,
  },
  billTotalLabel: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  billTotalValue: {
    fontSize: 20,
    fontWeight: "900",
    color: "#00D084",
    letterSpacing: 0.5,
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    borderRadius: 1000,
    gap: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 102, 255, 0.3)",
  },
  downloadButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0066FF",
    letterSpacing: 0.5,
  },
  footerCard: {
    marginHorizontal: 20,
    alignItems: "center",
    paddingVertical: 16,
  },
  footerLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  footerValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0066FF",
    letterSpacing: 0.5,
  },
});

export default OrderDetailsScreen;
