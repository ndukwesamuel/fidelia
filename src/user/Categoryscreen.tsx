import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/navigation";

const { width } = Dimensions.get("window");

type CategoryScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Category">;
  route: RouteProp<RootStackParamList, "Category">;
};

interface FilterOption {
  id: string;
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

interface Store {
  id: string;
  name: string;
  description: string;
  rating: number;
  reviews: number;
  distance: string;
  deliveryTime: string;
  deliveryFee: number;
  isOpen: boolean;
  tags: string[];
  image: string;
  priceRange: string;
  isPromoted?: boolean;
  discount?: string;
}

const CategoryScreen: React.FC<CategoryScreenProps> = ({
  navigation,
  route,
}) => {
  const { categoryId, categoryName } = route.params;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recommended");

  // Category-specific gradient colors
  const getCategoryGradient = () => {
    const gradients: Record<string, string[]> = {
      "1": ["#FF6B00", "#E55A00"], // Food
      "2": ["#00D084", "#00B872"], // Grocery
      "3": ["#0066FF", "#0052CC"], // Errands
      "4": ["#FFB800", "#FFA000"], // Logistics
      "5": ["#00B8A9", "#00A896"], // Pharmacy
      "6": ["#DC3545", "#C82333"], // Market
    };
    return gradients[categoryId] || ["#0066FF", "#0052CC"];
  };

  const gradient = getCategoryGradient();

  const filterOptions: FilterOption[] = [
    { id: "all", label: "All", icon: "view-grid" },
    { id: "fastest", label: "Fastest", icon: "lightning-bolt" },
    { id: "nearby", label: "Nearby", icon: "map-marker" },
    { id: "toprated", label: "Top Rated", icon: "star" },
    { id: "offers", label: "Offers", icon: "tag" },
  ];

  const stores: Store[] = [
    {
      id: "1",
      name: "Mama Put Kitchen",
      description: "Nigerian Local Cuisine • Jollof Specialist",
      rating: 4.8,
      reviews: 245,
      distance: "1.2km",
      deliveryTime: "20-30 min",
      deliveryFee: 500,
      isOpen: true,
      tags: ["Fast Delivery", "Popular"],
      image: "",
      priceRange: "₦₦",
      isPromoted: true,
      discount: "60% OFF",
    },
    {
      id: "2",
      name: "The Place Restaurant",
      description: "Continental • Fine Dining",
      rating: 4.7,
      reviews: 189,
      distance: "2.1km",
      deliveryTime: "30-40 min",
      deliveryFee: 800,
      isOpen: true,
      tags: ["Premium", "Upscale"],
      image: "",
      priceRange: "₦₦₦",
    },
    {
      id: "3",
      name: "Chicken Republic",
      description: "Fast Food • Chicken & Fries",
      rating: 4.5,
      reviews: 512,
      distance: "0.8km",
      deliveryTime: "15-25 min",
      deliveryFee: 300,
      isOpen: true,
      tags: ["Quick Bites", "Budget Friendly"],
      image: "",
      priceRange: "₦₦",
    },
    {
      id: "4",
      name: "Sweet Sensation",
      description: "Bakery • Pastries & Snacks",
      rating: 4.6,
      reviews: 324,
      distance: "1.5km",
      deliveryTime: "25-35 min",
      deliveryFee: 600,
      isOpen: false,
      tags: ["Bakery", "Desserts"],
      image: "",
      priceRange: "₦₦",
    },
    {
      id: "5",
      name: "Kilimanjaro Restaurant",
      description: "African Fusion • Contemporary",
      rating: 4.9,
      reviews: 156,
      distance: "3.2km",
      deliveryTime: "35-45 min",
      deliveryFee: 1000,
      isOpen: true,
      tags: ["Award Winning", "Chef Special"],
      image: "",
      priceRange: "₦₦₦",
      discount: "20% OFF",
    },
  ];

  const handleStorePress = (store: Store) => {
    navigation.navigate("StoreDetails", {
      storeId: store.id,
      storeName: store.name,
    });
  };

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <LinearGradient
        colors={["#000000", "#0A0A0A", "#000000"]}
        style={styles.background}
      />

      {/* Header with gradient */}
      <LinearGradient colors={gradient} style={styles.headerGradient}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={28}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>{categoryName}</Text>
            <Text style={styles.headerSubtitle}>
              {filteredStores.length} stores available
            </Text>
          </View>

          <TouchableOpacity style={styles.searchIconButton}>
            <MaterialCommunityIcons name="magnify" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <MaterialCommunityIcons name="magnify" size={20} color="#666666" />
            <TextInput
              style={styles.searchInput}
              placeholder={`Search in ${categoryName}...`}
              placeholderTextColor="#666666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <MaterialCommunityIcons
                  name="close-circle"
                  size={18}
                  color="#666666"
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </LinearGradient>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersScroll}
      >
        {filterOptions.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterChip,
              activeFilter === filter.id && styles.filterChipActive,
            ]}
            onPress={() => setActiveFilter(filter.id)}
          >
            <MaterialCommunityIcons
              name={filter.icon}
              size={18}
              color={activeFilter === filter.id ? "#000000" : "#FFFFFF"}
            />
            <Text
              style={[
                styles.filterText,
                activeFilter === filter.id && styles.filterTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sort Bar */}
      <View style={styles.sortBar}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sortOptions}
        >
          {[
            { id: "recommended", label: "Recommended" },
            { id: "rating", label: "Rating" },
            { id: "distance", label: "Distance" },
            { id: "delivery-time", label: "Delivery Time" },
          ].map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.sortChip,
                sortBy === option.id && styles.sortChipActive,
              ]}
              onPress={() => setSortBy(option.id)}
            >
              <Text
                style={[
                  styles.sortText,
                  sortBy === option.id && styles.sortTextActive,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Stores List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredStores.length > 0 ? (
          filteredStores.map((store) => (
            <TouchableOpacity
              key={store.id}
              style={[
                styles.storeCard,
                !store.isOpen && styles.storeCardClosed,
              ]}
              onPress={() => handleStorePress(store)}
              activeOpacity={0.9}
            >
              {/* Store Image Placeholder */}
              <View style={styles.storeImageContainer}>
                <LinearGradient
                  colors={gradient}
                  style={styles.storeImageGradient}
                >
                  <MaterialCommunityIcons
                    name="store"
                    size={48}
                    color="#FFFFFF"
                  />
                </LinearGradient>

                {/* Badges */}
                {store.isPromoted && (
                  <View style={styles.promotedBadge}>
                    <MaterialCommunityIcons
                      name="flash"
                      size={14}
                      color="#FFB800"
                    />
                    <Text style={styles.promotedText}>PROMOTED</Text>
                  </View>
                )}

                {store.discount && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{store.discount}</Text>
                  </View>
                )}

                {!store.isOpen && (
                  <View style={styles.closedOverlay}>
                    <Text style={styles.closedText}>CLOSED</Text>
                  </View>
                )}
              </View>

              {/* Store Info */}
              <View style={styles.storeInfo}>
                <View style={styles.storeHeader}>
                  <Text style={styles.storeName}>{store.name}</Text>
                  <View style={styles.ratingContainer}>
                    <MaterialCommunityIcons
                      name="star"
                      size={16}
                      color="#FFB800"
                    />
                    <Text style={styles.ratingText}>{store.rating}</Text>
                    <Text style={styles.reviewsText}>({store.reviews})</Text>
                  </View>
                </View>

                <Text style={styles.storeDescription}>{store.description}</Text>

                {/* Tags */}
                <View style={styles.tagsContainer}>
                  {store.tags.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                  <Text style={styles.priceRange}>{store.priceRange}</Text>
                </View>

                {/* Delivery Info */}
                <View style={styles.deliveryInfo}>
                  <View style={styles.deliveryItem}>
                    <MaterialCommunityIcons
                      name="clock-outline"
                      size={16}
                      color="#888888"
                    />
                    <Text style={styles.deliveryText}>
                      {store.deliveryTime}
                    </Text>
                  </View>
                  <View style={styles.deliveryDivider} />
                  <View style={styles.deliveryItem}>
                    <MaterialCommunityIcons
                      name="map-marker"
                      size={16}
                      color="#888888"
                    />
                    <Text style={styles.deliveryText}>{store.distance}</Text>
                  </View>
                  <View style={styles.deliveryDivider} />
                  <View style={styles.deliveryItem}>
                    <MaterialCommunityIcons
                      name="bike-fast"
                      size={16}
                      color="#888888"
                    />
                    <Text style={styles.deliveryText}>
                      ₦{store.deliveryFee}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Chevron */}
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="#666666"
              />
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="store-off"
              size={64}
              color="#666666"
            />
            <Text style={styles.emptyTitle}>No Stores Found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your search or filters
            </Text>
          </View>
        )}
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
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTextContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.8)",
    letterSpacing: 0.3,
  },
  searchIconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBarContainer: {
    paddingHorizontal: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  filtersScroll: {
    paddingHorizontal: 20,
    paddingVertical: 16,
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
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  filterTextActive: {
    color: "#000000",
  },
  sortBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  sortLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#888888",
    letterSpacing: 0.3,
  },
  sortOptions: {
    gap: 8,
  },
  sortChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 1000,
    backgroundColor: "#0A0A0A",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  sortChipActive: {
    backgroundColor: "#0066FF",
    borderColor: "#0066FF",
  },
  sortText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#888888",
    letterSpacing: 0.3,
  },
  sortTextActive: {
    color: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  storeCard: {
    flexDirection: "row",
    backgroundColor: "#0A0A0A",
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  storeCardClosed: {
    opacity: 0.6,
  },
  storeImageContainer: {
    position: "relative",
    width: 100,
    height: 100,
  },
  storeImageGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  promotedBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 1000,
    gap: 4,
  },
  promotedText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#FFB800",
    letterSpacing: 0.5,
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#DC3545",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 1000,
  },
  discountText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  closedOverlay: {
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
  closedText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  storeInfo: {
    flex: 1,
  },
  storeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  storeName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  reviewsText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  storeDescription: {
    fontSize: 13,
    fontWeight: "500",
    color: "#888888",
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 10,
  },
  tag: {
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "rgba(0, 102, 255, 0.2)",
  },
  tagText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#0066FF",
    letterSpacing: 0.3,
  },
  priceRange: {
    fontSize: 12,
    fontWeight: "700",
    color: "#00D084",
    letterSpacing: 0.3,
  },
  deliveryInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  deliveryItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  deliveryText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
  },
  deliveryDivider: {
    width: 1,
    height: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 16,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  emptySubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888888",
    textAlign: "center",
    letterSpacing: 0.3,
  },
});

export default CategoryScreen;
