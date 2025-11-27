import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { RootStackParamList, MainTabParamList } from "../types/navigation";

const { width } = Dimensions.get("window");

type SearchScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, "Search">,
  NativeStackNavigationProp<RootStackParamList>
>;

type SearchScreenProps = {
  navigation: SearchScreenNavigationProp;
};

interface Filter {
  id: string;
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

interface RecentSearch {
  id: string;
  query: string;
  category: string;
}

interface TrendingItem {
  id: string;
  name: string;
  category: string;
  rating: number;
  badge?: string;
  gradient: string[];
}

interface SearchResult {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  rating: number;
  distance: string;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<TextInput>(null);

  const filters: Filter[] = [
    { id: "all", label: "All", icon: "view-grid" },
    { id: "food", label: "Food", icon: "food" },
    { id: "grocery", label: "Grocery", icon: "cart" },
    { id: "pharmacy", label: "Pharmacy", icon: "medical-bag" },
  ];

  const recentSearches: RecentSearch[] = [
    { id: "1", query: "Jollof rice", category: "Food" },
    { id: "2", query: "ShopRite", category: "Grocery" },
    { id: "3", query: "Pain relief", category: "Pharmacy" },
    { id: "4", query: "Pizza", category: "Food" },
  ];

  const trendingItems: TrendingItem[] = [
    {
      id: "1",
      name: "Mama Put Kitchen",
      category: "Nigerian Food",
      rating: 4.8,
      badge: "HOT",
      gradient: ["#FF6B00", "#E55A00"],
    },
    {
      id: "2",
      name: "ShopRite Ikeja",
      category: "Grocery Store",
      rating: 4.6,
      gradient: ["#00D084", "#00B872"],
    },
    {
      id: "3",
      name: "HealthPlus Pharmacy",
      category: "Pharmacy",
      rating: 4.9,
      gradient: ["#00B8A9", "#00A896"],
    },
  ];

  const [searchResults] = useState<SearchResult[]>([
    {
      id: "1",
      name: "The Place Restaurant",
      category: "Continental",
      subtitle: "Fine dining • ₦₦₦",
      rating: 4.7,
      distance: "1.2km",
    },
    {
      id: "2",
      name: "Chicken Republic",
      category: "Fast Food",
      subtitle: "Quick bites • ₦₦",
      rating: 4.5,
      distance: "0.8km",
    },
  ]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Simulate search - replace with actual API call
      setTimeout(() => {
        setIsSearching(false);
      }, 1000);
    }
  };

  const handleRecentSearchPress = (query: string) => {
    setSearchQuery(query);
    handleSearch();
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
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
          <Text style={styles.title}>SEARCH</Text>
          <Text style={styles.subtitle}>Find stores, products & more</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <View
            style={[
              styles.searchBar,
              searchQuery ? styles.searchBarActive : null,
            ]}
          >
            <MaterialCommunityIcons
              name="magnify"
              size={24}
              color={searchQuery ? "#0066FF" : "#666666"}
            />
            <TextInput
              ref={searchInputRef}
              style={styles.searchInput}
              placeholder="Search stores, products..."
              placeholderTextColor="#666666"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
              autoCapitalize="none"
            />
            {searchQuery ? (
              <TouchableOpacity
                onPress={clearSearch}
                style={styles.clearButton}
              >
                <MaterialCommunityIcons
                  name="close-circle"
                  size={20}
                  color="#666666"
                />
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Search button */}
          {searchQuery ? (
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={["#0066FF", "#0052CC"]}
                style={styles.searchButtonGradient}
              >
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={24}
                  color="#FFFFFF"
                />
              </LinearGradient>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScroll}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                activeFilter === filter.id && styles.filterChipActive,
              ]}
              onPress={() =>
                setActiveFilter(activeFilter === filter.id ? null : filter.id)
              }
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

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Show search results if searching */}
          {isSearching || searchQuery ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {isSearching ? "SEARCHING..." : "RESULTS"}
              </Text>
              {!isSearching && searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <TouchableOpacity
                    key={result.id}
                    style={styles.resultCard}
                    onPress={() =>
                      navigation.navigate("StoreDetails", {
                        storeId: result.id,
                        storeName: result.name,
                      })
                    }
                    activeOpacity={0.9}
                  >
                    <View style={styles.resultIcon}>
                      <MaterialCommunityIcons
                        name="store"
                        size={28}
                        color="#0066FF"
                      />
                    </View>
                    <View style={styles.resultContent}>
                      <Text style={styles.resultName}>{result.name}</Text>
                      <Text style={styles.resultSubtitle}>
                        {result.subtitle}
                      </Text>
                      <View style={styles.resultMeta}>
                        <View style={styles.ratingContainer}>
                          <MaterialCommunityIcons
                            name="star"
                            size={14}
                            color="#FFB800"
                          />
                          <Text style={styles.ratingText}>{result.rating}</Text>
                        </View>
                        <Text style={styles.distanceText}>
                          • {result.distance}
                        </Text>
                      </View>
                    </View>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={24}
                      color="#666666"
                    />
                  </TouchableOpacity>
                ))
              ) : !isSearching ? (
                <View style={styles.emptyState}>
                  <MaterialCommunityIcons
                    name="alert-circle-outline"
                    size={48}
                    color="#666666"
                  />
                  <Text style={styles.emptyText}>No results found</Text>
                  <Text style={styles.emptySubtext}>
                    Try searching for something else
                  </Text>
                </View>
              ) : null}
            </View>
          ) : (
            <>
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>RECENT SEARCHES</Text>
                    <TouchableOpacity>
                      <Text style={styles.clearAllText}>Clear All</Text>
                    </TouchableOpacity>
                  </View>
                  {recentSearches.map((search) => (
                    <TouchableOpacity
                      key={search.id}
                      style={styles.recentItem}
                      onPress={() => handleRecentSearchPress(search.query)}
                    >
                      <MaterialCommunityIcons
                        name="clock-outline"
                        size={20}
                        color="#888888"
                      />
                      <View style={styles.recentContent}>
                        <Text style={styles.recentQuery}>{search.query}</Text>
                        <Text style={styles.recentCategory}>
                          {search.category}
                        </Text>
                      </View>
                      <MaterialCommunityIcons
                        name="arrow-top-left"
                        size={18}
                        color="#666666"
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Trending Now */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>TRENDING NOW 🔥</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.trendingScroll}
                >
                  {trendingItems.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.trendingCard}
                      activeOpacity={0.9}
                    >
                      <LinearGradient
                        colors={item.gradient}
                        style={styles.trendingGradient}
                      >
                        {item.badge && (
                          <View style={styles.trendingBadge}>
                            <Text style={styles.badgeText}>{item.badge}</Text>
                          </View>
                        )}
                        <View style={styles.trendingIcon}>
                          <MaterialCommunityIcons
                            name="fire"
                            size={32}
                            color="#FFFFFF"
                          />
                        </View>
                      </LinearGradient>
                      <View style={styles.trendingContent}>
                        <Text style={styles.trendingName}>{item.name}</Text>
                        <Text style={styles.trendingCategory}>
                          {item.category}
                        </Text>
                        <View style={styles.trendingRating}>
                          <MaterialCommunityIcons
                            name="star"
                            size={14}
                            color="#FFB800"
                          />
                          <Text style={styles.ratingText}>{item.rating}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Popular Categories */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>POPULAR CATEGORIES</Text>
                <View style={styles.categoriesGrid}>
                  {[
                    {
                      name: "Fast Food",
                      icon: "food-fork-drink",
                      color: "#FF6B00",
                    },
                    { name: "Groceries", icon: "cart", color: "#00D084" },
                    { name: "Pharmacy", icon: "medical-bag", color: "#00B8A9" },
                    {
                      name: "Restaurants",
                      icon: "silverware-fork-knife",
                      color: "#DC3545",
                    },
                  ].map((category, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.categoryCard}
                      activeOpacity={0.9}
                    >
                      <View
                        style={[
                          styles.categoryIcon,
                          { backgroundColor: `${category.color}20` },
                        ]}
                      >
                        <MaterialCommunityIcons
                          name={category.icon as any}
                          size={28}
                          color={category.color}
                        />
                      </View>
                      <Text style={styles.categoryName}>{category.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </>
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
  searchBarContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A0A0A",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: "rgba(0, 102, 255, 0.1)",
  },
  searchBarActive: {
    borderColor: "#0066FF",
    backgroundColor: "rgba(0, 102, 255, 0.05)",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    paddingVertical: 16,
    paddingLeft: 12,
    letterSpacing: 0.3,
  },
  clearButton: {
    padding: 4,
  },
  searchButton: {
    width: 56,
    height: 56,
  },
  searchButtonGradient: {
    flex: 1,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
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
    color: "#000000",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 16,
  },
  clearAllText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0066FF",
    letterSpacing: 0.3,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A0A0A",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    gap: 12,
  },
  recentContent: {
    flex: 1,
  },
  recentQuery: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  recentCategory: {
    fontSize: 13,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  trendingScroll: {
    gap: 16,
    paddingRight: 20,
  },
  trendingCard: {
    width: 180,
    backgroundColor: "#0A0A0A",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  trendingGradient: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  trendingBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 1000,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  trendingIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  trendingContent: {
    padding: 12,
  },
  trendingName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  trendingCategory: {
    fontSize: 13,
    fontWeight: "500",
    color: "#888888",
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  trendingRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  categoryCard: {
    width: (width - 56) / 2,
    backgroundColor: "#0A0A0A",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: 0.3,
  },
  resultCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A0A0A",
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    gap: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  resultIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  resultContent: {
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  resultSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888888",
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  resultMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  distanceText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#666666",
    letterSpacing: 0.3,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 16,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  emptySubtext: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
});

export default SearchScreen;
