import { Feather } from "@expo/vector-icons";
import { useEffect } from "react";
import { Pressable } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import stylesRaw from "./styles";

export type TabBarButtonProps = {
  label: string;
  colors: string;
  routeName: string;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  style?: any;
};

const TabBarButton = ({
  label,
  colors,
  onPress,
  routeName,
  isFocused,
  onLongPress,
  style,
}: TabBarButtonProps) => {
  const styles = stylesRaw();
  const scaleValue = useSharedValue(0);

  useEffect(() => {
    scaleValue.value = withSpring(
      typeof isFocused == "boolean" ? (isFocused ? 1 : 0) : isFocused,
      {
        duration: 350,
      }
    );
  }, [isFocused, scaleValue]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scaleValue.value, [0, 1], [1, 0]);
    return {
      opacity,
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const scale = interpolate(scaleValue.value, [0, 1], [1, 1.2]);
    const translateY = interpolate(scaleValue.value, [0, 1], [0, 9]);
    return {
      transform: [{ scale }, { translateY }],
    };
  });

  const icon = () => {
    switch (routeName.toLowerCase()) {
      case "index":
        return <Feather name="home" size={24} color={colors} />;
      case "user":
        return <Feather name="user" size={24} color={colors} />;
      case "profile":
        return <Feather name="user" size={24} color={colors} />;
      case "login":
        return <Feather name="log-in" size={24} color={colors} />;
      default:
        return null;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.buttonContainer, style]}
    >
      <Animated.View style={[styles.animatedIconContainer, animatedIconStyle]}>
        {icon()}
        <Animated.Text
          style={[styles.labelStyle, { color: colors }, animatedTextStyle]}
        >
          {typeof label === "string" ? label : label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
};

export default TabBarButton;
