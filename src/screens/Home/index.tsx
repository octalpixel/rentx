import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import {
  ParamListBase,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { CarDetails } from "../CarDetails";

import { Carlist, Container, Header, HeaderContent, TotalCars } from "./styles";
import { useRootStackParamList } from "../../hooks/useRootStackParamList/index";
import api from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";
import { Load } from "../../components/Load";

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useRootStackParamList();
  
  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", {car});
  }

  
  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/cars");
        setCars(response.data);
      } catch (error) {
        console.log("fetchCars error: " + error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

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

      {loading ? (
        <Load />
      ) : (
        <Carlist
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
}
