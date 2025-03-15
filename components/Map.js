import { View, Text } from "react-native";
import React from "react";
import MapView from "react-native-maps";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";
const Map = () => {
  const { location } = useSelector(selectOrigin);
  console.log(location);
  return (
    <MapView
      mapType="standard"
      style={tw`flex-1`}
      initialRegion={{
        latitude: location?.lat || 37.78825,
        longitude: location?.lng || -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
};

export default Map;
