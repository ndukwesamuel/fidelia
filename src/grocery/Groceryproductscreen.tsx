import React, { useState } from "react";
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
import type { RootStackParamList } from "../navigation/navigation"; //"../../types/navigation";

type GroceryProductScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "GroceryProduct">;
  route: RouteProp<RootStackParamList, "GroceryProduct">;
};

interface WeightOption {
  id: string;
  value: number;
  unit: string;
  price: number;
  label: string;
}

const GroceryProductScreen: React.FC<GroceryProductScreenProps> = ({
  navigation,
  route,
}) => {
  const { productId, storeId } = route.params;
  const [selectedWeight, setSelectedWeight] = useState("1");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = {
    id: productId,
    name: "Fresh Tomatoes",
    brand: "Farm Fresh",
    category: "Fresh Produce",
    description:
      "Premium quality fresh tomatoes, hand-picked from local farms. Perfect for salads, cooking, and making fresh sauces. Rich in vitamins and antioxidants.",
    rating: 4.6,
    reviews: 234,
    inStock: true,
    expiryDate: "5 days from delivery",
    tags: ["Fresh", "Organic", "Locally Sourced"],
  };

  const weightOptions: WeightOption[] = [
    { id: "1", value: 0.5, unit: "kg", price: 400, label: "0.5kg" },
    { id: "2", value: 1, unit: "kg", price: 800, label: "1kg" },
    { id: "3", value: 2, unit: "kg", price: 1500, label: "2kg" },
    { id: "4", value: 5, unit: "kg", price: 3500, label: "5kg" },
  ];

  const nutritionalInfo = [
    { label: "Calories", value: "18 kcal", icon: "fire" },
    { label: "Protein", value: "0.9g", icon: "dumbbell" },
    { label: "Carbs", value: "3.9g", icon: "bowl-mix" },
    { label: "Fiber", value: "1.2g", icon: "leaf" },
  ];

  const selectedOption = weightOptions.find((opt) => opt.id === selectedWeight);
  const totalPrice = selectedOption ? selectedOption.price * quantity : 0;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Add to cart logic
    navigation.goBack();
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
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <LinearGradient
            colors={["#00D084", "#00B872"]}
            style={styles.imageGradient}
          >
            <MaterialCommunityIcons
              name="food-apple"
              size={80}
              color="#FFFFFF"
            />
          </LinearGradient>

          {/* Back Button */}
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

          {/* Favorite Button */}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <MaterialCommunityIcons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? "#DC3545" : "#FFFFFF"}
            />
          </TouchableOpacity>

          {/* In Stock Badge */}
          {product.inStock && (
            <View style={styles.stockBadge}>
              <MaterialCommunityIcons
                name="check-circle"
                size={16}
                color="#00D084"
              />
              <Text style={styles.stockText}>In Stock</Text>
            </View>
          )}
        </View>

        {/* Product Info Card */}
        <View style={styles.productCard}>
          <View style={styles.productHeader}>
            <View style={styles.productTitleContainer}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productBrand}>{product.brand}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <MaterialCommunityIcons name="star" size={18} color="#FFB800" />
              <Text style={styles.ratingText}>{product.rating}</Text>
              <Text style={styles.reviewsText}>({product.reviews})</Text>
            </View>
          </View>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {product.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          {/* Description */}
          <Text style={styles.descriptionTitle}>About this product</Text>
          <Text style={styles.descriptionText}>{product.description}</Text>

          {/* Expiry Info */}
          <View style={styles.expiryCard}>
            <MaterialCommunityIcons
              name="calendar-clock"
              size={20}
              color="#FFB800"
            />
            <Text style={styles.expiryText}>
              Best consumed within: {product.expiryDate}
            </Text>
          </View>
        </View>

        {/* Weight Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SELECT WEIGHT</Text>
          <View style={styles.weightOptions}>
            {weightOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.weightChip,
                  selectedWeight === option.id && styles.weightChipSelected,
                ]}
                onPress={() => setSelectedWeight(option.id)}
              >
                <Text
                  style={[
                    styles.weightLabel,
                    selectedWeight === option.id && styles.weightLabelSelected,
                  ]}
                >
                  {option.label}
                </Text>
                <Text
                  style={[
                    styles.weightPrice,
                    selectedWeight === option.id && styles.weightPriceSelected,
                  ]}
                >
                  ₦{option.price.toLocaleString("en-NG")}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Nutritional Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NUTRITIONAL INFO (per 100g)</Text>
          <View style={styles.nutritionGrid}>
            {nutritionalInfo.map((info, index) => (
              <View key={index} style={styles.nutritionItem}>
                <View style={styles.nutritionIcon}>
                  <MaterialCommunityIcons
                    name={info.icon as any}
                    size={24}
                    color="#00D084"
                  />
                </View>
                <Text style={styles.nutritionLabel}>{info.label}</Text>
                <Text style={styles.nutritionValue}>{info.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quantity Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>QUANTITY</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={[
                styles.quantityButton,
                quantity === 1 && styles.quantityButtonDisabled,
              ]}
              onPress={() => handleQuantityChange(-1)}
              disabled={quantity === 1}
            >
              <MaterialCommunityIcons
                name="minus"
                size={24}
                color={quantity === 1 ? "#666666" : "#FFFFFF"}
              />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={[
                styles.quantityButton,
                quantity === 99 && styles.quantityButtonDisabled,
              ]}
              onPress={() => handleQuantityChange(1)}
              disabled={quantity === 99}
            >
              <MaterialCommunityIcons
                name="plus"
                size={24}
                color={quantity === 99 ? "#666666" : "#FFFFFF"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Similar Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>YOU MAY ALSO LIKE</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.similarProducts}
          >
            {[1, 2, 3].map((item) => (
              <View key={item} style={styles.similarCard}>
                <LinearGradient
                  colors={["#00D084", "#00B872"]}
                  style={styles.similarImage}
                >
                  <MaterialCommunityIcons
                    name="food-apple"
                    size={32}
                    color="#FFFFFF"
                  />
                </LinearGradient>
                <Text style={styles.similarName}>Fresh Onions</Text>
                <Text style={styles.similarPrice}>₦600/kg</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Add to Cart Footer */}
      <View style={styles.footer}>
        <View style={styles.priceInfo}>
          <Text style={styles.priceLabel}>Total Price</Text>
          <Text style={styles.priceValue}>
            ₦{totalPrice.toLocaleString("en-NG")}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddToCart}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={["#00D084", "#00B872"]}
            style={styles.addGradient}
          >
            <MaterialCommunityIcons
              name="cart-plus"
              size={24}
              color="#FFFFFF"
            />
            <Text style={styles.addText}>Add to Cart</Text>
          </LinearGradient>
        </TouchableOpacity>
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
  scrollContent: {
    paddingBottom: 120,
  },
  imageContainer: {
    height: 280,
    position: "relative",
  },
  imageGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteButton: {
    position: "absolute",
    top: 60,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  stockBadge: {
    position: "absolute",
    bottom: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 208, 132, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 1000,
    gap: 6,
    borderWidth: 1,
    borderColor: "#00D084",
  },
  stockText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#00D084",
    letterSpacing: 0.5,
  },
  productCard: {
    backgroundColor: "#0A0A0A",
    marginHorizontal: 20,
    marginTop: -40,
    padding: 20,
    borderRadius: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  productTitleContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  reviewsText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(0, 208, 132, 0.1)",
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "rgba(0, 208, 132, 0.3)",
  },
  tagText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#00D084",
    letterSpacing: 0.3,
  },
  descriptionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
    lineHeight: 22,
    marginBottom: 16,
  },
  expiryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 184, 0, 0.1)",
    padding: 12,
    borderRadius: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 184, 0, 0.3)",
  },
  expiryText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "700",
    color: "#FFB800",
    letterSpacing: 0.3,
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
  weightOptions: {
    flexDirection: "row",
    gap: 10,
  },
  weightChip: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  weightChipSelected: {
    backgroundColor: "rgba(0, 208, 132, 0.1)",
    borderColor: "#00D084",
  },
  weightLabel: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  weightLabelSelected: {
    color: "#00D084",
  },
  weightPrice: {
    fontSize: 13,
    fontWeight: "700",
    color: "#888888",
    letterSpacing: 0.3,
  },
  weightPriceSelected: {
    color: "#00D084",
  },
  nutritionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  nutritionItem: {
    width: "47.5%",
    backgroundColor: "#0A0A0A",
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  nutritionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0, 208, 132, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  nutritionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#888888",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  quantityButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(0, 208, 132, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(0, 208, 132, 0.3)",
  },
  quantityButtonDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  quantityText: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    minWidth: 60,
    textAlign: "center",
  },
  similarProducts: {
    gap: 12,
  },
  similarCard: {
    width: 120,
    backgroundColor: "#0A0A0A",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  similarImage: {
    width: "100%",
    height: 80,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  similarName: {
    fontSize: 13,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  similarPrice: {
    fontSize: 12,
    fontWeight: "700",
    color: "#00D084",
    letterSpacing: 0.3,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#0A0A0A",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    gap: 16,
  },
  priceInfo: {
    justifyContent: "center",
  },
  priceLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 24,
    fontWeight: "900",
    color: "#00D084",
    letterSpacing: 0.5,
  },
  addButton: {
    flex: 1,
    borderRadius: 1000,
  },
  addGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 1000,
    gap: 10,
    shadowColor: "#00D084",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  addText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});

export default GroceryProductScreen;
