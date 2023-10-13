import {Image, Dimensions, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Card from '../Card/Card';
import LineBreak from '../LineBreak/LineBreak';
import TextC from '../TextC/TextC';

const CategoryItem = ({data, isSub = false}) => {
  const navigation = useNavigation();

  const bannerSize = Dimensions.get('window').width / 2 - 40;

  return (
    <Pressable
      onPress={() =>
        isSub
          ? navigation.navigate('Recipes', {subCategoryId: data.id})
          : navigation.navigate('SubCategories', {categoryId: data.id})
      }>
      <Card style={{margin: 5}}>
        <Image
          source={data.banner}
          style={{
            width: bannerSize,
            height: bannerSize,
            borderRadius: 8,
          }}
        />
        <LineBreak />
        <TextC bold align="center">
          {data.title}
        </TextC>
      </Card>
    </Pressable>
  );
};

export default CategoryItem;
