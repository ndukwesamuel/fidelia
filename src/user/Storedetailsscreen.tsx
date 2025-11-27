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
import type { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/navigation";
// import type { RootStackParamList } from "../types/navigation";
const { width } = Dimensions.get("window");

type StoreDetailsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "StoreDetails">;
  route: RouteProp<RootStackParamList, "StoreDetails">;
};

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
  isPopular?: boolean;
  discount?: number;
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

const StoreDetailsScreen: React.FC<StoreDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const { storeId, storeName } = route.params;
  const [activeTab, setActiveTab] = useState<"menu" | "reviews" | "info">(
    "menu"
  );
  const [cartCount, setCartCount] = useState(3);

  // Store Info
  const storeInfo = {
    name: storeName,
    description: "Nigerian Local Cuisine • Jollof Specialist",
    rating: 4.8,
    reviews: 245,
    distance: "1.2km",
    deliveryTime: "20-30 min",
    deliveryFee: 500,
    isOpen: true,
    openingHours: "8:00 AM - 10:00 PM",
    address: "15 Allen Avenue, Ikeja, Lagos",
    phone: "+234 801 234 5678",
    tags: ["Fast Delivery", "Popular", "Nigerian"],
  };

  // Menu Categories
  const categories = [
    "Popular",
    "Rice Dishes",
    "Proteins",
    "Sides",
    "Drinks",
    "Swallow",
  ];

  // Menu Items
  const menuItems: MenuItem[] = [
    {
      id: "1",
      name: "Jollof Rice & Chicken",
      description: "Spicy Nigerian jollof rice with grilled chicken",
      price: 2500,
      category: "Popular",
      image: "",
      isAvailable: true,
      isPopular: true,
    },
    {
      id: "2",
      name: "Fried Rice Combo",
      description: "Fried rice with chicken, plantain & coleslaw",
      price: 3000,
      category: "Rice Dishes",
      image: "",
      isAvailable: true,
      discount: 20,
    },
    {
      id: "3",
      name: "Egusi Soup & Pounded Yam",
      description: "Traditional egusi soup with assorted meat",
      price: 3500,
      category: "Swallow",
      image: "",
      isAvailable: true,
      isPopular: true,
    },
    {
      id: "4",
      name: "Goat Meat Pepper Soup",
      description: "Spicy Nigerian pepper soup with goat meat",
      price: 2000,
      category: "Popular",
      image: "",
      isAvailable: true,
    },
    {
      id: "5",
      name: "Grilled Fish",
      description: "Fresh grilled tilapia with sauce",
      price: 4000,
      category: "Proteins",
      image: "",
      isAvailable: false,
    },
    {
      id: "6",
      name: "Fried Plantain",
      description: "Sweet ripe plantain, fried to perfection",
      price: 500,
      category: "Sides",
      image: "",
      isAvailable: true,
    },
  ];

  // Reviews
  const reviews: Review[] = [
    {
      id: "1",
      userName: "Chioma A.",
      rating: 5,
      comment:
        "Amazing jollof rice! Best I've had in Lagos. Delivery was super fast too.",
      date: "2 days ago",
      avatar: "C",
    },
    {
      id: "2",
      userName: "Tunde M.",
      rating: 4,
      comment:
        "Good food and generous portions. The chicken was well seasoned.",
      date: "5 days ago",
      avatar: "T",
    },
    {
      id: "3",
      userName: "Ngozi K.",
      rating: 5,
      comment: "Always consistent quality. My go-to spot for Nigerian food!",
      date: "1 week ago",
      avatar: "N",
    },
  ];

  const handleAddToCart = (item: MenuItem) => {
    setCartCount(cartCount + 1);
    // Add to cart logic here
  };

  const handleViewCart = () => {
    navigation.navigate("Cart");
  };

  const renderStarRating = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <MaterialCommunityIcons
            key={star}
            name={star <= rating ? "star" : "star-outline"}
            size={14}
            color="#FFB800"
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <LinearGradient
        colors={["#000000", "#0A0A0A", "#000000"]}
        style={styles.background}
      />

      {/* Header with Store Image */}
      <View style={styles.header}>
        <LinearGradient
          colors={["#FF6B00", "#E55A00"]}
          style={styles.headerGradient}
        >
          <MaterialCommunityIcons name="store" size={64} color="#FFFFFF" />
        </LinearGradient>

        {/* Header Actions */}
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerButton}>
              <MaterialCommunityIcons
                name="share-variant"
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <MaterialCommunityIcons
                name="heart-outline"
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Store Status Badge */}
        {storeInfo.isOpen && (
          <View style={styles.openBadge}>
            <View style={styles.openDot} />
            <Text style={styles.openText}>OPEN NOW</Text>
          </View>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Store Info Card */}
        <View style={styles.storeInfoCard}>
          <View style={styles.storeHeader}>
            <View style={styles.storeHeaderLeft}>
              <Text style={styles.storeName}>{storeInfo.name}</Text>
              <Text style={styles.storeDescription}>
                {storeInfo.description}
              </Text>
            </View>
          </View>

          {/* Rating & Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="star" size={20} color="#FFB800" />
              <Text style={styles.statText}>
                {storeInfo.rating} ({storeInfo.reviews})
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={20}
                color="#0066FF"
              />
              <Text style={styles.statText}>{storeInfo.deliveryTime}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <MaterialCommunityIcons
                name="map-marker"
                size={20}
                color="#00D084"
              />
              <Text style={styles.statText}>{storeInfo.distance}</Text>
            </View>
          </View>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {storeInfo.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          {/* Delivery Fee */}
          <View style={styles.deliveryFeeCard}>
            <MaterialCommunityIcons
              name="bike-fast"
              size={24}
              color="#0066FF"
            />
            <View style={styles.deliveryFeeContent}>
              <Text style={styles.deliveryFeeTitle}>Delivery Fee</Text>
              <Text style={styles.deliveryFeeAmount}>
                ₦{storeInfo.deliveryFee}
              </Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "menu" && styles.tabActive]}
            onPress={() => setActiveTab("menu")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "menu" && styles.tabTextActive,
              ]}
            >
              Menu
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "reviews" && styles.tabActive]}
            onPress={() => setActiveTab("reviews")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "reviews" && styles.tabTextActive,
              ]}
            >
              Reviews
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "info" && styles.tabActive]}
            onPress={() => setActiveTab("info")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "info" && styles.tabTextActive,
              ]}
            >
              Info
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === "menu" && (
          <View style={styles.tabContent}>
            {/* Categories */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesScroll}
            >
              {categories.map((category, index) => (
                <TouchableOpacity key={index} style={styles.categoryChip}>
                  <Text style={styles.categoryText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Menu Items */}
            <View style={styles.menuSection}>
              <Text style={styles.sectionTitle}>POPULAR ITEMS</Text>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItemCard,
                    !item.isAvailable && styles.menuItemCardDisabled,
                  ]}
                  onPress={() =>
                    item.isAvailable &&
                    navigation.navigate("ProductDetails", {
                      productId: item.id,
                      storeId: storeId,
                    })
                  }
                  activeOpacity={0.9}
                  disabled={!item.isAvailable}
                >
                  {/* Item Image */}
                  <View style={styles.menuItemImage}>
                    <LinearGradient
                      colors={["#FF6B00", "#E55A00"]}
                      style={styles.menuItemImageGradient}
                    >
                      <MaterialCommunityIcons
                        name="food"
                        size={32}
                        color="#FFFFFF"
                      />
                    </LinearGradient>

                    {item.isPopular && (
                      <View style={styles.popularBadge}>
                        <MaterialCommunityIcons
                          name="fire"
                          size={12}
                          color="#FFFFFF"
                        />
                        <Text style={styles.popularText}>POPULAR</Text>
                      </View>
                    )}

                    {item.discount && (
                      <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>
                          {item.discount}% OFF
                        </Text>
                      </View>
                    )}

                    {!item.isAvailable && (
                      <View style={styles.unavailableOverlay}>
                        <Text style={styles.unavailableText}>Out of Stock</Text>
                      </View>
                    )}
                  </View>

                  {/* Item Info */}
                  <View style={styles.menuItemInfo}>
                    <Text style={styles.menuItemName}>{item.name}</Text>
                    <Text style={styles.menuItemDescription}>
                      {item.description}
                    </Text>
                    <View style={styles.menuItemFooter}>
                      <View>
                        <Text style={styles.menuItemPrice}>
                          ₦{item.price.toLocaleString("en-NG")}
                        </Text>
                        {item.discount && (
                          <Text style={styles.menuItemOriginalPrice}>
                            ₦
                            {Math.round(
                              item.price / (1 - item.discount / 100)
                            ).toLocaleString("en-NG")}
                          </Text>
                        )}
                      </View>
                      {item.isAvailable && (
                        <TouchableOpacity
                          style={styles.addButton}
                          onPress={() => handleAddToCart(item)}
                        >
                          <MaterialCommunityIcons
                            name="plus"
                            size={20}
                            color="#FFFFFF"
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {activeTab === "reviews" && (
          <View style={styles.tabContent}>
            {/* Overall Rating */}
            <View style={styles.overallRatingCard}>
              <View style={styles.ratingNumberContainer}>
                <Text style={styles.ratingNumber}>{storeInfo.rating}</Text>
                {renderStarRating(Math.round(storeInfo.rating))}
                <Text style={styles.ratingCount}>
                  Based on {storeInfo.reviews} reviews
                </Text>
              </View>
            </View>

            {/* Reviews List */}
            <View style={styles.reviewsList}>
              <Text style={styles.sectionTitle}>CUSTOMER REVIEWS</Text>
              {reviews.map((review) => (
                <View key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewAvatar}>
                      <Text style={styles.reviewAvatarText}>
                        {review.avatar}
                      </Text>
                    </View>
                    <View style={styles.reviewUserInfo}>
                      <Text style={styles.reviewUserName}>
                        {review.userName}
                      </Text>
                      <Text style={styles.reviewDate}>{review.date}</Text>
                    </View>
                    {renderStarRating(review.rating)}
                  </View>
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {activeTab === "info" && (
          <View style={styles.tabContent}>
            <View style={styles.infoSection}>
              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={24}
                  color="#0066FF"
                />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Opening Hours</Text>
                  <Text style={styles.infoValue}>{storeInfo.openingHours}</Text>
                </View>
              </View>

              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={24}
                  color="#00D084"
                />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Address</Text>
                  <Text style={styles.infoValue}>{storeInfo.address}</Text>
                </View>
              </View>

              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="phone"
                  size={24}
                  color="#FFB800"
                />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Phone</Text>
                  <Text style={styles.infoValue}>{storeInfo.phone}</Text>
                </View>
              </View>

              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="bike-fast"
                  size={24}
                  color="#DC3545"
                />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Delivery Time</Text>
                  <Text style={styles.infoValue}>{storeInfo.deliveryTime}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <TouchableOpacity
          style={styles.cartButton}
          onPress={handleViewCart}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={["#0066FF", "#0052CC"]}
            style={styles.cartButtonGradient}
          >
            <View style={styles.cartButtonContent}>
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
              <Text style={styles.cartButtonText}>View Cart</Text>
              <MaterialCommunityIcons
                name="arrow-right"
                size={24}
                color="#FFFFFF"
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      )}
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
    height: 200,
    position: "relative",
  },
  headerGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerActions: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    gap: 12,
  },
  openBadge: {
    position: "absolute",
    bottom: 16,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 208, 132, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "#00D084",
    gap: 6,
  },
  openDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00D084",
  },
  openText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#00D084",
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  storeInfoCard: {
    backgroundColor: "#0A0A0A",
    marginHorizontal: 20,
    marginTop: -40,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  storeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  storeHeaderLeft: {
    flex: 1,
  },
  storeName: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  storeDescription: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  statText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "rgba(0, 102, 255, 0.2)",
  },
  tagText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0066FF",
    letterSpacing: 0.3,
  },
  deliveryFeeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 102, 255, 0.05)",
    padding: 12,
    borderRadius: 16,
    gap: 12,
  },
  deliveryFeeContent: {
    flex: 1,
  },
  deliveryFeeTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  deliveryFeeAmount: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0066FF",
    letterSpacing: 0.3,
  },
  tabsContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: "#0A0A0A",
    borderRadius: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 12,
  },
  tabActive: {
    backgroundColor: "#0066FF",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#888888",
    letterSpacing: 0.3,
  },
  tabTextActive: {
    color: "#FFFFFF",
  },
  tabContent: {
    marginTop: 20,
  },
  categoriesScroll: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#0A0A0A",
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  menuSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 16,
  },
  menuItemCard: {
    flexDirection: "row",
    backgroundColor: "#0A0A0A",
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  menuItemCardDisabled: {
    opacity: 0.5,
  },
  menuItemImage: {
    position: "relative",
    width: 90,
    height: 90,
  },
  menuItemImageGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  popularBadge: {
    position: "absolute",
    top: 6,
    left: 6,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 1000,
    gap: 3,
  },
  popularText: {
    fontSize: 8,
    fontWeight: "800",
    color: "#FFB800",
    letterSpacing: 0.5,
  },
  discountBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "#DC3545",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 1000,
  },
  discountText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  unavailableOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  unavailableText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 12,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
    marginBottom: 8,
    lineHeight: 16,
  },
  menuItemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: "#00D084",
    letterSpacing: 0.3,
  },
  menuItemOriginalPrice: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666666",
    textDecorationLine: "line-through",
    letterSpacing: 0.3,
    marginTop: 2,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#0066FF",
    justifyContent: "center",
    alignItems: "center",
  },
  overallRatingCard: {
    backgroundColor: "#0A0A0A",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  ratingNumberContainer: {
    alignItems: "center",
  },
  ratingNumber: {
    fontSize: 56,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -2,
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 8,
  },
  ratingCount: {
    fontSize: 13,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  reviewsList: {
    paddingHorizontal: 20,
  },
  reviewCard: {
    backgroundColor: "#0A0A0A",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#0066FF",
    justifyContent: "center",
    alignItems: "center",
  },
  reviewAvatarText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  reviewUserInfo: {
    flex: 1,
  },
  reviewUserName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  reviewDate: {
    fontSize: 11,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  reviewComment: {
    fontSize: 13,
    fontWeight: "500",
    color: "#CCCCCC",
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  infoSection: {
    paddingHorizontal: 20,
  },
  infoItem: {
    flexDirection: "row",
    backgroundColor: "#0A0A0A",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  cartButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  cartButtonGradient: {
    borderRadius: 1000,
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  cartButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 24,
    gap: 12,
  },
  cartBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#0066FF",
    letterSpacing: 0.3,
  },
  cartButtonText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
});

export default StoreDetailsScreen;
