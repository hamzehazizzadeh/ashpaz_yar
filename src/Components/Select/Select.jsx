import ModalSelector from 'react-native-modal-selector';
import {StyleSheet, View} from 'react-native';
import {isEmpty} from 'lodash';
import {RFValue} from 'react-native-responsive-fontsize';

import TextC from '../TextC/TextC';
import {
  global_color,
  global_font,
  primaryStyles,
} from '../../assets/styles/style';

const Select = ({
  label,
  readOnly = false,
  inValid = false,
  containerStyle = {},
  labelStyle = {},
  inputStyle = {},
  size = 'md',
  initValue = 'انتخاب کنید',
  errorMessage,
  ...otherProps
}) => {
  const paddingVertical =
    size === 'sm' ? 4 : size === 'md' ? 6 : size === 'lg' ? 8 : size;

  return (
    <View style={[styles.containerStyle]}>
      {label && <TextC style={[styles.label, labelStyle]}>{label}</TextC>}
      <ModalSelector
        initValue={initValue}
        cancelText="بستن"
        initValueTextStyle={styles.text}
        optionTextStyle={styles.optionTextStyle}
        cancelTextStyle={styles.text}
        selectTextStyle={styles.text}
        optionContainerStyle={styles.optionContainerStyle}
        selectStyle={{
          ...primaryStyles.inputContainer,
          paddingVertical,
          ...(!isEmpty(inputStyle) && inputStyle),
        }}
        {...otherProps}
      />
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  label: {
    marginBottom: 3,
  },
  readOnly: {backgroundColor: global_color.LIGHT},
  text: {
    fontFamily: global_font.PRIMARY,
    color: global_color.BLACK,
    fontSize: RFValue(11),
  },
  optionTextStyle: {
    fontFamily: global_font.PRIMARY,
    color: global_color.BLACK,
  },
  optionContainerStyle: {backgroundColor: global_color.WHITE},
});
