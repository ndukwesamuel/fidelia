# 🎯 AI PROMPT TEMPLATE FOR SCREEN REDESIGN
**"FIDELIA" Design System - Copy & Paste This**

---

## 📋 HOW TO USE THIS TEMPLATE

1. **Copy the entire prompt below** (everything in the box)
2. **Replace `[PASTE YOUR SCREEN CODE HERE]` with your actual screen code**
3. **Paste into Claude, ChatGPT, or any AI**
4. **Get back a redesigned screen in seconds**

---

## 🔥 THE COMPLETE PROMPT (COPY FROM HERE)

```
You are redesigning a React Native screen for "FIDELIA" - Nigeria's most trusted delivery platform.

**BRAND IDENTITY:**
- App Name: Fidelia (meaning: Faithful, Loyal, Trustworthy)
- Tagline: "Faithful Delivery, Every Time"
- Vibe: Trust + Speed + Modern + Energy

## 🎨 DESIGN SYSTEM RULES (FOLLOW EXACTLY)

### COLOR PALETTE

```javascript
// Fidelia Signature Colors (Trust Blue + Energy Orange)
FIDELIA_BLUE: '#0066FF',           // Primary - Trust & Reliability
FIDELIA_BLUE_LIGHT: '#3385FF',     // Lighter shade
FIDELIA_BLUE_DARK: '#0052CC',      // Darker shade
FIDELIA_BLUE_GLOW: 'rgba(0, 102, 255, 0.4)',

FIDELIA_ORANGE: '#FF6B00',         // Secondary - Energy & Action
FIDELIA_ORANGE_LIGHT: '#FF8533',   
FIDELIA_ORANGE_DARK: '#E55A00',
FIDELIA_ORANGE_GLOW: 'rgba(255, 107, 0, 0.4)',

// Service Colors (Bold Vibrant Gradients)
FOOD_GRADIENT: ['#FF6B00', '#FF8533'],      // Orange (warm food)
GROCERY_GRADIENT: ['#00D084', '#00E69B'],   // Green (fresh)
ERRAND_GRADIENT: ['#0066FF', '#3385FF'],    // Blue (reliable)
LOGISTICS_GRADIENT: ['#FFB800', '#FFC933'], // Yellow (fast)
PHARMACY_GRADIENT: ['#00B8A9', '#00D4C5'],  // Teal (medical)
MARKET_GRADIENT: ['#DC3545', '#E85563'],    // Red (vibrant)

// Backgrounds (Pure Black Base)
BG_BLACK: '#000000',               // Main background
BG_DARK: '#0A0A0A',               // Cards
BG_ELEVATED: '#151515',           // Elevated elements

// Text
TEXT_WHITE: '#FFFFFF',
TEXT_GRAY: '#888888',
TEXT_DARK_GRAY: '#666666',
```

### TYPOGRAPHY RULES

```javascript
// Font Families
PRIMARY_FONT: 'Inter',
DISPLAY_FONT: 'ClashDisplay',     // For big numbers/titles
MONO_FONT: 'JetBrains Mono',      // For prices

// Font Sizes (GO BIG OR GO HOME)
DISPLAY_XL: 56,        // Hero numbers (balance, countdown)
DISPLAY_LG: 44,        // Page titles
H1: 28,                // Section titles
H2: 20,                // Card titles
H3: 18,                // Subheadings
BODY: 15,              // Normal text
SMALL: 13,             // Secondary text
TINY: 11,              // Labels

// Font Weights (ALWAYS NUMERIC)
BLACK: '900',
BOLD: '800',
SEMIBOLD: '700',
MEDIUM: '600',
REGULAR: '500',

// Letter Spacing (ADD TO EVERYTHING IMPORTANT)
DISPLAY_SPACING: 1,
HEADING_SPACING: 0.8,
BUTTON_SPACING: 1.5,
BODY_SPACING: 0.3,
```

### SPACING SYSTEM

```javascript
SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 56,
};

// Component Spacing
SCREEN_PADDING: 20,
CARD_PADDING: 20,
SECTION_GAP: 28,
ITEM_GAP: 16,
```

### BORDER RADIUS (EXTREMELY ROUNDED)

```javascript
RADIUS = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 28,
  xxxl: 32,
  round: 1000,          // Pills and circles
};

// Default: 28px for most cards
// Hero cards: 32px
// Buttons: 1000 (full round)
```

### SHADOW SYSTEM (GLOW EFFECTS)

```javascript
// Standard shadow
SHADOW_DEFAULT = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.3,
  shadowRadius: 16,
  elevation: 8,
};

// Fidelia glow (for primary elements)
GLOW_FIDELIA = {
  shadowColor: '#0066FF',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.6,
  shadowRadius: 20,
  elevation: 12,
};

// 3D depth layer
Add a View with:
- position: absolute
- bottom: -6, left: 6, right: 6
- backgroundColor: darker version of card color
- opacity: 0.5
- zIndex: -1
```

---

## 🎨 COMPONENT TEMPLATES

### 1. SCREEN CONTAINER (Always start with this)

```jsx
<ScrollView 
  style={styles.scrollView}
  showsVerticalScrollIndicator={false}
>
  <View style={styles.container}>
    {/* Your content here */}
  </View>
</ScrollView>

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
```

### 2. SECTION HEADER (Use before each major section)

```jsx
<View style={styles.sectionHeader}>
  <View style={styles.headerLeft}>
    <Text style={styles.sectionTitle}>SECTION TITLE</Text>
    <Text style={styles.sectionSubtitle}>Subtitle text</Text>
  </View>
  <TouchableOpacity style={styles.seeAllButton}>
    <Text style={styles.seeAllText}>SEE ALL</Text>
    <MaterialCommunityIcons name="chevron-right" size={20} color="#0066FF" />
  </TouchableOpacity>
</View>

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#888888',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0066FF',
    letterSpacing: 0.5,
  },
});
```

### 3. CARD CONTAINER (Wrap content in this)

```jsx
<View style={styles.card}>
  {/* Card content */}
</View>

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0A0A0A',
    borderRadius: 28,
    padding: 20,
    marginBottom: 16,
    
    // Glow effect
    shadowColor: '#0066FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
    
    // Subtle border
    borderWidth: 1,
    borderColor: 'rgba(0, 102, 255, 0.1)',
  },
});
```

### 4. GRADIENT CARD (For hero sections)

```jsx
<LinearGradient
  colors={['#0066FF', '#0052CC']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  style={styles.gradientCard}
>
  {/* Decorative circles */}
  <View style={styles.decorativeCircle1} />
  <View style={styles.decorativeCircle2} />
  
  {/* Content */}
  <Text style={styles.cardTitle}>TITLE</Text>
  <Text style={styles.cardValue}>VALUE</Text>
</LinearGradient>

const styles = StyleSheet.create({
  gradientCard: {
    borderRadius: 32,
    padding: 28,
    marginBottom: 24,
    overflow: 'hidden',
    position: 'relative',
    
    // Extreme glow
    shadowColor: '#0066FF',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 32,
    elevation: 16,
  },
  decorativeCircle1: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 48,
    fontWeight: '900',
    color: '#000000',
    fontFamily: 'ClashDisplay',
    letterSpacing: -1,
  },
});
```

### 5. PRIMARY BUTTON (Power Button)

```jsx
<TouchableOpacity 
  style={styles.buttonWrapper}
  onPress={handlePress}
  activeOpacity={0.9}
>
  <LinearGradient
    colors={['#0066FF', '#0052CC']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.button}
  >
    <MaterialCommunityIcons name="lightning-bolt" size={20} color="#000000" />
    <Text style={styles.buttonText}>BUTTON TEXT</Text>
    <MaterialCommunityIcons name="arrow-right" size={20} color="#000000" />
  </LinearGradient>
  
  {/* 3D shadow layer */}
  <View style={styles.buttonShadow} />
</TouchableOpacity>

const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'relative',
    marginVertical: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 1000,
    gap: 8,
    
    // Border
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    
    // Glow
    shadowColor: '#0066FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  buttonShadow: {
    position: 'absolute',
    bottom: -6,
    left: 6,
    right: 6,
    height: '100%',
    backgroundColor: '#0052CC',
    borderRadius: 1000,
    zIndex: -1,
    opacity: 0.5,
  },
});
```

### 6. GHOST BUTTON (Secondary)

```jsx
<TouchableOpacity style={styles.ghostButton}>
  <MaterialCommunityIcons name="icon-name" size={20} color="#0066FF" />
  <Text style={styles.ghostButtonText}>BUTTON TEXT</Text>
</TouchableOpacity>

const styles = StyleSheet.create({
  ghostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 1000,
    gap: 8,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#0066FF',
  },
  ghostButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0066FF',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
```

### 7. BADGE/TAG

```jsx
<View style={styles.badge}>
  <MaterialCommunityIcons name="lightning-bolt" size={12} color="#000000" />
  <Text style={styles.badgeText}>BADGE TEXT</Text>
</View>

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0066FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 1000,
    gap: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
```

### 8. LIST ITEM CARD

```jsx
<TouchableOpacity style={styles.listItem}>
  {/* Icon container with gradient */}
  <LinearGradient
    colors={['#FF0080', '#FF4D00']}
    style={styles.listIcon}
  >
    <MaterialCommunityIcons name="icon-name" size={24} color="#000000" />
  </LinearGradient>
  
  {/* Content */}
  <View style={styles.listContent}>
    <Text style={styles.listTitle}>Item Title</Text>
    <Text style={styles.listSubtitle}>Subtitle text</Text>
  </View>
  
  {/* Arrow */}
  <MaterialCommunityIcons name="chevron-right" size={24} color="#666666" />
</TouchableOpacity>

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    gap: 16,
    
    // Subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  listIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    flex: 1,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  listSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#888888',
  },
});
```

---

## 🎯 REDESIGN RULES

### ❌ REMOVE THESE (Old Style):
- All `borderWidth` and `borderColor` (except for neon borders)
- Background colors like #F9FAFB, #FFFFFF (use black)
- Font weights like 'bold', 'normal' (use numbers)
- Border radius less than 16px
- Gray text on white backgrounds
- Subtle colors

### ✅ ADD THESE (New Style):
- Pure black backgrounds (#000000)
- #0066FF Fidelia Blue gradients (#0066FF)
- Border radius 28px+ for cards
- Glow shadows everywhere
- 3D depth layers
- ALL CAPS for important text
- Letter spacing on headings
- Decorative circles in hero sections
- Emojis where appropriate

### 🔧 TRANSFORMATION CHECKLIST:
1. Change ScrollView background to #000000
2. Change all cards to #0A0A0A with borderRadius 28
3. Add glow shadows (shadowColor: '#0066FF')
4. Change primary buttons to gradient with neon glow
5. Update all text colors to #FFFFFF or #888888
6. Add letter spacing to all headings
7. Change font weights to numeric (900, 800, 700)
8. Add 3D shadow layer to buttons
9. Add decorative circles to hero sections
10. Update icon sizes to 24-28px minimum
11. Add section headers with styling
12. Make everything extremely rounded

---

## 💡 DESIGN PRINCIPLES

1. **GO EXTREME**: Big numbers, bold colors, massive buttons
2. **GLOW EVERYTHING**: Every important element should glow
3. **PURE BLACK**: Never use gray backgrounds, always pure black
4. **ROUNDED EVERYTHING**: Minimum 16px, prefer 28px+
5. **UPPERCASE POWER**: Important text = ALL CAPS
6. **LETTER SPACING**: Add to ALL headings and buttons
7. **3D DEPTH**: Add shadow layers to create depth
8. **NEON IDENTITY**: #0066FF Fidelia Blue (#0066FF) is YOUR signature
9. **EMOJI FRIENDLY**: Add emojis naturally (🔥⚡💫✨)
10. **ENERGETIC**: Make it feel ALIVE and EXCITING

---

## 📱 SCREEN CODE TO REDESIGN

[PASTE YOUR SCREEN CODE HERE]

---

## 🎯 OUTPUT REQUIREMENTS

1. Return the COMPLETE redesigned component
2. Include ALL necessary imports
3. Add StyleSheet at the bottom
4. Add comments explaining major changes
5. Maintain ALL original functionality
6. Make it look EXTRAORDINARY
7. Follow the design system EXACTLY
8. Use LinearGradient from 'expo-linear-gradient'
9. Use MaterialCommunityIcons from '@expo/vector-icons'

---

## ✅ FINAL CHECK

Before returning, verify:
- [ ] Background is pure black (#000000)
- [ ] Primary color is Fidelia blue (#0066FF)
- [ ] Cards have glow shadows
- [ ] Border radius is 28px+
- [ ] All text is white or gray
- [ ] Buttons have gradients
- [ ] Letter spacing on headings
- [ ] Font weights are numeric
- [ ] Icons are 24px+ size
- [ ] Looks MODERN and ENERGETIC

---

**NOW REDESIGN THIS SCREEN TO LOOK EXTRAORDINARY** 🔥
```

---

## 📌 QUICK EXAMPLE

### Before (Old Style):
```jsx
<View style={{ padding: 10, backgroundColor: '#fff' }}>
  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Title</Text>
  <TouchableOpacity 
    style={{ backgroundColor: '#4CAF50', padding: 10, borderRadius: 5 }}
  >
    <Text style={{ color: 'white' }}>Button</Text>
  </TouchableOpacity>
</View>
```

### After (Glow Commerce Style):
```jsx
<View style={styles.container}>
  {/* Section Header */}
  <Text style={styles.title}>TITLE</Text>
  
  {/* Power Button */}
  <TouchableOpacity style={styles.buttonWrapper}>
    <LinearGradient
      colors={['#0066FF', '#0052CC']}
      style={styles.button}
    >
      <MaterialCommunityIcons name="lightning-bolt" size={20} color="#000" />
      <Text style={styles.buttonText}>BUTTON</Text>
      <MaterialCommunityIcons name="arrow-right" size={20} color="#000" />
    </LinearGradient>
    <View style={styles.buttonShadow} />
  </TouchableOpacity>
</View>

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  buttonWrapper: {
    position: 'relative',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 1000,
    gap: 8,
    shadowColor: '#0066FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  buttonShadow: {
    position: 'absolute',
    bottom: -6,
    left: 6,
    right: 6,
    height: '100%',
    backgroundColor: '#0052CC',
    borderRadius: 1000,
    zIndex: -1,
    opacity: 0.5,
  },
});
```

---

## 🚀 READY TO USE

**Just copy the main prompt box above and paste your screen code at the bottom.**

The AI will transform your screen into the most modern delivery app UI in Nigeria! 🇳🇬⚡

---

*Version 1.0 - Glow Commerce Redesign Template*