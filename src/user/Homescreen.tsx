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

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, "Home">,
  NativeStackNavigationProp<RootStackParamList>
>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

interface Service {
  id: string;
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  gradient: string[];
  description: string;
}

interface QuickAction {
  id: string;
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
}

interface LiveActivity {
  id: string;
  type: "deal" | "rider" | "popular";
  title: string;
  subtitle: string;
  badge?: string;
  badgeColor?: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [walletBalance] = useState(45250.0);

  const services: Service[] = [
    {
      id: "1",
      name: "FOOD",
      icon: "food",
      gradient: ["#FF6B00", "#E55A00"],
      description: "Order from restaurants",
    },
    {
      id: "2",
      name: "GROCERY",
      icon: "cart",
      gradient: ["#00D084", "#00B872"],
      description: "Fresh groceries",
    },
    {
      id: "3",
      name: "ERRANDS",
      icon: "run-fast",
      gradient: ["#0066FF", "#0052CC"],
      description: "Quick deliveries",
    },
    {
      id: "4",
      name: "LOGISTICS",
      icon: "truck-fast",
      gradient: ["#FFB800", "#FFA000"],
      description: "Move packages",
    },
    {
      id: "5",
      name: "PHARMACY",
      icon: "medical-bag",
      gradient: ["#00B8A9", "#00A896"],
      description: "Health & medicine",
    },
    {
      id: "6",
      name: "MARKET",
      icon: "store",
      gradient: ["#DC3545", "#C82333"],
      description: "Local markets",
    },
  ];

  const quickActions: QuickAction[] = [
    {
      id: "1",
      title: "Track Order",
      icon: "map-marker-path",
      color: "#0066FF",
    },
    { id: "2", title: "Reorder", icon: "replay", color: "#FF6B00" },
    { id: "3", title: "Favorites", icon: "heart", color: "#DC3545" },
    { id: "4", title: "Support", icon: "headset", color: "#00D084" },
  ];

  const liveActivities: LiveActivity[] = [
    {
      id: "1",
      type: "deal",
      title: "Mama Put Kitchen",
      subtitle: "60% OFF - 12 orders in last hour 🔥",
      badge: "HOT DEAL",
      badgeColor: "#FF0080",
    },
    {
      id: "2",
      type: "rider",
      title: "Emeka ⚡",
      subtitle: "0.8km away - Available now",
      badge: "ONLINE",
      badgeColor: "#00D084",
    },
    {
      id: "3",
      type: "popular",
      title: "ShopRite Ikeja",
      subtitle: "Top rated this week ⭐",
      badge: "POPULAR",
      badgeColor: "#FFB800",
    },
  ];

  const handleServicePress = (service: Service) => {
    navigation.navigate("Category", {
      categoryId: service.id,
      categoryName: service.name,
    });
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
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>GOOD EVENING</Text>
            <View style={styles.nameContainer}>
              <Text style={styles.userName}>Ndukwe</Text>
              <View style={styles.nameGlow} />
            </View>
            <Text style={styles.tagline}>What moves you today? ⚡</Text>
          </View>

          <TouchableOpacity style={styles.notificationButton}>
            <MaterialCommunityIcons
              name="bell-outline"
              size={28}
              color="#FFFFFF"
            />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Wallet Card */}
        <View style={styles.walletCardWrapper}>
          <LinearGradient
            colors={["#0066FF", "#0052CC"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.walletCard}
          >
            <View style={styles.decorativeCircle1} />
            <View style={styles.decorativeCircle2} />

            <View style={styles.walletContent}>
              <View style={styles.walletHeader}>
                <View style={styles.walletIconContainer}>
                  <MaterialCommunityIcons
                    name="wallet"
                    size={24}
                    color="#FFFFFF"
                  />
                </View>
                <Text style={styles.walletLabel}>WALLET BALANCE</Text>
              </View>

              <View style={styles.balanceContainer}>
                <Text style={styles.currency}>₦</Text>
                <Text style={styles.balance}>
                  {walletBalance.toLocaleString("en-NG")}
                </Text>
                <Text style={styles.decimal}>.00</Text>
              </View>

              <View style={styles.walletActions}>
                <TouchableOpacity
                  style={styles.walletButton}
                  onPress={() => navigation.navigate("Wallet" as any)}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    size={18}
                    color="#000000"
                  />
                  <Text style={styles.walletButtonText}>ADD MONEY</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.walletButtonGhost}
                  onPress={() => navigation.navigate("Wallet" as any)}
                >
                  <MaterialCommunityIcons
                    name="history"
                    size={18}
                    color="#FFFFFF"
                  />
                  <Text style={styles.walletButtonTextGhost}>HISTORY</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
          <View style={styles.walletShadow} />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity key={action.id} style={styles.quickActionItem}>
                <View
                  style={[
                    styles.quickActionIcon,
                    { backgroundColor: `${action.color}20` },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={action.icon}
                    size={24}
                    color={action.color}
                  />
                </View>
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Services Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>SERVICES</Text>
              <Text style={styles.sectionSubtitle}>
                What would you like to order?
              </Text>
            </View>
          </View>

          <View style={styles.servicesGrid}>
            {services.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCard}
                onPress={() => handleServicePress(service)}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={service.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.serviceGradient}
                >
                  <View style={styles.serviceIconContainer}>
                    <View style={styles.serviceIconBg}>
                      <MaterialCommunityIcons
                        name={service.icon}
                        size={32}
                        color="#FFFFFF"
                      />
                    </View>
                  </View>

                  <View style={styles.serviceContent}>
                    <Text style={styles.serviceName}>{service.name}</Text>
                    <Text style={styles.serviceDescription}>
                      {service.description}
                    </Text>
                  </View>

                  <View style={styles.serviceArrow}>
                    <MaterialCommunityIcons
                      name="arrow-right"
                      size={20}
                      color="rgba(255, 255, 255, 0.8)"
                    />
                  </View>
                </LinearGradient>

                <View
                  style={[
                    styles.serviceShadow,
                    { backgroundColor: service.gradient[1] },
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Live Feed */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>HAPPENING NOW</Text>
              <Text style={styles.sectionSubtitle}>Live in your area</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>SEE ALL</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.liveFeedScroll}
          >
            {liveActivities.map((activity) => (
              <TouchableOpacity
                key={activity.id}
                style={styles.liveCard}
                activeOpacity={0.9}
              >
                <View style={styles.liveCardContent}>
                  {activity.badge && (
                    <View
                      style={[
                        styles.liveBadge,
                        { borderColor: activity.badgeColor },
                      ]}
                    >
                      <View
                        style={[
                          styles.livePulse,
                          { backgroundColor: activity.badgeColor },
                        ]}
                      />
                      <Text
                        style={[
                          styles.liveBadgeText,
                          { color: activity.badgeColor },
                        ]}
                      >
                        {activity.badge}
                      </Text>
                    </View>
                  )}

                  <View style={styles.liveImagePlaceholder}>
                    <MaterialCommunityIcons
                      name={
                        activity.type === "deal"
                          ? "fire"
                          : activity.type === "rider"
                          ? "bike-fast"
                          : "star"
                      }
                      size={48}
                      color={activity.badgeColor}
                    />
                  </View>

                  <Text style={styles.liveTitle}>{activity.title}</Text>
                  <Text style={styles.liveSubtitle}>{activity.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Promo Banner */}
        <TouchableOpacity style={styles.promoBanner} activeOpacity={0.9}>
          <LinearGradient
            colors={["#FF6B00", "#E55A00"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.promoBannerGradient}
          >
            <View style={styles.promoContent}>
              <View>
                <Text style={styles.promoTitle}>FIRST ORDER?</Text>
                <Text style={styles.promoSubtitle}>
                  Get 50% OFF on your first delivery
                </Text>
              </View>
              <View style={styles.promoButton}>
                <Text style={styles.promoButtonText}>CLAIM</Text>
                <MaterialCommunityIcons name="gift" size={20} color="#FFFFFF" />
              </View>
            </View>
          </LinearGradient>
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 120,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 28,
  },
  greeting: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666666",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  nameContainer: {
    position: "relative",
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  userName: {
    fontSize: 36,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  nameGlow: {
    position: "absolute",
    bottom: -4,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "#0066FF",
    borderRadius: 2,
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
  },
  tagline: {
    fontSize: 15,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#0A0A0A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#DC3545",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000000",
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  walletCardWrapper: {
    position: "relative",
    marginBottom: 28,
  },
  walletCard: {
    borderRadius: 32,
    padding: 28,
    overflow: "hidden",
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.4,
    shadowRadius: 32,
    elevation: 20,
  },
  decorativeCircle1: {
    position: "absolute",
    top: -60,
    right: -60,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  decorativeCircle2: {
    position: "absolute",
    bottom: -40,
    left: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
  walletContent: {
    position: "relative",
    zIndex: 1,
  },
  walletHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  walletIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  walletLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.9)",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  currency: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 6,
    marginRight: 4,
  },
  balance: {
    fontSize: 48,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -1.5,
  },
  decimal: {
    fontSize: 28,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 6,
  },
  walletActions: {
    flexDirection: "row",
    gap: 12,
  },
  walletButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 1000,
    gap: 8,
    flex: 1,
    justifyContent: "center",
  },
  walletButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#000000",
    letterSpacing: 0.5,
  },
  walletButtonGhost: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 1000,
    gap: 8,
    flex: 1,
    justifyContent: "center",
  },
  walletButtonTextGhost: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  walletShadow: {
    position: "absolute",
    bottom: -10,
    left: 10,
    right: 10,
    height: "100%",
    backgroundColor: "#0052CC",
    borderRadius: 32,
    zIndex: -1,
    opacity: 0.5,
  },
  quickActionsSection: {
    marginBottom: 32,
  },
  quickActionsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickActionItem: {
    alignItems: "center",
    width: (width - 80) / 4,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: 0.3,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0066FF",
    letterSpacing: 0.5,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  serviceCard: {
    width: (width - 56) / 2,
    position: "relative",
  },
  serviceGradient: {
    borderRadius: 28,
    padding: 20,
    minHeight: 160,
    justifyContent: "space-between",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  serviceIconContainer: {
    marginBottom: 12,
  },
  serviceIconBg: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  serviceContent: {
    flex: 1,
    justifyContent: "flex-end",
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 12,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.8)",
    letterSpacing: 0.3,
  },
  serviceArrow: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  serviceShadow: {
    position: "absolute",
    bottom: -6,
    left: 6,
    right: 6,
    height: "100%",
    borderRadius: 28,
    zIndex: -1,
    opacity: 0.4,
  },
  liveFeedScroll: {
    paddingRight: 20,
    gap: 16,
  },
  liveCard: {
    width: 240,
    backgroundColor: "#0A0A0A",
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  liveCardContent: {
    padding: 16,
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 1000,
    gap: 6,
    marginBottom: 16,
    borderWidth: 1,
  },
  livePulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  liveBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  liveImagePlaceholder: {
    width: "100%",
    height: 120,
    borderRadius: 16,
    backgroundColor: "#151515",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  liveTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  liveSubtitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  promoBanner: {
    marginBottom: 20,
  },
  promoBannerGradient: {
    borderRadius: 24,
    padding: 20,
    shadowColor: "#FF6B00",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  promoContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  promoSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.9)",
    letterSpacing: 0.3,
  },
  promoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 1000,
    gap: 6,
  },
  promoButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
});

export default HomeScreen;
