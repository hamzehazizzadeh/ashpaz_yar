import { numberSeparateUtils } from "../numberSeparateUtils/numberSeparateUtils";

export const stuffsTypeUtils = (type) => {
  switch (type) {
    case "g":
      return "گرم";
    case "kg":
      return "کیلو گرم";
    case "ton":
      return "تن";
    case "number":
      return "عدد";
    case "peymaneh":
      return "پیمانه";
    case "mesghal":
      return "مثقال";

    default:
      return "";
  }
};

export const stuffsForPersons = (count, numberOfPersons, type) => {
  let counts = count * Number(numberOfPersons);
  let stuffType = stuffsTypeUtils(type);

  if (counts >= 1000) {
    switch (type) {
      case "g":
        stuffType = "کیلو گرم";
        counts = counts / 1000;
        break;
      case "kg":
        stuffType = "تن";
        counts = counts / 1000;
        break;

      default:
        break;
    }
  }

  return `${numberSeparateUtils(counts)} ${stuffType}`;
};
