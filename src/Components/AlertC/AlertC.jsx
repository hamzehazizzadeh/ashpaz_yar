import {View, StyleSheet} from 'react-native';

import TextC from './../TextC/TextC';
import {convertColorText} from '../../utils';

const AlertC = ({
  backgroundColor = 'dark-blue',
  color = 'white',
  message,
  fontSize = 1.8,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: convertColorText(backgroundColor),
        },
      ]}>
      <TextC bold size={fontSize} color={color}>
        {message}
      </TextC>
    </View>
  );
};

export default AlertC;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
  },
});
