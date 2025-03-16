import { View, Text } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";
const Map = () => {
  const origin  = useSelector(selectOrigin);

  return (
    <MapView
      mapType="standard"
      style={tw`flex-1`}
      initialRegion={{
        latitude: origin?.location?.lat || 37.78825,
        longitude: origin?.location?.lng || -122.4324,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin?.location && (
        <Marker
          coordinate={{ latitude: origin.location.lat, longitude: origin.location.lng }}
          description={origin?.description || ""}
          identifier="origin"
          title="Origin"
        />
      )}
    </MapView>
  );
};

export default Map;
