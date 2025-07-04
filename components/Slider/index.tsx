import React, { useMemo, useRef, useState } from "react";
import {
  Dimensions,
  PanResponder,
  Text,
  View,
  type LayoutChangeEvent,
  type PanResponderGestureState,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import stylesRaw from "./styles";

export type IFormSlider = {
  color?: string;
  min?: number;
  max?: number;
  step?: number;
  sliderStyle?: object;
  containerStyle?: object;
  onChangeValue: (value: number) => void;
};

const FormSlider: React.FC<IFormSlider> = ({
  min = 0,
  max = 100,
  step = 25,
  color,
  onChangeValue,
  sliderStyle = {},
  containerStyle = {},
}) => {
  const styles = stylesRaw();
  const [sliderValue, setSliderValue] = useState<number>(min);
  const [sliderWidth, setSliderWidth] = useState<number>(
    Dimensions.get("screen").width - 64
  );

  const positionLeft = useSharedValue(0);

  const rangeValue = useMemo(() => {
    if (min >= max || step <= 0) return [min];
    const result = [];
    for (let i = min; i < max; i += step) {
      result.push(i);
    }
    result.push(max);
    return result;
  }, [min, max, step]);

  const getMoveX = (moveX: number): number => {
    const endTrackSlider = sliderWidth - 48;
    let value = Math.floor(moveX) - 42;

    if (value < 0) value = 0;
    if (value > endTrackSlider) value = endTrackSlider;

    return value;
  };

  const getValueFromPosition = (position: number): number => {
    if (rangeValue.length < 2) return rangeValue[0] ?? 0;
    const endTrackSlider = sliderWidth - 48;
    const distance = endTrackSlider / (rangeValue.length - 1);
    const index = Math.round(position / distance);
    const clampedIndex = Math.max(0, Math.min(index, rangeValue.length - 1));
    return rangeValue[clampedIndex] ?? 0;
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState: PanResponderGestureState) => {
        const position = getMoveX(gestureState.moveX);
        positionLeft.value = position;
        const newValue = getValueFromPosition(position);
        runOnJS(setSliderValue)(newValue);
      },
      onPanResponderRelease: (_, gestureState: PanResponderGestureState) => {
        if (rangeValue.length < 2) return;

        const distance = (sliderWidth - 48) / (rangeValue.length - 1);
        const leftPosition = getMoveX(gestureState.moveX);
        const arrayPosition = Math.round(leftPosition / distance);
        const clampedArrayPosition = Math.max(
          0,
          Math.min(arrayPosition, rangeValue.length - 1)
        );
        const snapPosition = clampedArrayPosition * distance;

        positionLeft.value = withTiming(snapPosition, { duration: 100 });
        runOnJS(onChangeValue)(sliderValue);
      },
    })
  ).current;

  const onLayout = (val: LayoutChangeEvent) => {
    const { width } = val.nativeEvent.layout;
    setSliderWidth(width);
  };

  const animatedPointerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: positionLeft.value }],
  }));

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: positionLeft.value + 8,
    height: "100%",
    position: "absolute",
    left: 0,
    borderRadius: 4,
  }));

  return (
    <View style={[styles.container, containerStyle]}>
      <View onLayout={onLayout} style={[styles.sliderContainer, sliderStyle]}>
        <Animated.View
          style={[
            styles.sliderProgressBar,
            { backgroundColor: color ?? "blue" },
            animatedProgressStyle,
          ]}
        />
        <Animated.View
          style={[styles.pointerContainerStatic, animatedPointerStyle]}
          {...panResponder.panHandlers}
        >
          <View style={styles.pointerCircle}>
            <View style={styles.pointerInnerDot} />
          </View>
        </Animated.View>
      </View>

      <View style={styles.sliderValueContainer}>
        <Text style={styles.sliderValue}>{sliderValue}</Text>
        <Text style={styles.sliderValue}>
          {rangeValue[rangeValue.length - 1]}
        </Text>
      </View>
    </View>
  );
};

export default FormSlider;
