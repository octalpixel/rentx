import React from "react";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider } from "styled-components";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
  useFonts,
} from "@expo-google-fonts/archivo";

import { Home } from "./src/screens/Home";
import theme from "./src/styles/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Scheduling } from "./src/screens/Scheduling";
import { SchedulingDetails } from "./src/screens/SchedulingDetails";
import { SchedulingComplete } from "./src/screens/SchedulingComplete";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Routes } from "./src/routes";

export default function App() {
  SplashScreen.preventAutoHideAsync();
  const [isLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  });
  if (!isLoaded) {
    return null;
  }
  SplashScreen.hideAsync();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      

      <ThemeProvider theme={theme}>
     <Routes />
      </ThemeProvider>
      
    </GestureHandlerRootView>
  );
}
