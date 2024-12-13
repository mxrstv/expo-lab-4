import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ProductCard from '../../components/ProductCard';
import { useContext } from 'react';
import { StoreContext } from '../../utils/StoreContext';

export default function Index() {
  const { products, fetchProducts, addToCart } = useContext(StoreContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard 
            product={{ ...item }} 
            mode="shop"
            onBuy={() => {
              console.log('onBuy called for product:', item.id);
              try {
                addToCart(item.id);
                console.log('Finished onBuy');
              } catch (error) {
                console.error('Error in onBuy:', error);
              }
            }}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
});