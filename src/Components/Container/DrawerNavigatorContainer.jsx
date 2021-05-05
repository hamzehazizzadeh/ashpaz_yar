import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import StackNavigatorContainer from "./StackNavigatorContainer";
import { defaultFontFamily } from "../../Utils/fontFamilyUtils/fontFamilyUtils";
import { Linking } from "react-native";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        labelStyle={{ fontFamily: defaultFontFamily }}
        label="درباره سازنده"
        onPress={() => Linking.openURL("https://hamzehazizzadeh.ir")}
      />
      <DrawerItem
        labelStyle={{ fontFamily: defaultFontFamily }}
        label="پشتیبانی تلگرام"
        onPress={() => Linking.openURL("tg://resolve?domain=hamzeh_azizzadeh")}
      />
      <DrawerItem
        labelStyle={{ fontFamily: defaultFontFamily }}
        label="مشارکت در توسعه"
        onPress={() =>
          Linking.openURL("https://github.com/hamzehazizzadeh/ashpaz_yar")
        }
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigatorContainer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerContentOptions={{
        labelStyle: {
          fontFamily: defaultFontFamily,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        options={{ drawerLabel: "لیست غذا" }}
        component={StackNavigatorContainer}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorContainer;
