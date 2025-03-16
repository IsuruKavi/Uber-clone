import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { screenHeight, screenWidth } from "../GlobalStyle";
import tw from "twrnc";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";
const data = [
  {
    id: "123",
    title: "Get a ride",
    image: require("../assets/images/UberX.webp"),

    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order food",
    image: require("../assets/images/snacks.png"),
    screen: "EatScreen",
  },
];
const NavItem = ({ item }) => {
  return (
    <View style={tw` bg-gray-100 mr-4 p-2 rounded-lg`}>
      <Image
        key={item.id}
        source={item.image}
        style={{
          width: screenHeight * 0.17,
          height: screenHeight * 0.22,
        }}
        resizeMode="contain"
      />
      <Text style={tw`text-lg font-semibold ml-2`}>{item.title}</Text>
      <View style={tw`flex-row`}>
        <Icon
          style={[tw`bg-black p-1 rounded-full  my-2 ml-2  `, ,]}
          name="arrowright"
          color="white"
          type="antdesign"
          size={screenWidth * 0.06}
        />
      </View>
    </View>
  );
};
const NavOptionts = () => {
  const navigation = useNavigation();
  const origin=useSelector(selectOrigin)
  return (
    <View>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(item.screen);
            }}
            disabled={!origin}
            style={tw`${!origin && "opacity-40" }`}
          >
            <NavItem item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NavOptionts;
