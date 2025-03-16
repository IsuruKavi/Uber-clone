import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import Map from "../components/Map";
import NavigateCard from "../components/NavigateCard";
import RiderOptionCard from "../components/RiderOptionCard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const BottomScreen = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NavigateCard"
        component={NavigateCard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RiderOptionCard"
        component={RiderOptionCard}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const MapScreen = () => {
  return (
    <View style={tw`flex-1 bg-white`}>
  
      <View style={tw` flex-0.5 `}>
        <Map />
      </View>
      <View style={tw`flex-0.5 `}>
        <BottomScreen />
      </View>
    </View>
  );
};

export default MapScreen;
