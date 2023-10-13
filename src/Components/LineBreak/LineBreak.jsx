import {View} from 'react-native';

const LineBreak = ({height = 10, otherStyles = {}}) => {
  return <View style={[{height}, otherStyles]} />;
};

export default LineBreak;
