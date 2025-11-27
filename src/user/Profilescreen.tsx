import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { RootStackParamList, MainTabParamList } from "../types/navigation";

type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, "Profile">,
  NativeStackNavigationProp<RootStackParamList>
>;

type ProfileScreenProps = {
  navigation: ProfileScreenNavigationProp;
};

interface MenuItem {
  id: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  subtitle?: string;
  screen?: keyof RootStackParamList;
  action?: () => void;
  showChevron?: boolean;
  badge?: string;
  badgeColor?: string;
}

interface SettingToggle {
  id: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  subtitle: string;
  value: boolean;
  onToggle: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const accountMenuItems: MenuItem[] = [
    {
      id: "1",
      icon: "account-edit",
      title: "Edit Profile",
      subtitle: "Update your personal information",
      showChevron: true,
    },
    {
      id: "2",
      icon: "map-marker",
      title: "Saved Addresses",
      subtitle: "Manage delivery addresses",
      screen: "Addresses",
      showChevron: true,
    },
    {
      id: "3",
      icon: "credit-card",
      title: "Payment Methods",
      subtitle: "Cards & bank accounts",
      showChevron: true,
    },
    {
      id: "4",
      icon: "star",
      title: "Fidelia Points",
      subtitle: "2,450 points available",
      badge: "2.4K",
      badgeColor: "#FFB800",
      showChevron: true,
    },
  ];

  const appMenuItems: MenuItem[] = [
    {
      id: "1",
      icon: "history",
      title: "Order History",
      subtitle: "View all your orders",
      showChevron: true,
    },
    {
      id: "2",
      icon: "heart",
      title: "Favorites",
      subtitle: "Your saved stores & items",
      showChevron: true,
    },
    {
      id: "3",
      icon: "ticket-percent",
      title: "Offers & Promos",
      subtitle: "Available deals",
      badge: "3",
      badgeColor: "#DC3545",
      showChevron: true,
    },
    {
      id: "4",
      icon: "headset",
      title: "Help & Support",
      subtitle: "24/7 customer service",
      showChevron: true,
    },
  ];

  const moreMenuItems: MenuItem[] = [
    {
      id: "1",
      icon: "shield-check",
      title: "Privacy Policy",
      showChevron: true,
    },
    {
      id: "2",
      icon: "file-document",
      title: "Terms & Conditions",
      showChevron: true,
    },
    {
      id: "3",
      icon: "information",
      title: "About Fidelia",
      subtitle: "Version 1.0.0",
      showChevron: true,
    },
    {
      id: "4",
      icon: "share-variant",
      title: "Refer a Friend",
      subtitle: "Earn ₦1,000 for each referral",
      showChevron: true,
    },
  ];

  const settingToggles: SettingToggle[] = [
    {
      id: "1",
      icon: "bell",
      title: "Push Notifications",
      subtitle: "Receive order updates",
      value: notificationsEnabled,
      onToggle: () => setNotificationsEnabled(!notificationsEnabled),
    },
    {
      id: "2",
      icon: "map-marker",
      title: "Location Services",
      subtitle: "For accurate deliveries",
      value: locationEnabled,
      onToggle: () => setLocationEnabled(!locationEnabled),
    },
  ];

  const handleLogout = () => {
    // Handle logout logic
    console.log("Logout");
    navigation.navigate("Login");
  };

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => {
        if (item.screen) {
          navigation.navigate(item.screen as any);
        } else if (item.action) {
          item.action();
        }
      }}
      activeOpacity={0.9}
    >
      <View style={styles.menuIconContainer}>
        <MaterialCommunityIcons name={item.icon} size={24} color="#0066FF" />
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{item.title}</Text>
        {item.subtitle && (
          <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
        )}
      </View>
      {item.badge && (
        <View
          style={[
            styles.menuBadge,
            { backgroundColor: `${item.badgeColor}20` },
          ]}
        >
          <Text style={[styles.menuBadgeText, { color: item.badgeColor }]}>
            {item.badge}
          </Text>
        </View>
      )}
      {item.showChevron && (
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color="#666666"
        />
      )}
    </TouchableOpacity>
  );

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
          <Text style={styles.title}>PROFILE</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <MaterialCommunityIcons name="cog" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCardWrapper}>
          <LinearGradient
            colors={["#0066FF", "#0052CC"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profileCard}
          >
            <View style={styles.decorativeCircle1} />
            <View style={styles.decorativeCircle2} />

            <View style={styles.profileContent}>
              {/* Avatar */}
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>N</Text>
                </View>
                <TouchableOpacity style={styles.cameraButton}>
                  <MaterialCommunityIcons
                    name="camera"
                    size={16}
                    color="#000000"
                  />
                </TouchableOpacity>
              </View>

              {/* User Info */}
              <View style={styles.userInfo}>
                <Text style={styles.userName}>Ndukwe</Text>
                <Text style={styles.userEmail}>ndukwe@example.com</Text>
                <View style={styles.verifiedBadge}>
                  <MaterialCommunityIcons
                    name="check-decagram"
                    size={16}
                    color="#00D084"
                  />
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              </View>

              {/* Stats */}
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>12</Text>
                  <Text style={styles.statLabel}>Orders</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>2.4K</Text>
                  <Text style={styles.statLabel}>Points</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>5</Text>
                  <Text style={styles.statLabel}>Reviews</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
          <View style={styles.profileShadow} />
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          <View style={styles.menuList}>
            {accountMenuItems.map(renderMenuItem)}
          </View>
        </View>

        {/* Settings Toggles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SETTINGS</Text>
          <View style={styles.menuList}>
            {settingToggles.map((setting) => (
              <View key={setting.id} style={styles.menuItem}>
                <View style={styles.menuIconContainer}>
                  <MaterialCommunityIcons
                    name={setting.icon}
                    size={24}
                    color="#0066FF"
                  />
                </View>
                <View style={styles.menuContent}>
                  <Text style={styles.menuTitle}>{setting.title}</Text>
                  <Text style={styles.menuSubtitle}>{setting.subtitle}</Text>
                </View>
                <Switch
                  value={setting.value}
                  onValueChange={setting.onToggle}
                  trackColor={{ false: "#333333", true: "#0066FF" }}
                  thumbColor={setting.value ? "#FFFFFF" : "#666666"}
                  ios_backgroundColor="#333333"
                />
              </View>
            ))}
          </View>
        </View>

        {/* App Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>APP</Text>
          <View style={styles.menuList}>
            {appMenuItems.map(renderMenuItem)}
          </View>
        </View>

        {/* More Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MORE</Text>
          <View style={styles.menuList}>
            {moreMenuItems.map(renderMenuItem)}
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.9}
        >
          <MaterialCommunityIcons name="logout" size={24} color="#DC3545" />
          <Text style={styles.logoutText}>LOGOUT</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>
          FIDELIA v1.0.0 • Made with ⚡ in Nigeria
        </Text>
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
    paddingTop: 60,
    paddingBottom: 120,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  settingsButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#0A0A0A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  profileCardWrapper: {
    position: "relative",
    marginHorizontal: 20,
    marginBottom: 32,
  },
  profileCard: {
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
  profileContent: {
    position: "relative",
    zIndex: 1,
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -1,
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#0066FF",
  },
  userInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  userName: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 208, 132, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 1000,
    gap: 6,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#00D084",
    letterSpacing: 0.5,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 20,
    padding: 16,
    width: "100%",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.7)",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  profileShadow: {
    position: "absolute",
    bottom: -12,
    left: 12,
    right: 12,
    height: "100%",
    backgroundColor: "#0052CC",
    borderRadius: 32,
    zIndex: -1,
    opacity: 0.5,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#888888",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 16,
  },
  menuList: {
    backgroundColor: "#0A0A0A",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  menuSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  menuBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 1000,
  },
  menuBadgeText: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(220, 53, 69, 0.1)",
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(220, 53, 69, 0.2)",
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#DC3545",
    letterSpacing: 0.5,
  },
  versionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666666",
    textAlign: "center",
    letterSpacing: 0.5,
    marginBottom: 20,
  },
});

export default ProfileScreen;
