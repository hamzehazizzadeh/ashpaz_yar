import Toast, {BaseToast} from 'react-native-toast-message';

import {global_color, global_font} from '../../assets/styles/style';

export const toastSuccessMessage = (title, message) => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: message,
  });
};

export const toastErrorMessage = (title, message) => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: message,
  });
};

export const toastInfoMessage = (title, message) => {
  Toast.show({
    type: 'info',
    text1: title,
    text2: message,
  });
};

export const toastMessageBorderColor = type => {
  switch (type) {
    case 'success':
      return 'green';
    case 'error':
      return 'red';
    case 'info':
      return 'blue';

    default:
      return 'gray';
  }
};

//* Start React Native Toast
const baseToast = ({...rest}) => (
  <BaseToast
    {...rest}
    style={{
      borderLeftColor: toastMessageBorderColor(rest.type),
      backgroundColor: global_color.WHITE,
    }}
    text1Style={{
      fontFamily: global_font.PRIMARY_BOLD,
      fontWeight: 'normal',
      color: global_color.BLACK,
    }}
    text2Style={{
      fontFamily: global_font.PRIMARY_BOLD,
      fontWeight: 'normal',
      color: global_color.BLACK,
    }}
  />
);

export const toastConfig = {
  success: baseToast,
  error: baseToast,
  info: baseToast,
};
//* End React Native Toast
