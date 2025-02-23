import React, { useEffect, useState } from "react";

import { Feather } from "@expo/vector-icons";

import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";

import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { Button } from "../../components/Button";
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

import { useNetInfo } from "@react-native-community/netinfo";
import { useRoute } from "@react-navigation/native";
import { format } from "date-fns";
import { Alert } from "react-native";
import { CarDTO } from "../../dtos/CarDTO";
import { useRootStackParamList } from "../../hooks/useRootStackParamList";
import api from "../../services/api";
import { getAccessoryIcon } from "../../utils/getAccessories";
import { getPlatformDate } from "../../utils/getPlatformDate";

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriodInterface {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  //STATES
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodInterface>(
    {} as RentalPeriodInterface
  );
  const [loading, setLoading] = useState(false);
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

  const theme = useTheme();

  //Navigation
  const netInfo = useNetInfo();

  const navigation = useRootStackParamList();
  const route = useRoute();
  const { car, dates } = route.params as Params;

  //Functions
  const rentalTotal = Number(dates.length * car.price);

  async function handleSchedulingComplete() {
    setLoading(true);
    try {
      await api
        .post(`rentals`, {
          user_id: 1,
          car_id: car.id,
          start_date: new Date(dates[0]),
          end_date: new Date(dates[dates.length - 1]),
          total: rentalTotal,
        })
        .then(() => {
          navigation.navigate("ConfirmationScreen", {
            nextScreenRoute: "HomeScreen",
            title: "Carro alugado!",
            message:
              "Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.",
          });
        })
        .catch((error) => {
          setLoading(false);
          Alert.alert("Não foi possível realizar o agendamento", error);
        });
      
    } catch (error) {
      setLoading(false);
          Alert.alert("Não foi possível realizar o agendamento", error);
    } finally {
      setLoading(false);

    }
    console.log("handleSchedulingComplete button clicked");
    // const response = await api.get(`/schedules_bycars/${car.id}`);

    // const unavailable_dates = [...response.data.unavailable_dates, ...dates];

    // api.post(`/schedules_byuser/`, {
    //   user_id: 1,
    //   car,
    //   startDate: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
    //   endDate: format(
    //     getPlatformDate(new Date(dates[dates.length - 1])),
    //     "dd/MM/yyyy"
    //   ),
    // });

    // api
    //   .put(`/schedules_bycars/${car.id}`, {
    //     id: car.id,
    //     unavailable_dates,
    //   })
  }

  function handleGoBack() {
    navigation.goBack();
  }

  //UseEffects
  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }
    if (netInfo.isConnected === true) {
      fetchCarUpdated();
    }
  }, [netInfo.isConnected]);

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>
      <CarImages>
        <ImageSlider
          imageUrl={
            !!carUpdated.photos
              ? carUpdated.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R${car.price}</Price>
          </Rent>
        </Details>

        {carUpdated.accessories && (
          <Accessories>
            {carUpdated.accessories.map((accessory) => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))}
          </Accessories>
        )}
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
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>
          <Feather
            name="chevron-right"
            size={RFValue(24)}
            color={theme.colors.shape}
          />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              R${car.price} x {dates.length} diárias.
            </RentalPriceQuota>
            <RentalPriceTotal>R${rentalTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          title="Confirmar"
          onPress={handleSchedulingComplete}
          color={theme.colors.success}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
