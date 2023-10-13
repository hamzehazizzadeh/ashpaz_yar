import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native';

import CategoryItem from '../../components/CategoryItem/CategoryItem';
import Layout from '../../components/Layout/Layout';
import {getCategories, getSubCategories} from '../../utils/services';

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
        navigation.setOptions({title: category.title});
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
