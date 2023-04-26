import {BackHandler, Platform} from 'react-native';
import {toastErrorMessage} from '../toastMessage/toastMessage';

let currentCount = 0;
export const useDoubleBackPressExit = (
  exitHandler = () => BackHandler.exitApp(),
) => {
  if (Platform.OS === 'ios') return;
  const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
    if (currentCount === 1) {
      exitHandler();
      subscription.remove();
      return true;
    }
    backPressHandler();
    return true;
  });
};

const backPressHandler = () => {
  if (currentCount < 1) {
    currentCount += 1;
    toastErrorMessage('برای خروج دوباره بازگشت را بزنید');
  }
  setTimeout(() => {
    currentCount = 0;
  }, 4000);
};
