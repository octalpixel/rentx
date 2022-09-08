import React from "react";

import SpeedSvg from "../../assets/speed.svg";
import AccelerationSvg from "../../assets/acceleration.svg";
import ForceSvg from "../../assets/force.svg";
import GasolineSvg from "../../assets/gasoline.svg";
import ExchangeSvg from "../../assets/exchange.svg";
import PeopleSvg from "../../assets/people.svg";

import { Feather } from "@expo/vector-icons";

import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";

import {
  
  Accessories,
  Brand,
  CalendarIcon,
  CarImages,
  Container,
  Content,
  DateInfo,
  DateTitle,
  DateValue,
  Description,
  Details,
  Footer,
  Header,
  Name,
  Period,
  Price,
  Rent,
  RentalPeriod,
  RentalPrice,
  RentalPriceDetails,
  RentalPriceLabel,
  RentalPriceQuota,
  RentalPriceTotal,
} from "./styles";
import { Button } from "../../components/Button";
import { useTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";

import { useNavigation } from "@react-navigation/native";


export function SchedulingDetails() {
  const theme = useTheme();

  const navigation = useNavigation();
  
  function handleSchedulingComplete(){
  navigation.navigate('SchedulingComplete')
  }
  return (
    <Container>
      <Header>
        <BackButton
          onPress={() => {
            console.log("teste");
          }}
        />
      </Header>
      <CarImages>
        <ImageSlider
          imageUrl={[
            "https://www.pngplay.com/wp-content/uploads/13/Audi-R8-Transparent-Background.png",
          ]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lambo</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$25</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name="380km/h" icon={SpeedSvg} />
          <Accessory name="3.2s" icon={AccelerationSvg} />
          <Accessory name="800 HP" icon={ForceSvg} />
          <Accessory name="Gasolina" icon={GasolineSvg} />
          <Accessory name="Auto" icon={ExchangeSvg} />
          <Accessory name="2 Pessoas" icon={PeopleSvg} />
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>06/09/2022</DateValue>
          </DateInfo>
          <Feather
            name="chevron-right"
            size={RFValue(24)}
            color={theme.colors.shape}
          />
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>06/09/2022</DateValue>
          </DateInfo>
        </RentalPeriod>

          <RentalPrice>
            <RentalPriceLabel>TOTAL</RentalPriceLabel>
            <RentalPriceDetails>
              <RentalPriceQuota></RentalPriceQuota>
              <RentalPriceTotal></RentalPriceTotal>
            </RentalPriceDetails>
          </RentalPrice>

      </Content>
      <Footer>
        <Button title="Confirmar" onPress={handleSchedulingComplete} color={theme.colors.success} />
      </Footer>
    </Container>
  );
}
