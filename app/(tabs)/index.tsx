import { Slider, Toggle } from "@/components";
import { StyleSheet, Text, View } from "react-native";

const Index = () => {
  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Text>Slider</Text>
        <Slider onChangeValue={() => {}} />
      </View>
      <View style={styles.toggleContainer}>
        <Text>Toggle</Text>
        <Toggle />
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sliderContainer: {
    marginBottom: 16,
    gap: 16,
    justifyContent: "center",
  },
  toggleContainer: {
    marginBottom: 16,
    gap: 16,
    justifyContent: "center",
  },
});
