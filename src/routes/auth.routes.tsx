import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ConfirmationScreen } from "../screens/ConfirmationScreen";
import { Splash } from "../screens/Splash";
import { SignIn } from "../screens/SignIn";
import { SignUpFirstStep } from "../screens/SignUp/SignUpFirstStep";
import { SignUpSecondStep } from "../screens/SignUp/SignUpSecondStep";

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Screen name="Splash" component={Splash} />
       <Screen name="SignIn" component={SignIn} />
       <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
       <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
       <Screen name="ConfirmationScreen" component={ConfirmationScreen} />

    </Navigator>
  );
}
