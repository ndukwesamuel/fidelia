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
import type { RootStackParamList } from "../types/navigation";

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Register">;
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone);
  };

  const handleRegister = async () => {
    setErrors({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });

    let hasError = false;
    const newErrors = {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    };

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
      hasError = true;
    }

    if (!email) {
      newErrors.email = "Email is required";
      hasError = true;
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
      hasError = true;
    }

    if (!phone) {
      newErrors.phone = "Phone number is required";
      hasError = true;
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Please enter a valid phone number";
      hasError = true;
    }

    if (!password) {
      newErrors.password = "Password is required";
      hasError = true;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      hasError = true;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      hasError = true;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      // Your registration API call here
      console.log("Register:", { fullName, email, phone, password });

      // Navigate to OTP verification
      navigation.navigate("OTP", { phoneNumber: phone, email });
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

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
          <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
            {/* Header */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={28}
                color="#FFFFFF"
              />
            </TouchableOpacity>

            <View style={styles.headerSection}>
              <Text style={styles.headerTitle}>CREATE ACCOUNT</Text>
              <View style={styles.headerUnderline} />
              <Text style={styles.headerSubtitle}>
                Join Fidelia for faithful delivery experience
              </Text>
            </View>

            {/* Form */}
            <View style={styles.formSection}>
              {/* Full Name */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>FULL NAME</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    errors.fullName ? styles.inputError : null,
                  ]}
                >
                  <MaterialCommunityIcons
                    name="account-outline"
                    size={24}
                    color={errors.fullName ? "#DC3545" : "#666666"}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    placeholderTextColor="#666666"
                    value={fullName}
                    onChangeText={(text) => {
                      setFullName(text);
                      if (errors.fullName)
                        setErrors({ ...errors, fullName: "" });
                    }}
                    autoCapitalize="words"
                  />
                </View>
                {errors.fullName ? (
                  <View style={styles.errorContainer}>
                    <MaterialCommunityIcons
                      name="alert-circle"
                      size={14}
                      color="#DC3545"
                    />
                    <Text style={styles.errorText}>{errors.fullName}</Text>
                  </View>
                ) : null}
              </View>

              {/* Email */}
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

              {/* Phone */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>PHONE NUMBER</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    errors.phone ? styles.inputError : null,
                  ]}
                >
                  <MaterialCommunityIcons
                    name="phone-outline"
                    size={24}
                    color={errors.phone ? "#DC3545" : "#666666"}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="08012345678"
                    placeholderTextColor="#666666"
                    value={phone}
                    onChangeText={(text) => {
                      setPhone(text);
                      if (errors.phone) setErrors({ ...errors, phone: "" });
                    }}
                    keyboardType="phone-pad"
                    maxLength={11}
                  />
                </View>
                {errors.phone ? (
                  <View style={styles.errorContainer}>
                    <MaterialCommunityIcons
                      name="alert-circle"
                      size={14}
                      color="#DC3545"
                    />
                    <Text style={styles.errorText}>{errors.phone}</Text>
                  </View>
                ) : null}
              </View>

              {/* Password */}
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
                    placeholder="Create password"
                    placeholderTextColor="#666666"
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (errors.password)
                        setErrors({ ...errors, password: "" });
                    }}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
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

              {/* Confirm Password */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>CONFIRM PASSWORD</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    errors.confirmPassword ? styles.inputError : null,
                  ]}
                >
                  <MaterialCommunityIcons
                    name="lock-check-outline"
                    size={24}
                    color={errors.confirmPassword ? "#DC3545" : "#666666"}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    placeholderTextColor="#666666"
                    value={confirmPassword}
                    onChangeText={(text) => {
                      setConfirmPassword(text);
                      if (errors.confirmPassword)
                        setErrors({ ...errors, confirmPassword: "" });
                    }}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeIcon}
                  >
                    <MaterialCommunityIcons
                      name={
                        showConfirmPassword ? "eye-off-outline" : "eye-outline"
                      }
                      size={24}
                      color="#666666"
                    />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword ? (
                  <View style={styles.errorContainer}>
                    <MaterialCommunityIcons
                      name="alert-circle"
                      size={14}
                      color="#DC3545"
                    />
                    <Text style={styles.errorText}>
                      {errors.confirmPassword}
                    </Text>
                  </View>
                ) : null}
              </View>

              {/* Register Button */}
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={handleRegister}
                disabled={loading}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={["#0066FF", "#0052CC"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.registerButton}
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
                        name="account-plus"
                        size={24}
                        color="#FFFFFF"
                      />
                      <Text style={styles.registerButtonText}>
                        CREATE ACCOUNT
                      </Text>
                      <MaterialCommunityIcons
                        name="arrow-right"
                        size={24}
                        color="#FFFFFF"
                      />
                    </>
                  )}
                </LinearGradient>
                <View style={styles.buttonShadow} />
              </TouchableOpacity>
            </View>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
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
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#0A0A0A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    textShadowColor: "#0066FF",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  headerUnderline: {
    width: 80,
    height: 4,
    backgroundColor: "#0066FF",
    borderRadius: 2,
    marginTop: 8,
    marginBottom: 12,
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
  },
  headerSubtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#888888",
    textAlign: "center",
    letterSpacing: 0.3,
  },
  formSection: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
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
  buttonWrapper: {
    position: "relative",
    marginTop: 8,
  },
  registerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 1000,
    gap: 12,
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.1)",
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    elevation: 16,
  },
  registerButtonText: {
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
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  loginLink: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0066FF",
    letterSpacing: 0.5,
  },
});

export default RegisterScreen;
