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
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";

const { width } = Dimensions.get("window");

type CartScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Cart">;
};

interface CartItem {
  id: string;
  productId: string;
  name: string;
  storeName: string;
  price: number;
  quantity: number;
  image: string;
  customizations: string[];
  specialInstructions?: string;
}

const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [showPromoModal, setShowPromoModal] = useState(false);

  // Sample Cart Items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      productId: "1",
      name: "Jollof Rice & Chicken",
      storeName: "Mama Put Kitchen",
      price: 2500,
      quantity: 2,
      image: "",
      customizations: ["Grilled Chicken", "Medium Spice", "Extra Plantain"],
      specialInstructions: "No onions please",
    },
    {
      id: "2",
      productId: "2",
      name: "Fried Rice Combo",
      storeName: "Mama Put Kitchen",
      price: 3000,
      quantity: 1,
      image: "",
      customizations: ["Fried Chicken", "Coleslaw"],
    },
    {
      id: "3",
      productId: "3",
      name: "Goat Meat Pepper Soup",
      storeName: "Mama Put Kitchen",
      price: 2000,
      quantity: 1,
      image: "",
      customizations: ["Extra Hot 🔥"],
    },
  ]);

  const deliveryAddress = {
    name: "Home",
    address: "15 Allen Avenue, Ikeja, Lagos",
    icon: "home" as keyof typeof MaterialCommunityIcons.glyphMap,
  };

  const deliveryFee = 500;
  const serviceFee = 200;
  const discount = appliedPromo ? 1000 : 0;

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + deliveryFee + serviceFee - discount;
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

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "FIDELIA10") {
      setAppliedPromo("FIDELIA10");
      setPromoCode("");
      setShowPromoModal(false);
    } else {
      // Show error
      alert("Invalid promo code");
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigation.navigate("Checkout", {
      cartItems,
      total: calculateTotal(),
    });
  };

  const availablePromos = [
    {
      code: "FIDELIA10",
      title: "New User Discount",
      description: "Get ₦1,000 off your first order",
      discount: "₦1,000 OFF",
    },
    {
      code: "WEEKEND20",
      title: "Weekend Special",
      description: "20% off on orders above ₦5,000",
      discount: "20% OFF",
    },
    {
      code: "FREESHIP",
      title: "Free Delivery",
      description: "Free delivery on orders above ₦3,000",
      discount: "FREE DELIVERY",
    },
  ];

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
            onPress={() => navigation.navigate("MainTabs")}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={["#0066FF", "#0052CC"]}
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
                    color="#FF6B00"
                  />
                </View>
                <View style={styles.storeInfo}>
                  <Text style={styles.storeName}>Mama Put Kitchen</Text>
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
                      colors={["#FF6B00", "#E55A00"]}
                      style={styles.itemImageGradient}
                    >
                      <MaterialCommunityIcons
                        name="food"
                        size={28}
                        color="#FFFFFF"
                      />
                    </LinearGradient>
                  </View>

                  {/* Item Details */}
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>

                    {/* Customizations */}
                    {item.customizations.length > 0 && (
                      <View style={styles.customizationsContainer}>
                        {item.customizations.map((custom, index) => (
                          <Text key={index} style={styles.customizationText}>
                            • {custom}
                          </Text>
                        ))}
                      </View>
                    )}

                    {/* Special Instructions */}
                    {item.specialInstructions && (
                      <View style={styles.instructionsTag}>
                        <MaterialCommunityIcons
                          name="note-text"
                          size={12}
                          color="#FFB800"
                        />
                        <Text style={styles.instructionsText}>
                          {item.specialInstructions}
                        </Text>
                      </View>
                    )}

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

            {/* Delivery Address */}
            <View style={styles.addressSection}>
              <View style={styles.sectionHeader}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={20}
                  color="#00D084"
                />
                <Text style={styles.sectionTitle}>Delivery Address</Text>
              </View>
              <TouchableOpacity
                style={styles.addressCard}
                onPress={() => navigation.navigate("Addresses")}
                activeOpacity={0.9}
              >
                <View style={styles.addressIcon}>
                  <MaterialCommunityIcons
                    name={deliveryAddress.icon}
                    size={24}
                    color="#0066FF"
                  />
                </View>
                <View style={styles.addressInfo}>
                  <Text style={styles.addressName}>{deliveryAddress.name}</Text>
                  <Text style={styles.addressText}>
                    {deliveryAddress.address}
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color="#666666"
                />
              </TouchableOpacity>
            </View>

            {/* Promo Code */}
            <View style={styles.promoSection}>
              <View style={styles.sectionHeader}>
                <MaterialCommunityIcons
                  name="ticket-percent"
                  size={20}
                  color="#FFB800"
                />
                <Text style={styles.sectionTitle}>Promo Code</Text>
              </View>

              {appliedPromo ? (
                <View style={styles.appliedPromoCard}>
                  <View style={styles.appliedPromoLeft}>
                    <MaterialCommunityIcons
                      name="check-circle"
                      size={24}
                      color="#00D084"
                    />
                    <View>
                      <Text style={styles.appliedPromoCode}>
                        {appliedPromo}
                      </Text>
                      <Text style={styles.appliedPromoDiscount}>
                        -₦{discount.toLocaleString("en-NG")} discount applied
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={handleRemovePromo}>
                    <MaterialCommunityIcons
                      name="close-circle"
                      size={24}
                      color="#DC3545"
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.promoCard}
                  onPress={() => setShowPromoModal(true)}
                  activeOpacity={0.9}
                >
                  <MaterialCommunityIcons
                    name="ticket-percent-outline"
                    size={24}
                    color="#0066FF"
                  />
                  <Text style={styles.promoText}>Apply Promo Code</Text>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={24}
                    color="#666666"
                  />
                </TouchableOpacity>
              )}
            </View>

            {/* Bill Summary */}
            <View style={styles.billSection}>
              <Text style={styles.billTitle}>BILL SUMMARY</Text>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Subtotal</Text>
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

              {discount > 0 && (
                <View style={styles.billRow}>
                  <Text style={[styles.billLabel, styles.discountLabel]}>
                    Discount
                  </Text>
                  <Text style={[styles.billValue, styles.discountValue]}>
                    -₦{discount.toLocaleString("en-NG")}
                  </Text>
                </View>
              )}

              <View style={styles.billDivider} />

              <View style={styles.billRow}>
                <Text style={styles.billTotalLabel}>Total</Text>
                <Text style={styles.billTotalValue}>
                  ₦{calculateTotal().toLocaleString("en-NG")}
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Checkout Button */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={["#0066FF", "#0052CC"]}
                style={styles.checkoutGradient}
              >
                <View style={styles.checkoutContent}>
                  <View>
                    <Text style={styles.checkoutLabel}>Total</Text>
                    <Text style={styles.checkoutAmount}>
                      ₦{calculateTotal().toLocaleString("en-NG")}
                    </Text>
                  </View>
                  <View style={styles.checkoutRight}>
                    <Text style={styles.checkoutText}>Proceed to Checkout</Text>
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

      {/* Promo Code Modal */}
      <Modal
        visible={showPromoModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPromoModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Apply Promo Code</Text>
              <TouchableOpacity onPress={() => setShowPromoModal(false)}>
                <MaterialCommunityIcons
                  name="close"
                  size={28}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>

            {/* Promo Input */}
            <View style={styles.promoInputContainer}>
              <View style={styles.promoInput}>
                <MaterialCommunityIcons
                  name="ticket-percent"
                  size={20}
                  color="#666666"
                />
                <TextInput
                  style={styles.promoInputField}
                  placeholder="Enter promo code"
                  placeholderTextColor="#666666"
                  value={promoCode}
                  onChangeText={setPromoCode}
                  autoCapitalize="characters"
                />
              </View>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleApplyPromo}
                disabled={!promoCode}
              >
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>

            {/* Available Promos */}
            <Text style={styles.availablePromosTitle}>AVAILABLE OFFERS</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {availablePromos.map((promo, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.promoCard}
                  onPress={() => {
                    setPromoCode(promo.code);
                  }}
                  activeOpacity={0.9}
                >
                  <View style={styles.promoCardIcon}>
                    <MaterialCommunityIcons
                      name="ticket-percent"
                      size={24}
                      color="#FFB800"
                    />
                  </View>
                  <View style={styles.promoCardContent}>
                    <Text style={styles.promoCardTitle}>{promo.title}</Text>
                    <Text style={styles.promoCardDescription}>
                      {promo.description}
                    </Text>
                    <View style={styles.promoCodeTag}>
                      <Text style={styles.promoCodeText}>{promo.code}</Text>
                    </View>
                  </View>
                  <View style={styles.promoCardBadge}>
                    <Text style={styles.promoCardBadgeText}>
                      {promo.discount}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    backgroundColor: "rgba(255, 107, 0, 0.1)",
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
    marginBottom: 16,
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
    marginBottom: 6,
  },
  customizationsContainer: {
    marginBottom: 6,
  },
  customizationText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
    lineHeight: 16,
  },
  instructionsTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 184, 0, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 1000,
    alignSelf: "flex-start",
    gap: 4,
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFB800",
    letterSpacing: 0.3,
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
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 102, 255, 0.3)",
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
  addressSection: {
    marginHorizontal: 20,
    marginBottom: 16,
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
  },
  addressCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A0A0A",
    padding: 16,
    borderRadius: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  addressIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  addressInfo: {
    flex: 1,
  },
  addressName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  addressText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
    lineHeight: 18,
  },
  promoSection: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  promoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A0A0A",
    padding: 16,
    borderRadius: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  promoText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  appliedPromoCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(0, 208, 132, 0.1)",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#00D084",
  },
  appliedPromoLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  appliedPromoCode: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  appliedPromoDiscount: {
    fontSize: 11,
    fontWeight: "600",
    color: "#00D084",
    letterSpacing: 0.3,
  },
  billSection: {
    backgroundColor: "#0A0A0A",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
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
  discountLabel: {
    color: "#00D084",
  },
  discountValue: {
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
  checkoutButton: {
    borderRadius: 1000,
  },
  checkoutGradient: {
    borderRadius: 1000,
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  checkoutContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  checkoutLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.8)",
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  checkoutAmount: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  checkoutRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkoutText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#0A0A0A",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    maxHeight: "80%",
    borderTopWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  promoInputContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  promoInput: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  promoInputField: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  applyButton: {
    backgroundColor: "#0066FF",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
    justifyContent: "center",
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  availablePromosTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#888888",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 16,
  },
  promoCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 184, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  promoCardContent: {
    flex: 1,
  },
  promoCardTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  promoCardDescription: {
    fontSize: 11,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
    marginBottom: 8,
    lineHeight: 16,
  },
  promoCodeTag: {
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 1000,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "rgba(0, 102, 255, 0.3)",
  },
  promoCodeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#0066FF",
    letterSpacing: 0.5,
  },
  promoCardBadge: {
    backgroundColor: "rgba(0, 208, 132, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "#00D084",
  },
  promoCardBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#00D084",
    letterSpacing: 0.5,
  },
});

export default CartScreen;
