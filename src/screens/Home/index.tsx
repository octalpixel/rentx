import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { CarDetails } from "../CarDetails";

import { Carlist, Container, Header, HeaderContent, TotalCars } from "./styles";

export function Home() {
  const navigation = useNavigation();
  
  function handleCarDetails(){
  navigation.navigate('CarDetails')
  }
  
  const car = {
    brand: 'audi',
    name: 'r8',
    rent:{
        period: 'ao dia',
        price: 1
    },
    thumbnail: 'https://www.pngplay.com/wp-content/uploads/13/Audi-R8-Transparent-Background.png',
}


  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total: 12 carros</TotalCars>
        </HeaderContent>
      </Header>
      <Carlist data={[1,2,3, 4, 5, 6, 7, 8, 9]}
      
      keyExtractor={item => String(item)}
      renderItem={({item}) => 
      <Car data={car} onPress={handleCarDetails} />
      
      }>

      </Carlist>
    </Container>
  );
}
