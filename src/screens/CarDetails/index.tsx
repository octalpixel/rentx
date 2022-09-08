import React from "react";

import SpeedSvg from '../../assets/speed.svg';
import AccelerationSvg from '../../assets/acceleration.svg';
import ForceSvg from '../../assets/force.svg';
import GasolineSvg from '../../assets/gasoline.svg';
import ExchangeSvg from '../../assets/exchange.svg';
import PeopleSvg from '../../assets/people.svg';



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
import { useNavigation } from "@react-navigation/native";

export function CarDetails() {

  const navigation = useNavigation();
  
  function handleScheduling(){
  navigation.navigate('Scheduling')
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

        <About>
          {" "}
          info All dependencies react-native-iphone-x-helper@1.3.1 Done in
          6.48s.info All dependencies react-native-iphone-x-helper@1.3.1 Done in
          6.48s.info All dependencies react-native-iphone-x-helper@1.3.1 Done in
          6.48s.
        </About>

      </Content>
          <Footer>
            <Button title="Escolher período do aluguel"  onPress={handleScheduling}/>
          </Footer>
      

    </Container>
  );
}
