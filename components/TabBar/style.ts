import { StyleSheet } from "react-native";

const style = (height: number, width: number) => {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      backgroundColor: "white",
      paddingVertical: 24,
      marginHorizontal: 50,
      position: "absolute",
      bottom: 50,
      left: 0,
      right: 0,
      borderRadius: 48,
    },
    tabBarItem: {
      alignItems: "center",
      justifyContent: "center",
    },
    subContainerTabBar: {
      position: "absolute",
      backgroundColor: "#723FEB",
      borderRadius: 30,
      marginHorizontal: 12,
      height: height - 20,
      width: width - 25,
      top: 12,
    },
  });
};

export default style;
