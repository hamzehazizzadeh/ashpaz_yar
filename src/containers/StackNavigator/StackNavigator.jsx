import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Food from '../../screens/Food/Food';
import Foods from '../../screens/Foods/Foods';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Foods"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Foods" component={Foods} />
      <Stack.Screen name="Food" component={Food} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
