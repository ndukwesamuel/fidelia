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
import type { RootStackParamList } from "../types/navigation";

type RateOrderScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "RateOrder">;
  route: RouteProp<RootStackParamList, "RateOrder">;
};

const RateOrderScreen: React.FC<RateOrderScreenProps> = ({
  navigation,
  route,
}) => {
  const { orderId } = route.params;
  const [foodRating, setFoodRating] = useState(0);
  const [deliveryRating, setDeliveryRating] = useState(0);
  const [storeRating, setStoreRating] = useState(0);
  const [review, setReview] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const orderInfo = {
    storeName: "Chicken Republic",
    orderNumber: "FDL-2024-001232",
    items: ["Rotisserie Chicken", "Chicken & Chips"],
  };

  const quickTags = [
    "😋 Delicious",
    "🔥 Hot & Fresh",
    "📦 Good Packaging",
    "⚡ Fast Delivery",
    "😊 Friendly Rider",
    "💯 Great Value",
    "👍 As Expected",
    "🌟 Exceeded Expectations",
  ];

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = () => {
    // Submit review logic
    navigation.goBack();
  };

  const canSubmit = foodRating > 0 && deliveryRating > 0 && storeRating > 0;

  const renderStars = (
    rating: number,
    onPress: (rating: number) => void,
    size: number = 40
  ) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => onPress(star)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name={star <= rating ? "star" : "star-outline"}
              size={size}
              color={star <= rating ? "#FFB800" : "#666666"}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "";
    }
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
          <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>RATE YOUR ORDER</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Order Info */}
        <View style={styles.orderInfoCard}>
          <View style={styles.orderIconContainer}>
            <MaterialCommunityIcons name="store" size={32} color="#FF6B00" />
          </View>
          <View style={styles.orderInfo}>
            <Text style={styles.orderStoreName}>{orderInfo.storeName}</Text>
            <Text style={styles.orderNumber}>{orderInfo.orderNumber}</Text>
            <Text style={styles.orderItems}>{orderInfo.items.join(" • ")}</Text>
          </View>
        </View>

        {/* Food Quality Rating */}
        <View style={styles.ratingSection}>
          <View style={styles.ratingSectionHeader}>
            <MaterialCommunityIcons name="food" size={24} color="#FF6B00" />
            <Text style={styles.ratingSectionTitle}>Food Quality</Text>
          </View>
          {renderStars(foodRating, setFoodRating)}
          {foodRating > 0 && (
            <Text style={styles.ratingText}>{getRatingText(foodRating)}</Text>
          )}
        </View>

        {/* Delivery Rating */}
        <View style={styles.ratingSection}>
          <View style={styles.ratingSectionHeader}>
            <MaterialCommunityIcons
              name="bike-fast"
              size={24}
              color="#0066FF"
            />
            <Text style={styles.ratingSectionTitle}>Delivery Service</Text>
          </View>
          {renderStars(deliveryRating, setDeliveryRating)}
          {deliveryRating > 0 && (
            <Text style={styles.ratingText}>
              {getRatingText(deliveryRating)}
            </Text>
          )}
        </View>

        {/* Store Rating */}
        <View style={styles.ratingSection}>
          <View style={styles.ratingSectionHeader}>
            <MaterialCommunityIcons
              name="store-check"
              size={24}
              color="#00D084"
            />
            <Text style={styles.ratingSectionTitle}>Overall Experience</Text>
          </View>
          {renderStars(storeRating, setStoreRating)}
          {storeRating > 0 && (
            <Text style={styles.ratingText}>{getRatingText(storeRating)}</Text>
          )}
        </View>

        {/* Quick Tags */}
        <View style={styles.tagsSection}>
          <Text style={styles.tagsSectionTitle}>
            What did you like? (Optional)
          </Text>
          <View style={styles.tagsContainer}>
            {quickTags.map((tag, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tagChip,
                  selectedTags.includes(tag) && styles.tagChipSelected,
                ]}
                onPress={() => handleTagToggle(tag)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.tagText,
                    selectedTags.includes(tag) && styles.tagTextSelected,
                  ]}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Review Text */}
        <View style={styles.reviewSection}>
          <Text style={styles.reviewTitle}>Write a Review (Optional)</Text>
          <View style={styles.reviewInputContainer}>
            <TextInput
              style={styles.reviewInput}
              placeholder="Share your experience with others..."
              placeholderTextColor="#666666"
              value={review}
              onChangeText={setReview}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              maxLength={500}
            />
            <Text style={styles.reviewCounter}>{review.length}/500</Text>
          </View>
        </View>

        {/* Photo Upload */}
        <View style={styles.photoSection}>
          <Text style={styles.photoTitle}>Add Photos (Optional)</Text>
          <View style={styles.photoContainer}>
            <TouchableOpacity style={styles.photoUploadButton}>
              <MaterialCommunityIcons
                name="camera-plus"
                size={32}
                color="#666666"
              />
              <Text style={styles.photoUploadText}>Add Photo</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.photoHint}>
            Help others by adding photos of your order
          </Text>
        </View>

        {/* Privacy Note */}
        <View style={styles.privacyCard}>
          <MaterialCommunityIcons
            name="shield-check"
            size={20}
            color="#00D084"
          />
          <Text style={styles.privacyText}>
            Your review will be public and visible to other users
          </Text>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            !canSubmit && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!canSubmit}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={canSubmit ? ["#0066FF", "#0052CC"] : ["#333333", "#1A1A1A"]}
            style={styles.submitGradient}
          >
            <MaterialCommunityIcons name="send" size={20} color="#FFFFFF" />
            <Text style={styles.submitText}>Submit Review</Text>
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
    paddingBottom: 120,
  },
  orderInfoCard: {
    flexDirection: "row",
    backgroundColor: "#0A0A0A",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    marginBottom: 24,
    gap: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  orderIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 107, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  orderInfo: {
    flex: 1,
  },
  orderStoreName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  orderNumber: {
    fontSize: 12,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  orderItems: {
    fontSize: 13,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
    lineHeight: 18,
  },
  ratingSection: {
    marginHorizontal: 20,
    marginBottom: 32,
  },
  ratingSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  ratingSectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFB800",
    letterSpacing: 0.3,
    marginTop: 12,
  },
  tagsSection: {
    marginHorizontal: 20,
    marginBottom: 32,
  },
  tagsSectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  tagChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#0A0A0A",
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  tagChipSelected: {
    backgroundColor: "#0066FF",
    borderColor: "#0066FF",
  },
  tagText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  tagTextSelected: {
    color: "#FFFFFF",
  },
  reviewSection: {
    marginHorizontal: 20,
    marginBottom: 32,
  },
  reviewTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  reviewInputContainer: {
    backgroundColor: "#0A0A0A",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    position: "relative",
  },
  reviewInput: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    padding: 16,
    minHeight: 120,
  },
  reviewCounter: {
    position: "absolute",
    bottom: 12,
    right: 16,
    fontSize: 11,
    fontWeight: "600",
    color: "#666666",
    letterSpacing: 0.3,
  },
  photoSection: {
    marginHorizontal: 20,
    marginBottom: 32,
  },
  photoTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  photoContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  photoUploadButton: {
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: "#0A0A0A",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  photoUploadText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#666666",
    letterSpacing: 0.3,
  },
  photoHint: {
    fontSize: 11,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  privacyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 208, 132, 0.05)",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 208, 132, 0.2)",
  },
  privacyText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
    lineHeight: 18,
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
  submitButton: {
    borderRadius: 1000,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 1000,
    gap: 10,
  },
  submitText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});

export default RateOrderScreen;
