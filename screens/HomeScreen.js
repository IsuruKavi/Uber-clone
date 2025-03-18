import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";
import { screenHeight, screenWidth } from "../GlobalStyle";
import NavOptionts from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Icon } from "@rneui/base";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import NavFavourite from "../components/NavFavourite";
const GooglePlacesInput = () => {
  const ref = useRef();
  const dispatch = useDispatch();

  return (
    <>
      <GooglePlacesAutocomplete
        renderRightButton={() => (
          <TouchableOpacity
            onPress={() => {
              ref.current?.setAddressText("");
            }}
          >
            <Icon
              style={[tw``, { paddingRight: 6 }]}
              name="closecircle"
              color="gray"
              type="antdesign"
              size={screenWidth * 0.05}
            />
          </TouchableOpacity>
        )}
        enablePoweredByContainer={false}
        minLength={2}
        returnKeyType={"Search"}
        ref={ref}
        fetchDetails={true}
        styles={{
          container: {
            flex: 0,
            alignItems: "center",
          },

          textInputContainer: {
            borderColor: "#ebbe42",
            borderWidth: 1,
            alignItems: "center",
            borderRadius: 10,
            marginBottom: 10,
          },
          textInput: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            marginBottom: 0,
          },
        }}
        placeholder="Enter location"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          dispatch(
            setOrigin({
              location: details.geometry.location,
              description: data.description,
            })
          );
          dispatch(setDestination(null));
        }}
        query={{
          key: process.env.GOOGLE_MAP_API_KEY,
          language: "en",
        }}
      />
    </>
  );
};
const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <StatusBar style="auto" />
      <View style={tw` px-5`}>
        <Image
          source={{ uri: "https://links.papareact.com/gzs" }}
          style={{
            height: screenHeight * 0.1,
            width: screenHeight * 0.13,
            resizeMode: "contain",
          }}
        />
        <View style={tw``}>
          <GooglePlacesInput />
        </View>
        <NavOptionts />
        <NavFavourite />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
