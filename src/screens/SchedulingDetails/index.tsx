import React, { useEffect, useState } from "react";

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

import { useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessories";
import { useRootStackParamList } from "../../hooks/useRootStackParamList";
import { format } from "date-fns";
import { getPlatformDate } from "../../utils/getPlatformDate";
import api from "../../services/api";
import { Alert } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

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
    await api
      .post(`rentals`, {
        user_id: 1,
        car_id: car.id,
        startDate: new Date(dates[0]),
        endDate: new Date(dates[dates.length - 1]),
        total: rentalTotal,
      })
      .then((res) =>
     { navigation.navigate("ConfirmationScreen", {
        nextScreenRoute: "Home",
        title: "Carro alugado!",
        message:
        "Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.",
      }),
      console.log(res)}
      )
      .catch((error) => {
        setLoading(false);
        Alert.alert("Não foi possível realizar o agendamento", error)
      });
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
          loading={loading}
          enabled={!loading}
        />
      </Footer>
    </Container>
  );
}
