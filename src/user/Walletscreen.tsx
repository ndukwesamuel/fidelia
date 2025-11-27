import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Modal,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { RootStackParamList, MainTabParamList } from "../types/navigation";

const { width } = Dimensions.get("window");

type WalletScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, "Wallet">,
  NativeStackNavigationProp<RootStackParamList>
>;

type WalletScreenProps = {
  navigation: WalletScreenNavigationProp;
};

type TransactionType = "credit" | "debit";

interface QuickAmount {
  id: string;
  amount: number;
  label: string;
}

interface Transaction {
  id: string;
  type: TransactionType;
  title: string;
  subtitle: string;
  amount: number;
  date: string;
  time: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  status: "success" | "pending" | "failed";
}

const WalletScreen: React.FC<WalletScreenProps> = ({ navigation }) => {
  const [balance] = useState(45250.0);
  const [showFundModal, setShowFundModal] = useState(false);
  const [fundAmount, setFundAmount] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | TransactionType>(
    "all"
  );

  const quickAmounts: QuickAmount[] = [
    { id: "1", amount: 1000, label: "₦1K" },
    { id: "2", amount: 2000, label: "₦2K" },
    { id: "3", amount: 5000, label: "₦5K" },
    { id: "4", amount: 10000, label: "₦10K" },
  ];

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "debit",
      title: "Payment to Mama Put Kitchen",
      subtitle: "Order #FDL-2024-001234",
      amount: 4500,
      date: "Today",
      time: "2:30 PM",
      icon: "food",
      status: "success",
    },
    {
      id: "2",
      type: "credit",
      title: "Wallet Top-up",
      subtitle: "Via Bank Transfer",
      amount: 20000,
      date: "Today",
      time: "11:15 AM",
      icon: "bank-transfer",
      status: "success",
    },
    {
      id: "3",
      type: "debit",
      title: "Payment to ShopRite Ikeja",
      subtitle: "Order #FDL-2024-001233",
      amount: 15750,
      date: "Yesterday",
      time: "1:15 PM",
      icon: "cart",
      status: "success",
    },
    {
      id: "4",
      type: "credit",
      title: "Refund",
      subtitle: "Order cancellation",
      amount: 6500,
      date: "Yesterday",
      time: "8:20 PM",
      icon: "cash-refund",
      status: "success",
    },
    {
      id: "5",
      type: "debit",
      title: "Payment to HealthPlus Pharmacy",
      subtitle: "Order #FDL-2024-001231",
      amount: 8900,
      date: "2 days ago",
      time: "3:20 PM",
      icon: "medical-bag",
      status: "success",
    },
  ];

  const filteredTransactions =
    activeFilter === "all"
      ? transactions
      : transactions.filter((t) => t.type === activeFilter);

  const handleFundWallet = () => {
    if (fundAmount && parseFloat(fundAmount) > 0) {
      // Handle fund wallet logic
      console.log("Fund wallet:", fundAmount);
      setShowFundModal(false);
      setFundAmount("");
    }
  };

  const selectQuickAmount = (amount: number) => {
    setFundAmount(amount.toString());
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
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>MY WALLET</Text>
            <Text style={styles.subtitle}>Manage your balance & payments</Text>
          </View>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCardWrapper}>
          <LinearGradient
            colors={["#0066FF", "#0052CC"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.balanceCard}
          >
            {/* Decorative elements */}
            <View style={styles.decorativeCircle1} />
            <View style={styles.decorativeCircle2} />
            <View style={styles.decorativeCircle3} />

            <View style={styles.balanceContent}>
              {/* Wallet Icon */}
              <View style={styles.walletIconContainer}>
                <MaterialCommunityIcons
                  name="wallet"
                  size={32}
                  color="#FFFFFF"
                />
              </View>

              {/* Balance Label */}
              <Text style={styles.balanceLabel}>TOTAL BALANCE</Text>

              {/* Balance Amount */}
              <View style={styles.balanceAmountContainer}>
                <Text style={styles.currency}>₦</Text>
                <Text style={styles.balanceAmount}>
                  {balance.toLocaleString("en-NG")}
                </Text>
                <Text style={styles.decimal}>.00</Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.balanceActions}>
                <TouchableOpacity
                  style={styles.addMoneyButton}
                  onPress={() => setShowFundModal(true)}
                  activeOpacity={0.9}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    size={20}
                    color="#000000"
                  />
                  <Text style={styles.addMoneyText}>ADD MONEY</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.withdrawButton}
                  activeOpacity={0.9}
                >
                  <MaterialCommunityIcons
                    name="bank-transfer-out"
                    size={20}
                    color="#FFFFFF"
                  />
                  <Text style={styles.withdrawText}>WITHDRAW</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
          <View style={styles.balanceShadow} />
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <MaterialCommunityIcons
                name="arrow-down"
                size={24}
                color="#00D084"
              />
            </View>
            <Text style={styles.statLabel}>Money In</Text>
            <Text style={styles.statAmount}>₦26,500</Text>
            <Text style={styles.statSubtext}>This month</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#FF6B0020" }]}>
              <MaterialCommunityIcons
                name="arrow-up"
                size={24}
                color="#FF6B00"
              />
            </View>
            <Text style={styles.statLabel}>Money Out</Text>
            <Text style={styles.statAmount}>₦29,150</Text>
            <Text style={styles.statSubtext}>This month</Text>
          </View>
        </View>

        {/* Transactions Section */}
        <View style={styles.transactionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>TRANSACTIONS</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Transaction Filters */}
          <View style={styles.filterRow}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === "all" && styles.filterButtonActive,
              ]}
              onPress={() => setActiveFilter("all")}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  activeFilter === "all" && styles.filterButtonTextActive,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === "credit" && styles.filterButtonActive,
              ]}
              onPress={() => setActiveFilter("credit")}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  activeFilter === "credit" && styles.filterButtonTextActive,
                ]}
              >
                Money In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === "debit" && styles.filterButtonActive,
              ]}
              onPress={() => setActiveFilter("debit")}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  activeFilter === "debit" && styles.filterButtonTextActive,
                ]}
              >
                Money Out
              </Text>
            </TouchableOpacity>
          </View>

          {/* Transactions List */}
          <View style={styles.transactionsList}>
            {filteredTransactions.map((transaction) => (
              <TouchableOpacity
                key={transaction.id}
                style={styles.transactionCard}
                activeOpacity={0.9}
              >
                <View
                  style={[
                    styles.transactionIcon,
                    {
                      backgroundColor:
                        transaction.type === "credit"
                          ? "#00D08420"
                          : "#FF6B0020",
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={transaction.icon}
                    size={24}
                    color={
                      transaction.type === "credit" ? "#00D084" : "#FF6B00"
                    }
                  />
                </View>

                <View style={styles.transactionContent}>
                  <Text style={styles.transactionTitle}>
                    {transaction.title}
                  </Text>
                  <Text style={styles.transactionSubtitle}>
                    {transaction.subtitle}
                  </Text>
                  <Text style={styles.transactionTime}>
                    {transaction.date} • {transaction.time}
                  </Text>
                </View>

                <View style={styles.transactionRight}>
                  <Text
                    style={[
                      styles.transactionAmount,
                      {
                        color:
                          transaction.type === "credit" ? "#00D084" : "#FFFFFF",
                      },
                    ]}
                  >
                    {transaction.type === "credit" ? "+" : "-"}₦
                    {transaction.amount.toLocaleString("en-NG")}
                  </Text>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          transaction.status === "success"
                            ? "#00D08420"
                            : "#FFB80020",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color:
                            transaction.status === "success"
                              ? "#00D084"
                              : "#FFB800",
                        },
                      ]}
                    >
                      {transaction.status}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fund Wallet Modal */}
      <Modal
        visible={showFundModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFundModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>FUND WALLET</Text>
              <TouchableOpacity onPress={() => setShowFundModal(false)}>
                <MaterialCommunityIcons
                  name="close"
                  size={28}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              Enter amount to add to your wallet
            </Text>

            {/* Amount Input */}
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>₦</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0"
                placeholderTextColor="#666666"
                value={fundAmount}
                onChangeText={setFundAmount}
                keyboardType="numeric"
              />
            </View>

            {/* Quick Amounts */}
            <View style={styles.quickAmountsContainer}>
              <Text style={styles.quickAmountsLabel}>QUICK AMOUNTS</Text>
              <View style={styles.quickAmountsGrid}>
                {quickAmounts.map((quick) => (
                  <TouchableOpacity
                    key={quick.id}
                    style={[
                      styles.quickAmountChip,
                      fundAmount === quick.amount.toString() &&
                        styles.quickAmountChipActive,
                    ]}
                    onPress={() => selectQuickAmount(quick.amount)}
                  >
                    <Text
                      style={[
                        styles.quickAmountText,
                        fundAmount === quick.amount.toString() &&
                          styles.quickAmountTextActive,
                      ]}
                    >
                      {quick.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Payment Methods */}
            <View style={styles.paymentMethodsContainer}>
              <Text style={styles.paymentMethodsLabel}>PAYMENT METHOD</Text>
              <TouchableOpacity style={styles.paymentMethodCard}>
                <View style={styles.paymentMethodIcon}>
                  <MaterialCommunityIcons
                    name="credit-card"
                    size={24}
                    color="#0066FF"
                  />
                </View>
                <View style={styles.paymentMethodContent}>
                  <Text style={styles.paymentMethodTitle}>Debit Card</Text>
                  <Text style={styles.paymentMethodSubtitle}>
                    Instant payment
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color="#666666"
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.paymentMethodCard}>
                <View style={styles.paymentMethodIcon}>
                  <MaterialCommunityIcons
                    name="bank"
                    size={24}
                    color="#00D084"
                  />
                </View>
                <View style={styles.paymentMethodContent}>
                  <Text style={styles.paymentMethodTitle}>Bank Transfer</Text>
                  <Text style={styles.paymentMethodSubtitle}>
                    2-5 mins processing
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color="#666666"
                />
              </TouchableOpacity>
            </View>

            {/* Fund Button */}
            <TouchableOpacity
              style={styles.fundButtonWrapper}
              onPress={handleFundWallet}
              disabled={!fundAmount || parseFloat(fundAmount) <= 0}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={["#0066FF", "#0052CC"]}
                style={[
                  styles.fundButton,
                  (!fundAmount || parseFloat(fundAmount) <= 0) &&
                    styles.fundButtonDisabled,
                ]}
              >
                <Text style={styles.fundButtonText}>PROCEED TO PAYMENT</Text>
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={24}
                  color="#FFFFFF"
                />
              </LinearGradient>
            </TouchableOpacity>
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
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 120,
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
  balanceCardWrapper: {
    position: "relative",
    marginHorizontal: 20,
    marginBottom: 24,
  },
  balanceCard: {
    borderRadius: 32,
    padding: 32,
    overflow: "hidden",
    minHeight: 280,
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.4,
    shadowRadius: 32,
    elevation: 20,
  },
  decorativeCircle1: {
    position: "absolute",
    top: -80,
    right: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  decorativeCircle2: {
    position: "absolute",
    bottom: -60,
    left: -60,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
  decorativeCircle3: {
    position: "absolute",
    top: 60,
    left: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  balanceContent: {
    position: "relative",
    zIndex: 1,
  },
  walletIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.8)",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  balanceAmountContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 28,
  },
  currency: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 8,
    marginRight: 4,
  },
  balanceAmount: {
    fontSize: 56,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -2,
  },
  decimal: {
    fontSize: 32,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 8,
  },
  balanceActions: {
    flexDirection: "row",
    gap: 12,
  },
  addMoneyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 1000,
    gap: 8,
    flex: 1,
    justifyContent: "center",
  },
  addMoneyText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#000000",
    letterSpacing: 0.5,
  },
  withdrawButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 1000,
    gap: 8,
    flex: 1,
    justifyContent: "center",
  },
  withdrawText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  balanceShadow: {
    position: "absolute",
    bottom: -12,
    left: 12,
    right: 12,
    height: "100%",
    backgroundColor: "#0052CC",
    borderRadius: 32,
    zIndex: -1,
    opacity: 0.5,
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#00D08420",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#888888",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statAmount: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  statSubtext: {
    fontSize: 11,
    fontWeight: "500",
    color: "#666666",
    letterSpacing: 0.3,
  },
  transactionsSection: {
    paddingHorizontal: 20,
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
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0066FF",
    letterSpacing: 0.3,
  },
  filterRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 1000,
    backgroundColor: "#0A0A0A",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  filterButtonActive: {
    backgroundColor: "#0066FF",
    borderColor: "#0066FF",
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#888888",
    letterSpacing: 0.3,
  },
  filterButtonTextActive: {
    color: "#FFFFFF",
  },
  transactionsList: {
    gap: 12,
  },
  transactionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A0A0A",
    padding: 16,
    borderRadius: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  transactionContent: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  transactionSubtitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#888888",
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  transactionTime: {
    fontSize: 11,
    fontWeight: "500",
    color: "#666666",
    letterSpacing: 0.3,
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 1000,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
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
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  modalSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888888",
    marginBottom: 24,
    letterSpacing: 0.3,
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000000",
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#0066FF",
  },
  currencySymbol: {
    fontSize: 36,
    fontWeight: "700",
    color: "#FFFFFF",
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 36,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -1,
  },
  quickAmountsContainer: {
    marginBottom: 24,
  },
  quickAmountsLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#888888",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  quickAmountsGrid: {
    flexDirection: "row",
    gap: 12,
  },
  quickAmountChip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#151515",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  quickAmountChipActive: {
    backgroundColor: "#0066FF",
    borderColor: "#0066FF",
  },
  quickAmountText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#888888",
    letterSpacing: 0.3,
  },
  quickAmountTextActive: {
    color: "#FFFFFF",
  },
  paymentMethodsContainer: {
    marginBottom: 24,
  },
  paymentMethodsLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#888888",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  paymentMethodCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#151515",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    gap: 12,
  },
  paymentMethodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#0A0A0A",
    justifyContent: "center",
    alignItems: "center",
  },
  paymentMethodContent: {
    flex: 1,
  },
  paymentMethodTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  paymentMethodSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  fundButtonWrapper: {
    marginTop: 8,
  },
  fundButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 1000,
    gap: 12,
  },
  fundButtonDisabled: {
    opacity: 0.5,
  },
  fundButtonText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
});

export default WalletScreen;
