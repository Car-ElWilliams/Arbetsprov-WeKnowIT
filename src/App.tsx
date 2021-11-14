import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeNavigator from './navigation/HomeNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <HomeNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
