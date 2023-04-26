import {View} from 'react-native';

import {global_color} from '../../assets/styles/style';

const HorizontalRule = ({
  width = 1,
  color = global_color.LIGHT_GRAY,
  style = {},
}) => {
  return (
    <View
      style={{
        borderBottomColor: color,
        borderBottomWidth: width,
        ...style,
      }}
    />
  );
};

export default HorizontalRule;
