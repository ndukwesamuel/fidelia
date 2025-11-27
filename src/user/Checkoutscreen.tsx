import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Modal,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../types/navigation";

const { width } = Dimensions.get("window");

type CheckoutScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Checkout">;
  route: RouteProp<RootStackParamList, "Checkout">;
};

interface PaymentMethod {
  id: string;
  type: "card" | "wallet" | "cash" | "bank";
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  details?: string;
  color: string;
}

interface DeliveryOption {
  id: string;
  name: string;
  time: string;
  fee: number;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  navigation,
  route,
}) => {
  const { cartItems, total } = route.params;
  const [selectedPayment, setSelectedPayment] = useState<string>("wallet");
  const [selectedDelivery, setSelectedDelivery] = useState<string>("standard");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tipAmount, setTipAmount] = useState(0);

  const deliveryAddress = {
    name: "Home",
    address: "15 Allen Avenue, Ikeja, Lagos",
    phone: "+234 801 234 5678",
    icon: "home" as keyof typeof MaterialCommunityIcons.glyphMap,
  };

  const paymentMethods: PaymentMethod[] = [
    {
      id: "wallet",
      type: "wallet",
      name: "Fidelia Wallet",
      details: "Balance: ₦45,250",
      icon: "wallet",
      color: "#0066FF",
    },
    {
      id: "card",
      type: "card",
      name: "Debit/Credit Card",
      details: "Visa, Mastercard, Verve",
      icon: "credit-card",
      color: "#00D084",
    },
    {
      id: "bank",
      type: "bank",
      name: "Bank Transfer",
      details: "Instant bank transfer",
      icon: "bank",
      color: "#FFB800",
    },
    {
      id: "cash",
      type: "cash",
      name: "Cash on Delivery",
      details: "Pay with cash when delivered",
      icon: "cash",
      color: "#DC3545",
    },
  ];

  const deliveryOptions: DeliveryOption[] = [
    {
      id: "standard",
      name: "Standard Delivery",
      time: "30-45 mins",
      fee: 500,
      icon: "bike-fast",
      color: "#0066FF",
    },
    {
      id: "express",
      name: "Express Delivery",
      time: "15-20 mins",
      fee: 1000,
      icon: "lightning-bolt",
      color: "#FFB800",
    },
    {
      id: "scheduled",
      name: "Scheduled Delivery",
      time: "Choose your time",
      fee: 300,
      icon: "clock-outline",
      color: "#00D084",
    },
  ];

  const tipOptions = [0, 100, 200, 500];

  const getDeliveryFee = () => {
    const option = deliveryOptions.find((opt) => opt.id === selectedDelivery);
    return option?.fee || 0;
  };

  const calculateGrandTotal = () => {
    return total + tipAmount;
  };

  const handlePlaceOrder = () => {
    setShowConfirmModal(true);
  };

  const confirmOrder = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowConfirmModal(false);

      // Navigate to order confirmation
      navigation.navigate("OrderConfirmation", {
        orderId: "FDL-2024-001235",
        total: calculateGrandTotal(),
      });
    }, 2000);
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
        <Text style={styles.headerTitle}>CHECKOUT</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Progress Indicator */}
        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressText}>Step 2 of 3</Text>
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
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
            <View style={styles.addressIconContainer}>
              <MaterialCommunityIcons
                name={deliveryAddress.icon}
                size={24}
                color="#0066FF"
              />
            </View>
            <View style={styles.addressContent}>
              <Text style={styles.addressName}>{deliveryAddress.name}</Text>
              <Text style={styles.addressText}>{deliveryAddress.address}</Text>
              <Text style={styles.addressPhone}>{deliveryAddress.phone}</Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#666666"
            />
          </TouchableOpacity>
        </View>

        {/* Delivery Options */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons
              name="clock-fast"
              size={20}
              color="#FFB800"
            />
            <Text style={styles.sectionTitle}>Delivery Option</Text>
          </View>

          <View style={styles.deliveryOptionsContainer}>
            {deliveryOptions.map((option) => {
              const isSelected = selectedDelivery === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.deliveryOptionCard,
                    isSelected && styles.deliveryOptionCardSelected,
                  ]}
                  onPress={() => setSelectedDelivery(option.id)}
                  activeOpacity={0.9}
                >
                  <View
                    style={[
                      styles.deliveryOptionIcon,
                      { backgroundColor: `${option.color}20` },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={option.icon}
                      size={24}
                      color={option.color}
                    />
                  </View>
                  <View style={styles.deliveryOptionContent}>
                    <Text style={styles.deliveryOptionName}>{option.name}</Text>
                    <Text style={styles.deliveryOptionTime}>{option.time}</Text>
                  </View>
                  <View style={styles.deliveryOptionRight}>
                    <Text style={styles.deliveryOptionFee}>
                      ₦{option.fee.toLocaleString("en-NG")}
                    </Text>
                    <View
                      style={[
                        styles.radioButton,
                        isSelected && styles.radioButtonSelected,
                      ]}
                    >
                      {isSelected && <View style={styles.radioButtonInner} />}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons
              name="credit-card"
              size={20}
              color="#0066FF"
            />
            <Text style={styles.sectionTitle}>Payment Method</Text>
          </View>

          <View style={styles.paymentMethodsContainer}>
            {paymentMethods.map((method) => {
              const isSelected = selectedPayment === method.id;
              return (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.paymentMethodCard,
                    isSelected && styles.paymentMethodCardSelected,
                  ]}
                  onPress={() => setSelectedPayment(method.id)}
                  activeOpacity={0.9}
                >
                  <View style={styles.paymentMethodLeft}>
                    <View
                      style={[
                        styles.paymentMethodIcon,
                        { backgroundColor: `${method.color}20` },
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={method.icon}
                        size={24}
                        color={method.color}
                      />
                    </View>
                    <View style={styles.paymentMethodContent}>
                      <Text style={styles.paymentMethodName}>
                        {method.name}
                      </Text>
                      {method.details && (
                        <Text style={styles.paymentMethodDetails}>
                          {method.details}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={[
                      styles.radioButton,
                      isSelected && styles.radioButtonSelected,
                    ]}
                  >
                    {isSelected && <View style={styles.radioButtonInner} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Tip Your Rider */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons
              name="hand-coin"
              size={20}
              color="#FFB800"
            />
            <Text style={styles.sectionTitle}>Tip Your Rider</Text>
            <Text style={styles.optionalBadge}>Optional</Text>
          </View>

          <View style={styles.tipContainer}>
            {tipOptions.map((tip) => (
              <TouchableOpacity
                key={tip}
                style={[
                  styles.tipChip,
                  tipAmount === tip && styles.tipChipSelected,
                ]}
                onPress={() => setTipAmount(tip)}
              >
                <Text
                  style={[
                    styles.tipChipText,
                    tipAmount === tip && styles.tipChipTextSelected,
                  ]}
                >
                  {tip === 0 ? "No Tip" : `₦${tip}`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {tipAmount > 0 && (
            <View style={styles.tipMessageCard}>
              <MaterialCommunityIcons name="heart" size={20} color="#DC3545" />
              <Text style={styles.tipMessageText}>
                Thank you for supporting our rider! 🙏
              </Text>
            </View>
          )}
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="receipt" size={20} color="#0066FF" />
            <Text style={styles.sectionTitle}>Order Summary</Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Items ({cartItems.length})
              </Text>
              <Text style={styles.summaryValue}>
                ₦{(total - getDeliveryFee() - 200).toLocaleString("en-NG")}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>
                ₦{getDeliveryFee().toLocaleString("en-NG")}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Service Fee</Text>
              <Text style={styles.summaryValue}>₦200</Text>
            </View>
            {tipAmount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Rider Tip</Text>
                <Text style={styles.summaryValue}>
                  ₦{tipAmount.toLocaleString("en-NG")}
                </Text>
              </View>
            )}
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryTotalLabel}>Grand Total</Text>
              <Text style={styles.summaryTotalValue}>
                ₦{calculateGrandTotal().toLocaleString("en-NG")}
              </Text>
            </View>
          </View>
        </View>

        {/* Terms */}
        <View style={styles.termsContainer}>
          <MaterialCommunityIcons
            name="shield-check"
            size={16}
            color="#00D084"
          />
          <Text style={styles.termsText}>
            By placing this order, you agree to our{" "}
            <Text style={styles.termsLink}>Terms & Conditions</Text>
          </Text>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={["#0066FF", "#0052CC"]}
            style={styles.placeOrderGradient}
          >
            <View style={styles.placeOrderContent}>
              <View>
                <Text style={styles.placeOrderLabel}>Grand Total</Text>
                <Text style={styles.placeOrderAmount}>
                  ₦{calculateGrandTotal().toLocaleString("en-NG")}
                </Text>
              </View>
              <View style={styles.placeOrderRight}>
                <Text style={styles.placeOrderText}>Place Order</Text>
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

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmModal}
        transparent
        animationType="fade"
        onRequestClose={() => !isProcessing && setShowConfirmModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {!isProcessing ? (
              <>
                <View style={styles.modalIconContainer}>
                  <LinearGradient
                    colors={["#0066FF", "#0052CC"]}
                    style={styles.modalIconGradient}
                  >
                    <MaterialCommunityIcons
                      name="check-circle"
                      size={48}
                      color="#FFFFFF"
                    />
                  </LinearGradient>
                </View>

                <Text style={styles.modalTitle}>Confirm Your Order</Text>
                <Text style={styles.modalSubtitle}>
                  You're about to place an order worth{" "}
                  <Text style={styles.modalAmount}>
                    ₦{calculateGrandTotal().toLocaleString("en-NG")}
                  </Text>
                </Text>

                <View style={styles.modalDetails}>
                  <View style={styles.modalDetailRow}>
                    <MaterialCommunityIcons
                      name="map-marker"
                      size={18}
                      color="#00D084"
                    />
                    <Text style={styles.modalDetailText}>
                      {deliveryAddress.address}
                    </Text>
                  </View>
                  <View style={styles.modalDetailRow}>
                    <MaterialCommunityIcons
                      name="credit-card"
                      size={18}
                      color="#0066FF"
                    />
                    <Text style={styles.modalDetailText}>
                      {
                        paymentMethods.find((m) => m.id === selectedPayment)
                          ?.name
                      }
                    </Text>
                  </View>
                  <View style={styles.modalDetailRow}>
                    <MaterialCommunityIcons
                      name="clock-fast"
                      size={18}
                      color="#FFB800"
                    />
                    <Text style={styles.modalDetailText}>
                      {
                        deliveryOptions.find((d) => d.id === selectedDelivery)
                          ?.time
                      }
                    </Text>
                  </View>
                </View>

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.modalCancelButton}
                    onPress={() => setShowConfirmModal(false)}
                  >
                    <Text style={styles.modalCancelText}>Go Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalConfirmButton}
                    onPress={confirmOrder}
                    activeOpacity={0.9}
                  >
                    <LinearGradient
                      colors={["#0066FF", "#0052CC"]}
                      style={styles.modalConfirmGradient}
                    >
                      <Text style={styles.modalConfirmText}>Confirm & Pay</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={styles.processingContainer}>
                <View style={styles.loadingSpinner}>
                  <MaterialCommunityIcons
                    name="loading"
                    size={64}
                    color="#0066FF"
                  />
                </View>
                <Text style={styles.processingTitle}>Processing Payment</Text>
                <Text style={styles.processingSubtitle}>
                  Please wait while we process your order...
                </Text>
              </View>
            )}
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
  headerTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  headerButton: {
    width: 44,
    height: 44,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  progressSection: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 2,
    marginBottom: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    width: "66%",
    backgroundColor: "#0066FF",
  },
  progressText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
  },
  section: {
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
  addressIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  addressContent: {
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
    marginBottom: 4,
  },
  addressPhone: {
    fontSize: 11,
    fontWeight: "600",
    color: "#666666",
    letterSpacing: 0.3,
  },
  deliveryOptionsContainer: {
    gap: 10,
  },
  deliveryOptionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A0A0A",
    padding: 14,
    borderRadius: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  deliveryOptionCardSelected: {
    borderColor: "#0066FF",
    backgroundColor: "rgba(0, 102, 255, 0.05)",
  },
  deliveryOptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  deliveryOptionContent: {
    flex: 1,
  },
  deliveryOptionName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  deliveryOptionTime: {
    fontSize: 11,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
  },
  deliveryOptionRight: {
    alignItems: "flex-end",
    gap: 6,
  },
  deliveryOptionFee: {
    fontSize: 14,
    fontWeight: "800",
    color: "#00D084",
    letterSpacing: 0.3,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#0066FF",
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#0066FF",
  },
  paymentMethodsContainer: {
    gap: 10,
  },
  paymentMethodCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0A0A0A",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  paymentMethodCardSelected: {
    borderColor: "#0066FF",
    backgroundColor: "rgba(0, 102, 255, 0.05)",
  },
  paymentMethodLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  paymentMethodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentMethodContent: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  paymentMethodDetails: {
    fontSize: 11,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
  },
  tipContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  tipChip: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#0A0A0A",
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  tipChipSelected: {
    backgroundColor: "#0066FF",
    borderColor: "#0066FF",
  },
  tipChipText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#888888",
    letterSpacing: 0.3,
  },
  tipChipTextSelected: {
    color: "#FFFFFF",
  },
  tipMessageCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(220, 53, 69, 0.1)",
    padding: 12,
    borderRadius: 12,
    gap: 10,
  },
  tipMessageText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#DC3545",
    letterSpacing: 0.3,
    flex: 1,
  },
  summaryCard: {
    backgroundColor: "#0A0A0A",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginVertical: 12,
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  summaryTotalValue: {
    fontSize: 20,
    fontWeight: "900",
    color: "#00D084",
    letterSpacing: 0.5,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    gap: 8,
    marginBottom: 20,
  },
  termsText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
    flex: 1,
    lineHeight: 16,
  },
  termsLink: {
    color: "#0066FF",
    fontWeight: "700",
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
  placeOrderButton: {
    borderRadius: 1000,
  },
  placeOrderGradient: {
    borderRadius: 1000,
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  placeOrderContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  placeOrderLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.8)",
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  placeOrderAmount: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  placeOrderRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  placeOrderText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#0A0A0A",
    borderRadius: 24,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  modalIconContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  modalIconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textAlign: "center",
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  modalAmount: {
    color: "#00D084",
    fontWeight: "800",
  },
  modalDetails: {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    gap: 12,
  },
  modalDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  modalDetailText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    flex: 1,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 1000,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  modalCancelText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  modalConfirmButton: {
    flex: 1,
    borderRadius: 1000,
  },
  modalConfirmGradient: {
    paddingVertical: 14,
    borderRadius: 1000,
    alignItems: "center",
  },
  modalConfirmText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  processingContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  loadingSpinner: {
    marginBottom: 20,
  },
  processingTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  processingSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
    textAlign: "center",
  },
});

export default CheckoutScreen;
