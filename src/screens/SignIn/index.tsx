import React, { useEffect, useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, StatusBar } from "react-native";
import * as Yup from "yup";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { InputPassword } from "../../components/InputPassword";

import {
  ButtonsContainer,
  Container,
  Form,
  Header,
  SubTitle,
  Title,
} from "./styles";
import { useRootStackParamList } from "../../hooks/useRootStackParamList";
import { useAuth } from "../../hooks/useAuth/auth";
import { database } from "../../databases";

export function SignIn() {
  const theme = useTheme();
  const navigation = useRootStackParamList();
  const { signIn, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


useEffect(()=> {
  async function loadData(){
    const userCollection = database.get('users');
    const users = await userCollection.query().fetch();
    console.log(users)
  }
  loadData()
},[])


  async function handleSignIn() {
    
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
        .required("E-mail obrigatório")
        .email("Digite um e-mail válido"),
        password: Yup.string().required("Password obrigatório"),
      });
      
      await schema.validate({ email, password });
      
      signIn({ email, password });
      
    } catch (error) {
      
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Opa", error.message);
      } else {
        Alert.alert(
          "handleSignIn error",
          "Ocorreu um erro ao fazer login, verifique as credenciais"
        );
      }
    }
  }

  function handleCreateNewAccount() {
    navigation.navigate("SignUpFirstStep");
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              <Input
                iconName="mail"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={setEmail}
                value={email}
              />

              <InputPassword
                iconName="lock"
                placeholder="Senha"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={setPassword}
                value={password}
              />
            </Form>

            <ButtonsContainer>
              <Button
                title="Login"
                onPress={handleSignIn}
                enabled={true}
                loading={false}
              />
              <Button
                title="Criar conta gratuita"
                onPress={handleCreateNewAccount}
                color={theme.colors.background_secondary}
                enabled={true}
                loading={false}
                light
              />
            </ButtonsContainer>
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
