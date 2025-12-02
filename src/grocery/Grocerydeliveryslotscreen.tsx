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
import type { RootStackParamList } from "../types/navigation";

type GroceryDeliverySlotScreenProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "GroceryDeliverySlot"
  >;
  route: RouteProp<RootStackParamList, "GroceryDeliverySlot">;
};

interface TimeSlot {
  id: string;
  label: string;
  time: string;
  price: number;
  available: boolean;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

interface DateOption {
  id: string;
  day: string;
  date: string;
  month: string;
  label: string;
}

const GroceryDeliverySlotScreen: React.FC<GroceryDeliverySlotScreenProps> = ({
  navigation,
  route,
}) => {
  const [selectedDate, setSelectedDate] = useState("today");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const dateOptions: DateOption[] = [
    {
      id: "today",
      day: "Today",
      date: "27",
      month: "Nov",
      label: "Today, Nov 27",
    },
    {
      id: "tomorrow",
      day: "Tomorrow",
      date: "28",
      month: "Nov",
      label: "Tomorrow, Nov 28",
    },
    {
      id: "day3",
      day: "Friday",
      date: "29",
      month: "Nov",
      label: "Friday, Nov 29",
    },
    {
      id: "day4",
      day: "Saturday",
      date: "30",
      month: "Nov",
      label: "Saturday, Nov 30",
    },
  ];

  const timeSlots: TimeSlot[] = [
    {
      id: "express",
      label: "Express",
      time: "30-60 mins",
      price: 1000,
      available: true,
      icon: "lightning-bolt",
    },
    {
      id: "morning",
      label: "Morning",
      time: "8:00 AM - 12:00 PM",
      price: 500,
      available: true,
      icon: "weather-sunny",
    },
    {
      id: "afternoon",
      label: "Afternoon",
      time: "12:00 PM - 4:00 PM",
      price: 500,
      available: true,
      icon: "weather-partly-cloudy",
    },
    {
      id: "evening",
      label: "Evening",
      time: "4:00 PM - 8:00 PM",
      price: 700,
      available: true,
      icon: "weather-sunset",
    },
    {
      id: "night",
      label: "Night",
      time: "8:00 PM - 11:00 PM",
      price: 1000,
      available: false,
      icon: "weather-night",
    },
  ];

  const handleProceed = () => {
    if (!selectedSlot) return;
    navigation.navigate("Checkout", {
      cartItems: [],
      total: 10250,
    });
  };

  const selectedSlotData = timeSlots.find((slot) => slot.id === selectedSlot);

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
        <Text style={styles.headerTitle}>DELIVERY SLOT</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Info Card */}
        <View style={styles.infoCard}>
          <MaterialCommunityIcons
            name="information"
            size={24}
            color="#00D084"
          />
          <Text style={styles.infoText}>
            Choose your preferred delivery date and time slot
          </Text>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SELECT DATE</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateOptions}
          >
            {dateOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.dateCard,
                  selectedDate === option.id && styles.dateCardSelected,
                ]}
                onPress={() => setSelectedDate(option.id)}
              >
                <Text
                  style={[
                    styles.dateDay,
                    selectedDate === option.id && styles.dateDaySelected,
                  ]}
                >
                  {option.day}
                </Text>
                <Text
                  style={[
                    styles.dateNumber,
                    selectedDate === option.id && styles.dateNumberSelected,
                  ]}
                >
                  {option.date}
                </Text>
                <Text
                  style={[
                    styles.dateMonth,
                    selectedDate === option.id && styles.dateMonthSelected,
                  ]}
                >
                  {option.month}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Time Slots */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SELECT TIME SLOT</Text>
          <View style={styles.slotsContainer}>
            {timeSlots.map((slot) => (
              <TouchableOpacity
                key={slot.id}
                style={[
                  styles.slotCard,
                  selectedSlot === slot.id && styles.slotCardSelected,
                  !slot.available && styles.slotCardDisabled,
                ]}
                onPress={() => slot.available && setSelectedSlot(slot.id)}
                disabled={!slot.available}
              >
                <View style={styles.slotIcon}>
                  <MaterialCommunityIcons
                    name={slot.icon}
                    size={32}
                    color={
                      !slot.available
                        ? "#666666"
                        : selectedSlot === slot.id
                        ? "#00D084"
                        : "#FFFFFF"
                    }
                  />
                </View>
                <Text
                  style={[
                    styles.slotLabel,
                    selectedSlot === slot.id && styles.slotLabelSelected,
                    !slot.available && styles.slotLabelDisabled,
                  ]}
                >
                  {slot.label}
                </Text>
                <Text
                  style={[
                    styles.slotTime,
                    selectedSlot === slot.id && styles.slotTimeSelected,
                    !slot.available && styles.slotTimeDisabled,
                  ]}
                >
                  {slot.time}
                </Text>
                <Text
                  style={[
                    styles.slotPrice,
                    selectedSlot === slot.id && styles.slotPriceSelected,
                    !slot.available && styles.slotPriceDisabled,
                  ]}
                >
                  +₦{slot.price}
                </Text>
                {!slot.available && (
                  <View style={styles.unavailableBadge}>
                    <Text style={styles.unavailableText}>Unavailable</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Selected Slot Summary */}
        {selectedSlot && selectedSlotData && (
          <View style={styles.summaryCard}>
            <MaterialCommunityIcons
              name="check-circle"
              size={24}
              color="#00D084"
            />
            <View style={styles.summaryContent}>
              <Text style={styles.summaryTitle}>Selected Slot</Text>
              <Text style={styles.summaryText}>
                {dateOptions.find((d) => d.id === selectedDate)?.label} •{" "}
                {selectedSlotData.label} ({selectedSlotData.time})
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Proceed Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.proceedButton,
            !selectedSlot && styles.proceedButtonDisabled,
          ]}
          onPress={handleProceed}
          disabled={!selectedSlot}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={
              selectedSlot ? ["#00D084", "#00B872"] : ["#333333", "#1A1A1A"]
            }
            style={styles.proceedGradient}
          >
            <Text style={styles.proceedText}>Proceed to Checkout</Text>
            <MaterialCommunityIcons
              name="arrow-right"
              size={24}
              color="#FFFFFF"
            />
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
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 208, 132, 0.1)",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    gap: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(0, 208, 132, 0.3)",
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginHorizontal: 20,
    marginBottom: 16,
  },
  dateOptions: {
    paddingHorizontal: 20,
    gap: 12,
  },
  dateCard: {
    width: 100,
    backgroundColor: "#0A0A0A",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  dateCardSelected: {
    backgroundColor: "rgba(0, 208, 132, 0.1)",
    borderColor: "#00D084",
  },
  dateDay: {
    fontSize: 12,
    fontWeight: "700",
    color: "#888888",
    letterSpacing: 0.3,
    marginBottom: 8,
  },
  dateDaySelected: {
    color: "#00D084",
  },
  dateNumber: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  dateNumberSelected: {
    color: "#00D084",
  },
  dateMonth: {
    fontSize: 12,
    fontWeight: "700",
    color: "#888888",
    letterSpacing: 0.3,
  },
  dateMonthSelected: {
    color: "#00D084",
  },
  slotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 14,
    gap: 12,
  },
  slotCard: {
    width: "47.5%",
    backgroundColor: "#0A0A0A",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  slotCardSelected: {
    backgroundColor: "rgba(0, 208, 132, 0.1)",
    borderColor: "#00D084",
  },
  slotCardDisabled: {
    opacity: 0.5,
  },
  slotIcon: {
    marginBottom: 12,
  },
  slotLabel: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  slotLabelSelected: {
    color: "#00D084",
  },
  slotLabelDisabled: {
    color: "#666666",
  },
  slotTime: {
    fontSize: 11,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
    marginBottom: 8,
    textAlign: "center",
  },
  slotTimeSelected: {
    color: "#00D084",
  },
  slotTimeDisabled: {
    color: "#666666",
  },
  slotPrice: {
    fontSize: 14,
    fontWeight: "800",
    color: "#00D084",
    letterSpacing: 0.3,
  },
  slotPriceSelected: {
    color: "#00D084",
  },
  slotPriceDisabled: {
    color: "#666666",
  },
  unavailableBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#DC3545",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 1000,
  },
  unavailableText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  summaryCard: {
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
  summaryContent: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#888888",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  summaryText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
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
  proceedButtonDisabled: {
    opacity: 0.5,
  },
  proceedGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 1000,
    gap: 10,
    shadowColor: "#00D084",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  proceedText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});

export default GroceryDeliverySlotScreen;
