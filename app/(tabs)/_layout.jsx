import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StoreProvider } from '../../utils/StoreContext';

function TabLayout() {
  return (
    <StoreProvider>
      <Tabs screenOptions={{ tabBarActiveTintColor: '#ffd33d' }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Товары',
            tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Корзина',
            tabBarIcon: ({ color }) => <Ionicons name="basket-outline" size={24} color={color} />,
          }}
        />
      </Tabs>
    </StoreProvider>
  );
}

export default TabLayout;