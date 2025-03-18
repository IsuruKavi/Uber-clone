import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import tw from "twrnc";
import { Icon } from "@rneui/base";
const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "Code Street,London,UK",
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    destination: "London Eye,London,UK",
  },
];

const NavFavourite = () => {
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { location, destination, icon } }) => (
          <TouchableOpacity style={tw`flex-row items-center p-5`}>
            <Icon
              style={tw`mr-4 rounded-full bg-gray-300 p-3`}
              name={icon}
              type="ionicon"
              color="white"
              size={18}
            />
            <View>
              <Text> {location}</Text>
              <Text> {destination}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NavFavourite;
