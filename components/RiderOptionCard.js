import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useState } from "react";
import { Icon } from "@rneui/base";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "http://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "http://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "http://links.papareact.com/7pf",
  },
];

const RiderOptionCard = () => {
  const SURGE_CHARGE_RATE = 1.5;
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const distance = travelTimeInformation?.distanceMeters
    ? `${(travelTimeInformation?.distanceMeters / 1000).toFixed(1)} km`
    : "";
  const duration = travelTimeInformation?.duration
    ? Math.ceil(parseInt(travelTimeInformation?.duration, 10) / 60)
    : "--";
  const calculatePrice = (item) => {
    // Calculate price without formatting
    const price =
      (travelTimeInformation?.distanceMeters * item.multiplier) / 12;

    // Round up the price value
    const roundedUp = Math.ceil(price); // Round up
    const formattedPrice = new Intl.NumberFormat("en-gb", {
      style: "currency",
      currency: "LKR",
    }).format(roundedUp); // Format the rounded price

    return formattedPrice; // Return formatted result
  };

  return (
    <View style={tw`  flex-1 bg-white `}>
      <View style={tw` relative h-12 items-center justify-center `}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`  p-2 absolute items-center justify-center  top-1 left-5`}
        >
          <Icon
            name="chevron-left"
            type="fontawesome"
            color="black"
            size={26}
          />
        </TouchableOpacity>

        <Text
          style={tw` font-semibold text-lg text-center   justify-center items-center`}
        >
          {`Select a Ride - ${distance}`}
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`flex-row justify-between items-center px-7 ${
              selectedItem?.id === item.id && "bg-gray-300"
            }`}
            onPress={() => setSelectedItem(item)}
          >
            <Image
              style={{ width: 75, height: 75, resizeMode: "contain" }}
              source={{ uri: item.image }}
            />
            <View style={tw`-ml-6 `}>
              <Text style={tw`font-semibold text-lg`}>{item.title}</Text>
              <Text>{duration} min Travel Time</Text>
            </View>
            <Text style={tw`text-lg`}>{calculatePrice(item)}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={tw` bg-black p-2 my-2 mx-6 rounded-full py-3 ${
          !selectedItem && "bg-gray-200"
        }`}
        disabled={!selectedItem ? true : false}
      >
        <Text style={tw`text-center text-white`}>{`Choose ${
          selectedItem?.title || ""
        }`}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RiderOptionCard;
