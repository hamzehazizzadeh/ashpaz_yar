import {Text} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

import {global_font} from '../../assets/styles/style';
import {convertColorText} from '../../utils';

const TextC = ({
  children,
  style,
  align = 'auto',
  size = 1.8,
  bold = false,
  color = 'black',
  ...otherProps
}) => {
  return (
    <Text
      style={[
        {
          fontFamily: bold ? global_font.PRIMARY_BOLD : global_font.PRIMARY,
          fontSize: RFPercentage(size),
          color: convertColorText(color),
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
