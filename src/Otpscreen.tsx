import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../types/navigation";

type OTPScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "OTP">;
  route: RouteProp<RootStackParamList, "OTP">;
};

const OTPScreen: React.FC<OTPScreenProps> = ({ navigation, route }) => {
  //   const { phoneNumber, email } = route.params;
  let phoneNumber = "08056148116";
  let email = "ndukwesamuel23@gmail.com";
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<(TextInput | null)[]>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Start countdown
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) return;

    setLoading(true);
    try {
      // Your OTP verification API call here
      console.log("Verify OTP:", otpCode);

      // Navigate to home on success
      navigation.replace("MainTabs");
    } catch (error) {
      console.error("OTP verification error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setTimer(60);
    setCanResend(false);

    // Restart timer
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Your resend OTP API call here
    console.log("Resend OTP");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <LinearGradient
        colors={["#000000", "#0A0A0A", "#000000"]}
        style={styles.background}
      />

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={28} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.headerSection}>
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={["#0066FF", "#0052CC"]}
              style={styles.iconGradient}
            >
              <MaterialCommunityIcons
                name="shield-check"
                size={48}
                color="#FFFFFF"
              />
            </LinearGradient>
            <View style={styles.iconShadow} />
          </View>

          <Text style={styles.headerTitle}>VERIFY OTP</Text>
          <View style={styles.headerUnderline} />
          <Text style={styles.headerSubtitle}>
            We've sent a code to {"\n"}
            <Text style={styles.phoneNumber}>{phoneNumber}</Text>
          </Text>
        </View>

        {/* OTP Input */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <View key={index} style={styles.otpBoxWrapper}>
              <TextInput
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={({ nativeEvent: { key } }) =>
                  handleKeyPress(key, index)
                }
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
              />
              {digit ? <View style={styles.otpBoxGlow} /> : null}
            </View>
          ))}
        </View>

        {/* Timer */}
        <View style={styles.timerContainer}>
          {!canResend ? (
            <>
              <MaterialCommunityIcons
                name="timer-outline"
                size={20}
                color="#888888"
              />
              <Text style={styles.timerText}>Resend code in {timer}s</Text>
            </>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendText}>Resend Code</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={handleVerify}
          disabled={loading || otp.join("").length !== 6}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={["#0066FF", "#0052CC"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.verifyButton,
              (loading || otp.join("").length !== 6) && styles.buttonDisabled,
            ]}
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
                  name="check-circle"
                  size={24}
                  color="#FFFFFF"
                />
                <Text style={styles.verifyButtonText}>VERIFY</Text>
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

        {/* Help Text */}
        <Text style={styles.helpText}>
          Didn't receive the code?{"\n"}
          Check your spam folder or try again
        </Text>
      </Animated.View>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
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
    marginBottom: 48,
  },
  iconContainer: {
    marginBottom: 24,
    position: "relative",
  },
  iconGradient: {
    width: 100,
    height: 100,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(0, 0, 0, 0.2)",
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 16,
  },
  iconShadow: {
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
    marginBottom: 16,
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
    lineHeight: 22,
    letterSpacing: 0.3,
  },
  phoneNumber: {
    color: "#0066FF",
    fontWeight: "700",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  otpBoxWrapper: {
    position: "relative",
  },
  otpBox: {
    width: 52,
    height: 64,
    borderRadius: 16,
    backgroundColor: "#0A0A0A",
    borderWidth: 2,
    borderColor: "rgba(0, 102, 255, 0.2)",
    fontSize: 28,
    fontWeight: "900",
    color: "#FFFFFF",
    textAlign: "center",
  },
  otpBoxFilled: {
    borderColor: "#0066FF",
    backgroundColor: "rgba(0, 102, 255, 0.1)",
  },
  otpBoxGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    backgroundColor: "#0066FF",
    opacity: 0.2,
    zIndex: -1,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 32,
  },
  timerText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#888888",
    letterSpacing: 0.3,
  },
  resendText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0066FF",
    letterSpacing: 0.5,
  },
  buttonWrapper: {
    position: "relative",
    marginBottom: 24,
  },
  verifyButton: {
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
  buttonDisabled: {
    opacity: 0.5,
  },
  verifyButtonText: {
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
  helpText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666666",
    textAlign: "center",
    lineHeight: 20,
    letterSpacing: 0.3,
  },
});

export default OTPScreen;
