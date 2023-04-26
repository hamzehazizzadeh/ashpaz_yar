import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {isEmpty} from 'lodash';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {View, StyleSheet, ScrollView} from 'react-native';

import Select from '../../components/Select/Select';
import Layout from '../../components/Layout/Layout';
import AlertC from './../../components/AlertC/AlertC';
import InputC from '../../components/InputC/InputC';
import StuffsItem from '../../components/StuffsItem/StuffsItem';
import ButtonC from './../../components/ButtonC/ButtonC';
import Card from '../../components/Card/Card';
import TextC from '../../components/TextC/TextC';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';
import {global_color} from '../../assets/styles/style';
import {share, stuffTypes, stuffsForPersons} from '../../utils';
import {
  getLocalStorage,
  setLocalStorage,
} from './../../utils/localStorage/localStorage';
import {toastErrorMessage} from '../../utils/toastMessage/toastMessage';

const Food = ({route}) => {
  const navigation = useNavigation();

  const {name, _id} = route.params;

  const [stuffs, setStuffs] = useState([]);
  const [stuffName, setStuffName] = useState('');
  const [stuffCount, setStuffCount] = useState('');
  const [stuffType, setStuffType] = useState('g');
  const [numberOfPersons, setNumberOfPersons] = useState('1');

  const handleGetStuffs = async () => {
    let stuffsList = await getLocalStorage(_id);
    if (stuffsList) {
      setStuffs(stuffsList);
    }
  };

  useEffect(() => {
    handleGetStuffs();
    navigation.setOptions({
      title: name,
      headerLeft: () => (
        <Feather
          name="arrow-right"
          style={{marginHorizontal: 15}}
          color={global_color.WHITE}
          size={RFPercentage(3.5)}
          onPress={() => navigation.goBack()}
        />
      ),
      headerRight: () => (
        <FontAwesome5
          name="share-alt"
          style={{marginHorizontal: 15}}
          color={global_color.WHITE}
          size={RFPercentage(3)}
          onPress={shareFood}
        />
      ),
    });
  }, []);

  // Handle Reset State Method
  const handleResetState = () => {
    setStuffName('');
    setStuffCount('');
    setStuffType('g');
  };

  // Handle Add Stuffs Method
  const handleAddStuffs = () => {
    if (stuffName.length < 2)
      return toastErrorMessage('نام مواد باید حداقل از 2 کاراکتر بیشتر باشد');
    if (!stuffCount) return toastErrorMessage('مقدار مواد نمی تواند خالی باشد');
    if (!stuffType) return toastErrorMessage('نوع مواد نمی تواند خالی باشد');

    const stuff = {
      _id: uuid.v4(),
      name: stuffName,
      count: stuffCount,
      type: stuffType,
    };

    setLocalStorage(_id, [...stuffs, stuff]);
    handleGetStuffs();
    handleResetState();
  };

  // Handle Delete Stuffs Method
  const handleDeleteStuffs = id => {
    const stuffsArray = [...stuffs];
    const filterStuffs = stuffsArray.filter(stuff => stuff._id !== id);
    setLocalStorage(_id, filterStuffs);
    handleGetStuffs();
  };

  // Handle Edit Stuffs Method
  const handleEditStuffs = (_stuff, successFunc) => {
    if (_stuff.name.length < 2)
      return toastErrorMessage('نام مواد باید حداقل از 2 کاراکتر بیشتر باشد');
    if (!_stuff.count)
      return toastErrorMessage('مقدار مواد نمی تواند خالی باشد');
    if (!_stuff.type) return toastErrorMessage('نوع مواد نمی تواند خالی باشد');

    const stuffIndex = stuffs.findIndex(stuffs => stuffs._id === _stuff.id);
    const stuff = stuffs[stuffIndex];
    stuff.name = _stuff.name;
    stuff.count = _stuff.count;
    stuff.type = _stuff.type;

    const allStuff = [...stuffs];

    allStuff[stuffIndex] = stuff;

    setLocalStorage(_id, allStuff);
    handleGetStuffs();

    if (successFunc) {
      successFunc();
    }
  };

  // Share Food Method
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
    <Layout>
      <ScrollView>
        <Card style={styles.mb}>
          <TextC bold align="center" size={2} style={styles.titleMb}>
            افزودن مواد لازم برای هر فرد
          </TextC>
          <InputC
            value={stuffName}
            label="نام"
            placeholder="برای مثال: گوشت"
            onChangeText={name => setStuffName(name)}
          />
          <View style={styles.row}>
            <View style={styles.itemRight}>
              <InputC
                value={stuffCount}
                keyboardType="numeric"
                label="مقدار"
                placeholder="برای مثال: 2"
                onChangeText={count => setStuffCount(count)}
              />
            </View>
            <View style={styles.itemLeft}>
              <Select
                label="نوع مقدار"
                initValue={
                  stuffTypes?.find(_p => _p?.key == stuffType)?.label ??
                  'برای مثال: گرم'
                }
                onChange={val => setStuffType(val.key)}
                data={stuffTypes}
              />
            </View>
          </View>
          <View
            style={[
              styles.row,
              {justifyContent: 'flex-end', marginTop: 5, marginBottom: 0},
            ]}>
            <View>
              <ButtonC
                variant="success"
                onPress={handleAddStuffs}
                otherStyles={styles.roundedButton}>
                افزودن
              </ButtonC>
            </View>
          </View>
        </Card>
        {isEmpty(stuffs) ? (
          <AlertC message="مواد غذایی برای نمایش ثبت نشده است" />
        ) : (
          <>
            <Card style={styles.mb}>
              <TextC bold align="center" size={2} style={styles.titleMb}>
                تعداد افراد
              </TextC>
              <InputC
                value={numberOfPersons}
                keyboardType="numeric"
                onChangeText={val => setNumberOfPersons(val ? val : '1')}
              />
            </Card>
            <HorizontalRule
              style={{marginBottom: 10}}
              color={global_color.MUTE}
            />
            {stuffs.map(_item => (
              <StuffsItem
                key={_item._id}
                numberOfPersons={numberOfPersons}
                navigation={navigation}
                stuff={_item}
                handleDelete={handleDeleteStuffs}
                handleEditStuffs={handleEditStuffs}
              />
            ))}
          </>
        )}
      </ScrollView>
    </Layout>
  );
};

export default Food;

const styles = StyleSheet.create({
  titleMb: {
    marginBottom: 1,
  },
  mb: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  itemRight: {flex: 1, marginRight: 10},
  itemLeft: {flex: 1, marginLeft: 10},
});
