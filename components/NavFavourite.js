import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import { useDispatch } from "react-redux";
import { selectOrigin } from "../slices/navSlice";
import { setDestination, setOrigin } from "../slices/navSlice";
const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "Code Street,London,UK",
    latLng: { lat: 51.5223924, lng: -0.0708268 },
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    latLng: { lat: 51.5031864, lng: -0.1195192 },
    destination: "London Eye,London,UK",
  },
];

const NavFavourite = ({ place }) => {
  console.log(place);
  const dispatch = useDispatch();
  const setOriginMarker = (dispatch, latLng, description) => {
    console.log(latLng, description);
    dispatch(
      setOrigin({
        location: latLng,
        description: description,
      })
    );
    dispatch(setDestination(null));
    console.log("trigged");
  };
  const setDestinationMarker = (dispatch, latLng, description) => {
    console.log(latLng, description);
    dispatch(
      setDestination({
        location: latLng,
        description: description,
      })
    );
  };
  const setMarker = (latLng, description) => {
    if (place === "origin") {
      console.log("triggeed1");
      setOriginMarker(dispatch, latLng, description);
    }
    if (place === "destination") {
      setDestinationMarker(dispatch, latLng, description);
    }
  };
  return (
    <View>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => (
          <View style={[tw`bg-gray-200`, { height: 0.5 }]} />
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { location, destination, icon, latLng } }) => (
          <TouchableOpacity
            style={tw`flex-row items-center px-5 py-2`}
            onPress={() => setMarker(latLng, destination)}
          >
            <Icon
              style={tw`mr-4 rounded-full bg-gray-300 p-3`}
              name={icon}
              type="ionicon"
              color="white"
              size={18}
            />
            <View>
              <Text style={tw` font-semibold text-md`}> {location}</Text>
              <Text style={tw`text-gray-500`}> {destination}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NavFavourite;
