import {Share} from 'react-native';

import {toastErrorMessage} from './toastMessage/toastMessage';

//* Start Number Utils
export const numberSeparate = number => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
//* End Number Utils

//* Start Share
export const share = async (title, message) => {
  try {
    const result = await Share.share({
      title,
      message,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    toastErrorMessage(error.message);
  }
};
//* End Share

//* Start Stuffs
export const stuffsTypeUtils = type => {
  switch (type) {
    case 'g':
      return 'گرم';
    case 'kg':
      return 'کیلو گرم';
    case 'ton':
      return 'تن';
    case 'number':
      return 'عدد';
    case 'peymaneh':
      return 'پیمانه';
    case 'mesghal':
      return 'مثقال';

    default:
      return '';
  }
};

export const stuffsForPersons = (count, numberOfPersons, type) => {
  let counts = count * Number(numberOfPersons);
  let stuffType = stuffsTypeUtils(type);

  if (counts >= 1000) {
    switch (type) {
      case 'g':
        stuffType = 'کیلو گرم';
        counts = counts / 1000;
        break;
      case 'kg':
        stuffType = 'تن';
        counts = counts / 1000;
        break;

      default:
        break;
    }
  }

  return `${numberSeparate(counts)} ${stuffType}`;
};
//* End Stuffs
