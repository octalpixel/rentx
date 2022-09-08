import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import GasolineSvg from '../../assets/gasoline.svg';
import {
    About,
    Brand,
    CarImage,
  Container, Details, Name, Period, Price, Rent,  Type
} from './styles';

interface CarData {
    brand: string;
    name: string;
    rent:{
        period: string;
        price: number;
    }
    thumbnail: string;
}
interface Props extends RectButtonProps{
    data: CarData;
}
export function Car({data, ...rest}: Props) {
  return (
    <Container {...rest}>
        <Details>
            <Brand>{data.brand}</Brand>
            <Name>{data.name}</Name>

            <About>
                <Rent>
                    <Period>{data.rent.period}</Period>
                    <Price>{`R$ ${data.rent.price}`}</Price>
                </Rent>

                <Type>
                    <GasolineSvg />
                </Type>
            </About>
        </Details>
        <CarImage resizeMode="contain" source={{ uri: data.thumbnail}}/>
    </Container>
  );
}