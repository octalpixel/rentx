import React, { useState } from "react";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { Container, IconView, InputText } from "./styles";
import { TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function Input({ iconName, value, ...rest }: InputProps) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  
  function handleInputFocus(){
    setIsFocused(true);
  };

  function handleInputBlur(){
    setIsFocused(false);
    setIsFilled(!!value)
  };

  return (
    
    <Container >
      <IconView isFocused={isFocused}>
        <Feather name={iconName} size={24} color={isFocused || isFilled ? theme.colors.main : theme.colors.text_detail} />
      </IconView>
      <InputText isFocused={isFocused}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      {...rest} />
    </Container>
  );
}
