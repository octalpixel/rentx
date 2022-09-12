import React from "react";
import {
  ParamListBase,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";

export function useRootStackParamList() {
  const RootStackParamList = useNavigation<NavigationProp<ParamListBase>>();
  return RootStackParamList;

}
