import AnimatedSplash from 'react-native-animated-splash-screen';
import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

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
      logoWidth={Dimensions.get('window').width}
      translucent={true}
      isLoaded={isLoading}
      backgroundColor={'#262626'}
      logoHeight={Dimensions.get('window').height}>
      {children}
    </AnimatedSplash>
  );
};

export default SplashScreen;
