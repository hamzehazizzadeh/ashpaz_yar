import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

import TextC from '../TextC/TextC';
import AlertC from '../AlertC/AlertC';
import InputC from './../InputC/InputC';
import Select from '../Select/Select';
import ButtonC from './../ButtonC/ButtonC';
import Card from './../Card/Card';
import {stuffsForPersons, numberSeparate, stuffTypes} from '../../utils';

const StuffsItem = ({
  stuff,
  handleDelete,
  handleEditStuffs,
  numberOfPersons,
}) => {
  const [isEdited, setIsEdited] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [stuffName, setStuffName] = useState('');
  const [stuffCount, setStuffCount] = useState('');
  const [stuffType, setStuffType] = useState('');

  return (
    <Card style={{marginBottom: 5}}>
      <View style={styles.item}>
        <View style={{flex: 1}}>
          <TextC align="left" bold>
            {stuff.name}
          </TextC>
        </View>
        <View style={styles.row}>
          <FontAwesome
            onPress={() => {
              setIsEdited(!isEdited);
              setStuffName(stuff?.name);
              setStuffCount(stuff?.count);
              setStuffType(stuff?.type);
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
        </View>
      </View>
      <View style={styles.mt}>
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
      {/* Edit Section */}
      {isEdited && (
        <View style={styles.mt}>
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
          <View style={[styles.buttonsContainer]}>
            <View style={styles.confirmButton}>
              <ButtonC
                variant="primary"
                onPress={() =>
                  handleEditStuffs(
                    {
                      id: stuff._id,
                      name: stuffName,
                      count: stuffCount,
                      type: stuffType,
                    },
                    () => {
                      setIsEdited(false);
                    },
                  )
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
              message={`آیا از حذف ${stuff?.name} مطمئنید؟`}
            />
          </View>
          <View style={[styles.buttonsContainer]}>
            <View style={styles.confirmButton}>
              <ButtonC variant="danger" onPress={() => handleDelete(stuff._id)}>
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

export default StuffsItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemRight: {flex: 1, marginRight: 10},
  itemLeft: {flex: 1, marginLeft: 10},
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
