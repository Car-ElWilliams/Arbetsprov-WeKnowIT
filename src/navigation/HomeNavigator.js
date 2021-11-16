import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { IconButton } from '../common';
import { HomeStack } from './constants/stacks/HomeStack';
const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      {HomeStack.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={({ navigation }) => ({
            headerShown: screen.name !== 'HomeScreen',
            headerTransparent: screen.name === 'SearchScreen',
            title: 'CityPop',
            headerStyle: {
              backgroundColor: 'transparent',
              elevation: 0,
            },
            headerTitleStyle: {
              color: screen.name === 'SearchScreen' ? 'white' : 'black',
            },
            headerLeft: () => (
              <IconButton
                icon="back"
                iconSize="large"
                variant="flatten"
                onPress={() => navigation.pop()}
                style={{ marginLeft: 20 }}
                color={screen.name === 'SearchScreen' ? 'white' : 'black'}
              />
            ),
          })}
        />
      ))}
    </Stack.Navigator>
  );
};

export default HomeNavigator;
