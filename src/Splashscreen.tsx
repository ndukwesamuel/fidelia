import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

const { width, height } = Dimensions.get("window");

type SplashScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  // Animation values
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const particleAnim = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animations
    Animated.sequence([
      // Logo entrance with bounce
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 20,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(glowOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),

      // Rotation animation
      Animated.timing(logoRotate, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),

      // Text fade in
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Particle animation loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(particleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(particleAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Navigate after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace("Onboarding");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const logoRotateInterpolate = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const particle1TranslateY = particleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -100],
  });

  const particle2TranslateY = particleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -80],
  });

  const particle3TranslateY = particleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -120],
  });

  const particleOpacity = particleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Animated background gradient */}
      <LinearGradient
        colors={["#000000", "#0A0A0A", "#000000"]}
        style={styles.background}
      />

      {/* Floating particles */}
      <Animated.View
        style={[
          styles.particle,
          styles.particle1,
          {
            opacity: particleOpacity,
            transform: [{ translateY: particle1TranslateY }],
          },
        ]}
      >
        <Text style={styles.particleEmoji}>⚡</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.particle,
          styles.particle2,
          {
            opacity: particleOpacity,
            transform: [{ translateY: particle2TranslateY }],
          },
        ]}
      >
        <Text style={styles.particleEmoji}>💫</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.particle,
          styles.particle3,
          {
            opacity: particleOpacity,
            transform: [{ translateY: particle3TranslateY }],
          },
        ]}
      >
        <Text style={styles.particleEmoji}>🔥</Text>
      </Animated.View>

      {/* Main logo container */}
      <View style={styles.logoContainer}>
        {/* Glow rings */}
        <Animated.View
          style={[
            styles.glowRing,
            styles.glowRing1,
            {
              opacity: glowOpacity,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.glowRing,
            styles.glowRing2,
            {
              opacity: glowOpacity,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.glowRing,
            styles.glowRing3,
            {
              opacity: glowOpacity,
            },
          ]}
        />

        {/* Logo with gradient background */}
        <Animated.View
          style={[
            styles.logoWrapper,
            {
              transform: [
                { scale: logoScale },
                { rotate: logoRotateInterpolate },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={["#0066FF", "#0052CC"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoGradient}
          >
            {/* Lightning bolt icon */}
            <MaterialCommunityIcons
              name="lightning-bolt"
              size={80}
              color="#FFFFFF"
            />
          </LinearGradient>

          {/* 3D shadow layer */}
          <View style={styles.logoShadow} />
        </Animated.View>

        {/* App name with glow */}
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: textOpacity,
            },
          ]}
        >
          <Text style={styles.appName}>FIDELIA</Text>
          <View style={styles.nameUnderline} />
          <Text style={styles.appTagline}>
            Faithful Delivery, Every Time ⚡
          </Text>
        </Animated.View>
      </View>

      {/* Loading indicator at bottom */}
      <Animated.View
        style={[
          styles.loadingContainer,
          {
            opacity: textOpacity,
          },
        ]}
      >
        <View style={styles.loadingBar}>
          <Animated.View
            style={[
              styles.loadingProgress,
              {
                width: particleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>
        <Text style={styles.loadingText}>Loading your experience...</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  // Particles
  particle: {
    position: "absolute",
  },
  particle1: {
    top: "20%",
    left: "20%",
  },
  particle2: {
    top: "30%",
    right: "25%",
  },
  particle3: {
    top: "25%",
    left: "60%",
  },
  particleEmoji: {
    fontSize: 32,
  },

  // Logo container
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  // Glow rings
  glowRing: {
    position: "absolute",
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: "#0066FF",
  },
  glowRing1: {
    width: 200,
    height: 200,
    opacity: 0.3,
  },
  glowRing2: {
    width: 240,
    height: 240,
    opacity: 0.2,
  },
  glowRing3: {
    width: 280,
    height: 280,
    opacity: 0.1,
  },

  // Logo
  logoWrapper: {
    position: "relative",
    marginBottom: 40,
  },
  logoGradient: {
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
    shadowOpacity: 0.8,
    shadowRadius: 40,
    elevation: 20,
  },
  logoShadow: {
    position: "absolute",
    bottom: -12,
    left: 12,
    right: 12,
    height: "100%",
    backgroundColor: "#0052CC",
    borderRadius: 50,
    zIndex: -1,
    opacity: 0.6,
  },

  // Text
  textContainer: {
    alignItems: "center",
  },
  appName: {
    fontSize: 56,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 4,
    textTransform: "uppercase",
    fontFamily: "ClashDisplay",

    // Text glow
    textShadowColor: "#0066FF",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
  },
  nameUnderline: {
    width: 120,
    height: 6,
    backgroundColor: "#0066FF",
    borderRadius: 3,
    marginTop: 8,
    marginBottom: 16,

    // Glow
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
  },
  appTagline: {
    fontSize: 16,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 1,
  },

  // Loading
  loadingContainer: {
    position: "absolute",
    bottom: 60,
    width: width - 80,
    alignItems: "center",
  },
  loadingBar: {
    width: "100%",
    height: 4,
    backgroundColor: "#151515",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 12,
  },
  loadingProgress: {
    height: "100%",
    backgroundColor: "#0066FF",
    borderRadius: 2,

    // Glow
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  loadingText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#666666",
    letterSpacing: 0.5,
  },
});

export default SplashScreen;
