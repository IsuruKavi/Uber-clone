import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { selectDestination, selectOrigin } from "../slices/navSlice";

import { MapViewRoute } from "react-native-maps-routes";
const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  useEffect(() => {
    if (!origin || !destination) return;
    //Zoom & fit to markers
    console.log("trigged");
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: true,
    });
  }, [origin, destination]);
  return (
    <MapView
      ref={mapRef}
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
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          description={origin?.description || ""}
          identifier="origin"
          title="Origin"
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          description={destination?.description || ""}
          identifier="destination"
          title="Destination"
        />
      )}
      {/* {origin && destination && (
        <MapViewDirections
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
        
        
      )} */}

      {origin && destination && (
        <MapViewRoute
          mode="DRIVE"
          onError={(e) => {
            console.log(e);
          }}
          strokeWidth={4}
          origin={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          destination={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          apiKey={process.env.GOOGLE_MAP_API_KEY}
        />
      )}
    </MapView>
  );
};

export default Map;
