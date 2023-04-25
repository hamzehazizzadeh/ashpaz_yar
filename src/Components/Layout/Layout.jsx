import Entypo from 'react-native-vector-icons/Entypo';
import {
  Body,
  Container,
  Footer,
  FooterTab,
  Header,
  Left,
  Right,
  Title,
  View,
} from 'native-base';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Layout = ({title, right, children, footer}) => {
  const navigation = useNavigation();

  return (
    <Container>
      <Header>
        <Left style={{marginLeft: 15}}>
          <Entypo
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.openDrawer()}
          />
        </Left>
        <Body>
          <Title>{title}</Title>
        </Body>
        <Right style={{marginRight: 15}}>{right}</Right>
      </Header>
      <View style={styles.body}>{children}</View>
      {footer && (
        <Footer>
          <FooterTab>{footer}</FooterTab>
        </Footer>
      )}
    </Container>
  );
};

export default Layout;

const styles = StyleSheet.create({
  body: {flex: 1, padding: 20, backgroundColor: '#eee'},
});
