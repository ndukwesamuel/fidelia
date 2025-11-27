import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Animated,
  StatusBar,
  ViewToken,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

const { width, height } = Dimensions.get("window");

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  gradient: string[];
  emoji: string;
  particles: string[];
}

const SLIDES: Slide[] = [
  {
    id: "1",
    title: "LIGHTNING FAST",
    subtitle: "Delivery in Minutes",
    description:
      'Get anything delivered to your doorstep faster than you can say "Fidelia" ⚡',
    icon: "lightning-bolt",
    gradient: ["#0066FF", "#0052CC"],
    emoji: "⚡",
    particles: ["🔥", "💨", "✨"],
  },
  {
    id: "2",
    title: "MOVE ANYTHING",
    subtitle: "Food, Groceries & More",
    description:
      "From jollof rice to pharmacy runs, we deliver everything you need 🚀",
    icon: "truck-fast",
    gradient: ["#FF6B00", "#E55A00"],
    emoji: "🚚",
    particles: ["🍔", "🛒", "💊"],
  },
  {
    id: "3",
    title: "EARN REWARDS",
    subtitle: "Fidelia Points System",
    description:
      "Every order earns you points. Unlock exclusive perks and become a power user 🏆",
    icon: "trophy",
    gradient: ["#00D084", "#00B872"],
    emoji: "🎯",
    particles: ["💰", "🎁", "⭐"],
  },
];

type OnboardingScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);

  // Animation values for each slide
  const slideAnim = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0]) {
        setCurrentIndex(viewableItems[0].index || 0);

        // Trigger slide animation
        Animated.spring(slideAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }).start(() => {
          slideAnim.setValue(0);
        });
      }
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < SLIDES.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // Navigate to login/register
      navigation.replace("Login");
    }
  };

  const skip = () => {
    navigation.replace("Login");
  };

  const renderSlide = ({ item, index }: { item: Slide; index: number }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: "clamp",
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.3, 1, 0.3],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.slide}>
        {/* Floating particles */}
        <View style={styles.particlesContainer}>
          <Animated.Text
            style={[styles.floatingParticle, styles.particle1, { opacity }]}
          >
            {item.particles[0]}
          </Animated.Text>
          <Animated.Text
            style={[styles.floatingParticle, styles.particle2, { opacity }]}
          >
            {item.particles[1]}
          </Animated.Text>
          <Animated.Text
            style={[styles.floatingParticle, styles.particle3, { opacity }]}
          >
            {item.particles[2]}
          </Animated.Text>
        </View>

        {/* Main icon with gradient */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ scale }],
              opacity,
            },
          ]}
        >
          {/* Glow rings */}
          <View style={[styles.glowRing, { borderColor: item.gradient[0] }]} />
          <View
            style={[
              styles.glowRing,
              styles.glowRing2,
              { borderColor: item.gradient[0] },
            ]}
          />

          {/* Icon with gradient background */}
          <LinearGradient
            colors={item.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconGradient}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={72}
              color="#FFFFFF"
            />
          </LinearGradient>

          {/* 3D shadow */}
          <View
            style={[styles.iconShadow, { backgroundColor: item.gradient[1] }]}
          />

          {/* Giant emoji */}
          <Text style={styles.giantEmoji}>{item.emoji}</Text>
        </Animated.View>

        {/* Content */}
        <Animated.View
          style={[
            styles.content,
            {
              opacity,
            },
          ]}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.slideTitle}>{item.title}</Text>
            <View
              style={[
                styles.titleUnderline,
                { backgroundColor: item.gradient[0] },
              ]}
            />
          </View>

          <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
          <Text style={styles.slideDescription}>{item.description}</Text>
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Background gradient */}
      <LinearGradient
        colors={["#000000", "#0A0A0A", "#000000"]}
        style={styles.background}
      />

      {/* Skip button */}
      <TouchableOpacity style={styles.skipButton} onPress={skip}>
        <Text style={styles.skipText}>SKIP</Text>
        <MaterialCommunityIcons name="arrow-right" size={18} color="#888888" />
      </TouchableOpacity>

      {/* Slides */}
      <FlatList
        data={SLIDES}
        renderItem={renderSlide}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      {/* Bottom controls */}
      <View style={styles.bottomContainer}>
        {/* Pagination dots */}
        <View style={styles.pagination}>
          {SLIDES.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [12, 32, 12],
              extrapolate: "clamp",
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    width: dotWidth,
                    opacity,
                    backgroundColor:
                      currentIndex === index ? "#0066FF" : "#333333",
                  },
                ]}
              />
            );
          })}
        </View>

        {/* Next/Get Started button */}
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={scrollTo}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={["#0066FF", "#0052CC"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {currentIndex === SLIDES.length - 1 ? "GET STARTED" : "NEXT"}
            </Text>
            <MaterialCommunityIcons
              name={
                currentIndex === SLIDES.length - 1
                  ? "lightning-bolt"
                  : "arrow-right"
              }
              size={24}
              color="#FFFFFF"
            />
          </LinearGradient>

          {/* 3D shadow layer */}
          <View style={styles.buttonShadow} />
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

  // Skip button
  skipButton: {
    position: "absolute",
    top: 60,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 1000,
    gap: 6,
    zIndex: 10,

    borderWidth: 1,
    borderColor: "rgba(136, 136, 136, 0.2)",
  },
  skipText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#888888",
    letterSpacing: 1,
  },

  // Slide
  slide: {
    width: width,
    height: height - 200,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },

  // Particles
  particlesContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  floatingParticle: {
    position: "absolute",
    fontSize: 40,
  },
  particle1: {
    top: "20%",
    left: "15%",
  },
  particle2: {
    top: "25%",
    right: "18%",
  },
  particle3: {
    top: "32%",
    left: "65%",
  },

  // Icon container
  iconContainer: {
    marginBottom: 60,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  glowRing: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    opacity: 0.3,
  },
  glowRing2: {
    width: 240,
    height: 240,
    borderRadius: 120,
    opacity: 0.2,
  },
  iconGradient: {
    width: 160,
    height: 160,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",

    // Border
    borderWidth: 4,
    borderColor: "rgba(0, 0, 0, 0.2)",

    // Extreme glow
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 40,
    elevation: 20,
  },
  iconShadow: {
    position: "absolute",
    bottom: -12,
    left: 12,
    right: 12,
    height: 160,
    borderRadius: 50,
    zIndex: -1,
    opacity: 0.5,
  },
  giantEmoji: {
    fontSize: 60,
    position: "absolute",
    bottom: -30,
    right: -20,
  },

  // Content
  content: {
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  slideTitle: {
    fontSize: 44,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 2,
    textTransform: "uppercase",
    textAlign: "center",
    fontFamily: "ClashDisplay",

    // Text glow
    textShadowColor: "#0066FF",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  titleUnderline: {
    width: 80,
    height: 5,
    borderRadius: 2.5,
    marginTop: 12,

    // Glow
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
  },
  slideSubtitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0066FF",
    letterSpacing: 0.8,
    textAlign: "center",
    marginBottom: 16,
  },
  slideDescription: {
    fontSize: 16,
    fontWeight: "500",
    color: "#888888",
    textAlign: "center",
    lineHeight: 24,
    letterSpacing: 0.3,
  },

  // Bottom controls
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 32,
  },
  dot: {
    height: 12,
    borderRadius: 6,

    // Glow for active dot
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },

  // Button
  buttonWrapper: {
    position: "relative",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 1000,
    gap: 12,

    // Border
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.1)",

    // Extreme glow
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    elevation: 16,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  buttonShadow: {
    position: "absolute",
    bottom: -8,
    left: 8,
    right: 8,
    height: "100%",
    backgroundColor: "#0052CC",
    borderRadius: 1000,
    zIndex: -1,
    opacity: 0.6,
  },
});

export default OnboardingScreen;
