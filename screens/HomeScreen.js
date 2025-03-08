import { View, Text,SafeAreaView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import tw from "twrnc";

const HomeScreen = () => {
  return (
    <SafeAreaView >
      <StatusBar style='auto' />
      <Text style={tw` text-red-500`}>HomeScreen</Text>
    </SafeAreaView>
  );
}

export default HomeScreen