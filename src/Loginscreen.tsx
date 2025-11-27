import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    // Reset errors
    setErrors({ email: "", password: "" });

    // Validation
    let hasError = false;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      hasError = true;
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
      hasError = true;
    }

    if (!password) {
      newErrors.password = "Password is required";
      hasError = true;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Handle login logic
    setLoading(true);
    try {
      // Your login API call here
      console.log("Login:", { email, password });

      // Navigate to home on success
      // navigation.replace('Home');
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Background gradient */}
      <LinearGradient
        colors={["#000000", "#0A0A0A", "#000000"]}
        style={styles.background}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Logo Section */}
            <View style={styles.logoSection}>
              {/* Logo with gradient */}
              <View style={styles.logoContainer}>
                <LinearGradient
                  colors={["#0066FF", "#0052CC"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.logoGradient}
                >
                  <MaterialCommunityIcons
                    name="lightning-bolt"
                    size={48}
                    color="#FFFFFF"
                  />
                </LinearGradient>

                {/* 3D shadow */}
                <View style={styles.logoShadow} />
              </View>

              {/* Welcome text */}
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>WELCOME BACK</Text>
                <View style={styles.welcomeUnderline} />
              </View>
              <Text style={styles.subtitleText}>
                Sign in to continue your faithful delivery experience
              </Text>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    errors.email ? styles.inputError : null,
                  ]}
                >
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={24}
                    color={errors.email ? "#DC3545" : "#666666"}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="your@email.com"
                    placeholderTextColor="#666666"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />
                </View>
                {errors.email ? (
                  <View style={styles.errorContainer}>
                    <MaterialCommunityIcons
                      name="alert-circle"
                      size={14}
                      color="#DC3545"
                    />
                    <Text style={styles.errorText}>{errors.email}</Text>
                  </View>
                ) : null}
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>PASSWORD</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    errors.password ? styles.inputError : null,
                  ]}
                >
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={24}
                    color={errors.password ? "#DC3545" : "#666666"}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#666666"
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (errors.password)
                        setErrors({ ...errors, password: "" });
                    }}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoComplete="password"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                  >
                    <MaterialCommunityIcons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={24}
                      color="#666666"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password ? (
                  <View style={styles.errorContainer}>
                    <MaterialCommunityIcons
                      name="alert-circle"
                      size={14}
                      color="#DC3545"
                    />
                    <Text style={styles.errorText}>{errors.password}</Text>
                  </View>
                ) : null}
              </View>

              {/* Forgot Password */}
              <TouchableOpacity
                style={styles.forgotButton}
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={handleLogin}
                disabled={loading}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={["#0066FF", "#0052CC"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.loginButton}
                >
                  {loading ? (
                    <View style={styles.loadingContainer}>
                      <View style={styles.loadingDot} />
                      <View style={[styles.loadingDot, styles.loadingDot2]} />
                      <View style={[styles.loadingDot, styles.loadingDot3]} />
                    </View>
                  ) : (
                    <>
                      <MaterialCommunityIcons
                        name="login"
                        size={24}
                        color="#FFFFFF"
                      />
                      <Text style={styles.loginButtonText}>SIGN IN</Text>
                      <MaterialCommunityIcons
                        name="arrow-right"
                        size={24}
                        color="#FFFFFF"
                      />
                    </>
                  )}
                </LinearGradient>

                {/* 3D shadow layer */}
                <View style={styles.buttonShadow} />
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Login Buttons */}
              <View style={styles.socialContainer}>
                {/* Google */}
                <TouchableOpacity style={styles.socialButton}>
                  <View style={styles.socialIconContainer}>
                    <MaterialCommunityIcons
                      name="google"
                      size={24}
                      color="#FFFFFF"
                    />
                  </View>
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>

                {/* Apple */}
                <TouchableOpacity style={styles.socialButton}>
                  <View style={styles.socialIconContainer}>
                    <MaterialCommunityIcons
                      name="apple"
                      size={24}
                      color="#FFFFFF"
                    />
                  </View>
                  <Text style={styles.socialButtonText}>Apple</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Register Link */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.registerLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            {/* Terms */}
            <Text style={styles.termsText}>
              By continuing, you agree to our{" "}
              <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
  },

  // Logo Section
  logoSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 28,
    position: "relative",
  },
  logoGradient: {
    width: 100,
    height: 100,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",

    // Border
    borderWidth: 3,
    borderColor: "rgba(0, 0, 0, 0.2)",

    // Glow
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 16,
  },
  logoShadow: {
    position: "absolute",
    bottom: -8,
    left: 8,
    right: 8,
    height: "100%",
    backgroundColor: "#0052CC",
    borderRadius: 32,
    zIndex: -1,
    opacity: 0.5,
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    textAlign: "center",

    // Text glow
    textShadowColor: "#0066FF",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  welcomeUnderline: {
    width: 80,
    height: 4,
    backgroundColor: "#0066FF",
    borderRadius: 2,
    marginTop: 8,

    // Glow
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
  },
  subtitleText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#888888",
    textAlign: "center",
    lineHeight: 22,
    letterSpacing: 0.3,
  },

  // Form Section
  formSection: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#888888",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A0A0A",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: "rgba(0, 102, 255, 0.1)",

    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  inputError: {
    borderColor: "#DC3545",
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    paddingVertical: 16,
    letterSpacing: 0.3,
  },
  eyeIcon: {
    padding: 8,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 6,
  },
  errorText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#DC3545",
    letterSpacing: 0.3,
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginBottom: 28,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0066FF",
    letterSpacing: 0.3,
  },

  // Login Button
  buttonWrapper: {
    position: "relative",
    marginBottom: 28,
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 32,
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
  loginButtonText: {
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
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  loadingDot2: {
    opacity: 0.7,
  },
  loadingDot3: {
    opacity: 0.4,
  },

  // Divider
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#333333",
  },
  dividerText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#666666",
    letterSpacing: 1,
    marginHorizontal: 16,
  },

  // Social Buttons
  socialContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0A0A0A",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 20,
    gap: 10,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",

    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  socialIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  socialButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },

  // Register Link
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  registerText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  registerLink: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0066FF",
    letterSpacing: 0.5,
  },

  // Terms
  termsText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#666666",
    textAlign: "center",
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  termsLink: {
    color: "#0066FF",
    fontWeight: "700",
  },
});

export default LoginScreen;
