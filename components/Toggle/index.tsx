import React from "react";
import { LayoutChangeEvent, Pressable } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import stylesRaw from "./styles";

const Toggle = () => {
  const styles = stylesRaw();
  const scale = useSharedValue(1);
  const isOn = useSharedValue(false);
  const bgProgress = useSharedValue(0);
  const widthToggle = useSharedValue(0);
  const heightToggle = useSharedValue(0);

  const handlePressIn = () => {
    scale.value = withTiming(0.9, {
      duration: 100,
    });
    bgProgress.value = withTiming(1, {
      duration: 100,
    });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 80 });
    bgProgress.value = withTiming(0, { duration: 100 });

    isOn.value = !isOn.value;
  };

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    widthToggle.value = width;
    heightToggle.value = height;
  };

  const trackAnimatedStyle = useAnimatedStyle(() => {
    let baseColor = "gray";
    let pressedTargetColor = "green";

    if (isOn.value) {
      baseColor = "green";
      pressedTargetColor = "gray";
    }

    const backgroundColor = interpolateColor(
      bgProgress.value,
      [0, 1],
      [baseColor, pressedTargetColor]
    );

    return {
      backgroundColor: withTiming(backgroundColor, { duration: 200 }),
      borderRadius: heightToggle.value / 2,
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      Number(isOn.value),
      [0, 1],
      [0, widthToggle.value - heightToggle.value]
    );

    return {
      transform: [
        { translateX: withTiming(translateX, { duration: 100 }) },
        { scale: scale.value },
      ],
      borderRadius: heightToggle.value / 2,
      shadowOpacity: 0.2,
      shadowRadius: 2,
      shadowOffset: { width: 0, height: 1 },
      shadowColor: "#000",
    };
  });

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        style={[styles.track, trackAnimatedStyle]}
        onLayout={onLayout}
      >
        <Animated.View style={[styles.thumb, thumbAnimatedStyle]} />
      </Animated.View>
    </Pressable>
  );
};

export default Toggle;
