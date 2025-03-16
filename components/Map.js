import { View, Text } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { selectDestination, selectOrigin } from "../slices/navSlice";
import MapViewRoute from "react-native-maps-routes";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  console.log(origin, destination, process.env.GOOGLE_MAP_API_KEY);

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
      {origin && destination && (
        <MapViewRoute
          apikey={process.env.GOOGLE_MAP_API_KEY}
          strokeWidth={3}
          strokeColors="black"
          origin={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          destination={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          description={origin?.description || ""}
          identifier="origin"
          title="Origin"
        />
      )}
    </MapView>
  );
};

export default Map;
