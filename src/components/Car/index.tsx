import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { CarDTO } from '../../dtos/CarDTO';
import {Car as CarModel} from '../../databases/model/Car';

import { getAccessoryIcon } from '../../utils/getAccessories';
import {
    About,
    Brand,
    CarImage,
  Container, Details, Name, Period, Price, Rent,  Type
} from './styles';
import { useNetInfo } from '@react-native-community/netinfo';


interface Props extends RectButtonProps{
    data: CarModel;
}
export function Car({data, ...rest}: Props) {
    const MotorIcon = getAccessoryIcon(data.fuel_type)
    const netInfo = useNetInfo();
  return (
    <Container {...rest}>
        <Details>
            <Brand>{data.brand}</Brand>
            <Name>{data.name}</Name>

            <About>
                <Rent>
                    <Period>{data.period}</Period>
                    <Price>{`R$ ${netInfo.isConnected === true ? data.price : '...' }`}</Price>

                </Rent>

                <Type>
                    <MotorIcon/>
                </Type>
            </About>
        </Details>
        <CarImage resizeMode="contain" source={{ uri: data.thumbnail}}/>
    </Container>
  );
}