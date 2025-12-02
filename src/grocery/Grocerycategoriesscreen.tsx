import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../navigation/navigation"; //"../../types/navigation";

type GroceryCategoriesScreenProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "GroceryCategories"
  >;
  route: RouteProp<RootStackParamList, "GroceryCategories">;
};

interface GroceryStore {
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
  discount?: number;
  minOrder?: number;
}

const GroceryCategoriesScreen: React.FC<GroceryCategoriesScreenProps> = ({
  navigation,
  route,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedSort, setSelectedSort] = useState("recommended");

  const filters = [
    { id: "all", label: "All", icon: "view-grid" },
    { id: "fastest", label: "Fastest", icon: "lightning-bolt" },
    { id: "nearby", label: "Nearby", icon: "map-marker" },
    { id: "rated", label: "Top Rated", icon: "star" },
    { id: "offers", label: "Offers", icon: "tag" },
  ];

  const sortOptions = [
    { id: "recommended", label: "Recommended" },
    { id: "rating", label: "Rating" },
    { id: "distance", label: "Distance" },
    { id: "delivery", label: "Delivery Time" },
  ];

  const groceryStores: GroceryStore[] = [
    {
      id: "1",
      name: "Shoprite",
      description: "Supermarket • Fresh Produce",
      rating: 4.6,
      reviews: 1240,
      distance: "2.3km",
      deliveryTime: "30-40 min",
      deliveryFee: 500,
      isOpen: true,
      tags: ["Supermarket", "Fresh"],
      image: "",
      discount: 15,
      minOrder: 2000,
    },
    {
      id: "2",
      name: "Spar",
      description: "Supermarket • Groceries",
      rating: 4.5,
      reviews: 892,
      distance: "1.8km",
      deliveryTime: "25-35 min",
      deliveryFee: 400,
      isOpen: true,
      tags: ["Supermarket", "Budget Friendly"],
      image: "",
    },
    {
      id: "3",
      name: "Ebeano Supermarket",
      description: "Premium • Imported Goods",
      rating: 4.7,
      reviews: 654,
      distance: "3.5km",
      deliveryTime: "40-50 min",
      deliveryFee: 700,
      isOpen: true,
      tags: ["Premium", "Imported"],
      image: "",
    },
    {
      id: "4",
      name: "Justrite",
      description: "Supermarket • Household Items",
      rating: 4.4,
      reviews: 523,
      distance: "1.2km",
      deliveryTime: "20-30 min",
      deliveryFee: 300,
      isOpen: false,
      tags: ["Fast Delivery", "Affordable"],
      image: "",
    },
    {
      id: "5",
      name: "Fresh Direct",
      description: "Fresh Produce • Organic",
      rating: 4.8,
      reviews: 445,
      distance: "2.8km",
      deliveryTime: "35-45 min",
      deliveryFee: 600,
      isOpen: true,
      tags: ["Organic", "Fresh", "Premium"],
      image: "",
      discount: 10,
    },
  ];

  const handleStorePress = (store: GroceryStore) => {
    navigation.navigate("GroceryStore", {
      storeId: store.id,
      storeName: store.name,
    });
  };

  const filteredStores = groceryStores.filter((store) =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <LinearGradient
        colors={["#000000", "#0A0A0A", "#000000"]}
        style={styles.background}
      />

      {/* Header with Gradient */}
      <LinearGradient colors={["#00D084", "#00B872"]} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Grocery Stores</Text>
            <Text style={styles.headerSubtitle}>
              {filteredStores.length} stores available
            </Text>
          </View>
          <TouchableOpacity style={styles.headerButton}>
            <MaterialCommunityIcons name="magnify" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={20} color="#888888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search grocery stores..."
            placeholderTextColor="#888888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <MaterialCommunityIcons name="close" size={20} color="#888888" />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                selectedFilter === filter.id && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <MaterialCommunityIcons
                name={filter.icon as any}
                size={18}
                color={selectedFilter === filter.id ? "#000000" : "#FFFFFF"}
              />
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter.id && styles.filterTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Sort Options */}
        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sortOptions}
          >
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.sortChip,
                  selectedSort === option.id && styles.sortChipActive,
                ]}
                onPress={() => setSelectedSort(option.id)}
              >
                <Text
                  style={[
                    styles.sortText,
                    selectedSort === option.id && styles.sortTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Stores List */}
        <View style={styles.storesContainer}>
          {filteredStores.map((store) => (
            <TouchableOpacity
              key={store.id}
              style={[
                styles.storeCard,
                !store.isOpen && styles.storeCardClosed,
              ]}
              onPress={() => handleStorePress(store)}
              activeOpacity={0.9}
              disabled={!store.isOpen}
            >
              {/* Store Image */}
              <View style={styles.storeImage}>
                <LinearGradient
                  colors={["#00D084", "#00B872"]}
                  style={styles.storeImageGradient}
                >
                  <MaterialCommunityIcons
                    name="store"
                    size={40}
                    color="#FFFFFF"
                  />
                </LinearGradient>

                {/* Badges */}
                {store.discount && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>
                      {store.discount}% OFF
                    </Text>
                  </View>
                )}
              </View>

              {/* Store Info */}
              <View style={styles.storeInfo}>
                <View style={styles.storeHeader}>
                  <Text style={styles.storeName}>{store.name}</Text>
                  {!store.isOpen && (
                    <View style={styles.closedBadge}>
                      <Text style={styles.closedText}>CLOSED</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.storeDescription}>{store.description}</Text>

                {/* Rating */}
                <View style={styles.ratingContainer}>
                  <MaterialCommunityIcons
                    name="star"
                    size={16}
                    color="#FFB800"
                  />
                  <Text style={styles.ratingText}>
                    {store.rating} ({store.reviews})
                  </Text>
                </View>

                {/* Tags */}
                <View style={styles.tagsContainer}>
                  {store.tags.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
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
                  <View style={styles.deliveryItem}>
                    <MaterialCommunityIcons
                      name="map-marker"
                      size={16}
                      color="#888888"
                    />
                    <Text style={styles.deliveryText}>{store.distance}</Text>
                  </View>
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

                {store.minOrder && (
                  <Text style={styles.minOrderText}>
                    Min order: ₦{store.minOrder.toLocaleString("en-NG")}
                  </Text>
                )}
              </View>

              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="#666666"
              />

              {!store.isOpen && <View style={styles.closedOverlay} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty State */}
        {filteredStores.length === 0 && (
          <View style={styles.emptyContainer}>
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
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.8)",
    letterSpacing: 0.3,
    marginTop: 2,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#000000",
    letterSpacing: 0.3,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 10,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#0A0A0A",
    borderRadius: 1000,
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  filterChipActive: {
    backgroundColor: "#FFFFFF",
  },
  filterText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  filterTextActive: {
    color: "#000000",
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  sortLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  sortOptions: {
    gap: 8,
  },
  sortChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#0A0A0A",
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  sortChipActive: {
    backgroundColor: "#00D084",
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
  storesContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  storeCard: {
    flexDirection: "row",
    backgroundColor: "#0A0A0A",
    borderRadius: 20,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    position: "relative",
  },
  storeCardClosed: {
    opacity: 0.6,
  },
  storeImage: {
    width: 100,
    height: 100,
    position: "relative",
  },
  storeImageGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
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
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  closedOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
  },
  storeInfo: {
    flex: 1,
  },
  storeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  storeName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  closedBadge: {
    backgroundColor: "#DC3545",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 1000,
  },
  closedText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  storeDescription: {
    fontSize: 12,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "rgba(0, 208, 132, 0.1)",
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "rgba(0, 208, 132, 0.3)",
  },
  tagText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#00D084",
    letterSpacing: 0.3,
  },
  deliveryInfo: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 4,
  },
  deliveryItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  deliveryText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
  },
  minOrderText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#666666",
    letterSpacing: 0.3,
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
});

export default GroceryCategoriesScreen;
