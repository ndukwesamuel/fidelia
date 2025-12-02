import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../types/navigation";

type GroceryCartScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "GroceryCart">;
  route: RouteProp<RootStackParamList, "GroceryCart">;
};

interface CartItem {
  id: string;
  name: string;
  weight: string;
  price: number;
  quantity: number;
  image: string;
  unit: string;
}

const GroceryCartScreen: React.FC<GroceryCartScreenProps> = ({
  navigation,
  route,
}) => {
  const { storeId } = route.params;
  const [allowSubstitutions, setAllowSubstitutions] = useState(true);
  const [shoppingNotes, setShoppingNotes] = useState("");

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Fresh Tomatoes",
      weight: "1kg",
      price: 800,
      quantity: 2,
      image: "",
      unit: "kg",
    },
    {
      id: "2",
      name: "White Rice (Golden Penny)",
      weight: "5kg",
      price: 2500,
      quantity: 1,
      image: "",
      unit: "bag",
    },
    {
      id: "3",
      name: "Fresh Milk (Peak)",
      weight: "1L",
      price: 1200,
      quantity: 2,
      image: "",
      unit: "liter",
    },
    {
      id: "4",
      name: "Chicken Breast",
      weight: "1kg",
      price: 3500,
      quantity: 1,
      image: "",
      unit: "kg",
    },
  ]);

  const storeName = "Shoprite";
  const deliveryFee = 500;
  const serviceFee = 200;
  const savings = 450;

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + deliveryFee + serviceFee - savings;
  };

  const handleQuantityChange = (itemId: string, delta: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === itemId) {
            const newQuantity = item.quantity + delta;
            if (newQuantity <= 0) return null;
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleProceed = () => {
    navigation.navigate("GroceryDeliverySlot", {
      cartItems,
      storeId,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <LinearGradient
        colors={["#000000", "#0A0A0A", "#000000"]}
        style={styles.background}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>MY CART</Text>
          <Text style={styles.headerSubtitle}>
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </Text>
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialCommunityIcons
            name="delete-outline"
            size={24}
            color="#DC3545"
          />
        </TouchableOpacity>
      </View>

      {cartItems.length === 0 ? (
        // Empty Cart State
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <MaterialCommunityIcons
              name="cart-outline"
              size={80}
              color="#666666"
            />
          </View>
          <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Add items from stores to get started
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() =>
              navigation.navigate("GroceryStack", {
                screen: "GroceryCategories",
              })
            }
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={["#00D084", "#00B872"]}
              style={styles.browseButtonGradient}
            >
              <MaterialCommunityIcons name="store" size={20} color="#FFFFFF" />
              <Text style={styles.browseButtonText}>Browse Stores</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Store Section */}
            <View style={styles.storeSection}>
              <View style={styles.storeHeader}>
                <View style={styles.storeIconContainer}>
                  <MaterialCommunityIcons
                    name="store"
                    size={24}
                    color="#00D084"
                  />
                </View>
                <View style={styles.storeInfo}>
                  <Text style={styles.storeName}>{storeName}</Text>
                  <Text style={styles.storeSubtitle}>
                    {cartItems.length} items in cart
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color="#666666"
                />
              </View>
            </View>

            {/* Cart Items */}
            <View style={styles.itemsSection}>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartItemCard}>
                  {/* Item Image */}
                  <View style={styles.itemImage}>
                    <LinearGradient
                      colors={["#00D084", "#00B872"]}
                      style={styles.itemImageGradient}
                    >
                      <MaterialCommunityIcons
                        name="food-apple"
                        size={28}
                        color="#FFFFFF"
                      />
                    </LinearGradient>
                  </View>

                  {/* Item Details */}
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemWeight}>{item.weight}</Text>

                    {/* Price and Controls */}
                    <View style={styles.itemFooter}>
                      <Text style={styles.itemPrice}>
                        ₦{(item.price * item.quantity).toLocaleString("en-NG")}
                      </Text>

                      <View style={styles.quantityControls}>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => handleQuantityChange(item.id, -1)}
                        >
                          <MaterialCommunityIcons
                            name={item.quantity === 1 ? "delete" : "minus"}
                            size={16}
                            color={item.quantity === 1 ? "#DC3545" : "#FFFFFF"}
                          />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => handleQuantityChange(item.id, 1)}
                        >
                          <MaterialCommunityIcons
                            name="plus"
                            size={16}
                            color="#FFFFFF"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  {/* Remove Button */}
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveItem(item.id)}
                  >
                    <MaterialCommunityIcons
                      name="close"
                      size={18}
                      color="#DC3545"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Substitution Preferences */}
            <View style={styles.preferencesSection}>
              <View style={styles.sectionHeader}>
                <MaterialCommunityIcons
                  name="swap-horizontal"
                  size={20}
                  color="#0066FF"
                />
                <Text style={styles.sectionTitle}>Item Substitutions</Text>
              </View>

              <View style={styles.switchCard}>
                <View style={styles.switchContent}>
                  <View style={styles.switchIcon}>
                    <MaterialCommunityIcons
                      name="autorenew"
                      size={24}
                      color="#00D084"
                    />
                  </View>
                  <View style={styles.switchInfo}>
                    <Text style={styles.switchTitle}>Allow Substitutions</Text>
                    <Text style={styles.switchSubtitle}>
                      Let shopper replace unavailable items with similar
                      alternatives
                    </Text>
                  </View>
                </View>
                <Switch
                  value={allowSubstitutions}
                  onValueChange={setAllowSubstitutions}
                  trackColor={{ false: "#666666", true: "#00D084" }}
                  thumbColor="#FFFFFF"
                  ios_backgroundColor="#666666"
                />
              </View>

              {allowSubstitutions && (
                <View style={styles.infoCard}>
                  <MaterialCommunityIcons
                    name="information"
                    size={18}
                    color="#0066FF"
                  />
                  <Text style={styles.infoText}>
                    You'll be notified before any substitutions are made
                  </Text>
                </View>
              )}
            </View>

            {/* Shopping Notes */}
            <View style={styles.notesSection}>
              <View style={styles.sectionHeader}>
                <MaterialCommunityIcons
                  name="note-text"
                  size={20}
                  color="#FFB800"
                />
                <Text style={styles.sectionTitle}>Shopping Notes</Text>
                <Text style={styles.optionalBadge}>Optional</Text>
              </View>

              <View style={styles.notesInput}>
                <TextInput
                  style={styles.notesTextArea}
                  placeholder="Add special instructions for your shopper..."
                  placeholderTextColor="#666666"
                  value={shoppingNotes}
                  onChangeText={setShoppingNotes}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </View>

            {/* Delivery Slot CTA */}
            <TouchableOpacity
              style={styles.slotCard}
              onPress={handleProceed}
              activeOpacity={0.9}
            >
              <View style={styles.slotIcon}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={24}
                  color="#00D084"
                />
              </View>
              <View style={styles.slotContent}>
                <Text style={styles.slotTitle}>Choose Delivery Slot</Text>
                <Text style={styles.slotSubtitle}>
                  Select your preferred delivery time
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="#666666"
              />
            </TouchableOpacity>

            {/* Bill Summary */}
            <View style={styles.billSection}>
              <Text style={styles.billTitle}>BILL SUMMARY</Text>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>
                  Subtotal ({cartItems.length} items)
                </Text>
                <Text style={styles.billValue}>
                  ₦{calculateSubtotal().toLocaleString("en-NG")}
                </Text>
              </View>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Delivery Fee</Text>
                <Text style={styles.billValue}>
                  ₦{deliveryFee.toLocaleString("en-NG")}
                </Text>
              </View>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Service Fee</Text>
                <Text style={styles.billValue}>
                  ₦{serviceFee.toLocaleString("en-NG")}
                </Text>
              </View>

              {savings > 0 && (
                <View style={styles.billRow}>
                  <Text style={[styles.billLabel, styles.savingsLabel]}>
                    Total Savings
                  </Text>
                  <Text style={[styles.billValue, styles.savingsValue]}>
                    -₦{savings.toLocaleString("en-NG")}
                  </Text>
                </View>
              )}

              <View style={styles.billDivider} />

              <View style={styles.billRow}>
                <Text style={styles.billTotalLabel}>Grand Total</Text>
                <Text style={styles.billTotalValue}>
                  ₦{calculateTotal().toLocaleString("en-NG")}
                </Text>
              </View>
            </View>

            {/* Savings Badge */}
            {savings > 0 && (
              <View style={styles.savingsBadge}>
                <MaterialCommunityIcons name="tag" size={20} color="#00D084" />
                <Text style={styles.savingsText}>
                  You're saving ₦{savings.toLocaleString("en-NG")} on this
                  order! 🎉
                </Text>
              </View>
            )}
          </ScrollView>

          {/* Proceed Button */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.proceedButton}
              onPress={handleProceed}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={["#00D084", "#00B872"]}
                style={styles.proceedGradient}
              >
                <View style={styles.proceedContent}>
                  <View>
                    <Text style={styles.proceedLabel}>Total</Text>
                    <Text style={styles.proceedAmount}>
                      ₦{calculateTotal().toLocaleString("en-NG")}
                    </Text>
                  </View>
                  <View style={styles.proceedRight}>
                    <Text style={styles.proceedText}>Select Delivery Slot</Text>
                    <MaterialCommunityIcons
                      name="arrow-right"
                      size={24}
                      color="#FFFFFF"
                    />
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#0A0A0A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
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
    color: "#888888",
    letterSpacing: 0.3,
    marginTop: 2,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#0A0A0A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#0A0A0A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888888",
    textAlign: "center",
    letterSpacing: 0.3,
    marginBottom: 32,
  },
  browseButton: {
    width: "100%",
    borderRadius: 1000,
  },
  browseButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 1000,
    gap: 12,
  },
  browseButtonText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  storeSection: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  storeHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A0A0A",
    padding: 16,
    borderRadius: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  storeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0, 208, 132, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  storeSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  itemsSection: {
    marginHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  cartItemCard: {
    flexDirection: "row",
    backgroundColor: "#0A0A0A",
    borderRadius: 20,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    position: "relative",
  },
  itemImage: {
    width: 80,
    height: 80,
  },
  itemImageGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  itemWeight: {
    fontSize: 12,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
    marginBottom: 8,
  },
  itemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: "#00D084",
    letterSpacing: 0.3,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0, 208, 132, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 208, 132, 0.3)",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    minWidth: 24,
    textAlign: "center",
  },
  removeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(220, 53, 69, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  preferencesSection: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    flex: 1,
  },
  optionalBadge: {
    fontSize: 10,
    fontWeight: "700",
    color: "#888888",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  switchCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0A0A0A",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  switchContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  switchIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0, 208, 132, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  switchInfo: {
    flex: 1,
  },
  switchTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  switchSubtitle: {
    fontSize: 11,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
    lineHeight: 16,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 102, 255, 0.05)",
    padding: 12,
    borderRadius: 12,
    gap: 10,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 102, 255, 0.2)",
  },
  infoText: {
    flex: 1,
    fontSize: 11,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
    lineHeight: 16,
  },
  notesSection: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  notesInput: {
    backgroundColor: "#0A0A0A",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  notesTextArea: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    padding: 16,
    minHeight: 100,
  },
  slotCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 208, 132, 0.05)",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    gap: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(0, 208, 132, 0.3)",
  },
  slotIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0, 208, 132, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  slotContent: {
    flex: 1,
  },
  slotTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  slotSubtitle: {
    fontSize: 11,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  billSection: {
    backgroundColor: "#0A0A0A",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 16,
  },
  billTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 16,
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  billLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
  },
  billValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  savingsLabel: {
    color: "#00D084",
  },
  savingsValue: {
    color: "#00D084",
  },
  billDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginVertical: 12,
  },
  billTotalLabel: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  billTotalValue: {
    fontSize: 20,
    fontWeight: "900",
    color: "#00D084",
    letterSpacing: 0.5,
  },
  savingsBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 208, 132, 0.1)",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 208, 132, 0.3)",
  },
  savingsText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: "#00D084",
    letterSpacing: 0.3,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: "#000000",
    borderTopWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  proceedButton: {
    borderRadius: 1000,
  },
  proceedGradient: {
    borderRadius: 1000,
    shadowColor: "#00D084",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  proceedContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  proceedLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.8)",
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  proceedAmount: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  proceedRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  proceedText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});

export default GroceryCartScreen;
