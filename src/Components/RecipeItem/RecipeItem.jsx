import {Image, View, Pressable, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Card from '../Card/Card';
import TextC from '../TextC/TextC';

const RecipeItem = ({data}) => {
  const navigation = useNavigation();

  const bannerSize = 100;
  const width = Dimensions.get('window').width - 40;
  return (
    <Pressable onPress={() => navigation.navigate('Recipe', {id: data.id})}>
      <Card style={{margin: 5}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width,
          }}>
          <View>
            <Image
              source={data.banner}
              style={{
                width: bannerSize,
                height: bannerSize,
                borderRadius: 8,
              }}
            />
          </View>
          <View style={{marginStart: 10, justifyContent: 'space-between'}}>
            <TextC bold>{data.title}</TextC>
            <TextC color="mute">{data.category}</TextC>
            <TextC color="gray">{data.city}</TextC>
          </View>
        </View>
      </Card>
    </Pressable>
  );
};

export default RecipeItem;
