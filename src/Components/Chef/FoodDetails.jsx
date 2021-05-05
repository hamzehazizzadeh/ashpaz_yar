import React, { Fragment, useEffect, useState } from "react";
import uuid from "react-native-uuid";
import { Button, Picker } from "native-base";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FlatList, Modal, Share, TouchableOpacity, View } from "react-native";
import { isEmpty } from "lodash";

import Layout from "../Layout/Layout";
import ResponsiveText from "../../Utils/ResponsiveText/ResponsiveText";
import CustomAlert from "../../Utils/CustomAlert/CustomAlert";
import CustomFormInput from "../../Utils/CustomFormInput/CustomFormInput";
import StuffsItem from "./StuffsItem";
import { chefStyles } from "../../assets/style/style";
import { customToast } from "./../../Utils/toastMessage/toastMessage";
import { stuffsForPersons } from "../../Utils/stuffsUtils/stuffsUtils";
import {
  getAsyncStorage,
  setAsyncStorage,
} from "../../Utils/asyncStorageOperation/asyncStorageOperation";

const FoodDetails = ({ route, navigation }) => {
  const { name, _id } = route.params;

  const [stuffs, setStuffs] = useState([]);
  const [stuffsName, setStuffName] = useState("");
  const [stuffCount, setStuffCount] = useState("");
  const [numberOfPersons, setNumberOfPersons] = useState("1");
  const [stuffsType, setStuffType] = useState("g");
  const [addStuffsModal, setAddStuffModal] = useState(false);

  const handleGetStuffs = async () => {
    let stuffsList = await getAsyncStorage(_id);
    if (stuffsList) {
      setStuffs(stuffsList);
    }
  };

  useEffect(() => {
    handleGetStuffs();
  }, []);

  const handleDeleteState = () => {
    setStuffName("");
    setStuffCount("");
    setStuffType("g");
  };

  const handleAddStuffs = () => {
    if (!stuffsName || !stuffCount || !stuffsType) {
      return;
    }

    const stuff = {
      _id: uuid.v4(),
      name: stuffsName,
      count: stuffCount,
      type: stuffsType,
    };

    setAsyncStorage(_id, [...stuffs, stuff]);
    handleGetStuffs();
    setAddStuffModal(false);
    handleDeleteState();
  };

  const handleDeleteStuffs = (id) => {
    const stuffsArray = [...stuffs];
    const filterStuffs = stuffsArray.filter((stuff) => stuff._id !== id);
    setAsyncStorage(_id, filterStuffs);
    handleGetStuffs()
  };

  const handleEditStuffs = (id, stuffName, stuffCount, successFunc) => {
    if (stuffName.length < 2) {
      return customToast("نام مواد باید حداقل از 2 کاراکتر بیشتر باشد");
    }

    if (!stuffCount) {
      return customToast("مقدار مواد نمی تواند خالی باشد");
    }

    const stuffIndex = stuffs.findIndex((stuffs) => stuffs._id === id);
    const stuff = stuffs[stuffIndex];
    stuff.name = stuffName;
    stuff.count = stuffCount;

    const allStuff = [...stuffs];

    allStuff[stuffIndex] = stuff;

    setAsyncStorage(_id, allStuff);
    handleGetStuffs();

    if (successFunc) {
      successFunc();
    }
  };

  const shareFood = async () => {
    let stuffList = "";
    stuffs?.map(
      (stuff) =>
        (stuffList += `${stuff?.name} : ${stuffsForPersons(
          stuff?.count,
          numberOfPersons,
          stuff?.type
        )}\n`)
    );
    let message = `نام غذا : ${name}\nبرای ${numberOfPersons} نفر\n\n${stuffList}`;
    try {
      await Share.share({
        title: name,
        message,
      });
    } catch (error) {
      customToast("مشکلی در به اشتراک گذاری رخ داده است");
    }
  };

  return (
    <Layout
      navigation={navigation}
      title={name}
      right={
        <>
          <Feather
            name="arrow-left-circle"
            size={24}
            color="white"
            onPress={() => navigation.goBack()}
          />
        </>
      }
      footer={
        <>
          <Button success full onPress={() => setAddStuffModal(true)}>
            <ResponsiveText color="#fff">افزودن مواد</ResponsiveText>
          </Button>
          <Button primary full onPress={shareFood}>
            <ResponsiveText color="#fff">اشتراک گذاری</ResponsiveText>
          </Button>
        </>
      }
    >
      {stuffs.length === 0 || stuffs === [] || isEmpty(stuffs) ? (
        <CustomAlert message="مواد غذایی برای نمایش ثبت نشده است" />
      ) : (
        <Fragment>
          <View style={chefStyles.addedSection}>
            <CustomFormInput
              label="تعداد افراد"
              value={numberOfPersons}
              keyboardType="numeric"
              onChangeText={(person) => setNumberOfPersons(person)}
            />
          </View>
          <FlatList
            data={stuffs}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <StuffsItem
                numberOfPersons={numberOfPersons}
                navigation={navigation}
                stuff={item}
                handleDelete={handleDeleteStuffs}
                handleEditStuffs={handleEditStuffs}
              />
            )}
          />
        </Fragment>
      )}

      {/* Start Add Stuffs Modal */}
      <Modal
        animationType="slide"
        visible={addStuffsModal}
        onRequestClose={() => {
          setAddStuffModal(!addStuffsModal);
        }}
      >
        <View style={chefStyles.modalHeader}>
          <ResponsiveText fontSize={2.5}>افزودن مواد</ResponsiveText>
          <TouchableOpacity onPress={() => setAddStuffModal(false)}>
            <FontAwesome5 name="times" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={chefStyles.modalBody}>
          <View>
            <CustomFormInput
              value={stuffsName}
              placeholder="نام مواد"
              onChangeText={(name) => setStuffName(name)}
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
          <View style={{ marginTop: 10 }}>
            <Picker
              mode="dropdown"
              placeholder="نوع مواد"
              style={[chefStyles.formInput, { height: 30 }]}
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={stuffsType}
              onValueChange={(type) => setStuffType(type)}
            >
              <Picker.Item label="گرم" value="g" />
              <Picker.Item label="کیلو گرم" value="kg" />
              <Picker.Item label="تن" value="ton" />
              <Picker.Item label="عدد" value="number" />
              <Picker.Item label="پیمانه" value="peymaneh" />
              <Picker.Item label="مثقال" value="mesghal" />
            </Picker>
          </View>
          <View style={{ marginTop: 10 }}>
            <Button
              success
              full
              onPress={handleAddStuffs}
              style={chefStyles.roundedButton}
            >
              <ResponsiveText color="#fff">افزودن</ResponsiveText>
            </Button>
          </View>
        </View>
      </Modal>
      {/* End Add Stuffs Modal */}
    </Layout>
  );
};

export default FoodDetails;
