import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";
import { screenHeight } from "../GlobalStyle";
import NavOptionts from "../components/NavOptions";

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
        <NavOptionts/>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
