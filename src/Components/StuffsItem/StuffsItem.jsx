import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react';
import {Button, Card, CardItem, View} from 'native-base';
import {Pressable} from 'react-native';

import TextC from '../TextC/TextC';
import AlertC from '../AlertC/AlertC';
import InputC from './../InputC/InputC';
import {primaryStyles} from '../../assets/styles/style';
import {stuffsForPersons, numberSeparate} from '../../utils';

const StuffsItem = ({
  stuff,
  handleDelete,
  handleEditStuffs,
  numberOfPersons,
}) => {
  const [isEdited, setIsEdited] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [stuffsName, setStuffsName] = useState('');
  const [stuffCount, setStuffCount] = useState('');

  return (
    <Card>
      <CardItem style={primaryStyles.foodItem}>
        <View style={{width: '80%'}}>
          <TextC>{stuff.name}</TextC>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Pressable
            onPress={() => {
              setIsEdited(!isEdited);
              setStuffsName(stuff?.name);
              setStuffCount(stuff?.count);
            }}>
            <FontAwesome name="edit" size={30} color="blue" />
          </Pressable>
          <Pressable
            style={{marginLeft: 10}}
            onPress={() => setIsDeleted(!isDeleted)}>
            <FontAwesome name="trash" size={30} color="red" />
          </Pressable>
        </View>
      </CardItem>
      <CardItem>
        <View style={{width: '100%'}}>
          <AlertC
            fontSize={1.6}
            message={`به ازای ${numberSeparate(
              numberOfPersons,
            )} نفر ${stuffsForPersons(
              stuff?.count,
              numberOfPersons,
              stuff?.type,
            )}`}
          />
        </View>
      </CardItem>
      {isEdited && (
        <CardItem>
          <View style={{width: '100%'}}>
            <View>
              <InputC
                value={stuffsName}
                placeholder="نام مواد"
                onChangeText={name => setStuffsName(name)}
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
            <View style={primaryStyles.multiButton}>
              <View style={{width: '65%'}}>
                <Button
                  primary
                  full
                  onPress={() =>
                    handleEditStuffs(stuff._id, stuffsName, stuffCount, () => {
                      setIsEdited(false);
                    })
                  }
                  style={primaryStyles.roundedButton}>
                  <TextC color="#fff">ویرایش</TextC>
                </Button>
              </View>
              <View style={{width: '30%'}}>
                <Button
                  danger
                  full
                  onPress={() => setIsEdited(false)}
                  style={primaryStyles.roundedButton}>
                  <TextC color="#fff">انصراف</TextC>
                </Button>
              </View>
            </View>
          </View>
        </CardItem>
      )}
      {isDeleted && (
        <CardItem>
          <View style={{width: '100%'}}>
            <View>
              <AlertC
                backgroundColor="#0dcaf0"
                message={`آیا از حذف ${stuff?.name} مطمئنید؟`}
              />
            </View>
            <View style={primaryStyles.multiButton}>
              <View style={{width: '65%'}}>
                <Button
                  danger
                  full
                  onPress={() => handleDelete(stuff._id)}
                  style={primaryStyles.roundedButton}>
                  <TextC color="#fff">بله حذف</TextC>
                </Button>
              </View>
              <View style={{width: '30%'}}>
                <Button
                  primary
                  full
                  onPress={() => setIsDeleted(false)}
                  style={primaryStyles.roundedButton}>
                  <TextC color="#fff">خیر</TextC>
                </Button>
              </View>
            </View>
          </View>
        </CardItem>
      )}
    </Card>
  );
};

export default StuffsItem;
