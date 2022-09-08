import React from "react";

import {
  CarImage,
  CarImageWrapper,
  Container,
  ImageIndex,
  ImageIndexes,
} from "./styles";


interface Props {
    imageUrl: string[];
}
export function ImageSlider({imageUrl}: Props) {
  return (
    <Container>
      <ImageIndexes>
        <ImageIndex active={true} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
      </ImageIndexes>

      <CarImageWrapper>
        <CarImage source={{ uri: imageUrl[0] }} resizeMode="contain" />
      </CarImageWrapper>
    </Container>
  );
}
