import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from "../slices/navSlice";

import { MapViewRoute } from "react-native-maps-routes";
const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const requestBody = {
    origins: [
      {
        waypoint: {
          location: {
            latLng: {
              latitude: origin?.location?.lat,
              longitude: origin?.location?.lng,
            },
          },
        },
        routeModifiers: { avoid_ferries: true },
      },
    ],
    destinations: [
      {
        waypoint: {
          location: {
            latLng: {
              latitude: destination?.location?.lat,
              longitude: destination?.location?.lng,
            },
          },
        },
      },
    ],
    travelMode: "DRIVE",
    routingPreference: "TRAFFIC_AWARE",
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (!origin || !destination) return;
    //Zoom & fit to markers
    console.log("trigged");
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: true,
    });
  }, [origin, destination]);
  useEffect(() => {
    if (!origin || !destination) return;
    const fetchDistanceMatrix = async () => {
      try {
        const response = await fetch(
          "https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": process.env.GOOGLE_MAP_API_KEY,
              "X-Goog-FieldMask":
                "originIndex,destinationIndex,duration,distanceMeters,status,condition",
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data; // Return data instead of just logging it
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };
    fetchDistanceMatrix().then((data) => {
      console.log(data);
      dispatch(setTravelTimeInformation(data[0]));
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
