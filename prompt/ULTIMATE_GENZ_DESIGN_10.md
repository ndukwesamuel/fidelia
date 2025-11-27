# 🚀 FIDELIA - THE ULTIMATE DELIVERY DESIGN SYSTEM

**Version 3.0 - Nigeria's Most Trusted Delivery Platform**

> **Fidelia: Faithful Delivery, Every Time**

---

## 🎯 THE BIG IDEA: "TRUST MEETS SPEED"

Your signature style = **Reliability with Energy**

### The Philosophy:

- Every interaction creates **trust**
- Services **pulse with reliability**
- Speed feels **effortless**
- Success moments trigger **celebrations**
- The app **breathes confidence** (subtle animations always running)

---

## 🌈 FIDELIA COLOR SYSTEM

### Primary: Trust Blue + Energy Orange

```javascript
// Fidelia Signature Colors (NO ONE uses this combination)
FIDELIA_BLUE: '#0066FF',               // Primary - Trust & Tech
FIDELIA_BLUE_LIGHT: '#3385FF',         // Lighter shade
FIDELIA_BLUE_DARK: '#0052CC',          // Darker shade
FIDELIA_BLUE_GLOW: 'rgba(0, 102, 255, 0.4)',

FIDELIA_ORANGE: '#FF6B00',             // Secondary - Energy & Action
FIDELIA_ORANGE_LIGHT: '#FF8533',
FIDELIA_ORANGE_DARK: '#E55A00',
FIDELIA_ORANGE_GLOW: 'rgba(255, 107, 0, 0.4)',

// Service Vibrant Palettes (BOLD choices)
FOOD_GRADIENT: ['#FF6B00', '#FF8533'],      // Orange (warm food)
GROCERY_GRADIENT: ['#00D084', '#00E69B'],   // Green (fresh)
ERRAND_GRADIENT: ['#0066FF', '#3385FF'],    // Blue (reliable)
LOGISTICS_GRADIENT: ['#FFB800', '#FFC933'], // Yellow (fast delivery)
PHARMACY_GRADIENT: ['#00B8A9', '#00D4C5'],  // Teal (medical)
MARKET_GRADIENT: ['#DC3545', '#E85563'],    // Red (vibrant market)

// Dark Mode (Deep Space Black)
SPACE_BLACK: '#000000',                    // Pure black
SPACE_GRAY: '#0A0A0A',                     // Cards
SPACE_CHARCOAL: '#151515',                 // Elevated elements
NEON_WHITE: '#FFFFFF',                     // Text

// Background has subtle moving gradient
BG_GRADIENT: ['#000000', '#0A0A0A', '#000000'],
```

---

## 💫 SIGNATURE COMPONENTS

### 1. 🌟 "FIDELIA HOME" - Hero Section

```jsx
const GlowHome = () => (
  <View style={styles.heroContainer}>
    {/* Animated background gradient */}
    <AnimatedGradient
      colors={["#000000", "#0A0A0A", "#000000"]}
      style={styles.animatedBg}
    />

    {/* Floating particles */}
    <ParticleField count={20} color="#0066FF" opacity={0.3} />

    {/* Main greeting with glow text */}
    <View style={styles.greetingSection}>
      <Text style={styles.timeGreeting}>Good Evening</Text>
      <View style={styles.nameContainer}>
        <Text style={styles.userName}>Ndukwe</Text>
        <View style={styles.nameGlow} />
      </View>
      <Text style={styles.tagline}>What moves you today? ⚡</Text>
    </View>

    {/* Wallet Card with EXTREME depth */}
    <View style={styles.walletCard}>
      {/* Neon border animation */}
      <AnimatedBorder color="#0066FF" width={2} />

      {/* Holographic effect */}
      <HolographicOverlay />

      <View style={styles.walletContent}>
        <View style={styles.walletHeader}>
          <View style={styles.walletIconContainer}>
            <LinearGradient colors={["#0066FF", "#0052CC"]}>
              <MaterialCommunityIcons name="wallet" size={24} color="#000" />
            </LinearGradient>
          </View>
          <Text style={styles.walletLabel}>BALANCE</Text>
        </View>

        {/* Balance with extreme typography */}
        <View style={styles.balanceContainer}>
          <Text style={styles.currency}>₦</Text>
          <CountUpAnimation
            end={45250}
            style={styles.balance}
            font="ClashDisplay"
          />
          <Text style={styles.decimal}>.00</Text>
        </View>

        {/* Quick action pills */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionPill}>
            <View style={[styles.pillGlow, { backgroundColor: "#0066FF" }]} />
            <MaterialCommunityIcons name="plus" size={16} color="#000" />
            <Text style={styles.pillText}>ADD MONEY</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionPill, styles.actionPillGhost]}>
            <MaterialCommunityIcons name="history" size={16} color="#0066FF" />
            <Text style={styles.pillTextGhost}>HISTORY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  heroContainer: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  greetingSection: {
    marginBottom: 28,
  },
  timeGreeting: {
    fontSize: 15,
    fontWeight: "500",
    color: "#666666",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  nameContainer: {
    position: "relative",
    alignSelf: "flex-start",
  },
  userName: {
    fontSize: 44,
    fontWeight: "900",
    color: "#FFFFFF",
    fontFamily: "ClashDisplay",
    letterSpacing: -1,
  },
  nameGlow: {
    position: "absolute",
    bottom: -4,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "#0066FF",
    borderRadius: 2,
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
  },
  tagline: {
    fontSize: 16,
    fontWeight: "500",
    color: "#888888",
    marginTop: 8,
  },
  walletCard: {
    backgroundColor: "#0A0A0A",
    borderRadius: 32,
    padding: 28,
    position: "relative",
    overflow: "hidden",

    // EXTREME shadow
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 20,
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 20,
  },
  currency: {
    fontSize: 32,
    fontWeight: "700",
    color: "#0066FF",
    marginTop: 8,
  },
  balance: {
    fontSize: 56,
    fontWeight: "900",
    color: "#FFFFFF",
    fontFamily: "ClashDisplay",
    letterSpacing: -2,
    textShadowColor: "#0066FF",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  decimal: {
    fontSize: 32,
    fontWeight: "700",
    color: "#333333",
    marginTop: 8,
  },
  quickActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  actionPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0066FF",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 1000,
    gap: 8,
    position: "relative",
    overflow: "hidden",
  },
  pillGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
    // Animated blur effect
  },
  pillText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#000000",
    letterSpacing: 1,
  },
  actionPillGhost: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#0066FF",
  },
  pillTextGhost: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0066FF",
    letterSpacing: 1,
  },
});
```

### 2. ⚡ "ENERGY GRID" - Service Selection

```jsx
const EnergyGrid = () => {
  const services = [
    {
      id: "food",
      name: "FOOD",
      icon: "food",
      gradient: ["#FF0080", "#FF4D00"],
      particles: "🍔🍕🍜",
    },
    {
      id: "grocery",
      name: "GROCERY",
      icon: "cart",
      gradient: ["#00FFF0", "#00D4FF"],
      particles: "🥬🥕🍎",
    },
    {
      id: "errand",
      name: "ERRANDS",
      icon: "run-fast",
      gradient: ["#FF00FF", "#B300FF"],
      particles: "⚡🏃💨",
    },
    {
      id: "logistics",
      name: "DELIVER",
      icon: "truck-fast",
      gradient: ["#FFFF00", "#FFB800"],
      particles: "📦🚚💨",
    },
    {
      id: "pharmacy",
      name: "PHARMA",
      icon: "medical-bag",
      gradient: ["#00FF88", "#00DDA0"],
      particles: "💊⚕️🏥",
    },
    {
      id: "market",
      name: "MARKET",
      icon: "store",
      gradient: ["#FF3D71", "#C7005C"],
      particles: "🛒🏪✨",
    },
  ];

  return (
    <View style={styles.energyGrid}>
      <SectionHeader title="MOVE ANYTHING" subtitle="Pick your vibe" />

      <View style={styles.grid}>
        {services.map((service, index) => (
          <TouchableOpacity
            key={service.id}
            style={styles.energyCard}
            onPress={() => handleServicePress(service)}
          >
            {/* Neon glow background */}
            <LinearGradient
              colors={[...service.gradient, service.gradient[0]]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              {/* Animated mesh gradient */}
              <MeshGradientOverlay colors={service.gradient} />

              {/* Floating emoji particles */}
              <View style={styles.particleContainer}>
                <Text style={styles.particle1}>{service.particles[0]}</Text>
                <Text style={styles.particle2}>{service.particles[1]}</Text>
                <Text style={styles.particle3}>{service.particles[2]}</Text>
              </View>

              {/* Content */}
              <View style={styles.cardContent}>
                {/* Icon with extreme glow */}
                <View style={styles.iconContainer}>
                  <View
                    style={[
                      styles.iconGlow,
                      {
                        backgroundColor: service.gradient[0],
                        opacity: 0.4,
                      },
                    ]}
                  />
                  <MaterialCommunityIcons
                    name={service.icon}
                    size={36}
                    color="#000000"
                  />
                </View>

                {/* Service name */}
                <Text style={styles.serviceName}>{service.name}</Text>

                {/* Tap indicator */}
                <View style={styles.tapIndicator}>
                  <View style={styles.tapRipple} />
                  <MaterialCommunityIcons
                    name="lightning-bolt"
                    size={14}
                    color="#000000"
                  />
                </View>
              </View>
            </LinearGradient>

            {/* 3D depth shadow */}
            <View
              style={[
                styles.cardShadow,
                {
                  backgroundColor: service.gradient[1],
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  energyGrid: {
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  energyCard: {
    width: "47.5%",
    aspectRatio: 0.9,
    position: "relative",
  },
  cardGradient: {
    flex: 1,
    borderRadius: 28,
    padding: 20,
    justifyContent: "space-between",
    overflow: "hidden",

    // Border with gradient
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  particleContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  particle1: {
    position: "absolute",
    top: "15%",
    right: "20%",
    fontSize: 24,
    opacity: 0.3,
    transform: [{ rotate: "15deg" }],
  },
  particle2: {
    position: "absolute",
    bottom: "25%",
    left: "15%",
    fontSize: 20,
    opacity: 0.25,
    transform: [{ rotate: "-20deg" }],
  },
  particle3: {
    position: "absolute",
    top: "45%",
    right: "10%",
    fontSize: 18,
    opacity: 0.2,
    transform: [{ rotate: "25deg" }],
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  iconGlow: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 20,
    transform: [{ scale: 1.2 }],
  },
  serviceName: {
    fontSize: 20,
    fontWeight: "900",
    color: "#000000",
    letterSpacing: 1,
    textShadowColor: "rgba(255, 255, 255, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tapIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 1000,
    gap: 4,
  },
  tapRipple: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#000000",
    // Animated pulse
  },
  cardShadow: {
    position: "absolute",
    bottom: -6,
    left: 6,
    right: 6,
    height: "100%",
    borderRadius: 28,
    zIndex: -1,
    opacity: 0.5,
  },
});
```

### 3. 🎯 "LIVE FEED" - Real-time Activity

```jsx
const LiveFeed = () => (
  <View style={styles.liveFeedContainer}>
    <SectionHeader
      title="HAPPENING NOW"
      subtitle="Live in your area"
      icon="lightning-bolt"
    />

    {/* Scrolling live activity cards */}
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.feedScroll}
    >
      {/* Hot Deal Card */}
      <View style={styles.liveCard}>
        <View style={styles.liveCardBorder}>
          <LinearGradient
            colors={["#FF0080", "#FF4D00"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.liveBorderGradient}
          />
        </View>

        <View style={styles.liveContent}>
          {/* Live badge */}
          <View style={styles.liveBadge}>
            <View style={styles.livePulse} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>

          {/* Store image with overlay */}
          <Image source={{ uri: "store-image" }} style={styles.liveImage} />

          <LinearGradient
            colors={["transparent", "#000000"]}
            style={styles.liveOverlay}
          >
            <View style={styles.dealTag}>
              <MaterialCommunityIcons name="fire" size={16} color="#FF0080" />
              <Text style={styles.dealText}>60% OFF</Text>
            </View>

            <Text style={styles.liveStore}>Mama Put Kitchen</Text>
            <Text style={styles.liveSubtext}>12 orders in last hour 🔥</Text>
          </LinearGradient>
        </View>
      </View>

      {/* Rider Nearby Card */}
      <View style={[styles.liveCard, styles.riderCard]}>
        <View style={styles.liveCardBorder}>
          <LinearGradient
            colors={["#0066FF", "#0052CC"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.liveBorderGradient}
          />
        </View>

        <View style={styles.liveContent}>
          <View style={styles.riderInfo}>
            <Image source={{ uri: "rider-photo" }} style={styles.riderPhoto} />
            <View style={styles.onlineDot} />

            <View style={styles.riderDetails}>
              <Text style={styles.riderName}>Emeka ⚡</Text>
              <View style={styles.riderStats}>
                <MaterialCommunityIcons name="star" size={14} color="#0066FF" />
                <Text style={styles.riderRating}>4.9</Text>
              </View>
            </View>
          </View>

          <View style={styles.riderLocation}>
            <MaterialCommunityIcons
              name="map-marker"
              size={16}
              color="#0066FF"
            />
            <Text style={styles.locationText}>0.8km away</Text>
          </View>

          <Text style={styles.riderSubtext}>Available for instant pickup</Text>
        </View>
      </View>

      {/* Add more live cards... */}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  liveFeedContainer: {
    paddingVertical: 28,
  },
  feedScroll: {
    paddingHorizontal: 20,
    gap: 16,
  },
  liveCard: {
    width: 280,
    height: 320,
    position: "relative",
  },
  liveCardBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 28,
    padding: 2,
    overflow: "hidden",
  },
  liveBorderGradient: {
    flex: 1,
    borderRadius: 28,
  },
  liveContent: {
    margin: 2,
    flex: 1,
    backgroundColor: "#0A0A0A",
    borderRadius: 26,
    overflow: "hidden",
    padding: 16,
  },
  liveBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 1000,
    gap: 6,
    zIndex: 10,
    borderWidth: 1,
    borderColor: "#FF0080",
  },
  livePulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF0080",
    // Animated pulse effect
  },
  liveText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FF0080",
    letterSpacing: 1,
  },
  liveImage: {
    width: "100%",
    height: 180,
    borderRadius: 20,
    marginBottom: 12,
  },
  liveOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  dealTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 0, 128, 0.2)",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 1000,
    gap: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#FF0080",
  },
  dealText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FF0080",
    letterSpacing: 0.5,
  },
  liveStore: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  liveSubtext: {
    fontSize: 13,
    fontWeight: "500",
    color: "#888888",
  },
  riderCard: {
    height: 200,
  },
  riderInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  riderPhoto: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: "#0066FF",
    position: "relative",
  },
  onlineDot: {
    position: "absolute",
    top: 2,
    left: 44,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#0066FF",
    borderWidth: 3,
    borderColor: "#0A0A0A",
  },
  riderDetails: {
    marginLeft: 12,
  },
  riderName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  riderStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  riderRating: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0066FF",
  },
  riderLocation: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 1000,
    gap: 6,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  locationText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0066FF",
  },
  riderSubtext: {
    fontSize: 13,
    fontWeight: "500",
    color: "#666666",
  },
});
```

### 4. 🎪 "CELEBRATION MOMENTS"

```jsx
// Trigger this on successful order, payment, etc.
const CelebrationOverlay = ({ type, onComplete }) => {
  // type: 'order', 'payment', 'delivery', 'reward'

  const celebrations = {
    order: {
      emoji: "🎉",
      gradient: ["#FF0080", "#FF4D00"],
      message: "ORDER PLACED!",
      particles: ["⚡", "🔥", "💫", "✨"],
    },
    payment: {
      emoji: "💰",
      gradient: ["#0066FF", "#0052CC"],
      message: "PAYMENT SUCCESSFUL!",
      particles: ["💵", "💳", "✅", "🎯"],
    },
    delivery: {
      emoji: "🏆",
      gradient: ["#00FFF0", "#00D4FF"],
      message: "DELIVERED!",
      particles: ["🎊", "🎈", "🎁", "🌟"],
    },
  };

  const celebration = celebrations[type];

  return (
    <Modal visible transparent animationType="fade">
      <View style={styles.celebrationOverlay}>
        {/* Particle explosion */}
        <ParticleExplosion
          particles={celebration.particles}
          count={50}
          duration={2000}
        />

        {/* Radial gradient pulse */}
        <RadialGradient
          colors={[...celebration.gradient, "transparent"]}
          style={styles.radialPulse}
        />

        {/* Main content */}
        <View style={styles.celebrationContent}>
          {/* Giant emoji with bounce */}
          <Animated.Text style={[styles.celebrationEmoji]}>
            {celebration.emoji}
          </Animated.Text>

          {/* Message with glow */}
          <LinearGradient
            colors={celebration.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.celebrationMessage}>{celebration.message}</Text>
          </LinearGradient>

          {/* Confetti animation */}
          <LottieView
            source={require("./confetti.json")}
            autoPlay
            loop={false}
            style={styles.confetti}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  celebrationOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  radialPulse: {
    position: "absolute",
    width: "200%",
    height: "200%",
    // Animated scale from 0 to 1
  },
  celebrationContent: {
    alignItems: "center",
  },
  celebrationEmoji: {
    fontSize: 120,
    marginBottom: 32,
    // Bounce animation
  },
  celebrationMessage: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 2,
    textAlign: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
    // Glow effect
    textShadowColor: celebration.gradient[0],
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  confetti: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
```

### 5. 🎮 "POWER BUTTON" - Signature CTA

```jsx
const PowerButton = ({ title, onPress, loading, type = "primary" }) => {
  const buttonStyles = {
    primary: {
      gradient: ["#0066FF", "#0052CC"],
      textColor: "#000000",
      shadowColor: "#0066FF",
      icon: "lightning-bolt",
    },
    danger: {
      gradient: ["#FF0080", "#FF4D00"],
      textColor: "#FFFFFF",
      shadowColor: "#FF0080",
      icon: "alert-circle",
    },
    success: {
      gradient: ["#00FF88", "#00DDA0"],
      textColor: "#000000",
      shadowColor: "#00FF88",
      icon: "check-circle",
    },
  };

  const style = buttonStyles[type];

  return (
    <TouchableOpacity
      style={styles.buttonWrapper}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.9}
    >
      {/* Glow layer (always visible) */}
      <View
        style={[
          styles.glowLayer,
          {
            shadowColor: style.shadowColor,
          },
        ]}
      />

      {/* Main button */}
      <LinearGradient
        colors={style.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.powerButton}
      >
        {/* Animated shine effect */}
        <AnimatedShine
          colors={["transparent", "rgba(255,255,255,0.3)", "transparent"]}
        />

        {loading ? (
          <ActivityIndicator color={style.textColor} size="small" />
        ) : (
          <>
            <MaterialCommunityIcons
              name={style.icon}
              size={24}
              color={style.textColor}
            />
            <Text style={[styles.buttonText, { color: style.textColor }]}>
              {title}
            </Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={style.textColor}
            />
          </>
        )}
      </LinearGradient>

      {/* 3D depth layer */}
      <View
        style={[
          styles.depthLayer,
          {
            backgroundColor: style.gradient[1],
          },
        ]}
      />

      {/* Ripple effect on press */}
      <RippleEffect color={style.shadowColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    position: "relative",
    marginTop: 8,
    marginBottom: 8,
  },
  glowLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 1000,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 20,
  },
  powerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 1000,
    gap: 12,
    overflow: "hidden",

    // Inner shadow for depth
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  depthLayer: {
    position: "absolute",
    bottom: -8,
    left: 8,
    right: 8,
    height: "100%",
    borderRadius: 1000,
    zIndex: -1,
    opacity: 0.6,
  },
});
```

---

## 🎭 SIGNATURE ANIMATIONS

### Micro-interactions

```javascript
// On every tap - creates light trail
const LightTrail = ({ x, y, color }) => {
  // Particle explosion from touch point
  // Fades out in 300ms
};

// On scroll - parallax depth
const ParallaxScroll = () => {
  // Background elements move slower
  // Creates 3D depth illusion
};

// On card appear - slide + fade + glow
const CardEntrance = () => {
  Animated.parallel([
    Animated.spring(translateY, { toValue: 0 }),
    Animated.timing(opacity, { toValue: 1 }),
    Animated.timing(glowOpacity, { toValue: 0.6 }),
  ]).start();
};

// On success - screen shake + confetti
const SuccessShake = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  // Trigger confetti
  // Shake screen slightly
};
```

### Loading States

```jsx
// Skeleton with neon pulse
const NeonSkeleton = () => (
  <View style={styles.skeleton}>
    <LinearGradient
      colors={["#0A0A0A", "#0066FF", "#0A0A0A"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.skeletonGradient}
    />
  </View>
);

// Spinner with rotating gradient
const NeonSpinner = () => (
  <View style={styles.spinnerContainer}>
    <AnimatedGradientBorder
      colors={["#0066FF", "#FF0080", "#00FFF0", "#0066FF"]}
      width={4}
      borderRadius={25}
    />
    <MaterialCommunityIcons name="lightning-bolt" size={24} color="#0066FF" />
  </View>
);
```

---

## 🌐 BOTTOM NAV - "FIDELIA BAR"

```jsx
const PowerBar = ({ activeTab, onTabChange }) => (
  <BlurView intensity={30} style={styles.powerBarContainer}>
    {/* Animated background glow */}
    <AnimatedGradient
      colors={[
        "rgba(0, 102, 255, 0.1)",
        "rgba(0, 102, 255, 0.05)",
        "rgba(0, 102, 255, 0.1)",
      ]}
      style={styles.powerBarGlow}
    />

    <View style={styles.powerBar}>
      {/* Home */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onTabChange("home")}
      >
        {activeTab === "home" && (
          <View style={styles.activeIndicator}>
            <LinearGradient
              colors={["#0066FF", "#0052CC"]}
              style={styles.activeGradient}
            />
          </View>
        )}
        <MaterialCommunityIcons
          name="home-variant"
          size={28}
          color={activeTab === "home" ? "#0066FF" : "#666666"}
        />
        {activeTab === "home" && <View style={styles.navGlow} />}
      </TouchableOpacity>

      {/* Orders */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onTabChange("orders")}
      >
        {activeTab === "orders" && (
          <View style={styles.activeIndicator}>
            <LinearGradient
              colors={["#FF0080", "#FF4D00"]}
              style={styles.activeGradient}
            />
          </View>
        )}
        <MaterialCommunityIcons
          name="receipt-text"
          size={28}
          color={activeTab === "orders" ? "#FF0080" : "#666666"}
        />
        {/* Order count badge */}
        <View style={styles.orderBadge}>
          <Text style={styles.badgeText}>2</Text>
        </View>
      </TouchableOpacity>

      {/* Center action button */}
      <TouchableOpacity
        style={styles.centerAction}
        onPress={() => onTabChange("scan")}
      >
        <LinearGradient
          colors={["#0066FF", "#0052CC"]}
          style={styles.centerGradient}
        >
          {/* Rotating border */}
          <View style={styles.rotatingBorder} />

          <MaterialCommunityIcons
            name="qrcode-scan"
            size={32}
            color="#000000"
          />
        </LinearGradient>

        {/* Pulse rings */}
        <View style={styles.pulseRing1} />
        <View style={styles.pulseRing2} />
      </TouchableOpacity>

      {/* Rewards */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onTabChange("rewards")}
      >
        {activeTab === "rewards" && (
          <View style={styles.activeIndicator}>
            <LinearGradient
              colors={["#FFD93D", "#FFB800"]}
              style={styles.activeGradient}
            />
          </View>
        )}
        <MaterialCommunityIcons
          name="gift"
          size={28}
          color={activeTab === "rewards" ? "#FFD93D" : "#666666"}
        />
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onTabChange("profile")}
      >
        {activeTab === "profile" && (
          <View style={styles.activeIndicator}>
            <LinearGradient
              colors={["#00FFF0", "#00D4FF"]}
              style={styles.activeGradient}
            />
          </View>
        )}
        <MaterialCommunityIcons
          name="account-circle"
          size={28}
          color={activeTab === "profile" ? "#00FFF0" : "#666666"}
        />
      </TouchableOpacity>
    </View>
  </BlurView>
);

const styles = StyleSheet.create({
  powerBarContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  powerBarGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 32,
  },
  powerBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(10, 10, 10, 0.95)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "rgba(0, 102, 255, 0.2)",

    // Float effect
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 20,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
    position: "relative",
  },
  activeIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 28,
    padding: 2,
  },
  activeGradient: {
    flex: 1,
    borderRadius: 28,
    opacity: 0.2,
  },
  navGlow: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#0066FF",
    opacity: 0.3,
    // Blur effect
  },
  orderBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FF0080",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0A0A0A",
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  centerAction: {
    width: 72,
    height: 72,
    marginTop: -36,
    position: "relative",
  },
  centerGradient: {
    flex: 1,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#000000",

    // Extreme shadow
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.8,
    shadowRadius: 24,
    elevation: 20,
  },
  rotatingBorder: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 36,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    opacity: 0.3,
    // Rotating animation
  },
  pulseRing1: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 36,
    borderWidth: 2,
    borderColor: "#0066FF",
    opacity: 0.3,
    // Scale pulse animation
  },
  pulseRing2: {
    position: "absolute",
    width: "120%",
    height: "120%",
    borderRadius: 43,
    borderWidth: 2,
    borderColor: "#0066FF",
    opacity: 0.15,
    // Scale pulse animation (delayed)
  },
});
```

---

## 🎊 UNIQUE FEATURES (YOUR SIGNATURE MOVES)

### 1. "SHAKE TO ORDER" - Gesture shortcut

```javascript
// Shake phone to quickly reorder last item
const ShakeGesture = RNShake.addListener(() => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  showQuickReorderModal();
});
```

### 2. "VIBE CHECK" - Mood-based recommendations

```jsx
// AI suggests based on time, weather, mood
const VibeCheck = () => (
  <TouchableOpacity style={styles.vibeCard}>
    <Text style={styles.vibeEmoji}>🌙</Text>
    <Text style={styles.vibeText}>Late night vibes</Text>
    <Text style={styles.vibeSubtext}>Pizza + Drinks detected 🍕</Text>
  </TouchableOpacity>
);
```

### 3. "POWER MODE" - Ultra-fast checkout

```javascript
// Single tap to order with saved preferences
const PowerMode = {
  enabled: true,
  savedAddress: "Home",
  savedPayment: "Wallet",
  oneClickOrder: true,
};
```

### 4. "FIDELIA POINTS" - Gamification

```jsx
const GlowScore = ({ score }) => (
  <View style={styles.glowScoreContainer}>
    <LinearGradient colors={["#0066FF", "#0052CC"]}>
      <Text style={styles.scoreNumber}>{score}</Text>
      <Text style={styles.scoreLabel}>GLOW POINTS</Text>
    </LinearGradient>
    <Text style={styles.scoreSubtext}>
      Order 2 more times to unlock ⚡ POWER status
    </Text>
  </View>
);
```

### 5. "GHOST MODE" - Incognito orders

```javascript
// Order without leaving traces in feed
const GhostMode = {
  hideFromFeed: true,
  privateRider: true,
  noPhoneCall: true,
};
```

---

## ✅ THE 10/10 CHECKLIST

Your app is 10/10 when:

### Visual Identity

- [ ] Signature neon lime gradient (#0066FF) everywhere
- [ ] Every card/button has subtle glow
- [ ] Dark mode is default (pure black #000000)
- [ ] Gradients are bold, not subtle
- [ ] Typography is EXTREME (huge numbers, tiny labels)
- [ ] Emojis are integrated (not decorative)

### Interactions

- [ ] Every tap creates light trail
- [ ] Success moments trigger celebration
- [ ] Buttons have 3D depth with shadows
- [ ] Scrolling has parallax effect
- [ ] Loading states pulse with neon
- [ ] Haptic feedback on every action

### Unique Features

- [ ] Shake to reorder last item
- [ ] AI-powered "Vibe Check"
- [ ] One-tap Power Mode checkout
- [ ] Fidelia Points gamification
- [ ] Ghost Mode for privacy
- [ ] Live feed of nearby activity

### Personality

- [ ] Copy is bold ("MOVE ANYTHING", not "Order now")
- [ ] Numbers glow with importance
- [ ] Status badges are aggressive (LIVE, HOT, NEW)
- [ ] Errors are friendly, not corporate
- [ ] Empty states are motivating

### Technical Excellence

- [ ] 60fps animations always
- [ ] Instant loading with skeletons
- [ ] Optimistic UI updates
- [ ] Offline mode works
- [ ] Push notifications glow
- [ ] Deep linking perfect

---

## 🎯 FINAL AI PROMPT

Use this for ANY screen:

```
Design a [SCREEN NAME] for "FIDELIA" delivery app.

SIGNATURE STYLE:
- Pure black background (#000000)
- Neon lime gradient (#0066FF to #0052CC) for primary actions
- EXTREME typography (56px numbers, 44px names)
- Every element glows with colored shadows
- 3D depth with offset shadow layers
- Animated gradients and particles

COMPONENTS:
- Use the exact component code from the design system
- All buttons are "Power Buttons" with glow
- Cards have neon borders that pulse
- Icons are bold (size 36-40px)
- Text uses ClashDisplay for display, Inter for body

INTERACTIONS:
- Scale animations on press (0.95)
- Light trails on tap
- Celebration overlays on success
- Parallax scrolling
- Haptic feedback everywhere

VIBE:
- Aggressive and energetic
- Instagram-worthy screenshots
- Feels like a premium game UI
- Makes users say "DAMN 🔥"

Make it the most modern delivery app UI ever created.
```

---

## 🚀 THIS IS YOUR COMPETITIVE ADVANTAGE

**What makes this 10/10:**

1. **Nobody else uses neon lime** - instant recognition
2. **Glow effects everywhere** - premium feel
3. **Celebration moments** - emotional connection
4. **Unique gestures** - shake to order
5. **Gamification** - Fidelia Points system
6. **Live feed** - FOMO and urgency
7. **Power Mode** - fastest checkout
8. **Personality** - not corporate, not childish

**This UI will:**

- Get featured on design blogs
- Generate organic social media shares
- Stand out in screenshots
- Make competitors look outdated
- Create brand loyalty through delight

---

**NOW GO BUILD THE FUTURE OF DELIVERY IN NIGERIA** 🇳🇬⚡

_Version 3.0 - The 10/10 Edition | Built for Champions_
