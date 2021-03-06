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
      return customToast("?????? ???????? ???????? ?????????? ???? 2 ?????????????? ?????????? ????????");
    }

    if (!stuffCount) {
      return customToast("?????????? ???????? ?????? ?????????? ???????? ????????");
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
    let message = `?????? ?????? : ${name}\n???????? ${numberOfPersons} ??????\n\n${stuffList}`;
    try {
      await Share.share({
        title: name,
        message,
      });
    } catch (error) {
      customToast("?????????? ???? ???? ???????????? ?????????? ???? ???????? ??????");
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
            <ResponsiveText color="#fff">???????????? ????????</ResponsiveText>
          </Button>
          <Button primary full onPress={shareFood}>
            <ResponsiveText color="#fff">???????????? ??????????</ResponsiveText>
          </Button>
        </>
      }
    >
      {stuffs.length === 0 || stuffs === [] || isEmpty(stuffs) ? (
        <CustomAlert message="???????? ?????????? ???????? ?????????? ?????? ???????? ??????" />
      ) : (
        <Fragment>
          <View style={chefStyles.addedSection}>
            <CustomFormInput
              label="?????????? ??????????"
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
          <ResponsiveText fontSize={2.5}>???????????? ????????</ResponsiveText>
          <TouchableOpacity onPress={() => setAddStuffModal(false)}>
            <FontAwesome5 name="times" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={chefStyles.modalBody}>
          <View>
            <CustomFormInput
              value={stuffsName}
              placeholder="?????? ????????"
              onChangeText={(name) => setStuffName(name)}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <CustomFormInput
              value={stuffCount}
              keyboardType="numeric"
              placeholder="?????????? ????????"
              onChangeText={(count) => setStuffCount(count)}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Picker
              mode="dropdown"
              placeholder="?????? ????????"
              style={[chefStyles.formInput, { height: 30 }]}
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={stuffsType}
              onValueChange={(type) => setStuffType(type)}
            >
              <Picker.Item label="??????" value="g" />
              <Picker.Item label="???????? ??????" value="kg" />
              <Picker.Item label="????" value="ton" />
              <Picker.Item label="??????" value="number" />
              <Picker.Item label="????????????" value="peymaneh" />
              <Picker.Item label="??????????" value="mesghal" />
            </Picker>
          </View>
          <View style={{ marginTop: 10 }}>
            <Button
              success
              full
              onPress={handleAddStuffs}
              style={chefStyles.roundedButton}
            >
              <ResponsiveText color="#fff">????????????</ResponsiveText>
            </Button>
          </View>
        </View>
      </Modal>
      {/* End Add Stuffs Modal */}
    </Layout>
  );
};

export default FoodDetails;
