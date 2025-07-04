import { StyleSheet } from "react-native";

const styles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    track: {
      width: 40,
      height: 24,
      padding: 2,
      justifyContent: "center",
      borderRadius: 12,
    },
    thumb: {
      backgroundColor: "white",
      height: "100%",
      aspectRatio: 1,
      elevation: 3,
      borderRadius: 12,
    },
  });
};

export default styles;
