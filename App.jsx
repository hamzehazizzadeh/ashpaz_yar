import React from 'react';
import Toast from 'react-native-toast-message';
import {I18nManager, StatusBar} from 'react-native';
import {NativeBaseProvider} from 'native-base';

import Container from './src/containers';
import {toastConfig} from './src/utils/toastMessage/toastMessage';
import {useDoubleBackPressExit} from './src/utils/hooks';

//? Supported For RTL
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const App = () => {
  useDoubleBackPressExit();

  return (
    <NativeBaseProvider>
      <StatusBar hidden />
      <Container />

      {/* React Native Toast Message */}
      <Toast position="bottom" config={toastConfig} />
    </NativeBaseProvider>
  );
};

export default App;
