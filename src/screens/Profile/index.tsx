import { Feather } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";

import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import {
  GestureHandlerRootView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { InputPassword } from "../../components/InputPassword";
import { useAuth } from "../../hooks/useAuth/auth";
import { useRootStackParamList } from "../../hooks/useRootStackParamList";
import {
  Container,
  Content,
  Header,
  HeaderTitle,
  HeaderTop,
  LogoutButton,
  Option,
  Options,
  OptionTitle,
  Photo,
  PhotoButton,
  PhotoContainer,
  Section,
} from "./styles";
import * as Yup from "yup";
import { useNetInfo } from "@react-native-community/netinfo";

export function Profile() {
  const netInfo = useNetInfo();

  const { user, signOut, updateUser } = useAuth();
  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  const theme = useTheme();
  const navigation = useRootStackParamList();

  function handleGoBack() {
    navigation.goBack();
  }
  function handleSignOut() {
    Alert.alert(
      "Tem certeza?",
      "Lembre-se de que se você sair, irá precisar de internet para conectar-se novamente.",
      [
        { text: "Cancelar", onPress: () => {}, style: "cancel" },
        {
          text: "Sair",
          onPress: () => {
            signOut();
          },
          style: "default",
        },
      ]
    );
  }
  function handleOptionChange(optionSelected: "dataEdit" | "passwordEdit") {
    if(netInfo.isConnected === false && optionSelected === 'passwordEdit'){
      Alert.alert('Você esta Offline','Para mudar a senha, conecte-se a internet.')
    }
    
    setOption(optionSelected);
  }

  async function handleSelectAvatar() {
    const result = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })) as ImagePicker.ImageInfo;

    if (result.cancelled) {
      return;
    }
    if (result.uri) {
      setAvatar(result.uri);
    }
  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required("CNH é obrigatória"),
        name: Yup.string().required("Nome é obrigatório"),
      });
      const data = { name, driverLicense };
      await schema.validate(data);
      await updateUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license: driverLicense,
        avatar,
        token: user.token,
      });
      Alert.alert("Perfil atualizado");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Opa", error.message);
      } else {
        Alert.alert("Não foi possível atualizar o perfil", error.message);
      }
    }
  }

  return (
    <GestureHandlerRootView >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" enabled>
          <ScrollView>
            <Container>
              <Header>
                <HeaderTop>
                  <BackButton
                    color={theme.colors.shape}
                    onPress={handleGoBack}
                  />
                  <HeaderTitle>Editar Perfil</HeaderTitle>
                  <LogoutButton onPress={handleSignOut}>
                    <Feather
                      name="power"
                      size={24}
                      color={theme.colors.shape}
                    />
                  </LogoutButton>
                </HeaderTop>

                <PhotoContainer>
                  {!!avatar && <Photo source={{ uri: avatar }} />}
                  <PhotoButton onPress={handleSelectAvatar}>
                    <Feather
                      name="camera"
                      size={24}
                      color={theme.colors.shape}
                    />
                  </PhotoButton>
                </PhotoContainer>
              </Header>

              <Content style={{ marginBottom: useBottomTabBarHeight() }}>
                <Options>
                  <Option
                    active={option === "dataEdit"}
                    onPress={() => handleOptionChange("dataEdit")}
                  >
                    <OptionTitle active={option === "dataEdit"}>
                      Dados
                    </OptionTitle>
                  </Option>
                  <Option
                    active={option === "passwordEdit"}
                    onPress={() => handleOptionChange("passwordEdit")}
                  >
                    <OptionTitle active={option === "passwordEdit"}>
                      Trocar Senha
                    </OptionTitle>
                  </Option>
                </Options>
                {option === "dataEdit" ? (
                  <Section>
                    <Input
                      iconName="user"
                      placeholder="Nome"
                      autoCorrect={false}
                      defaultValue={user.name}
                      onChangeText={setName}
                    />
                    <Input
                      iconName="mail"
                      editable={false}
                      defaultValue={user.email}
                    />
                    <Input
                      iconName="credit-card"
                      placeholder="CNH"
                      keyboardType="numeric"
                      defaultValue={user.driver_license}
                      onChangeText={setDriverLicense}
                    />
                  </Section>
                ) : (
                  <Section>
                    <InputPassword iconName="lock" placeholder="Senha Atual" />
                    <InputPassword iconName="lock" placeholder="Nova Senha" />
                    <InputPassword
                      iconName="lock"
                      placeholder="Repetir Senha"
                    />
                  </Section>
                )}
                <Button
                  title="Salvar Alterações"
                  onPress={handleProfileUpdate}
                />
              </Content>
            </Container>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </GestureHandlerRootView>
  );
}
