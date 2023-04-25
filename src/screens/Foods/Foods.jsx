import uuid from 'react-native-uuid';
import {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Button} from 'native-base';
import {isEmpty} from 'lodash';

import Layout from '../../components/Layout/Layout';
import TextC from '../../components/TextC/TextC';
import AlertC from './../../components/AlertC/AlertC';
import InputC from '../../components/InputC/InputC';
import FoodItem from '../../components/FoodItem/FoodItem';
import {primaryStyles} from '../../assets/styles/style';
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '../../utils/localStorage/localStorage';
import {toastErrorMessage} from '../../utils/toastMessage/toastMessage';

const Foods = ({navigation}) => {
  const [foods, setFoods] = useState([]);
  const [foodName, setFoodName] = useState('');

  const handleGetFoods = async () => {
    let foodsList = await getLocalStorage('Foods');
    if (foodsList) {
      setFoods(foodsList);
    }
  };

  useEffect(() => {
    handleGetFoods();
  }, []);

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

  const handleDeleteFood = id => {
    const foodsArray = [...foods];
    const filterFoods = foodsArray.filter(food => food._id !== id);
    setLocalStorage('Foods', filterFoods);
    removeLocalStorage(id);
    handleGetFoods();
  };

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
    <Layout title="آشپزیار">
      <View style={primaryStyles.addedSection}>
        <View>
          <InputC
            value={foodName}
            placeholder="نام غذا"
            onChangeText={name => setFoodName(name)}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Button
            success
            full
            onPress={handleAddFood}
            style={primaryStyles.roundedButton}>
            <TextC color="#fff">افزودن</TextC>
          </Button>
        </View>
      </View>
      {foods.length === 0 || foods === [] || isEmpty(foods) ? (
        <AlertC message="غذایی برای نمایش ثبت نشده است" />
      ) : (
        <FlatList
          data={foods}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <FoodItem
              navigation={navigation}
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
