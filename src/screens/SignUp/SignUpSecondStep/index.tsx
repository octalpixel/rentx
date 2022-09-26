import { useRoute } from "@react-navigation/native";
import * as Yup from "yup";
import React, { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView } from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { InputPassword } from "../../../components/InputPassword";
import { useRootStackParamList } from "../../../hooks/useRootStackParamList";

import {
  Container,
  Form,
  FormTitle,
  Header,
  Steps,
  SubTitle,
  Title,
} from "./styles";
import api from "../../../services/api";

interface Params {
  user: {
    name: string;
    email: string;
    driversLicense: string;
  };
}

export function SignUpSecondStep() {
  const theme = useTheme();
  const navigation = useRootStackParamList();
  const route = useRoute();
  const { user } = route.params as Params;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    // if(!password || !confirmPassword){
    //   return Alert.alert("Informe a senha e a confirmação");
    // }
    // if(password != confirmPassword){
    //   return Alert.alert("As senhas não são iguais");
    // }

    try {
      const schema = Yup.object().shape({
        confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Senhas não conferem")
        .required("Confirmação de senha obrigatória"),
        password: Yup.string().required("Senha obrigatória"),
      });
      await schema.validate({ password, confirmPassword });
      await api
      .post("/users", {
        name: user.name,
        email: user.email,
        driver_license: user.driversLicense,
        password,
      })
      .then(() => {
        navigation.navigate("ConfirmationScreen", {
          nextScreenRoute: "SignIn",
          title: "Conta Criada!",
          message: "Agora é só fazer login\ne aproveitar!",
        });
      })
      .catch((error) => {
          Alert.alert("Ops", "Não foi possível cadastrar");
        console.log(error)
        });
    } catch (error) {
      Alert.alert("Epaaa", error.message);
    }
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container>
            <Header>
              <BackButton onPress={handleGoBack} />

              <Steps>
                <Bullet active={false} />
                <Bullet active />
              </Steps>
            </Header>

            <Title>
              Crie sua{"\n"}
              conta
            </Title>
            <SubTitle>
              Faça seu cadastro de{"\n"}
              forma rápida e fácil.
            </SubTitle>
            <Form>
              <FormTitle>2. Senha</FormTitle>
              <InputPassword
                placeholder="Senha"
                iconName="lock"
                onChangeText={setPassword}
                value={password}
              />
              <InputPassword
                placeholder="repetir Senha"
                iconName="lock"
                onChangeText={setConfirmPassword}
                value={confirmPassword}
              />
            </Form>

            <Button
              title="Cadastrar"
              color={theme.colors.success}
              onPress={handleRegister}
            />
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
