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
import type { RootStackParamList } from "../../types/navigation";

type GroceryStoreScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "GroceryStore">;
  route: RouteProp<RootStackParamList, "GroceryStore">;
};

interface GroceryProduct {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: string;
  image: string;
  inStock: boolean;
  discount?: number;
  originalPrice?: number;
}

const GroceryStoreScreen: React.FC<GroceryStoreScreenProps> = ({
  navigation,
  route,
}) => {
  const { storeId, storeName } = route.params;
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [cartCount, setCartCount] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "popular", label: "Popular", icon: "fire" },
    { id: "fresh", label: "Fresh Produce", icon: "food-apple" },
    { id: "dairy", label: "Dairy", icon: "bottle-soda" },
    { id: "meat", label: "Meat & Fish", icon: "food-steak" },
    { id: "bakery", label: "Bakery", icon: "baguette" },
    { id: "beverages", label: "Beverages", icon: "cup" },
    { id: "snacks", label: "Snacks", icon: "cookie" },
    { id: "household", label: "Household", icon: "spray-bottle" },
  ];

  const products: GroceryProduct[] = [
    {
      id: "1",
      name: "Fresh Tomatoes",
      price: 800,
      unit: "per kg",
      category: "fresh",
      image: "",
      inStock: true,
      discount: 10,
      originalPrice: 900,
    },
    {
      id: "2",
      name: "White Rice (Golden Penny)",
      price: 2500,
      unit: "per 5kg",
      category: "popular",
      image: "",
      inStock: true,
    },
    {
      id: "3",
      name: "Fresh Milk (Peak)",
      price: 1200,
      unit: "per liter",
      category: "dairy",
      image: "",
      inStock: true,
    },
    {
      id: "4",
      name: "Chicken Breast",
      price: 3500,
      unit: "per kg",
      category: "meat",
      image: "",
      inStock: true,
    },
    {
      id: "5",
      name: "Sliced Bread",
      price: 600,
      unit: "per loaf",
      category: "bakery",
      image: "",
      inStock: false,
    },
    {
      id: "6",
      name: "Coca-Cola (1.5L)",
      price: 500,
      unit: "per bottle",
      category: "beverages",
      image: "",
      inStock: true,
      discount: 15,
      originalPrice: 600,
    },
  ];

  const handleProductPress = (product: GroceryProduct) => {
    navigation.navigate("GroceryProduct", {
      productId: product.id,
      storeId,
    });
  };

  const handleAddToCart = (product: GroceryProduct) => {
    setCartCount((prev) => prev + 1);
  };

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "popular" ||
        product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <LinearGradient
        colors={["#000000", "#0A0A0A", "#000000"]}
        style={styles.background}
      />

      {/* Store Header */}
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
            <Text style={styles.storeName}>{storeName}</Text>
            <View style={styles.storeInfo}>
              <MaterialCommunityIcons name="star" size={14} color="#FFB800" />
              <Text style={styles.storeRating}>4.6</Text>
              <Text style={styles.storeDot}>•</Text>
              <Text style={styles.storeTime}>30-40 min</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.headerButton}>
            <MaterialCommunityIcons
              name="heart-outline"
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={20} color="#888888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
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

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <MaterialCommunityIcons
              name={category.icon as any}
              size={20}
              color={selectedCategory === category.id ? "#FFFFFF" : "#888888"}
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products Grid */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={[
                styles.productCard,
                !product.inStock && styles.productCardOutOfStock,
              ]}
              onPress={() => handleProductPress(product)}
              activeOpacity={0.9}
              disabled={!product.inStock}
            >
              {/* Product Image */}
              <View style={styles.productImage}>
                <LinearGradient
                  colors={["#00D084", "#00B872"]}
                  style={styles.productImageGradient}
                >
                  <MaterialCommunityIcons
                    name="food-apple"
                    size={32}
                    color="#FFFFFF"
                  />
                </LinearGradient>

                {/* Discount Badge */}
                {product.discount && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>
                      {product.discount}% OFF
                    </Text>
                  </View>
                )}

                {/* Out of Stock Overlay */}
                {!product.inStock && (
                  <View style={styles.outOfStockOverlay}>
                    <Text style={styles.outOfStockText}>Out of Stock</Text>
                  </View>
                )}
              </View>

              {/* Product Info */}
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>
                  {product.name}
                </Text>
                <Text style={styles.productUnit}>{product.unit}</Text>

                {/* Price */}
                <View style={styles.priceContainer}>
                  <Text style={styles.productPrice}>
                    ₦{product.price.toLocaleString("en-NG")}
                  </Text>
                  {product.originalPrice && (
                    <Text style={styles.originalPrice}>
                      ₦{product.originalPrice.toLocaleString("en-NG")}
                    </Text>
                  )}
                </View>

                {/* Add Button */}
                {product.inStock && (
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => handleAddToCart(product)}
                  >
                    <LinearGradient
                      colors={["#00D084", "#00B872"]}
                      style={styles.addButtonGradient}
                    >
                      <MaterialCommunityIcons
                        name="plus"
                        size={20}
                        color="#FFFFFF"
                      />
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="basket-off"
              size={64}
              color="#666666"
            />
            <Text style={styles.emptyTitle}>No Products Found</Text>
            <Text style={styles.emptySubtitle}>Try adjusting your search</Text>
          </View>
        )}
      </ScrollView>

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate("GroceryCart", { storeId })}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={["#00D084", "#00B872"]}
            style={styles.cartGradient}
          >
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
            <Text style={styles.cartText}>View Cart</Text>
            <MaterialCommunityIcons
              name="arrow-right"
              size={24}
              color="#FFFFFF"
            />
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
  storeName: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  storeInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  storeRating: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  storeDot: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
  },
  storeTime: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.8)",
    letterSpacing: 0.3,
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
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 10,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#0A0A0A",
    borderRadius: 1000,
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  categoryChipActive: {
    backgroundColor: "#00D084",
    borderColor: "#00D084",
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#888888",
    letterSpacing: 0.3,
  },
  categoryTextActive: {
    color: "#FFFFFF",
  },
  scrollContent: {
    paddingBottom: 140,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 14,
    gap: 12,
  },
  productCard: {
    width: "47.5%",
    backgroundColor: "#0A0A0A",
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  productCardOutOfStock: {
    opacity: 0.5,
  },
  productImage: {
    width: "100%",
    height: 120,
    marginBottom: 12,
    position: "relative",
  },
  productImageGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#DC3545",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 1000,
  },
  discountText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  outOfStockOverlay: {
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
  outOfStockText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  productInfo: {
    gap: 6,
  },
  productName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    lineHeight: 18,
  },
  productUnit: {
    fontSize: 11,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "900",
    color: "#00D084",
    letterSpacing: 0.3,
  },
  originalPrice: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666666",
    textDecorationLine: "line-through",
    letterSpacing: 0.3,
  },
  addButton: {
    marginTop: 4,
    borderRadius: 1000,
  },
  addButtonGradient: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
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
  cartButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 1000,
    shadowColor: "#00D084",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  cartGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 1000,
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
    color: "#00D084",
    letterSpacing: 0.3,
  },
  cartText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default GroceryStoreScreen;
