import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './../components/SplashScreen/SplashScreen';
import Foods from './../screens/Foods/Foods';
import Food from './../screens/Food/Food';
import {primaryStyles} from './../assets/styles/style';

const Stack = createStackNavigator();

const Container = () => {
  const screenOptions = {
    headerShown: true,
    headerTitleStyle: primaryStyles.stackHeaderTitle,
    headerStyle: primaryStyles.stackHeader,
  };

  return (
    <SplashScreen>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions} initialRouteName="Foods">
          <Stack.Screen
            name="Foods"
            options={{title: 'آشپزیار'}}
            component={Foods}
          />
          <Stack.Screen name="Food" component={Food} />
        </Stack.Navigator>
      </NavigationContainer>
    </SplashScreen>
  );
};

export default Container;
