import React, { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";
import AnimatedSplash from "react-native-animated-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { I18nManager, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import DrawerNavigatorContainer from "./src/Components/Container/DrawerNavigatorContainer";

//? Supported For RTL
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const App = () => {
  let [fontsLoaded] = useFonts({
    IRANSansWeb_Bold: require("./src/assets/fonts/IRANSansWeb_Bold.ttf"),
    Roboto: require("./src/assets/fonts/IRANSansWeb_Bold.ttf"),
    Roboto_medium: require("./src/assets/fonts/IRANSansWeb_Bold.ttf"),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setLoading(true);
    }, 2000);
  }, []);

  if (fontsLoaded) {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar style="auto" hidden />
        <AnimatedSplash
          translucent={true}
          isLoaded={loading}
          logoImage={require("./src/assets/image/splash.png")}
          backgroundColor={"#262626"}
          logoHeight={250}
          logoWidth={250}
        >
          <NavigationContainer>
            <DrawerNavigatorContainer />
          </NavigationContainer>
        </AnimatedSplash>
      </View>
    );
  } else {
    return <AppLoading />;
  }
};

export default App;
