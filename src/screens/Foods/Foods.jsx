import uuid from 'react-native-uuid';
import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {isEmpty} from 'lodash';

import ButtonC from './../../components/ButtonC/ButtonC';
import Layout from '../../components/Layout/Layout';
import AlertC from './../../components/AlertC/AlertC';
import InputC from '../../components/InputC/InputC';
import FoodItem from '../../components/FoodItem/FoodItem';
import {global_color} from '../../assets/styles/style';
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '../../utils/localStorage/localStorage';
import {toastErrorMessage} from '../../utils/toastMessage/toastMessage';

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [foodName, setFoodName] = useState('');

  // Handle Get Foods Method
  const handleGetFoods = async () => {
    let foodsList = await getLocalStorage('Foods');
    if (foodsList) {
      setFoods(foodsList);
    }
  };

  useEffect(() => {
    handleGetFoods();
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
    </Layout>
  );
};

export default Foods;

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
});
