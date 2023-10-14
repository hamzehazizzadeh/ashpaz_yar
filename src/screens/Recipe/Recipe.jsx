import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, View, ScrollView} from 'react-native';

import Layout from '../../components/Layout/Layout';
import LineBreak from './../../components/LineBreak/LineBreak';
import TextC from '../../components/TextC/TextC';
import Card from '../../components/Card/Card';
import {getFood} from '../../utils/services';
import {isEmpty} from 'lodash';

const Recipe = ({route}) => {
  const navigation = useNavigation();

  const [food, setFood] = useState({});

  useEffect(() => {
    const data = getFood(route.params?.id);
    setFood(data);
    navigation.setOptions({title: data?.title});
    return () => {
      setFood([]);
    };
  }, []);

  if (isEmpty(food)) return null;
  else
    return (
      <Layout>
        <ScrollView>
          <Image
            source={food.banner}
            style={{width: '100%', height: 300, borderRadius: 8}}
          />
          <LineBreak />
          <TextC bold align="center" size={2.2}>
            {food?.title}
          </TextC>
          <LineBreak />
          <Card
            contentStyle={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <TextC>
                دسته بندی: <TextC bold>{food?.category}</TextC>
              </TextC>
            </View>
            {food?.city && (
              <View>
                <TextC>
                  ملیت غذا: <TextC bold>{food?.city}</TextC>
                </TextC>
              </View>
            )}
          </Card>
          <LineBreak />
          <Card>
            <TextC align="justify">{food.content}</TextC>
          </Card>
          <LineBreak />
        </ScrollView>
      </Layout>
    );
};

export default Recipe;
