import React from "react";


import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";

import {
  About,
  Accessories,
  Brand,
  CarImages,
  Container,
  Content,
  Description,
  Details,
  Footer,
  Header,
  Name,
  Period,
  Price,
  Rent,
} from "./styles";
import { Button } from "../../components/Button";
import { useRootStackParamList } from "../../hooks/useRootStackParamList";
import { useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessories";

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const navigation = useRootStackParamList();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleScheduling() {
    navigation.navigate("Scheduling", {car});
  }

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>
      <CarImages>
        <ImageSlider
          imageUrl={car.photos}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>{`R$${car.rent.price}`}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <About>
         {car.about}
        </About>
      </Content>
      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleScheduling}
        />
      </Footer>
    </Container>
  );
}
