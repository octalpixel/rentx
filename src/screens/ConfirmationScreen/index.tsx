import React from "react";
import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

import {
  Container,
  Content,
  Footer,
  LogoWrapper,
  Message,
  Title,
} from "./styles";
import { StatusBar, useWindowDimensions } from "react-native";
import { ConfirmButton } from "../../components/ConfirmButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useRootStackParamList } from "../../hooks/useRootStackParamList";

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}

export function ConfirmationScreen() {
  const { width } = useWindowDimensions();
  const navigation = useRootStackParamList();
  const route = useRoute();

  const { message, nextScreenRoute, title } = route.params as Params;

  function handleSchedulingComplete() {
    navigation.navigate(nextScreenRoute);
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoWrapper>
        <LogoSvg width={width} />
      </LogoWrapper>

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Message>{message}</Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleSchedulingComplete} />
      </Footer>
    </Container>
  );
}
