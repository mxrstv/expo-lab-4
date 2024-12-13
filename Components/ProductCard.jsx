import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { useContext } from 'react';
import { StoreContext } from '../utils/StoreContext';

const ProductCard = ({ product, mode = 'shop', onBuy, onDelete }) => {
  const { addToCart, removeFromCart } = useContext(StoreContext);

  const handleAddToCart = async () => {
    console.log('Attempting to add product to cart:', product.id);
    try {
      await addToCart(product.id);
      console.log('Finished adding product to cart');
    } catch (error) {
      console.error('Error in handleAddToCart:', error);
    }
  };

  const handleDelete = async () => {
    await removeFromCart(product.id);
    onDelete();
  };

  const renderContent = () => {
    if (mode === 'shop') {
      return (
        <>
          <Text style={styles.title}>{product.title}</Text>
          <View style={styles.descriptionWrapper}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: product.image }}
                style={styles.image}
              />
            </View>
            <Text style={styles.description}>{product.description}</Text>
          </View>
          <Text style={styles.price}>${product.price}</Text>
          <TouchableOpacity onPress={handleAddToCart} style={styles.button}>
            <Text style={styles.buttonText}>Купить</Text>
          </TouchableOpacity>
        </>
      );
    } else if (mode === 'cart') {
      return (
        <>
          <Text style={styles.title}>{product.title}</Text>
          <View style={styles.descriptionWrapper}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: product.image }}
                style={styles.image}
              />
            </View>
          </View>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.cartInfo}>Количество: {product.quantity}</Text>
          <Text style={styles.cartInfo}>Сумма: ${(product.price * product.quantity).toFixed(2)}</Text>
          <TouchableOpacity onPress={handleDelete} style={[styles.button, styles.deleteButton]}>
            <Text style={styles.buttonText}>Удалить</Text>
          </TouchableOpacity>
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 8,
    borderWidth: 1,
    borderColor: 'gray',
  },
  descriptionWrapper: {
    display: 'inline-block',
    marginBottom: 4,
  },
  imageContainer: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    float: 'left',
    margin: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 4,
    lineHeight: 18,
  },
  price: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#ffd33d',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default ProductCard;
