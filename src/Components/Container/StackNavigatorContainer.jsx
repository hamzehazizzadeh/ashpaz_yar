import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FoodList from "../Chef/FoodList";
import FoodDetails from "../Chef/FoodDetails";

const Stack = createStackNavigator();

const StackNavigatorContainer = () => {
  return (
    <Stack.Navigator
      initialRouteName="Foods"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Foods" component={FoodList} />
      <Stack.Screen name="Food" component={FoodDetails} />
    </Stack.Navigator>
  );
};

export default StackNavigatorContainer;
