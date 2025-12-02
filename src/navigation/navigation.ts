// Navigation type definitions for the entire app

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  OTP: { phoneNumber: string; email: string };
  ForgotPassword: undefined;
  MainTabs: undefined;
  StoreDetails: { storeId: string; storeName: string };
  ProductDetails: { productId: string; storeId: string };
  Cart: undefined;
  Checkout: undefined;
  PaymentMethod: undefined;
  OrderConfirmation: { orderId: string };
  LiveTracking: { orderId: string };
  OrderDetails: { orderId: string };
  RateOrder: { orderId: string };
  Addresses: undefined;
  AddAddress: { addressId?: string };
  GroceryCategories: undefined;
  GroceryProduct: undefined;
  GroceryStore: undefined;
  GroceryCart: undefined;
  GroceryTracking: undefined;
  Category: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Orders: undefined;
  Wallet: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  Category: { categoryId: string; categoryName: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
