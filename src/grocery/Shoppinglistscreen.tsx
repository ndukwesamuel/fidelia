import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";

type ShoppingListScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "ShoppingList">;
};

interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  checked: boolean;
  quantity?: number;
}

interface ShoppingList {
  id: string;
  name: string;
  items: ShoppingItem[];
  createdAt: string;
  color: string;
}

const ShoppingListScreen: React.FC<ShoppingListScreenProps> = ({
  navigation,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showNewListModal, setShowNewListModal] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newListName, setNewListName] = useState("");
  const [selectedList, setSelectedList] = useState("1");

  const [lists, setLists] = useState<ShoppingList[]>([
    {
      id: "1",
      name: "Weekly Groceries",
      color: "#00D084",
      items: [
        {
          id: "1",
          name: "Fresh Tomatoes",
          category: "Produce",
          checked: false,
          quantity: 1,
        },
        {
          id: "2",
          name: "White Rice",
          category: "Grains",
          checked: true,
          quantity: 1,
        },
        {
          id: "3",
          name: "Fresh Milk",
          category: "Dairy",
          checked: false,
          quantity: 2,
        },
        {
          id: "4",
          name: "Chicken Breast",
          category: "Meat",
          checked: false,
          quantity: 1,
        },
        {
          id: "5",
          name: "Bread",
          category: "Bakery",
          checked: true,
          quantity: 1,
        },
        {
          id: "6",
          name: "Eggs",
          category: "Dairy",
          checked: false,
          quantity: 1,
        },
        {
          id: "7",
          name: "Cooking Oil",
          category: "Cooking",
          checked: false,
          quantity: 1,
        },
      ],
      createdAt: "2 days ago",
    },
    {
      id: "2",
      name: "Party Supplies",
      color: "#0066FF",
      items: [
        {
          id: "8",
          name: "Coca-Cola",
          category: "Beverages",
          checked: false,
          quantity: 6,
        },
        {
          id: "9",
          name: "Chips",
          category: "Snacks",
          checked: false,
          quantity: 3,
        },
        {
          id: "10",
          name: "Paper Plates",
          category: "Party",
          checked: true,
          quantity: 1,
        },
      ],
      createdAt: "1 week ago",
    },
    {
      id: "3",
      name: "Health & Wellness",
      color: "#00B8A9",
      items: [
        {
          id: "11",
          name: "Multivitamins",
          category: "Supplements",
          checked: false,
          quantity: 1,
        },
        {
          id: "12",
          name: "Protein Powder",
          category: "Fitness",
          checked: false,
          quantity: 1,
        },
      ],
      createdAt: "3 days ago",
    },
  ]);

  const currentList = lists.find((list) => list.id === selectedList);
  const checkedItems =
    currentList?.items.filter((item) => item.checked).length || 0;
  const totalItems = currentList?.items.length || 0;

  const handleToggleItem = (itemId: string) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === selectedList
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
              ),
            }
          : list
      )
    );
  };

  const handleDeleteItem = (itemId: string) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === selectedList
          ? {
              ...list,
              items: list.items.filter((item) => item.id !== itemId),
            }
          : list
      )
    );
  };

  const handleAddItem = () => {
    if (!newItemName.trim()) return;

    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      category: "Other",
      checked: false,
      quantity: 1,
    };

    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === selectedList
          ? { ...list, items: [...list.items, newItem] }
          : list
      )
    );

    setNewItemName("");
    setShowAddModal(false);
  };

  const handleCreateList = () => {
    if (!newListName.trim()) return;

    const newList: ShoppingList = {
      id: Date.now().toString(),
      name: newListName.trim(),
      color: "#00D084",
      items: [],
      createdAt: "Just now",
    };

    setLists([...lists, newList]);
    setSelectedList(newList.id);
    setNewListName("");
    setShowNewListModal(false);
  };

  const handleAddAllToCart = () => {
    const uncheckedItems = currentList?.items.filter((item) => !item.checked);
    if (uncheckedItems && uncheckedItems.length > 0) {
      // Navigate to grocery store or cart
      navigation.navigate("GroceryCart", { storeId: "1" });
    }
  };

  const categorizedItems =
    currentList?.items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, ShoppingItem[]>) || {};

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
        <Text style={styles.headerTitle}>SHOPPING LISTS</Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => setShowNewListModal(true)}
        >
          <MaterialCommunityIcons name="plus" size={24} color="#00D084" />
        </TouchableOpacity>
      </View>

      {/* List Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listTabs}
      >
        {lists.map((list) => (
          <TouchableOpacity
            key={list.id}
            style={[
              styles.listTab,
              selectedList === list.id && styles.listTabActive,
            ]}
            onPress={() => setSelectedList(list.id)}
          >
            <View
              style={[styles.listTabIndicator, { backgroundColor: list.color }]}
            />
            <Text
              style={[
                styles.listTabText,
                selectedList === list.id && styles.listTabTextActive,
              ]}
            >
              {list.name}
            </Text>
            <View style={styles.listTabBadge}>
              <Text style={styles.listTabBadgeText}>{list.items.length}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Progress Card */}
        {currentList && totalItems > 0 && (
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <View style={styles.progressInfo}>
                <Text style={styles.progressTitle}>Shopping Progress</Text>
                <Text style={styles.progressSubtitle}>
                  {checkedItems} of {totalItems} items checked
                </Text>
              </View>
              <Text style={styles.progressPercentage}>
                {Math.round((checkedItems / totalItems) * 100)}%
              </Text>
            </View>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={["#00D084", "#00B872"]}
                style={[
                  styles.progressFill,
                  { width: `${(checkedItems / totalItems) * 100}%` },
                ]}
              />
            </View>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => setShowAddModal(true)}
          >
            <MaterialCommunityIcons
              name="plus-circle"
              size={20}
              color="#00D084"
            />
            <Text style={styles.quickActionText}>Add Item</Text>
          </TouchableOpacity>

          {totalItems > 0 && checkedItems < totalItems && (
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={handleAddAllToCart}
            >
              <MaterialCommunityIcons
                name="cart-plus"
                size={20}
                color="#0066FF"
              />
              <Text style={styles.quickActionText}>Add to Cart</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => {
              // Share list logic
            }}
          >
            <MaterialCommunityIcons
              name="share-variant"
              size={20}
              color="#FFB800"
            />
            <Text style={styles.quickActionText}>Share List</Text>
          </TouchableOpacity>
        </View>

        {/* Items by Category */}
        {currentList && totalItems > 0 ? (
          Object.keys(categorizedItems).map((category) => (
            <View key={category} style={styles.categorySection}>
              <View style={styles.categoryHeader}>
                <MaterialCommunityIcons name="tag" size={16} color="#00D084" />
                <Text style={styles.categoryTitle}>{category}</Text>
                <Text style={styles.categoryCount}>
                  {categorizedItems[category].length}
                </Text>
              </View>

              <View style={styles.itemsList}>
                {categorizedItems[category].map((item) => (
                  <View key={item.id} style={styles.itemCard}>
                    <TouchableOpacity
                      style={styles.checkbox}
                      onPress={() => handleToggleItem(item.id)}
                    >
                      {item.checked ? (
                        <MaterialCommunityIcons
                          name="checkbox-marked"
                          size={24}
                          color="#00D084"
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="checkbox-blank-outline"
                          size={24}
                          color="#666666"
                        />
                      )}
                    </TouchableOpacity>

                    <View style={styles.itemContent}>
                      <Text
                        style={[
                          styles.itemName,
                          item.checked && styles.itemNameChecked,
                        ]}
                      >
                        {item.name}
                      </Text>
                      {item.quantity && item.quantity > 1 && (
                        <View style={styles.quantityBadge}>
                          <Text style={styles.quantityText}>
                            x{item.quantity}
                          </Text>
                        </View>
                      )}
                    </View>

                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteItem(item.id)}
                    >
                      <MaterialCommunityIcons
                        name="close"
                        size={18}
                        color="#DC3545"
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          ))
        ) : (
          // Empty State
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <MaterialCommunityIcons
                name="clipboard-text-outline"
                size={64}
                color="#666666"
              />
            </View>
            <Text style={styles.emptyTitle}>No Items Yet</Text>
            <Text style={styles.emptySubtitle}>
              Start adding items to your shopping list
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => setShowAddModal(true)}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={["#00D084", "#00B872"]}
                style={styles.emptyButtonGradient}
              >
                <MaterialCommunityIcons name="plus" size={20} color="#FFFFFF" />
                <Text style={styles.emptyButtonText}>Add First Item</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {/* List Info */}
        {currentList && (
          <View style={styles.listInfo}>
            <MaterialCommunityIcons
              name="information-outline"
              size={16}
              color="#888888"
            />
            <Text style={styles.listInfoText}>
              Created {currentList.createdAt}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Add Item Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Item</Text>
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => {
                  setShowAddModal(false);
                  setNewItemName("");
                }}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="cart-outline"
                  size={20}
                  color="#888888"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Item name (e.g., Fresh Tomatoes)"
                  placeholderTextColor="#666666"
                  value={newItemName}
                  onChangeText={setNewItemName}
                  autoFocus
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.addButton,
                  !newItemName.trim() && styles.addButtonDisabled,
                ]}
                onPress={handleAddItem}
                disabled={!newItemName.trim()}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={
                    newItemName.trim()
                      ? ["#00D084", "#00B872"]
                      : ["#333333", "#1A1A1A"]
                  }
                  style={styles.addButtonGradient}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    size={20}
                    color="#FFFFFF"
                  />
                  <Text style={styles.addButtonText}>Add Item</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* New List Modal */}
      <Modal
        visible={showNewListModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowNewListModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create New List</Text>
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => {
                  setShowNewListModal(false);
                  setNewListName("");
                }}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="format-list-bulleted"
                  size={20}
                  color="#888888"
                />
                <TextInput
                  style={styles.input}
                  placeholder="List name (e.g., Monthly Shopping)"
                  placeholderTextColor="#666666"
                  value={newListName}
                  onChangeText={setNewListName}
                  autoFocus
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.addButton,
                  !newListName.trim() && styles.addButtonDisabled,
                ]}
                onPress={handleCreateList}
                disabled={!newListName.trim()}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={
                    newListName.trim()
                      ? ["#00D084", "#00B872"]
                      : ["#333333", "#1A1A1A"]
                  }
                  style={styles.addButtonGradient}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    size={20}
                    color="#FFFFFF"
                  />
                  <Text style={styles.addButtonText}>Create List</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
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
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#0A0A0A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  listTabs: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  listTab: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A0A0A",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 1000,
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  listTabActive: {
    backgroundColor: "rgba(0, 208, 132, 0.1)",
    borderColor: "#00D084",
  },
  listTabIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  listTabText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#888888",
    letterSpacing: 0.3,
  },
  listTabTextActive: {
    color: "#FFFFFF",
  },
  listTabBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 1000,
    marginLeft: 4,
  },
  listTabBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  progressCard: {
    backgroundColor: "#0A0A0A",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  progressInfo: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  progressSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  progressPercentage: {
    fontSize: 32,
    fontWeight: "900",
    color: "#00D084",
    letterSpacing: 0.5,
  },
  progressBar: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  quickActions: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 24,
    gap: 10,
  },
  quickActionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0A0A0A",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  categorySection: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  categoryTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  categoryCount: {
    fontSize: 12,
    fontWeight: "700",
    color: "#888888",
    letterSpacing: 0.3,
  },
  itemsList: {
    gap: 10,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A0A0A",
    padding: 14,
    borderRadius: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  checkbox: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    flex: 1,
  },
  itemNameChecked: {
    textDecorationLine: "line-through",
    color: "#666666",
  },
  quantityBadge: {
    backgroundColor: "rgba(0, 208, 132, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "rgba(0, 208, 132, 0.3)",
  },
  quantityText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#00D084",
    letterSpacing: 0.3,
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(220, 53, 69, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#0A0A0A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888888",
    textAlign: "center",
    letterSpacing: 0.3,
    marginBottom: 24,
  },
  emptyButton: {
    width: "100%",
    borderRadius: 1000,
  },
  emptyButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 1000,
    gap: 8,
  },
  emptyButtonText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  listInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 24,
  },
  listInfoText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#888888",
    letterSpacing: 0.3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#0A0A0A",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  modalClose: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBody: {
    paddingHorizontal: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000000",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    marginBottom: 20,
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
  addButton: {
    borderRadius: 1000,
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 1000,
    gap: 10,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});

export default ShoppingListScreen;
