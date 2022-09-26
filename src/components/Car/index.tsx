import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessories';
import {
    About,
    Brand,
    CarImage,
  Container, Details, Name, Period, Price, Rent,  Type
} from './styles';


interface Props extends RectButtonProps{
    data: CarDTO;
}
export function Car({data, ...rest}: Props) {
    const MotorIcon = getAccessoryIcon(data.fuel_type)
  return (
    <Container {...rest}>
        <Details>
            <Brand>{data.brand}</Brand>
            <Name>{data.name}</Name>

            <About>
                <Rent>
                    <Period>{data.period}</Period>
                    <Price>{`R$ ${data.price}`}</Price>
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