import {Pressable, StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import {global_color, global_font} from '../../assets/styles/style';

const ButtonC = ({
  onPress,
  children,
  icon,
  variant = 'primary',
  size = 'md',
  outline = false,
  disabled = false,
  otherStyles = {},
  otherTextStyles = {},
}) => {
  const onPressHandler = () => {
    if (onPress) onPress();
  };

  const primaryColor =
    variant === 'primary'
      ? global_color.PRIMARY
      : variant === 'danger'
      ? global_color.DANGER
      : variant === 'light'
      ? global_color.LIGHT
      : variant === 'success'
      ? global_color.SUCCESS
      : variant === 'info'
      ? global_color.INFO
      : variant === 'secondary'
      ? global_color.SECONDARY
      : variant === 'dark-blue'
      ? global_color.DARK_BLUE
      : variant === 'dark-green'
      ? global_color.DARK_GREEN
      : variant === 'link'
      ? global_color.TRANSPARENT
      : global_color.PRIMARY;
  const secondaryColor =
    variant === 'primary'
      ? global_color.WHITE
      : variant === 'danger'
      ? global_color.WHITE
      : variant === 'light'
      ? global_color.BLACK
      : variant === 'success'
      ? global_color.WHITE
      : variant === 'info'
      ? global_color.WHITE
      : variant === 'dark-blue'
      ? global_color.WHITE
      : variant === 'dark-green'
      ? global_color.WHITE
      : variant === 'secondary'
      ? global_color.WHITE
      : variant === 'link'
      ? global_color.PRIMARY
      : global_color.WHITE;
  const paddingVertical =
    size === 'sm' ? 4 : size === 'md' ? 6 : size === 'lg' ? 8 : size;

  const color = outline ? primaryColor : secondaryColor;

  const isDisabled = disabled;

  return (
    <Pressable
      onPress={onPressHandler}
      disabled={isDisabled}
      style={[
        styles.button,
        {
          borderColor: primaryColor,
          borderWidth: variant === 'link' ? 0 : 1,
          backgroundColor: outline ? 'transparent' : primaryColor,
          paddingVertical,
        },
        otherStyles,
        isDisabled && {opacity: 0.6},
      ]}>
      <View style={styles.textContainer}>
        {icon && <View style={styles.iconContainer}>{icon({color})}</View>}
        <Text style={[styles.text, {color}, otherTextStyles]}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default ButtonC;

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  iconContainer: {
    marginEnd: 5,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontFamily: global_font.PRIMARY_BOLD,
    fontSize: RFValue(11),
  },
});
