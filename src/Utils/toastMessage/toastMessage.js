import Toast from "react-native-tiny-toast";
import { RFPercentage } from "react-native-responsive-fontsize";

import { defaultFontFamily } from "../fontFamilyUtils/fontFamilyUtils";

const toastOptions = {
  position: Toast.position.CENTER,
  textStyle: {
    fontFamily: defaultFontFamily,
    fontSize: RFPercentage(1.5),
  },
  shadow: true,
};

export const successToast = (message) => {
  return Toast.showSuccess(message, toastOptions);
};

export const loadingToast = (message = "لطفا کمی صبر کنید ...") => {
  return Toast.showLoading(message, toastOptions);
};

export const customToast = (message) => {
  return Toast.show(message, {
    ...toastOptions,
    position: Toast.position.CENTER,
  });
};

export const hideToast = () => {
  return Toast.hide();
};
