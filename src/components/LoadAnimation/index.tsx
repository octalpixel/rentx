import React from "react";
import AnimatedLottieView from "lottie-react-native";
import { Container } from "./styles";
import loadingCar from "../../assets/loadingCar_animation.json";

export function LoadAnimation() {
  return (
    <Container>
      <AnimatedLottieView
        source={loadingCar}
        autoPlay
        style={{ height: 200 }}
        resizeMode="contain"
        loop
      />
    </Container>
  );
}
