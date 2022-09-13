import React, { useEffect, useState } from "react";
import { FlatList, StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { BackButton } from "../../components/BackButton";
import { Car } from "../../components/Car";
import { CarDTO } from "../../dtos/CarDTO";
import { AntDesign } from "@expo/vector-icons";
import { useRootStackParamList } from "../../hooks/useRootStackParamList";
import api from "../../services/api";

import {
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  Container,
  Content,
  Header,
  SubTitle,
  Title,
  CarFooter,
  CarFooterDate,
  CarFooterPeriod,
  CarFooterTitle,
  CarWrapper,
} from "./styles";
import { Load } from "../../components/Load";
interface CarProps {
  id: string;
  user_id: string;
  startDate: string;
  endDate: string;
  car: CarDTO;
}
export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useRootStackParamList();
  const theme = useTheme();
  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const res = await api.get("schedules_byuser?user_id=1");
        setCars(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);
  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={handleGoBack} color={theme.colors.shape} />

        <Title>
          Escolha uma {"\n"}data de início e {"\n"}fim do aluguel
        </Title>
        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>
      {loading ? (
        <Load />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Periodo</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={24}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}
