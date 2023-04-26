import AnimatedSplash from 'react-native-animated-splash-screen';
import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

import {global_color} from '../../assets/styles/style';

const SplashScreen = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 2 * 1000);
  }, []);

  return (
    <AnimatedSplash
      logoImage={require('../../assets/images/splash.png')}
      logoWidth={Dimensions.get('window').width - 150}
      translucent={true}
      isLoaded={isLoading}
      backgroundColor={global_color.LIGHT_GRAY}
      logoHeight={Dimensions.get('window').height}>
      {children}
    </AnimatedSplash>
  );
};

export default SplashScreen;
