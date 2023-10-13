import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Linking, Pressable, View, StyleSheet} from 'react-native';

import ModalC from '../ModalC/ModalC';
import HorizontalRule from '../HorizontalRule/HorizontalRule';
import TextC from '../TextC/TextC';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {global_color} from '../../assets/styles/style';

const Menu = ({isShowMenu, setIsShowMenu}) => {
  return (
    <ModalC title="منو" show={isShowMenu} onHide={() => setIsShowMenu(false)}>
      <MenuItem
        icon="globe-asia"
        onPress={() => Linking.openURL('https://hamzehazizzadeh.ir')}
        title="درباره سازنده"
      />
      <HorizontalRule />
      <MenuItem
        icon="telegram"
        onPress={() => Linking.openURL('tg://resolve?domain=hamzeh_azizzadeh')}
        title="پشتیبانی تلگرام"
      />
      <HorizontalRule />
      <MenuItem
        icon="github"
        onPress={() =>
          Linking.openURL('https://github.com/hamzehazizzadeh/ashpaz_yar')
        }
        title="مشارکت در توسعه"
      />
      <HorizontalRule />
      <MenuItem
        icon="phone-square"
        onPress={() => Linking.openURL('tel:09103278696')}
        title="تماس با سازنده"
      />
      <HorizontalRule />
      <MenuItem
        icon="sms"
        onPress={() => Linking.openURL('sms:09103278696')}
        title="نظرات و پیشنهادات"
      />
      <HorizontalRule />
      <MenuItem
        icon="bug"
        onPress={() => Linking.openURL('sms:09103278696')}
        title="گزارش مشکل"
      />
      <HorizontalRule />
      <MenuItem
        icon="donate"
        onPress={() => Linking.openURL('https://zarinp.al/hamzehazizzadeh')}
        title="حمایت از سازنده"
      />
      <TextC style={{marginTop: 50}} bold align="center">
        توسعه یافته توسط{' '}
        <TextC
          color="primary"
          bold
          onPress={() => Linking.openURL('https://hamzehazizzadeh.ir')}>
          حمزه عزیززاده
        </TextC>
      </TextC>
    </ModalC>
  );
};

export default Menu;

const MenuItem = ({icon, title, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.menuItem}>
      <View style={styles.menuItem}>
        <FontAwesome5
          name={icon}
          size={RFPercentage(3.5)}
          color={global_color.BLACK}
        />
        <TextC style={styles.menuItemTitle}>{title}</TextC>
      </View>
      <View>
        <FontAwesome5
          name="angle-left"
          size={RFPercentage(2.5)}
          color={global_color.BLACK}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  menuItemTitle: {
    marginLeft: 16,
  },
});
