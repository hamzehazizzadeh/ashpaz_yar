import Feather from 'react-native-vector-icons/Feather';
import {FlatList} from 'react-native';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RFPercentage} from 'react-native-responsive-fontsize';

import CategoryItem from '../../components/CategoryItem/CategoryItem';
import Layout from '../../components/Layout/Layout';
import {getCategories, getSubCategories} from '../../utils/services';
import {global_color} from '../../assets/styles/style';

const Categories = ({route}) => {
  const navigation = useNavigation();

  const [categories, setCategories] = useState([]);

  const isSub = route.name === 'SubCategories';

  useEffect(() => {
    let data = [];
    switch (route.name) {
      case 'Categories':
        data = getCategories();
        break;
      case 'SubCategories':
        const category = getSubCategories(route.params?.categoryId);
        data = category.subCategories;
        navigation.setOptions({
          title: category?.title,
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
        break;

      default:
        break;
    }

    setCategories(data);

    return () => {
      setCategories([]);
    };
  }, []);

  return (
    <Layout>
      <FlatList
        key="#"
        data={categories}
        renderItem={({item}) => <CategoryItem isSub={isSub} data={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{
          alignItems: 'center',
        }}
      />
    </Layout>
  );
};

export default Categories;
