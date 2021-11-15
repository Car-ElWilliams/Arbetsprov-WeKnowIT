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
            title: 'CityPop',
            headerStyle: {
              backgroundColor: 'transparent',
              elevation: 0,
            },
            headerLeft: () => (
              <IconButton
                icon="back"
                iconSize="large"
                variant="flatten"
                onPress={() => navigation.pop()}
                style={{ marginLeft: 20 }}
              />
            ),
          })}
        />
      ))}
    </Stack.Navigator>
  );
};

export default HomeNavigator;
