import React, { useState } from "react";
import * as Yup from "yup";
import { Alert, Keyboard, KeyboardAvoidingView } from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
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

export function SignUpFirstStep() {
  const navigation = useRootStackParamList();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [driversLicense, setDriversLicense] = useState("");

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driversLicense: Yup.string().required("CNH é obrigatória"),
        email: Yup.string()
          .email("Email inválido")
          .required("E-mail é obrigatório"),
        name: Yup.string().required("Nome é obrigatório"),
      });
      const data = { name, email, driversLicense };
      await schema.validate(data);

      navigation.navigate("SignUpSecondStep", { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Opa", error.message);
      } else {
        Alert.alert(
          "handleNextStep error",
          "Ocorreu um erro ao fazer login, verifique as credenciais",
          error.message
        );
      }
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
                <Bullet active />
                <Bullet active={false} />
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
              <FormTitle>1. Dados</FormTitle>
              <Input
                iconName="user"
                placeholder="Nome"
                onChangeText={setName}
                value={name}
              />
              <Input
                iconName="mail"
                placeholder="E-mail"
                keyboardType="email-address"
                onChangeText={setEmail}
                value={name}
              />
              <Input
                iconName="credit-card"
                placeholder="CNH"
                keyboardType="numeric"
                onChangeText={setDriversLicense}
                value={driversLicense}
              />
            </Form>

            <Button title="Próximo" onPress={handleNextStep} />
          </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
        </ScrollView>
  );
}
