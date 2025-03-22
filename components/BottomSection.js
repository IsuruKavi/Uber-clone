import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "@rneui/base";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
const BottomSection = () => {
  const navigtion = useNavigation();
  return (
    <View
      style={tw`flex-row justify-evenly mt-auto  border-t py-2 pb-3  border-gray-100 items-center`}
    >
      <TouchableOpacity
        style={tw`mr-4 rounded-full bg-black p-3 w-26 flex-row justify-center`}
        onPress={() => navigtion.navigate("RiderOptionCard")}
      >
        <Icon name="car" type="font-awesome" color="white" size={16} />
        <Text style={tw`text-white text-center ml-2 `}>Rides</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`mr-4 rounded-full  p-3 w-26 flex-row justify-center bg-gray-100`}
      >
        <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
        <Text style={tw`text-black text-center ml-2 `}>Eats</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomSection;
