import React, { useState } from "react";
import { Button, Card, CardItem, View } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import ResponsiveText from "../../Utils/ResponsiveText/ResponsiveText";
import CustomFormInput from "../../Utils/CustomFormInput/CustomFormInput";
import { chefStyles } from "../../assets/style/style";
import CustomAlert from "./../../Utils/CustomAlert/CustomAlert";

const FoodItem = ({ food, handleDelete, handleEditFood, navigation }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [foodName, setFoodName] = useState("");

  return (
    <Card>
      <CardItem style={chefStyles.foodItem}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Food", food)}
          style={{ width: "80%" }}
        >
          <ResponsiveText>{food.name}</ResponsiveText>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setIsEdited(!isEdited);
              setFoodName(food?.name);
            }}
          >
            <FontAwesome name="edit" size={30} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => setIsDeleted(!isDeleted)}
          >
            <FontAwesome name="trash" size={30} color="red" />
          </TouchableOpacity>
        </View>
      </CardItem>
      {isEdited ? (
        <CardItem>
          <View style={{ width: "100%" }}>
            <View>
              <CustomFormInput
                value={foodName}
                placeholder="نام غذا"
                onChangeText={(name) => setFoodName(name)}
              />
            </View>
            <View style={chefStyles.multiButton}>
              <View style={{ width: "65%" }}>
                <Button
                  primary
                  full
                  onPress={() =>
                    handleEditFood(food._id, foodName, () => {
                      setIsEdited(false);
                    })
                  }
                  style={chefStyles.roundedButton}
                >
                  <ResponsiveText color="#fff">ویرایش</ResponsiveText>
                </Button>
              </View>
              <View style={{ width: "30%" }}>
                <Button
                  danger
                  full
                  onPress={() => setIsEdited(false)}
                  style={chefStyles.roundedButton}
                >
                  <ResponsiveText color="#fff">انصراف</ResponsiveText>
                </Button>
              </View>
            </View>
          </View>
        </CardItem>
      ) : null}
      {isDeleted ? (
        <CardItem>
          <View style={{ width: "100%" }}>
            <View>
              <CustomAlert
                backgroundColor="#0dcaf0"
                message={`آیا از حذف ${food?.name} مطمئنید؟`}
              />
            </View>
            <View style={chefStyles.multiButton}>
              <View style={{ width: "65%" }}>
                <Button
                  danger
                  full
                  onPress={() => handleDelete(food._id)}
                  style={chefStyles.roundedButton}
                >
                  <ResponsiveText color="#fff">بله حذف</ResponsiveText>
                </Button>
              </View>
              <View style={{ width: "30%" }}>
                <Button
                  primary
                  full
                  onPress={() => setIsDeleted(false)}
                  style={chefStyles.roundedButton}
                >
                  <ResponsiveText color="#fff">خیر</ResponsiveText>
                </Button>
              </View>
            </View>
          </View>
        </CardItem>
      ) : null}
    </Card>
  );
};

export default FoodItem;
