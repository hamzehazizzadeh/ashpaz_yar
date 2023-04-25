import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Linking} from 'react-native';

import StackNavigator from './StackNavigator/StackNavigator';

const Drawer = createDrawerNavigator();

const Container = () => {
  return (
    <SplashScreen>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={props => <CustomDrawerContent {...props} />}
          drawerContentOptions={{
            labelStyle: {
              fontFamily: defaultFontFamily,
            },
          }}>
          <Drawer.Screen
            name="Home"
            options={{drawerLabel: 'لیست غذا'}}
            component={StackNavigator}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SplashScreen>
  );
};

export default Container;

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        labelStyle={{fontFamily: defaultFontFamily}}
        label="درباره سازنده"
        onPress={() => Linking.openURL('https://hamzehazizzadeh.ir')}
      />
      <DrawerItem
        labelStyle={{fontFamily: defaultFontFamily}}
        label="پشتیبانی تلگرام"
        onPress={() => Linking.openURL('tg://resolve?domain=hamzeh_azizzadeh')}
      />
      <DrawerItem
        labelStyle={{fontFamily: defaultFontFamily}}
        label="مشارکت در توسعه"
        onPress={() =>
          Linking.openURL('https://github.com/hamzehazizzadeh/ashpaz_yar')
        }
      />
    </DrawerContentScrollView>
  );
};
