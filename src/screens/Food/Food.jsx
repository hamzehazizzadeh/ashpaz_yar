import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import uuid from 'react-native-uuid';
import {Fragment, useEffect, useState} from 'react';
import {isEmpty} from 'lodash';
import {Button} from 'native-base';
import {FlatList, Modal, Pressable, View} from 'react-native';

import Select from '../../components/Select/Select';
import Layout from '../../components/Layout/Layout';
import TextC from '../../components/TextC/TextC';
import AlertC from './../../components/AlertC/AlertC';
import InputC from '../../components/InputC/InputC';
import StuffsItem from '../../components/StuffsItem/StuffsItem';
import {primaryStyles} from '../../assets/styles/style';
import {share, stuffsForPersons} from '../../utils';
import {
  getLocalStorage,
  setLocalStorage,
} from './../../utils/localStorage/localStorage';
import {toastErrorMessage} from '../../utils/toastMessage/toastMessage';

const Food = ({route, navigation}) => {
  const {name, _id} = route.params;

  const stuffTypes = [
    {label: 'گرم', key: 'g'},
    {label: 'کیلو گرم', key: 'kg'},
    {label: 'تن', key: 'ton'},
    {label: 'عدد', key: 'number'},
    {label: 'پیمانه', key: 'peymaneh'},
    {label: 'مثقال', key: 'mesghal'},
  ];

  const [stuffs, setStuffs] = useState([]);
  const [stuffsName, setStuffName] = useState('');
  const [stuffCount, setStuffCount] = useState('');
  const [numberOfPersons, setNumberOfPersons] = useState('1');
  const [stuffsType, setStuffType] = useState('g');
  const [addStuffsModal, setAddStuffModal] = useState(false);

  const handleGetStuffs = async () => {
    let stuffsList = await getLocalStorage(_id);
    if (stuffsList) {
      setStuffs(stuffsList);
    }
  };

  useEffect(() => {
    handleGetStuffs();
  }, []);

  const handleResetState = () => {
    setStuffName('');
    setStuffCount('');
    setStuffType('g');
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

    setLocalStorage(_id, [...stuffs, stuff]);
    handleGetStuffs();
    setAddStuffModal(false);
    handleResetState();
  };

  const handleDeleteStuffs = id => {
    const stuffsArray = [...stuffs];
    const filterStuffs = stuffsArray.filter(stuff => stuff._id !== id);
    setLocalStorage(_id, filterStuffs);
    handleGetStuffs();
  };

  const handleEditStuffs = (id, stuffName, stuffCount, successFunc) => {
    if (stuffName.length < 2)
      return toastErrorMessage('نام مواد باید حداقل از 2 کاراکتر بیشتر باشد');

    if (!stuffCount) return toastErrorMessage('مقدار مواد نمی تواند خالی باشد');

    const stuffIndex = stuffs.findIndex(stuffs => stuffs._id === id);
    const stuff = stuffs[stuffIndex];
    stuff.name = stuffName;
    stuff.count = stuffCount;

    const allStuff = [...stuffs];

    allStuff[stuffIndex] = stuff;

    setLocalStorage(_id, allStuff);
    handleGetStuffs();

    if (successFunc) {
      successFunc();
    }
  };

  const shareFood = async () => {
    let stuffList = '';
    stuffs?.map(
      stuff =>
        (stuffList += `${stuff?.name} : ${stuffsForPersons(
          stuff?.count,
          numberOfPersons,
          stuff?.type,
        )}\n`),
    );
    let message = `نام غذا : ${name}\nبرای ${numberOfPersons} نفر\n\n${stuffList}`;

    share(name, message);
  };

  return (
    <Layout
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
            <TextC color="#fff">افزودن مواد</TextC>
          </Button>
          <Button primary full onPress={shareFood}>
            <TextC color="#fff">اشتراک گذاری</TextC>
          </Button>
        </>
      }>
      {stuffs.length === 0 || stuffs === [] || isEmpty(stuffs) ? (
        <AlertC message="مواد غذایی برای نمایش ثبت نشده است" />
      ) : (
        <Fragment>
          <View style={primaryStyles.addedSection}>
            <InputC
              label="تعداد افراد"
              value={numberOfPersons}
              keyboardType="numeric"
              onChangeText={person => setNumberOfPersons(person)}
            />
          </View>
          <FlatList
            data={stuffs}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
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
        }}>
        <View style={primaryStyles.modalHeader}>
          <TextC fontSize={2.5}>افزودن مواد</TextC>
          <Pressable onPress={() => setAddStuffModal(false)}>
            <FontAwesome5 name="times" size={20} color="black" />
          </Pressable>
        </View>
        <View style={primaryStyles.modalBody}>
          <View>
            <InputC
              value={stuffsName}
              placeholder="نام مواد"
              onChangeText={name => setStuffName(name)}
            />
          </View>
          <View style={{marginTop: 10}}>
            <InputC
              value={stuffCount}
              keyboardType="numeric"
              placeholder="مقدار مواد"
              onChangeText={count => setStuffCount(count)}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Select
              initValue={stuffTypes?.find(_p => _p?.id == stuffsType)?.label}
              placeholder="نوع مواد"
              onChange={val => setStuffType(val.key)}
              data={stuffTypes}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Button
              success
              full
              onPress={handleAddStuffs}
              style={primaryStyles.roundedButton}>
              <TextC color="#fff">افزودن</TextC>
            </Button>
          </View>
        </View>
      </Modal>
      {/* End Add Stuffs Modal */}
    </Layout>
  );
};

export default Food;
