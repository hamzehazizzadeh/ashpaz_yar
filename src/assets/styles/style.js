import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

export const global_font = {PRIMARY: 'IRANSans', PRIMARY_BOLD: 'IRANSansBold'};

export const global_color = {
  PRIMARY: '#3f5ab0',
  PRIMARY_LIGHT: '#3f5ab033',
  INFO: '#28c3d7',
  INFO_LIGHT: '#dff6f9',
  BLUE: '#00a2c7',
  DARK_BLUE: '#23366b',
  DARK_GREEN: '#117577',
  SUCCESS: '#02BC77',
  SUCCESS_LIGHT: '#e1fae2',
  INFO_LIGHT: '#f1faff',
  DANGER: '#d9534f',
  DANGER_LIGHT: '#fdefef',
  LIGHT: '#181c211a',
  LIGHT_GRAY: '#e6e6e6',
  WHITE: '#ffffff',
  WARNING: '#FFD950',
  BLACK: '#000000',
  GRAY: '#808080',
  MUTE: '#a3a4a6',
  SECONDARY: '#8897AA',
};

export const primaryStyles = StyleSheet.create({
  inputContainer: {
    fontFamily: global_font.PRIMARY,
    width: '100%',
    borderColor: global_color.MUTE,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    textAlign: 'right',
    color: global_color.PRIMARY,
    backgroundColor: global_color.WHITE,
  },
  stackHeaderTitle: {
    fontFamily: global_font.PRIMARY_BOLD,
    fontSize: RFPercentage(2.5),
    color: global_color.WHITE,
  },
  stackHeader: {
    backgroundColor: global_color.PRIMARY,
  },
});
