import React, { useEffect, useState } from "react";
import { Alert, StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { Carlist, Container, Header, HeaderContent, TotalCars } from "./styles";
import { useRootStackParamList } from "../../hooks/useRootStackParamList/index";
import api from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";
import {
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { LoadAnimation } from "../../components/LoadAnimation";
import { useNetInfo } from "@react-native-community/netinfo";
import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "../../databases";
// const ButtonAnimated = Animated.createAnimatedComponent(RectButton);
import {Car as CarModel} from '../../databases/model/Car';
export function Home() {
  const [cars, setCars] = useState<CarModel[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useRootStackParamList();
  const netInfo = useNetInfo();
  // const theme = useTheme();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
         const response = await api
          .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);

        const { changes, latestVersion } = response.data;
        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post('users/sync', user);
      },
    });
    console.log('offlineSynchronize')
  }

  // function handleOpenMyCars(car: CarDTO) {
  //   navigation.navigate("MyCars");
  // }

  // useEffect(() => {
  //   //let is mounted is to prevent memory leak caused by updating the state after the component is destroyed
  //   let isMounted = true;

  //   async function fetchCars() {
  //     setLoading(true);
  //     try {
  //       const response = await api.get("/cars");
  //       if (isMounted) {
  //         setCars(response.data);
  //       }
  //     } catch (error) {
  //       console.log("fetchCars error: " + error);
  //     } finally {
  //       if (isMounted) {
  //         setLoading(false);
  //       }
  //     }
  //   }
  //   fetchCars();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);
  useEffect(() => {
    //let is mounted is to prevent memory leak caused by updating the state after the component is destroyed
    let isMounted = true;

    async function fetchCars() {
      try {
        setLoading(true);
        const carCollection = database.get<CarModel>('cars');
        const cars = await carCollection.query().fetch();

        if (isMounted) {
          setCars(cars);
        }
      } catch (error) {
        console.log("fetchCars error: " + error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchCars();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if(netInfo.isConnected === true){
      offlineSynchronize();
    }
  }, [netInfo.isConnected]);

  //UseEffect for knowing when the user is Online
  //   useEffect(()=>{
  // if(netInfo.isConnected){
  //   Alert.alert('Você está Online')
  // }else{
  //   Alert.alert('Você está Offline')

  // }
  //   },[netInfo.isConnected])

  // useEffect(() => {
  //   BackHandler.addEventListener("hardwareBackPress", () => {
  //     return true;
  //   });
  // }, []);

  //Animations
  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  // const myCarsButtonStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       { translateX: positionX.value },
  //       { translateY: positionY.value },
  //     ],
  //   };
  // });

  // const onGestureEvent = useAnimatedGestureHandler({
  //   onStart(_, ctx: any) {
  //     ctx.positionX = positionX.value;
  //     ctx.positionY = positionY.value;
  //   },
  //   onActive(event, ctx: any) {
  //     positionX.value = event.translationX + ctx.positionX;
  //     positionY.value = event.translationY + ctx.positionY;
  //   },
  //   onEnd() {
  //     positionX.value = withSpring(0);
  //     positionY.value = withSpring(0);
  //   },
  // });

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
          {!loading && <TotalCars>Total: {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <Carlist
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
      {/* <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: "absolute",
              bottom: 13,
              right: 22,
            },
          ]}
        >
          <ButtonAnimated
            style={[styles.button, { backgroundColor: theme.colors.main }]}
            onPress={handleOpenMyCars}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler> */}
    </Container>
  );
}

// const styles = StyleSheet.create({
//   button: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
