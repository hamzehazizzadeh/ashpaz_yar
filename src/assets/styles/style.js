import {StyleSheet} from 'react-native';

export const global_font = {PRIMARY: 'IRANSans', PRIMARY_BOLD: 'IRANSansBold'};

export const primaryStyles = StyleSheet.create({
  inputContainer: {
    fontFamily: global_font.PRIMARY,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 7,
    textAlign: 'right',
    color: '#3f51b5',
    backgroundColor: '#fff',
  },
  modalBody: {
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 1.5,
    backgroundColor: '#eee',
  },
  roundedButton: {
    borderRadius: 7,
  },
  layoutBody: {flex: 1, padding: 20, backgroundColor: '#eee'},
  foodItem: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addedSection: {
    marginBottom: 10,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  multiButton: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
