import React from "react";
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
} from "native-base";
import { Entypo } from "@expo/vector-icons";

import { chefStyles } from "../../assets/style/style";

const Layout = ({ title, right, children, footer, navigation }) => {
  return (
    <Container>
      <Header>
        <Left style={{ marginLeft: 15 }}>
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
        <Right style={{ marginRight: 15 }}>{right}</Right>
      </Header>
      <View style={chefStyles.layoutBody}>{children}</View>
      {footer ? (
        <Footer>
          <FooterTab>{footer}</FooterTab>
        </Footer>
      ) : null}
    </Container>
  );
};

export default Layout;
