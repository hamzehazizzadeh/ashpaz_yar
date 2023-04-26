import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import TextC from './../TextC/TextC';
import AlertC from './../AlertC/AlertC';
import InputC from './../InputC/InputC';
import ButtonC from './../ButtonC/ButtonC';
import Card from '../Card/Card';

const FoodItem = ({food, handleDelete, handleEditFood}) => {
  const navigation = useNavigation();

  const [foodName, setFoodName] = useState('');
  const [isEdited, setIsEdited] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  return (
    <Card style={{marginBottom: 5}}>
      <View style={styles.item}>
        <View style={{flex: 1}}>
          <TextC align="left" bold>
            {food.name}
          </TextC>
        </View>
        <View style={styles.row}>
          <FontAwesome
            onPress={() => {
              setIsEdited(!isEdited);
              setFoodName(food?.name);
            }}
            name="edit"
            size={RFPercentage(3)}
            color="blue"
          />
          <FontAwesome
            onPress={() => setIsDeleted(!isDeleted)}
            name="trash"
            style={{marginLeft: 15}}
            size={RFPercentage(3)}
            color="red"
          />
          <ButtonC
            otherStyles={{marginLeft: 15}}
            size="sm"
            onPress={() => navigation.navigate('Food', food)}>
            جزئیات
          </ButtonC>
        </View>
      </View>
      {/* Edit Section */}
      {isEdited && (
        <View style={styles.mt}>
          <View>
            <InputC
              value={foodName}
              placeholder="نام غذا"
              onChangeText={name => setFoodName(name)}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <View style={styles.confirmButton}>
              <ButtonC
                variant="primary"
                onPress={() =>
                  handleEditFood(food._id, foodName, () => {
                    setIsEdited(false);
                  })
                }>
                ویرایش
              </ButtonC>
            </View>
            <View style={styles.cancelButton}>
              <ButtonC variant="danger" onPress={() => setIsEdited(false)}>
                انصراف
              </ButtonC>
            </View>
          </View>
        </View>
      )}
      {/* Delete Section */}
      {isDeleted && (
        <View style={styles.mt}>
          <View>
            <AlertC
              backgroundColor="info"
              message={`آیا از حذف ${food?.name} مطمئنید؟`}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <View style={styles.confirmButton}>
              <ButtonC variant="danger" onPress={() => handleDelete(food._id)}>
                بله حذف
              </ButtonC>
            </View>
            <View style={styles.cancelButton}>
              <ButtonC variant="primary" onPress={() => setIsDeleted(false)}>
                خیر
              </ButtonC>
            </View>
          </View>
        </View>
      )}
    </Card>
  );
};

export default FoodItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mt: {
    marginTop: 15,
  },
  confirmButton: {flex: 3},
  cancelButton: {flex: 1, marginLeft: 10},
});
