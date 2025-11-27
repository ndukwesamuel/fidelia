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
import type { RootStackParamList } from "../types/navigation";

const { width } = Dimensions.get("window");

type ProductDetailsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "ProductDetails">;
  route: RouteProp<RootStackParamList, "ProductDetails">;
};

interface CustomizationOption {
  id: string;
  name: string;
  options: {
    id: string;
    name: string;
    price: number;
  }[];
  required: boolean;
  multiple: boolean;
}

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const { productId, storeId } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >({});
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  // Product Data
  const product = {
    id: productId,
    name: "Jollof Rice & Chicken",
    description:
      "Spicy Nigerian jollof rice served with perfectly grilled chicken, fried plantain, and coleslaw. A customer favorite!",
    price: 2500,
    image: "",
    rating: 4.8,
    reviews: 124,
    prepTime: "15-20 min",
    calories: "650 kcal",
    isPopular: true,
    tags: ["Spicy", "Nigerian", "Popular"],
    storeName: "Mama Put Kitchen",
  };

  // Customization Options
  const customizations: CustomizationOption[] = [
    {
      id: "1",
      name: "Protein Choice",
      required: true,
      multiple: false,
      options: [
        { id: "1", name: "Grilled Chicken", price: 0 },
        { id: "2", name: "Fried Chicken", price: 200 },
        { id: "3", name: "Fish", price: 500 },
        { id: "4", name: "Beef", price: 300 },
      ],
    },
    {
      id: "2",
      name: "Spice Level",
      required: true,
      multiple: false,
      options: [
        { id: "1", name: "Mild", price: 0 },
        { id: "2", name: "Medium", price: 0 },
        { id: "3", name: "Hot", price: 0 },
        { id: "4", name: "Extra Hot 🔥", price: 0 },
      ],
    },
    {
      id: "3",
      name: "Add-ons",
      required: false,
      multiple: true,
      options: [
        { id: "1", name: "Extra Plantain", price: 300 },
        { id: "2", name: "Coleslaw", price: 200 },
        { id: "3", name: "Moi Moi", price: 400 },
        { id: "4", name: "Extra Sauce", price: 100 },
      ],
    },
  ];

  const handleOptionSelect = (
    customizationId: string,
    optionId: string,
    multiple: boolean
  ) => {
    setSelectedOptions((prev) => {
      const current = prev[customizationId] || [];

      if (multiple) {
        // Toggle for multiple selection
        if (current.includes(optionId)) {
          return {
            ...prev,
            [customizationId]: current.filter((id) => id !== optionId),
          };
        } else {
          return {
            ...prev,
            [customizationId]: [...current, optionId],
          };
        }
      } else {
        // Single selection
        return {
          ...prev,
          [customizationId]: [optionId],
        };
      }
    });
  };

  const isOptionSelected = (customizationId: string, optionId: string) => {
    return selectedOptions[customizationId]?.includes(optionId) || false;
  };

  const calculateTotal = () => {
    let total = product.price * quantity;

    // Add prices from selected options
    customizations.forEach((customization) => {
      const selected = selectedOptions[customization.id] || [];
      selected.forEach((optionId) => {
        const option = customization.options.find((opt) => opt.id === optionId);
        if (option) {
          total += option.price * quantity;
        }
      });
    });

    return total;
  };

  const canAddToCart = () => {
    // Check if all required customizations are selected
    return customizations.every((customization) => {
      if (customization.required) {
        const selected = selectedOptions[customization.id] || [];
        return selected.length > 0;
      }
      return true;
    });
  };

  const handleAddToCart = () => {
    if (canAddToCart()) {
      // Add to cart logic here
      navigation.goBack();
    }
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <LinearGradient
        colors={["#000000", "#0A0A0A", "#000000"]}
        style={styles.background}
      />

      {/* Product Image Header */}
      <View style={styles.imageHeader}>
        <LinearGradient
          colors={["#FF6B00", "#E55A00"]}
          style={styles.imageGradient}
        >
          <MaterialCommunityIcons name="food" size={80} color="#FFFFFF" />
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

          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <MaterialCommunityIcons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? "#DC3545" : "#FFFFFF"}
            />
          </TouchableOpacity>
        </View>

        {/* Popular Badge */}
        {product.isPopular && (
          <View style={styles.popularBadge}>
            <MaterialCommunityIcons name="fire" size={16} color="#FFFFFF" />
            <Text style={styles.popularText}>POPULAR</Text>
          </View>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Product Info Card */}
        <View style={styles.productInfoCard}>
          <View style={styles.productHeader}>
            <View style={styles.productHeaderLeft}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.storeName}>{product.storeName}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <MaterialCommunityIcons name="star" size={18} color="#FFB800" />
              <Text style={styles.ratingText}>{product.rating}</Text>
              <Text style={styles.reviewsText}>({product.reviews})</Text>
            </View>
          </View>

          <Text style={styles.description}>{product.description}</Text>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {product.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          {/* Info Row */}
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={18}
                color="#0066FF"
              />
              <Text style={styles.infoText}>{product.prepTime}</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="fire" size={18} color="#FF6B00" />
              <Text style={styles.infoText}>{product.calories}</Text>
            </View>
          </View>
        </View>

        {/* Customizations */}
        {customizations.map((customization) => (
          <View key={customization.id} style={styles.customizationSection}>
            <View style={styles.customizationHeader}>
              <Text style={styles.customizationTitle}>
                {customization.name}
              </Text>
              {customization.required ? (
                <View style={styles.requiredBadge}>
                  <Text style={styles.requiredText}>REQUIRED</Text>
                </View>
              ) : (
                <Text style={styles.optionalText}>Optional</Text>
              )}
            </View>

            {customization.multiple && (
              <Text style={styles.customizationSubtitle}>
                Select multiple options
              </Text>
            )}

            <View style={styles.optionsContainer}>
              {customization.options.map((option) => {
                const isSelected = isOptionSelected(
                  customization.id,
                  option.id
                );
                return (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionCard,
                      isSelected && styles.optionCardSelected,
                    ]}
                    onPress={() =>
                      handleOptionSelect(
                        customization.id,
                        option.id,
                        customization.multiple
                      )
                    }
                    activeOpacity={0.9}
                  >
                    <View style={styles.optionLeft}>
                      <View
                        style={[
                          styles.radioButton,
                          isSelected && styles.radioButtonSelected,
                        ]}
                      >
                        {isSelected && <View style={styles.radioButtonInner} />}
                      </View>
                      <Text style={styles.optionName}>{option.name}</Text>
                    </View>
                    {option.price > 0 && (
                      <Text style={styles.optionPrice}>
                        +₦{option.price.toLocaleString("en-NG")}
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {/* Special Instructions */}
        <View style={styles.instructionsSection}>
          <Text style={styles.instructionsTitle}>Special Instructions</Text>
          <Text style={styles.instructionsSubtitle}>
            Any specific preferences? Let us know!
          </Text>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="note-text-outline"
              size={20}
              color="#666666"
            />
            <TextInput
              style={styles.input}
              placeholder="e.g., No onions, extra spicy..."
              placeholderTextColor="#666666"
              value={specialInstructions}
              onChangeText={setSpecialInstructions}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Quantity Section */}
        <View style={styles.quantitySection}>
          <Text style={styles.quantityTitle}>Quantity</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              <MaterialCommunityIcons
                name="minus"
                size={20}
                color={quantity <= 1 ? "#666666" : "#FFFFFF"}
              />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(1)}
              disabled={quantity >= 99}
            >
              <MaterialCommunityIcons
                name="plus"
                size={20}
                color={quantity >= 99 ? "#666666" : "#FFFFFF"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>
            ₦{calculateTotal().toLocaleString("en-NG")}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.addToCartButton,
            !canAddToCart() && styles.addToCartButtonDisabled,
          ]}
          onPress={handleAddToCart}
          disabled={!canAddToCart()}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={
              canAddToCart() ? ["#0066FF", "#0052CC"] : ["#333333", "#1A1A1A"]
            }
            style={styles.addToCartGradient}
          >
            <MaterialCommunityIcons
              name="cart-plus"
              size={24}
              color="#FFFFFF"
            />
            <Text style={styles.addToCartText}>Add to Cart</Text>
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
  imageHeader: {
    height: 280,
    position: "relative",
  },
  imageGradient: {
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
  popularBadge: {
    position: "absolute",
    top: 120,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 1000,
    gap: 6,
  },
  popularText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFB800",
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  productInfoCard: {
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
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  productHeaderLeft: {
    flex: 1,
    marginRight: 12,
  },
  productName: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  storeName: {
    fontSize: 13,
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
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  reviewsText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 14,
    fontWeight: "500",
    color: "#CCCCCC",
    lineHeight: 22,
    letterSpacing: 0.3,
    marginBottom: 16,
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
    fontSize: 11,
    fontWeight: "700",
    color: "#0066FF",
    letterSpacing: 0.3,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  infoItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  infoDivider: {
    width: 1,
    height: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  customizationSection: {
    backgroundColor: "#0A0A0A",
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  customizationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  customizationTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  requiredBadge: {
    backgroundColor: "rgba(220, 53, 69, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "rgba(220, 53, 69, 0.3)",
  },
  requiredText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#DC3545",
    letterSpacing: 0.5,
  },
  optionalText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
  },
  customizationSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
    marginBottom: 12,
  },
  optionsContainer: {
    gap: 10,
  },
  optionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  optionCardSelected: {
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    borderColor: "#0066FF",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#0066FF",
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#0066FF",
  },
  optionName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  optionPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#00D084",
    letterSpacing: 0.3,
  },
  instructionsSection: {
    backgroundColor: "#0A0A0A",
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  instructionsSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderRadius: 12,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    minHeight: 60,
  },
  quantitySection: {
    backgroundColor: "#0A0A0A",
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  quantityTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  quantityButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 102, 255, 0.3)",
  },
  quantityText: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    minWidth: 60,
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#000000",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
  },
  totalAmount: {
    fontSize: 28,
    fontWeight: "900",
    color: "#00D084",
    letterSpacing: 0.5,
  },
  addToCartButton: {
    borderRadius: 1000,
  },
  addToCartButtonDisabled: {
    opacity: 0.5,
  },
  addToCartGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 1000,
    gap: 12,
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});

export default ProductDetailsScreen;
