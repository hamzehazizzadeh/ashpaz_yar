import Toast from 'react-native-toast-message';
import {I18nManager, StatusBar} from 'react-native';

import Container from './src/containers';
import {toastConfig} from './src/utils/toastMessage/toastMessage';
import {useDoubleBackPressExit} from './src/utils/hooks';

//? Supported For RTL
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const App = () => {
  useDoubleBackPressExit();

  return (
    <>
      <StatusBar hidden />

      <Container />

      {/* React Native Toast Message */}
      <Toast position="bottom" config={toastConfig} />
    </>
  );
};

export default App;
