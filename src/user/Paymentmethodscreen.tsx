import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Modal,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";

type PaymentMethodScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "PaymentMethod">;
};

interface SavedCard {
  id: string;
  type: "visa" | "mastercard" | "verve";
  lastFour: string;
  expiryMonth: string;
  expiryYear: string;
  holderName: string;
  isDefault: boolean;
}

const PaymentMethodScreen: React.FC<PaymentMethodScreenProps> = ({
  navigation,
}) => {
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const walletBalance = 45250;

  const savedCards: SavedCard[] = [
    {
      id: "1",
      type: "visa",
      lastFour: "4532",
      expiryMonth: "12",
      expiryYear: "25",
      holderName: "Ndukwe O.",
      isDefault: true,
    },
    {
      id: "2",
      type: "mastercard",
      lastFour: "8765",
      expiryMonth: "09",
      expiryYear: "26",
      holderName: "Ndukwe O.",
      isDefault: false,
    },
  ];

  const getCardIcon = (type: string) => {
    switch (type) {
      case "visa":
        return "credit-card";
      case "mastercard":
        return "credit-card";
      case "verve":
        return "credit-card";
      default:
        return "credit-card";
    }
  };

  const getCardColor = (type: string) => {
    switch (type) {
      case "visa":
        return "#1A1F71";
      case "mastercard":
        return "#EB001B";
      case "verve":
        return "#00425F";
      default:
        return "#0066FF";
    }
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    return formatted;
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleAddCard = () => {
    // Add card logic here
    setShowAddCardModal(false);
    setCardNumber("");
    setCardName("");
    setExpiryDate("");
    setCvv("");
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
        <Text style={styles.headerTitle}>PAYMENT METHODS</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Fidelia Wallet */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FIDELIA WALLET</Text>
          <TouchableOpacity style={styles.walletCard} activeOpacity={0.9}>
            <LinearGradient
              colors={["#0066FF", "#0052CC"]}
              style={styles.walletGradient}
            >
              <View style={styles.walletHeader}>
                <View style={styles.walletIconContainer}>
                  <MaterialCommunityIcons
                    name="wallet"
                    size={32}
                    color="#FFFFFF"
                  />
                </View>
                <View style={styles.walletBadge}>
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={16}
                    color="#00D084"
                  />
                  <Text style={styles.walletBadgeText}>Active</Text>
                </View>
              </View>

              <View style={styles.walletContent}>
                <Text style={styles.walletLabel}>Available Balance</Text>
                <Text style={styles.walletBalance}>
                  ₦{walletBalance.toLocaleString("en-NG")}
                </Text>
              </View>

              <View style={styles.walletActions}>
                <TouchableOpacity style={styles.walletActionButton}>
                  <MaterialCommunityIcons
                    name="plus-circle"
                    size={20}
                    color="#FFFFFF"
                  />
                  <Text style={styles.walletActionText}>Add Money</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.walletActionButton}>
                  <MaterialCommunityIcons
                    name="history"
                    size={20}
                    color="#FFFFFF"
                  />
                  <Text style={styles.walletActionText}>History</Text>
                </TouchableOpacity>
              </View>

              {/* Decorative circles */}
              <View style={styles.walletCircle1} />
              <View style={styles.walletCircle2} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Saved Cards */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>SAVED CARDS</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddCardModal(true)}
            >
              <MaterialCommunityIcons name="plus" size={20} color="#0066FF" />
              <Text style={styles.addButtonText}>Add New</Text>
            </TouchableOpacity>
          </View>

          {savedCards.map((card) => (
            <View key={card.id} style={styles.cardItem}>
              <View
                style={[
                  styles.cardIconContainer,
                  { backgroundColor: `${getCardColor(card.type)}20` },
                ]}
              >
                <MaterialCommunityIcons
                  name={getCardIcon(card.type)}
                  size={28}
                  color={getCardColor(card.type)}
                />
              </View>

              <View style={styles.cardDetails}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardType}>{card.type.toUpperCase()}</Text>
                  {card.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultText}>DEFAULT</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.cardNumber}>•••• {card.lastFour}</Text>
                <Text style={styles.cardExpiry}>
                  Expires {card.expiryMonth}/{card.expiryYear}
                </Text>
              </View>

              <TouchableOpacity style={styles.cardMenuButton}>
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={24}
                  color="#666666"
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Other Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>OTHER METHODS</Text>

          <TouchableOpacity style={styles.paymentOption} activeOpacity={0.9}>
            <View
              style={[
                styles.paymentIconContainer,
                { backgroundColor: "rgba(255, 184, 0, 0.1)" },
              ]}
            >
              <MaterialCommunityIcons name="bank" size={24} color="#FFB800" />
            </View>
            <View style={styles.paymentContent}>
              <Text style={styles.paymentName}>Bank Transfer</Text>
              <Text style={styles.paymentDescription}>
                Instant bank transfer
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#666666"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentOption} activeOpacity={0.9}>
            <View
              style={[
                styles.paymentIconContainer,
                { backgroundColor: "rgba(220, 53, 69, 0.1)" },
              ]}
            >
              <MaterialCommunityIcons name="cash" size={24} color="#DC3545" />
            </View>
            <View style={styles.paymentContent}>
              <Text style={styles.paymentName}>Cash on Delivery</Text>
              <Text style={styles.paymentDescription}>
                Pay with cash when delivered
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#666666"
            />
          </TouchableOpacity>
        </View>

        {/* Security Info */}
        <View style={styles.securityCard}>
          <MaterialCommunityIcons
            name="shield-check"
            size={40}
            color="#00D084"
          />
          <Text style={styles.securityTitle}>Secure Payments</Text>
          <Text style={styles.securityText}>
            Your payment information is encrypted and secure. We never store
            your CVV.
          </Text>
        </View>
      </ScrollView>

      {/* Add Card Modal */}
      <Modal
        visible={showAddCardModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddCardModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Card</Text>
              <TouchableOpacity onPress={() => setShowAddCardModal(false)}>
                <MaterialCommunityIcons
                  name="close"
                  size={28}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Card Preview */}
              <View style={styles.cardPreview}>
                <LinearGradient
                  colors={["#0066FF", "#0052CC"]}
                  style={styles.cardPreviewGradient}
                >
                  <MaterialCommunityIcons
                    name="credit-card-chip-outline"
                    size={40}
                    color="rgba(255, 255, 255, 0.5)"
                  />
                  <Text style={styles.cardPreviewNumber}>
                    {cardNumber || "•••• •••• •••• ••••"}
                  </Text>
                  <View style={styles.cardPreviewFooter}>
                    <Text style={styles.cardPreviewName}>
                      {cardName || "CARDHOLDER NAME"}
                    </Text>
                    <Text style={styles.cardPreviewExpiry}>
                      {expiryDate || "MM/YY"}
                    </Text>
                  </View>
                </LinearGradient>
              </View>

              {/* Card Number */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Card Number</Text>
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons
                    name="credit-card"
                    size={20}
                    color="#666666"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="1234 5678 9012 3456"
                    placeholderTextColor="#666666"
                    value={cardNumber}
                    onChangeText={(text) => {
                      const formatted = formatCardNumber(text);
                      if (formatted.length <= 19) {
                        setCardNumber(formatted);
                      }
                    }}
                    keyboardType="numeric"
                    maxLength={19}
                  />
                </View>
              </View>

              {/* Card Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Cardholder Name</Text>
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons
                    name="account"
                    size={20}
                    color="#666666"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="JOHN DOE"
                    placeholderTextColor="#666666"
                    value={cardName}
                    onChangeText={setCardName}
                    autoCapitalize="characters"
                  />
                </View>
              </View>

              {/* Expiry and CVV */}
              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>Expiry Date</Text>
                  <View style={styles.inputContainer}>
                    <MaterialCommunityIcons
                      name="calendar"
                      size={20}
                      color="#666666"
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="MM/YY"
                      placeholderTextColor="#666666"
                      value={expiryDate}
                      onChangeText={(text) => {
                        const formatted = formatExpiryDate(text);
                        if (formatted.length <= 5) {
                          setExpiryDate(formatted);
                        }
                      }}
                      keyboardType="numeric"
                      maxLength={5}
                    />
                  </View>
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>CVV</Text>
                  <View style={styles.inputContainer}>
                    <MaterialCommunityIcons
                      name="lock"
                      size={20}
                      color="#666666"
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="123"
                      placeholderTextColor="#666666"
                      value={cvv}
                      onChangeText={(text) => {
                        if (text.length <= 3) {
                          setCvv(text);
                        }
                      }}
                      keyboardType="numeric"
                      maxLength={3}
                      secureTextEntry
                    />
                  </View>
                </View>
              </View>

              {/* Save as Default */}
              <TouchableOpacity style={styles.checkboxContainer}>
                <View style={styles.checkbox}>
                  <MaterialCommunityIcons
                    name="check"
                    size={18}
                    color="#0066FF"
                  />
                </View>
                <Text style={styles.checkboxText}>
                  Set as default payment method
                </Text>
              </TouchableOpacity>

              {/* Add Button */}
              <TouchableOpacity
                style={styles.addCardButton}
                onPress={handleAddCard}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={["#0066FF", "#0052CC"]}
                  style={styles.addCardGradient}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    size={24}
                    color="#FFFFFF"
                  />
                  <Text style={styles.addCardText}>Add Card</Text>
                </LinearGradient>
              </TouchableOpacity>
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
  headerTitle: {
    fontSize: 18,
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
    paddingBottom: 40,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  addButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0066FF",
    letterSpacing: 0.3,
  },
  walletCard: {
    borderRadius: 24,
    overflow: "hidden",
  },
  walletGradient: {
    padding: 24,
    position: "relative",
  },
  walletHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  walletIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  walletBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 208, 132, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 1000,
    gap: 4,
  },
  walletBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#00D084",
    letterSpacing: 0.5,
  },
  walletContent: {
    marginBottom: 24,
  },
  walletLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.8)",
    letterSpacing: 0.3,
    marginBottom: 8,
  },
  walletBalance: {
    fontSize: 40,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -1,
  },
  walletActions: {
    flexDirection: "row",
    gap: 12,
  },
  walletActionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  walletActionText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  walletCircle1: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    top: -60,
    right: -40,
  },
  walletCircle2: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    bottom: -40,
    left: -20,
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A0A0A",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  cardIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  cardDetails: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  cardType: {
    fontSize: 13,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  defaultBadge: {
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "rgba(0, 102, 255, 0.3)",
  },
  defaultText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#0066FF",
    letterSpacing: 0.5,
  },
  cardNumber: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 1,
    marginBottom: 4,
  },
  cardExpiry: {
    fontSize: 11,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  cardMenuButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A0A0A",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  paymentIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentContent: {
    flex: 1,
  },
  paymentName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  paymentDescription: {
    fontSize: 12,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  securityCard: {
    backgroundColor: "rgba(0, 208, 132, 0.05)",
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 208, 132, 0.2)",
  },
  securityTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    marginTop: 12,
    marginBottom: 8,
  },
  securityText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
    textAlign: "center",
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#0A0A0A",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    maxHeight: "90%",
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
    fontSize: 24,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  cardPreview: {
    marginBottom: 24,
  },
  cardPreviewGradient: {
    padding: 24,
    borderRadius: 20,
    minHeight: 180,
    justifyContent: "space-between",
  },
  cardPreviewNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 3,
    marginTop: 24,
  },
  cardPreviewFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
  },
  cardPreviewName: {
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.8)",
    letterSpacing: 1,
  },
  cardPreviewExpiry: {
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.8)",
    letterSpacing: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    borderWidth: 2,
    borderColor: "#0066FF",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  addCardButton: {
    borderRadius: 1000,
    marginBottom: 20,
  },
  addCardGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 1000,
    gap: 10,
  },
  addCardText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});

export default PaymentMethodScreen;
