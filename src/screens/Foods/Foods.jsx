import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import uuid from 'react-native-uuid';
import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, Linking, Pressable} from 'react-native';
import {isEmpty} from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {RFPercentage} from 'react-native-responsive-fontsize';

import ButtonC from './../../components/ButtonC/ButtonC';
import Layout from '../../components/Layout/Layout';
import AlertC from './../../components/AlertC/AlertC';
import InputC from '../../components/InputC/InputC';
import TextC from '../../components/TextC/TextC';
import ModalC from './../../components/ModalC/ModalC';
import HorizontalRule from './../../components/HorizontalRule/HorizontalRule';
import FoodItem from '../../components/FoodItem/FoodItem';
import {global_color} from '../../assets/styles/style';
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '../../utils/localStorage/localStorage';
import {toastErrorMessage} from '../../utils/toastMessage/toastMessage';

const Foods = () => {
  const navigation = useNavigation();

  const [foods, setFoods] = useState([]);
  const [foodName, setFoodName] = useState('');
  const [isShowMenu, setIsShowMenu] = useState(false);

  // Handle Get Foods Method
  const handleGetFoods = async () => {
    let foodsList = await getLocalStorage('Foods');
    if (foodsList) {
      setFoods(foodsList);
    }
  };

  useEffect(() => {
    handleGetFoods();

    navigation.setOptions({
      headerLeft: () => (
        <Entypo
          name="menu"
          style={{marginHorizontal: 15}}
          size={RFPercentage(3.5)}
          color="white"
          onPress={() => setIsShowMenu(true)}
        />
      ),
    });
  }, []);

  // Handle Add Food Method
  const handleAddFood = () => {
    if (foodName.length >= 2) {
      const food = {
        _id: uuid.v4(),
        name: foodName,
      };

      setLocalStorage('Foods', [...foods, food]);
      setFoodName('');
      handleGetFoods();
    } else toastErrorMessage('نام غذا باید حداقل از 2 کاراکتر بیشتر باشد');
  };

  // Handle Delete Food Method
  const handleDeleteFood = id => {
    const foodsArray = [...foods];
    const filterFoods = foodsArray.filter(food => food._id !== id);
    setLocalStorage('Foods', filterFoods);
    removeLocalStorage(id);
    handleGetFoods();
  };

  // Handle Edit Food Method
  const handleEditFood = (id, foodName, successFunc) => {
    if (foodName.length < 2)
      return toastErrorMessage('نام غذا باید حداقل از 2 کاراکتر بیشتر باشد');

    const foodIndex = foods.findIndex(foods => foods._id === id);
    const food = foods[foodIndex];
    food.name = foodName;

    const allFood = [...foods];

    allFood[foodIndex] = food;
    setLocalStorage('Foods', allFood);
    handleGetFoods();

    if (successFunc) {
      successFunc();
    }
  };

  return (
    <Layout>
      <View style={styles.addSection}>
        <View style={{flex: 1}}>
          <InputC
            value={foodName}
            placeholder="نام غذا"
            onChangeText={name => setFoodName(name)}
          />
        </View>
        <View style={{marginLeft: 10}}>
          <ButtonC
            variant="success"
            onPress={handleAddFood}
            otherStyles={styles.roundedButton}>
            افزودن
          </ButtonC>
        </View>
      </View>
      {isEmpty(foods) ? (
        <AlertC message="غذایی برای نمایش ثبت نشده است" />
      ) : (
        <FlatList
          data={foods}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <FoodItem
              food={item}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          )}
        />
      )}

      <ModalC title="منو" show={isShowMenu} onHide={() => setIsShowMenu(false)}>
        <MenuItem
          icon="globe-asia"
          onPress={() => Linking.openURL('https://hamzehazizzadeh.ir')}
          title="درباره سازنده"
        />
        <HorizontalRule />
        <MenuItem
          icon="telegram"
          onPress={() =>
            Linking.openURL('tg://resolve?domain=hamzeh_azizzadeh')
          }
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
    </Layout>
  );
};

export default Foods;

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
  addSection: {
    marginBottom: 10,
    borderBottomColor: global_color.MUTE,
    borderBottomWidth: 1,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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
