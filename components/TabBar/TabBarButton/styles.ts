import { StyleSheet } from "react-native";

const styles = () => {
  return StyleSheet.create({
    buttonContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
    },
    labelStyle: {
      fontSize: 12,
      marginTop: 4,
    },
    animatedIconContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
  });
};

export default styles;
