import {StyleSheet, View} from 'react-native';

import {global_color} from '../../assets/styles/style';

const Card = ({children, style, contentStyle}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={contentStyle}>{children}</View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: global_color.WHITE,
    padding: 10,
    borderRadius: 5,
    borderColor: global_color.LIGHT_GRAY,
    borderWidth: 1,
  },
});
