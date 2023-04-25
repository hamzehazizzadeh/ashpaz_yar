import {Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import {global_font} from '../../assets/styles/style';

const TextC = ({
  children,
  style,
  align = 'auto',
  size = 11,
  bold = false,
  color = '#fff',
  ...otherProps
}) => {
  return (
    <Text
      style={[
        {
          fontFamily: bold ? global_font.PRIMARY_BOLD : global_font.PRIMARY,
          fontSize: RFValue(size),
          color: color,
          textAlign: align,
        },
        style,
      ]}
      {...otherProps}>
      {children}
    </Text>
  );
};

export default TextC;
