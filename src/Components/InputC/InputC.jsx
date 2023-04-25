import {Pressable, StyleSheet, TextInput, View} from 'react-native';

import TextC from '../TextC/TextC';
import {primaryStyles} from '../../assets/styles/style';

const InputC = ({
  label,
  readOnly = false,
  inValid = false,
  containerStyle = {},
  labelStyle = {},
  inputStyle = {},
  size = 'md',
  errorMessage,
  onPress,
  placeholderTextColor = '#a3a4a6',
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
    backgroundColor: '#e6e6e6',
    color: '#808080',
  },
});
