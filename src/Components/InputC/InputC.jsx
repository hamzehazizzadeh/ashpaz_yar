import {Pressable, StyleSheet, TextInput, View} from 'react-native';

import TextC from '../TextC/TextC';
import {global_color, primaryStyles} from '../../assets/styles/style';

const InputC = ({
  label,
  readOnly = false,
  inValid = false,
  containerStyle = {},
  labelStyle = {},
  inputStyle = {},
  size = 'sm',
  errorMessage,
  onPress,
  placeholderTextColor = global_color.MUTE,
  ...otherProps
}) => {
  const paddingVertical =
    size === 'sm' ? 4 : size === 'md' ? 6 : size === 'lg' ? 8 : size;

  return (
    <View style={[styles.containerStyle]}>
      {label && <TextC style={[styles.label, labelStyle]}>{label}</TextC>}
      <Pressable onPress={onPress && onPress}>
        <TextInput
          {...otherProps}
          editable={!readOnly}
          placeholderTextColor={placeholderTextColor}
          style={[
            primaryStyles.inputContainer,
            {paddingVertical},
            inValid && styles.inValid,
            readOnly && styles.readOnly,
            inputStyle,
          ]}
        />
      </Pressable>
    </View>
  );
};

export default InputC;

const styles = StyleSheet.create({
  label: {
    marginBottom: 3,
  },
  readOnly: {
    backgroundColor: global_color.LIGHT_GRAY,
    color: global_color.GRAY,
  },
});
