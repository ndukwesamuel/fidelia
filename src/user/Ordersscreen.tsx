import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { RootStackParamList, MainTabParamList } from "../types/navigation";

const { width } = Dimensions.get("window");

type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, "Orders">,
  NativeStackNavigationProp<RootStackParamList>
>;

type OrdersScreenProps = {
  navigation: OrdersScreenNavigationProp;
};

type OrderStatus = "active" | "completed" | "cancelled";

interface StatusFilter {
  id: OrderStatus | "all";
  label: string;
  count: number;
}

interface Order {
  id: string;
  orderNumber: string;
  store: string;
  items: number;
  total: number;
  status: OrderStatus;
  statusText: string;
  date: string;
  time: string;
  category: string;
  gradient: string[];
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  canTrack: boolean;
  canReorder: boolean;
}

const OrdersScreen: React.FC<OrdersScreenProps> = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState<OrderStatus | "all">("all");

  const statusFilters: StatusFilter[] = [
    { id: "all", label: "All", count: 8 },
    { id: "active", label: "Active", count: 2 },
    { id: "completed", label: "Completed", count: 5 },
    { id: "cancelled", label: "Cancelled", count: 1 },
  ];

  const orders: Order[] = [
    {
      id: "1",
      orderNumber: "FDL-2024-001234",
      store: "Mama Put Kitchen",
      items: 3,
      total: 4500,
      status: "active",
      statusText: "Out for delivery",
      date: "Today",
      time: "2:30 PM",
      category: "Food",
      gradient: ["#FF6B00", "#E55A00"],
      icon: "food",
      canTrack: true,
      canReorder: false,
    },
    {
      id: "2",
      orderNumber: "FDL-2024-001233",
      store: "ShopRite Ikeja",
      items: 12,
      total: 15750,
      status: "active",
      statusText: "Being prepared",
      date: "Today",
      time: "1:15 PM",
      category: "Grocery",
      gradient: ["#00D084", "#00B872"],
      icon: "cart",
      canTrack: false,
      canReorder: false,
    },
    {
      id: "3",
      orderNumber: "FDL-2024-001232",
      store: "Chicken Republic",
      items: 2,
      total: 3200,
      status: "completed",
      statusText: "Delivered",
      date: "Yesterday",
      time: "7:45 PM",
      category: "Food",
      gradient: ["#FF6B00", "#E55A00"],
      icon: "food",
      canTrack: false,
      canReorder: true,
    },
    {
      id: "4",
      orderNumber: "FDL-2024-001231",
      store: "HealthPlus Pharmacy",
      items: 5,
      total: 8900,
      status: "completed",
      statusText: "Delivered",
      date: "2 days ago",
      time: "3:20 PM",
      category: "Pharmacy",
      gradient: ["#00B8A9", "#00A896"],
      icon: "medical-bag",
      canTrack: false,
      canReorder: true,
    },
    {
      id: "5",
      orderNumber: "FDL-2024-001230",
      store: "Dominos Pizza",
      items: 1,
      total: 6500,
      status: "cancelled",
      statusText: "Order cancelled",
      date: "3 days ago",
      time: "8:10 PM",
      category: "Food",
      gradient: ["#DC3545", "#C82333"],
      icon: "food",
      canTrack: false,
      canReorder: true,
    },
  ];

  const filteredOrders =
    activeFilter === "all"
      ? orders
      : orders.filter((order) => order.status === activeFilter);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "active":
        return "#0066FF";
      case "completed":
        return "#00D084";
      case "cancelled":
        return "#DC3545";
      default:
        return "#666666";
    }
  };

  const handleOrderPress = (order: Order) => {
    if (order.canTrack) {
      navigation.navigate("LiveTracking", { orderId: order.id });
    } else {
      navigation.navigate("OrderDetails", { orderId: order.id });
    }
  };

  const handleReorder = (order: Order) => {
    // Handle reorder logic
    console.log("Reorder:", order.id);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <LinearGradient
        colors={["#000000", "#0A0A0A", "#000000"]}
        style={styles.background}
      />

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>MY ORDERS</Text>
            <Text style={styles.subtitle}>Track & manage your deliveries</Text>
          </View>
        </View>

        {/* Status Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScroll}
        >
          {statusFilters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                activeFilter === filter.id && styles.filterChipActive,
              ]}
              onPress={() => setActiveFilter(filter.id)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter.id && styles.filterTextActive,
                ]}
              >
                {filter.label}
              </Text>
              <View
                style={[
                  styles.filterBadge,
                  activeFilter === filter.id && styles.filterBadgeActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterBadgeText,
                    activeFilter === filter.id && styles.filterBadgeTextActive,
                  ]}
                >
                  {filter.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Orders List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <TouchableOpacity
                key={order.id}
                style={styles.orderCard}
                onPress={() => handleOrderPress(order)}
                activeOpacity={0.9}
              >
                {/* Order Header */}
                <View style={styles.orderHeader}>
                  <View style={styles.orderHeaderLeft}>
                    <LinearGradient
                      colors={order.gradient}
                      style={styles.orderIcon}
                    >
                      <MaterialCommunityIcons
                        name={order.icon}
                        size={24}
                        color="#FFFFFF"
                      />
                    </LinearGradient>
                    <View>
                      <Text style={styles.storeName}>{order.store}</Text>
                      <Text style={styles.orderNumber}>
                        {order.orderNumber}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor: `${getStatusColor(order.status)}20`,
                        borderColor: getStatusColor(order.status),
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.statusDot,
                        { backgroundColor: getStatusColor(order.status) },
                      ]}
                    />
                    <Text
                      style={[
                        styles.statusText,
                        { color: getStatusColor(order.status) },
                      ]}
                    >
                      {order.statusText}
                    </Text>
                  </View>
                </View>

                {/* Order Details */}
                <View style={styles.orderDetails}>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons
                      name="package-variant"
                      size={16}
                      color="#888888"
                    />
                    <Text style={styles.detailText}>
                      {order.items} {order.items === 1 ? "item" : "items"}
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons
                      name="clock-outline"
                      size={16}
                      color="#888888"
                    />
                    <Text style={styles.detailText}>
                      {order.date} • {order.time}
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons
                      name="currency-ngn"
                      size={16}
                      color="#888888"
                    />
                    <Text style={styles.detailText}>
                      {order.total.toLocaleString("en-NG")}
                    </Text>
                  </View>
                </View>

                {/* Order Actions */}
                <View style={styles.orderActions}>
                  {order.canTrack && (
                    <TouchableOpacity
                      style={styles.primaryActionButton}
                      onPress={() =>
                        navigation.navigate("LiveTracking", {
                          orderId: order.id,
                        })
                      }
                    >
                      <LinearGradient
                        colors={["#0066FF", "#0052CC"]}
                        style={styles.primaryActionGradient}
                      >
                        <MaterialCommunityIcons
                          name="map-marker-path"
                          size={18}
                          color="#FFFFFF"
                        />
                        <Text style={styles.primaryActionText}>
                          TRACK ORDER
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )}

                  {order.canReorder && (
                    <TouchableOpacity
                      style={styles.secondaryActionButton}
                      onPress={() => handleReorder(order)}
                    >
                      <MaterialCommunityIcons
                        name="replay"
                        size={18}
                        color="#0066FF"
                      />
                      <Text style={styles.secondaryActionText}>REORDER</Text>
                    </TouchableOpacity>
                  )}

                  {order.status === "completed" && (
                    <TouchableOpacity
                      style={styles.secondaryActionButton}
                      onPress={() =>
                        navigation.navigate("RateOrder", { orderId: order.id })
                      }
                    >
                      <MaterialCommunityIcons
                        name="star-outline"
                        size={18}
                        color="#FFB800"
                      />
                      <Text
                        style={[
                          styles.secondaryActionText,
                          { color: "#FFB800" },
                        ]}
                      >
                        RATE
                      </Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity style={styles.iconButton}>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={24}
                      color="#666666"
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyIconContainer}>
                <MaterialCommunityIcons
                  name="package-variant-closed"
                  size={64}
                  color="#666666"
                />
              </View>
              <Text style={styles.emptyTitle}>No Orders Found</Text>
              <Text style={styles.emptySubtitle}>
                {activeFilter === "all"
                  ? "You haven't placed any orders yet"
                  : `No ${activeFilter} orders`}
              </Text>
              <TouchableOpacity
                style={styles.emptyActionButton}
                onPress={() => navigation.navigate("Home" as any)}
              >
                <LinearGradient
                  colors={["#0066FF", "#0052CC"]}
                  style={styles.emptyActionGradient}
                >
                  <MaterialCommunityIcons
                    name="shopping"
                    size={20}
                    color="#FFFFFF"
                  />
                  <Text style={styles.emptyActionText}>START SHOPPING</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
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
  content: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  filtersScroll: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A0A0A",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 1000,
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  filterChipActive: {
    backgroundColor: "#0066FF",
    borderColor: "#0066FF",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  filterBadge: {
    backgroundColor: "#151515",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  filterBadgeActive: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  filterBadgeText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#888888",
  },
  filterBadgeTextActive: {
    color: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  orderCard: {
    backgroundColor: "#0A0A0A",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  orderHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  orderIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  storeName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  orderNumber: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666666",
    letterSpacing: 0.3,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 1000,
    gap: 6,
    borderWidth: 1,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  orderDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.05)",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  orderActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.05)",
  },
  primaryActionButton: {
    flex: 1,
  },
  primaryActionGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 1000,
    gap: 8,
  },
  primaryActionText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  secondaryActionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 1000,
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(0, 102, 255, 0.2)",
  },
  secondaryActionText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0066FF",
    letterSpacing: 0.5,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#151515",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#0A0A0A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  emptySubtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#888888",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
    letterSpacing: 0.3,
  },
  emptyActionButton: {
    width: "100%",
  },
  emptyActionGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 1000,
    gap: 8,
  },
  emptyActionText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
});

export default OrdersScreen;
