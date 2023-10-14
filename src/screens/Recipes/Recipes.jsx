import Feather from 'react-native-vector-icons/Feather';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlatList, StyleSheet, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

import RecipeItem from '../../components/RecipeItem/RecipeItem';
import Layout from '../../components/Layout/Layout';
import InputC from '../../components/InputC/InputC';
import {getFoods} from '../../utils/services';
import {global_color} from '../../assets/styles/style';

const Recipes = ({route}) => {
  const navigation = useNavigation();

  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const data = getFoods(route.params?.subCategoryId);

    setFoods(data?.foods);
    navigation.setOptions({
      title: data?.title,
      headerLeft: () => (
        <Feather
          name="arrow-right"
          style={{marginHorizontal: 15}}
          color={global_color.WHITE}
          size={RFPercentage(3.5)}
          onPress={() => navigation.goBack()}
        />
      ),
    });

    return () => {
      setFoods([]);
    };
  }, []);

  return (
    <Layout>
      <View style={styles.addSection}>
        <View style={{flex: 1}}>
          <InputC
            value={search}
            placeholder="نام غذا"
            onChangeText={name => setSearch(name)}
          />
        </View>
      </View>

      <FlatList
        data={foods?.filter(_f => _f?.title.match(search?.toLowerCase()))}
        renderItem={({item}) => <RecipeItem data={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          alignItems: 'center',
        }}
      />
    </Layout>
  );
};

export default Recipes;

const styles = StyleSheet.create({
  addSection: {
    marginBottom: 10,
    borderBottomColor: global_color.MUTE,
    borderBottomWidth: 1,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
