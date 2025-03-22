import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import Map from "../components/Map";
import NavigateCard from "../components/NavigateCard";
import RiderOptionCard from "../components/RiderOptionCard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
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
  const navigation = useNavigation();
  return (
    <View style={tw`flex-1 bg-white  h-full`}>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
        style={tw` absolute z-50 bg-gray-200/80 rounded-full p-2 shadow-lg top-6 left-4`}
      >
        <Icon name="menu" />
      </TouchableOpacity>
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
