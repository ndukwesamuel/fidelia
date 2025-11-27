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

type AddressesScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Addresses">;
};

interface Address {
  id: string;
  name: string;
  address: string;
  phone: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  isDefault: boolean;
}

const AddressesScreen: React.FC<AddressesScreenProps> = ({ navigation }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [addressName, setAddressName] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedIcon, setSelectedIcon] =
    useState<keyof typeof MaterialCommunityIcons.glyphMap>("home");

  const addresses: Address[] = [
    {
      id: "1",
      name: "Home",
      address: "15 Allen Avenue, Ikeja, Lagos",
      phone: "+234 801 234 5678",
      icon: "home",
      isDefault: true,
    },
    {
      id: "2",
      name: "Office",
      address: "28 Admiralty Way, Lekki Phase 1, Lagos",
      phone: "+234 801 234 5678",
      icon: "office-building",
      isDefault: false,
    },
    {
      id: "3",
      name: "Mom's Place",
      address: "12 Ogudu Road, Ojota, Lagos",
      phone: "+234 802 345 6789",
      icon: "account",
      isDefault: false,
    },
  ];

  const iconOptions: Array<keyof typeof MaterialCommunityIcons.glyphMap> = [
    "home",
    "office-building",
    "briefcase",
    "account",
    "map-marker",
    "heart",
  ];

  const handleAddAddress = () => {
    // Add address logic
    setShowAddModal(false);
    setAddressName("");
    setAddressLine("");
    setPhoneNumber("");
    setSelectedIcon("home");
  };

  const handleSetDefault = (addressId: string) => {
    // Set default address logic
  };

  const handleDeleteAddress = (addressId: string) => {
    // Delete address logic
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
        <Text style={styles.headerTitle}>MY ADDRESSES</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <MaterialCommunityIcons name="plus" size={24} color="#0066FF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Addresses List */}
        {addresses.map((address) => (
          <View key={address.id} style={styles.addressCard}>
            <View style={styles.addressHeader}>
              <View style={styles.addressIconContainer}>
                <MaterialCommunityIcons
                  name={address.icon}
                  size={24}
                  color="#0066FF"
                />
              </View>
              <View style={styles.addressHeaderRight}>
                <Text style={styles.addressName}>{address.name}</Text>
                {address.isDefault && (
                  <View style={styles.defaultBadge}>
                    <MaterialCommunityIcons
                      name="check-circle"
                      size={14}
                      color="#00D084"
                    />
                    <Text style={styles.defaultText}>DEFAULT</Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.addressContent}>
              <View style={styles.addressRow}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={18}
                  color="#888888"
                />
                <Text style={styles.addressText}>{address.address}</Text>
              </View>
              <View style={styles.addressRow}>
                <MaterialCommunityIcons
                  name="phone"
                  size={18}
                  color="#888888"
                />
                <Text style={styles.addressText}>{address.phone}</Text>
              </View>
            </View>

            <View style={styles.addressActions}>
              {!address.isDefault && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleSetDefault(address.id)}
                >
                  <MaterialCommunityIcons
                    name="star-outline"
                    size={18}
                    color="#FFB800"
                  />
                  <Text style={styles.actionButtonText}>Set Default</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.actionButton}>
                <MaterialCommunityIcons
                  name="pencil"
                  size={18}
                  color="#0066FF"
                />
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
              {!address.isDefault && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDeleteAddress(address.id)}
                >
                  <MaterialCommunityIcons
                    name="delete-outline"
                    size={18}
                    color="#DC3545"
                  />
                  <Text style={[styles.actionButtonText, styles.deleteText]}>
                    Delete
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        {/* Add New Address Button */}
        <TouchableOpacity
          style={styles.addAddressButton}
          onPress={() => setShowAddModal(true)}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={["#0066FF", "#0052CC"]}
            style={styles.addAddressGradient}
          >
            <MaterialCommunityIcons name="plus" size={24} color="#FFFFFF" />
            <Text style={styles.addAddressText}>Add New Address</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <MaterialCommunityIcons
            name="information"
            size={24}
            color="#0066FF"
          />
          <Text style={styles.infoText}>
            We'll use your default address for deliveries. You can change it
            anytime.
          </Text>
        </View>
      </ScrollView>

      {/* Add Address Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Address</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <MaterialCommunityIcons
                  name="close"
                  size={28}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Select Icon */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Address Type</Text>
                <View style={styles.iconsContainer}>
                  {iconOptions.map((icon) => (
                    <TouchableOpacity
                      key={icon}
                      style={[
                        styles.iconOption,
                        selectedIcon === icon && styles.iconOptionSelected,
                      ]}
                      onPress={() => setSelectedIcon(icon)}
                    >
                      <MaterialCommunityIcons
                        name={icon}
                        size={24}
                        color={selectedIcon === icon ? "#0066FF" : "#888888"}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Address Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Address Name</Text>
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons
                    name="label"
                    size={20}
                    color="#666666"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., Home, Office, Mom's Place"
                    placeholderTextColor="#666666"
                    value={addressName}
                    onChangeText={setAddressName}
                  />
                </View>
              </View>

              {/* Address Line */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Address</Text>
                <View style={[styles.inputContainer, styles.textAreaContainer]}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={20}
                    color="#666666"
                    style={styles.textAreaIcon}
                  />
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Enter your full address"
                    placeholderTextColor="#666666"
                    value={addressLine}
                    onChangeText={setAddressLine}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                  />
                </View>
              </View>

              {/* Phone Number */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons
                    name="phone"
                    size={20}
                    color="#666666"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="+234 801 234 5678"
                    placeholderTextColor="#666666"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              {/* Use Current Location */}
              <TouchableOpacity style={styles.locationButton}>
                <MaterialCommunityIcons
                  name="crosshairs-gps"
                  size={20}
                  color="#0066FF"
                />
                <Text style={styles.locationButtonText}>
                  Use Current Location
                </Text>
              </TouchableOpacity>

              {/* Save Button */}
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleAddAddress}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={["#0066FF", "#0052CC"]}
                  style={styles.saveGradient}
                >
                  <MaterialCommunityIcons
                    name="check"
                    size={24}
                    color="#FFFFFF"
                  />
                  <Text style={styles.saveText}>Save Address</Text>
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
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#0A0A0A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  addressCard: {
    backgroundColor: "#0A0A0A",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  addressIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  addressHeaderRight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addressName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  defaultBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 208, 132, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 1000,
    gap: 4,
    borderWidth: 1,
    borderColor: "rgba(0, 208, 132, 0.3)",
  },
  defaultText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#00D084",
    letterSpacing: 0.5,
  },
  addressContent: {
    gap: 10,
    marginBottom: 16,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  addressText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
    lineHeight: 20,
  },
  addressActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 1000,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  deleteText: {
    color: "#DC3545",
  },
  addAddressButton: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 1000,
  },
  addAddressGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 1000,
    gap: 10,
  },
  addAddressText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(0, 102, 255, 0.05)",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 102, 255, 0.2)",
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
    lineHeight: 18,
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
  iconsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  iconOption: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  iconOptionSelected: {
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    borderColor: "#0066FF",
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
  textAreaContainer: {
    alignItems: "flex-start",
  },
  textAreaIcon: {
    marginTop: 4,
  },
  textArea: {
    minHeight: 80,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 10,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(0, 102, 255, 0.3)",
  },
  locationButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0066FF",
    letterSpacing: 0.3,
  },
  saveButton: {
    borderRadius: 1000,
    marginBottom: 20,
  },
  saveGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 1000,
    gap: 10,
  },
  saveText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});

export default AddressesScreen;
