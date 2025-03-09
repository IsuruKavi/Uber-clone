import { StyleSheet, Platform, StatusBar, Dimensions } from "react-native";
export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;