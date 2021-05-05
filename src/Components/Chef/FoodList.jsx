import React, { useEffect, useState } from "react";
import uuid from "react-native-uuid";
import { FlatList, View } from "react-native";
import { Button } from "native-base";

import Layout from "../Layout/Layout";
import ResponsiveText from "./../../Utils/ResponsiveText/ResponsiveText";
import CustomFormInput from "./../../Utils/CustomFormInput/CustomFormInput";
import CustomAlert from "../../Utils/CustomAlert/CustomAlert";
import FoodItem from "./FoodItem";
import { isEmpty } from "lodash";
import { customToast } from "../../Utils/toastMessage/toastMessage";
import { chefStyles } from "../../assets/style/style";
import {
  getAsyncStorage,
  removeAsyncStorage,
  setAsyncStorage,
} from "../../Utils/asyncStorageOperation/asyncStorageOperation";

const FoodList = ({ navigation }) => {
  const [foods, setFoods] = useState([]);
  const [foodName, setFoodName] = useState("");

  const handleGetFoods = async () => {
    let foodsList = await getAsyncStorage("Foods");
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

      setAsyncStorage("Foods", [...foods, food]);
      setFoodName("");
      handleGetFoods();
    } else {
      customToast("نام غذا باید حداقل از 2 کاراکتر بیشتر باشد");
    }
  };

  const handleDeleteFood = (id) => {
    const foodsArray = [...foods];
    const filterFoods = foodsArray.filter((food) => food._id !== id);
    setAsyncStorage("Foods", filterFoods);
    removeAsyncStorage(id);
    handleGetFoods();
  };

  const handleEditFood = (id, foodName, successFunc) => {
    if (foodName.length < 2) {
      return customToast("نام غذا باید حداقل از 2 کاراکتر بیشتر باشد");
    }
    
    const foodIndex = foods.findIndex((foods) => foods._id === id);
    const food = foods[foodIndex];
    food.name = foodName;

    const allFood = [...foods];

    allFood[foodIndex] = food;
    setAsyncStorage("Foods", allFood);
    handleGetFoods();

    if (successFunc) {
      successFunc();
    }
  };

  return (
    <Layout title="آشپزیار" navigation={navigation}>
      <View style={chefStyles.addedSection}>
        <View>
          <CustomFormInput
            value={foodName}
            placeholder="نام غذا"
            onChangeText={(name) => setFoodName(name)}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button
            success
            full
            onPress={handleAddFood}
            style={chefStyles.roundedButton}
          >
            <ResponsiveText color="#fff">افزودن</ResponsiveText>
          </Button>
        </View>
      </View>
      {foods.length === 0 || foods === [] || isEmpty(foods) ? (
        <CustomAlert message="غذایی برای نمایش ثبت نشده است" />
      ) : (
        <FlatList
          data={foods}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
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

export default FoodList;
