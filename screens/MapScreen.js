import { View, Text } from 'react-native'
import React from 'react'
import tw from "twrnc";
import Map from '../components/Map';
const MapScreen = () => {
  return (
    <View style={tw`flex-1 bg-white`}>
      <Text>MapScreen</Text>
      <View style={tw` flex-0.5 `}>
       <Map/>
      </View>
      <View style={tw`flex-0.5 `}>

      </View>
    </View>
  )
}

export default MapScreen