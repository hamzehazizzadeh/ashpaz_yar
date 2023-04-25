import {View, StyleSheet} from 'react-native';

import TextC from './../TextC/TextC';

const AlertC = ({
  backgroundColor = '#23366b',
  color = '#fff',
  message,
  fontSize = 11,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
        },
      ]}>
      <TextC size={fontSize} color={color}>
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
