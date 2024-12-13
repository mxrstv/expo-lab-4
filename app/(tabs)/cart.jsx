import React, { useContext, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ProductCard from '../../components/ProductCard';
import { StoreContext } from '../../utils/StoreContext';

const CartScreen = () => {
  const { products, cartItems, removeFromCart } = useContext(StoreContext);
  useEffect(() => {
    console.log('CartScreen: Cart items:', cartItems);
  }, [cartItems]);

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => {
          const fullProductData = products.find(p => p.id === item.product_id);
          return (
            <ProductCard
              product={{ ...fullProductData, quantity: item.quantity }}
              mode="cart"
              onDelete={() => removeFromCart(item.product_id)}
            />
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
});

export default CartScreen;