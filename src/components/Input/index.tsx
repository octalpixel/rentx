import React from "react";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { Container, IconView, InputText } from "./styles";
import { TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
}

export function Input({ iconName, ...rest }: InputProps) {
  const theme = useTheme();

  return (
    <Container >
      <IconView>
        <Feather name={iconName} size={24} color={theme.colors.text_detail} />
      </IconView>
      <InputText {...rest} />
    </Container>
  );
}
