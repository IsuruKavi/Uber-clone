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
const GooglePlacesInput = () => {
  const ref = useRef();
  return (
    <>
      {/* <TouchableOpacity onPress={() => ref.current?.clear()}>
        <Icon
          style={[tw``]}
          name="closecircle"
          color="gray"
          type="antdesign"
          size={screenWidth * 0.04}
        />
      </TouchableOpacity> */}
      <GooglePlacesAutocomplete
        enablePoweredByContainer={false}
        minLength={2}
        returnKeyType={"Search"}
        ref={ref}
        fetchDetails={true}
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            height: 38,
            color: "#5d5d5d",
            fontSize: 16,
          },
        }}
        placeholder="Enter location"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
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
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
