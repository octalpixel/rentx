import React from "react";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { InputPassword } from "../../components/InputPassword";

import { ButtonsContainer, Container, Form, Header, SubTitle, Title } from "./styles";

export function SignIn() {
  const theme = useTheme();
  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <Title>Estamos{"\n"}quase lá</Title>
        <SubTitle>
          Faça seu login para começar{"\n"}
          uma experiência incrível.
        </SubTitle>
      </Header>
      <Form>
      <Input iconName="mail" placeholder="E-mail" keyboardType="email-address" autoCorrect={false} autoCapitalize='none'/>
      
      <InputPassword iconName="lock" placeholder="Senha" autoCorrect={false} autoCapitalize='none'/>


      </Form>

      <ButtonsContainer>
        <Button
          title="Login"
          onPress={() => {}}
          enabled={false}
          loading={false}
        />
        <Button
          title="Criar conta gratuita"
          onPress={() => {}}
          color={theme.colors.background_secondary}
          enabled={false}
          loading={false}
          light
        />
      </ButtonsContainer>
    </Container>
  );
}
