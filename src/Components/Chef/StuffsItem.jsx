import React, { useState } from "react";
import { Button, Card, CardItem, View } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import ResponsiveText from "../../Utils/ResponsiveText/ResponsiveText";
import CustomFormInput from "../../Utils/CustomFormInput/CustomFormInput";
import CustomAlert from "./../../Utils/CustomAlert/CustomAlert";
import { chefStyles } from "../../assets/style/style";
import { numberSeparateUtils } from "../../Utils/numberSeparateUtils/numberSeparateUtils";
import { stuffsForPersons } from './../../Utils/stuffsUtils/stuffsUtils';

const StuffsItem = ({
  stuff,
  handleDelete,
  handleEditStuffs,
  numberOfPersons,
}) => {
  const [isEdited, setIsEdited] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [stuffsName, setStuffsName] = useState("");
  const [stuffCount, setStuffCount] = useState("");

  return (
    <Card>
      <CardItem style={chefStyles.foodItem}>
        <View style={{ width: "80%" }}>
          <ResponsiveText>{stuff.name}</ResponsiveText>
        </View>
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
              setStuffsName(stuff?.name);
              setStuffCount(stuff?.count);
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
      <CardItem>
        <View style={{ width: "100%" }}>
          <CustomAlert
            fontSize={1.6}
            message={`به ازای ${numberSeparateUtils(
              numberOfPersons
            )} نفر ${stuffsForPersons(
              stuff?.count,
              numberOfPersons,
              stuff?.type
            )}`}
          />
        </View>
      </CardItem>
      {isEdited ? (
        <CardItem>
          <View style={{ width: "100%" }}>
            <View>
              <CustomFormInput
                value={stuffsName}
                placeholder="نام مواد"
                onChangeText={(name) => setStuffsName(name)}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <CustomFormInput
                value={stuffCount}
                keyboardType="numeric"
                placeholder="مقدار مواد"
                onChangeText={(count) => setStuffCount(count)}
              />
            </View>
            <View style={chefStyles.multiButton}>
              <View style={{ width: "65%" }}>
                <Button
                  primary
                  full
                  onPress={() =>
                    handleEditStuffs(stuff._id, stuffsName, stuffCount, () => {
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
                message={`آیا از حذف ${stuff?.name} مطمئنید؟`}
              />
            </View>
            <View style={chefStyles.multiButton}>
              <View style={{ width: "65%" }}>
                <Button
                  danger
                  full
                  onPress={() => handleDelete(stuff._id)}
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

export default StuffsItem;
