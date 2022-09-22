import React, { useState } from "react";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { Container, IconView, InputText } from "./styles";
import { TextInputProps } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
}

export function InputPassword({ iconName, ...rest }: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const theme = useTheme();

  function handlePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
    console.log(isPasswordVisible);
  }

  return (
    <Container>
      <IconView>
        <Feather name={iconName} size={24} color={theme.colors.text_detail} />
      </IconView>
      <InputText secureTextEntry={isPasswordVisible} {...rest} />
      <IconView>
        <BorderlessButton onPress={handlePasswordVisibility}>
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text_detail}
          />
        </BorderlessButton>
      </IconView>
    </Container>
  );
}
