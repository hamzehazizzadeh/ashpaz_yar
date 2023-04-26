import {View} from 'react-native';

import {convertColorText} from './../../utils/index';

const Layout = ({children, style, padding = 10, backgroundColor}) => {
  return (
    <View
      style={[
        {
          flex: 1,
          padding,
          backgroundColor: convertColorText(backgroundColor),
        },
        style,
      ]}>
      {children}
    </View>
  );
};

export default Layout;
