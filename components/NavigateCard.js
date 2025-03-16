import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Icon } from "@rneui/themed";
import { screenHeight, screenWidth } from "../GlobalStyle";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
const NavigateCard = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const navigation=useNavigation()
  return (
    <View style={tw`flex-1`}>
      <Text style={tw`text-center text-lg font-semibold py-5`}>
        Good Morning, Tom
      </Text>
      <View
        style={tw`border-t border-gray-200 flex-shrink  flex-shrink px-3`}
      >
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
              alignItems: "center",
              borderRadius: 3,
              backgroundColor: "#d4d4d4",
              marginBottom: 10,
            },
            textInput: {
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              backgroundColor: "#d4d4d4",
              marginBottom: 0,
            color:'black' 
            },
          }}
          placeholder="Enter location"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            dispatch(
              setDestination({
                location: details.geometry.location,
                description: data.description,
              })
            );
             navigation.navigate('RiderOptionCard')
          }}
          query={{
            key: process.env.GOOGLE_MAP_API_KEY,
            language: "en",
          }}
        />
      </View>
    </View>
  );
};

export default NavigateCard;
