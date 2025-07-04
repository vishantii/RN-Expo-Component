import { StyleSheet } from "react-native";

const styles = () => {
  return StyleSheet.create({
    container: {
      marginHorizontal: 36,
    },
    labelContainer: {
      flex: -1,
      marginBottom: 14,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    sliderContainer: {
      flex: -1,
      height: 8,
      borderRadius: 25,
      marginBottom: 4,
      justifyContent: "center",
      backgroundColor: "gray",
    },
    sliderProgressBar: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      borderRadius: 4,
    },
    sliderValueContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    sliderValue: {
      color: "gray",
    },
    pointerContainerStatic: {
      width: 16,
      height: 16,
      borderRadius: 8,
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "gray",
    },
    pointerCircle: {
      width: 16,
      height: 16,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "blue",
    },
    pointerInnerDot: {
      width: 8,
      height: 8,
      backgroundColor: "white",
      borderRadius: 4,
    },
  });
};

export default styles;
