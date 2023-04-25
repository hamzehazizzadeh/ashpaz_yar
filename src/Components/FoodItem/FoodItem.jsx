import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react';
import {Button, Card, CardItem, View} from 'native-base';
import {Pressable} from 'react-native';

import TextC from '../TextC/TextC';
import AlertC from '../AlertC/AlertC';
import InputC from './../InputC/InputC';
import {primaryStyles} from '../../assets/styles/style';

const FoodItem = ({food, handleDelete, handleEditFood, navigation}) => {
  const [isEdited, setIsEdited] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [foodName, setFoodName] = useState('');

  return (
    <Card>
      <CardItem style={primaryStyles.foodItem}>
        <Pressable
          onPress={() => navigation.navigate('Food', food)}
          style={{width: '80%'}}>
          <TextC>{food.name}</TextC>
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Pressable
            onPress={() => {
              setIsEdited(!isEdited);
              setFoodName(food?.name);
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
      {isEdited && (
        <CardItem>
          <View style={{width: '100%'}}>
            <View>
              <InputC
                value={foodName}
                placeholder="نام غذا"
                onChangeText={name => setFoodName(name)}
              />
            </View>
            <View style={primaryStyles.multiButton}>
              <View style={{width: '65%'}}>
                <Button
                  primary
                  full
                  onPress={() =>
                    handleEditFood(food._id, foodName, () => {
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
                message={`آیا از حذف ${food?.name} مطمئنید؟`}
              />
            </View>
            <View style={primaryStyles.multiButton}>
              <View style={{width: '65%'}}>
                <Button
                  danger
                  full
                  onPress={() => handleDelete(food._id)}
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

export default FoodItem;
