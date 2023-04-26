import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Modal, StyleSheet, View} from 'react-native';

import TextC from '../TextC/TextC';
import {global_color} from '../../assets/styles/style';

const ModalC = ({
  show,
  onHide,
  title,
  isHeader = true,
  children,
  ...otherProps
}) => {
  return (
    <Modal
      visible={show}
      onRequestClose={onHide}
      animationType="slide"
      {...otherProps}>
      <View style={styles.container}>
        {isHeader && (
          <View style={styles.header}>
            {title && <TextC>{title}</TextC>}
            <FontAwesome5
              name="times"
              onPress={onHide}
              color={global_color.BLACK}
              size={20}
            />
          </View>
        )}
        {children}
      </View>
    </Modal>
  );
};

export default ModalC;

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
    marginBottom: 10,
    borderBottomColor: global_color.MUTE,
    borderBottomWidth: 1,
  },
});
