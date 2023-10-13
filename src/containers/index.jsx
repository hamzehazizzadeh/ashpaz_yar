import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RFPercentage} from 'react-native-responsive-fontsize';

import SplashScreen from './../components/SplashScreen/SplashScreen';
import Foods from './../screens/Foods/Foods';
import Food from './../screens/Food/Food';
import Categories from '../screens/Categories/Categories';
import Recipes from '../screens/Recipes/Recipes';
import Recipe from '../screens/Recipe/Recipe';
import {
  global_color,
  global_font,
  primaryStyles,
} from './../assets/styles/style';
import Menu from '../components/Menu/Menu';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Container = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);

  const screenOptions = {
    headerShown: true,
    headerTitleStyle: primaryStyles.stackHeaderTitle,
    headerStyle: primaryStyles.stackHeader,
    headerLeft: () => (
      <Entypo
        name="menu"
        style={{marginHorizontal: 15}}
        size={RFPercentage(3.5)}
        color="white"
        onPress={() => setIsShowMenu(true)}
      />
    ),
  };

  return (
    <SplashScreen>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions} initialRouteName="Foods">
          <Stack.Screen
            name="Foods"
            options={{title: 'آشپزیار'}}
            component={BottomTab}
          />
          <Stack.Screen name="Food" component={Food} />
          <Stack.Screen
            name="SubCategories"
            initialParams={{categoryId: ''}}
            component={Categories}
          />
          <Stack.Screen
            name="Recipes"
            initialParams={{subCategoryId: ''}}
            component={Recipes}
          />
          <Stack.Screen
            name="Recipe"
            initialParams={{id: ''}}
            component={Recipe}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Menu isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu} />
    </SplashScreen>
  );
};

export default Container;

const BottomTab = () => {
  const screenOptions = {
    headerShown: false,
    tabBarInactiveTintColor: global_color.BLACK,
    tabBarActiveTintColor: global_color.PRIMARY,
    tabBarItemStyle: {padding: 4},
    tabBarLabelStyle: {
      fontFamily: global_font.PRIMARY,
    },
    headerTitleStyle: primaryStyles.stackHeaderTitle,
    headerStyle: primaryStyles.stackHeader,
    tabBarStyle: {
      marginHorizontal: 15,
      marginVertical: 10,
      borderRadius: 5,
    },
    headerRightContainerStyle: {
      marginRight: 15,
    },
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Categories"
        options={{
          tabBarLabel: 'دستورات آشپزی',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="chef-hat" color={color} size={size - 2} />
          ),
        }}
        component={Categories}
      />
      <Tab.Screen
        name="Calculate"
        options={{
          tabBarLabel: 'ماشین حساب',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="calculator"
              color={color}
              size={size - 2}
            />
          ),
        }}
        component={Foods}
      />
    </Tab.Navigator>
  );
};
