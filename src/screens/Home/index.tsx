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
import {Ionicons} from '@expo/vector-icons'
import { Carlist, Container, Header, HeaderContent, MyCarsButton, TotalCars } from "./styles";
import { useRootStackParamList } from "../../hooks/useRootStackParamList/index";
import api from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";
import { Load } from "../../components/Load";
import { useTheme } from "styled-components";

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useRootStackParamList();
  const theme = useTheme();
  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", {car});
  }

  function handleOpenMyCars(car: CarDTO) {
    navigation.navigate("MyCars");
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
          <TotalCars>Total: {cars.length} carros</TotalCars>
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

      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape}/>
      </MyCarsButton>
    </Container>
  );
}
