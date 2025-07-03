import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import style from "./style";
import TabBarButton from "./TabBarButton";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { colors } = useTheme();
  const tabXPosition = useSharedValue(0);

  const isLayoutReady = dimensions.width > 0 && dimensions.height > 0;
  const buttonWidth = isLayoutReady
    ? dimensions.width / state.routes.length
    : 0;
  const styles = style(dimensions.height, buttonWidth);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabXPosition.value }],
    };
  }, []);

  useEffect(() => {
    if (isLayoutReady) {
      tabXPosition.value = withSpring(state.index * buttonWidth);
    }
  }, [isLayoutReady, state.index, buttonWidth]);

  return (
    <View style={styles.container} onLayout={onLayout}>
      <Animated.View style={[animatedStyle, styles.subContainerTabBar]} />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;
        const label =
          typeof options.tabBarLabel === "function"
            ? options.tabBarLabel({
                focused: isFocused,
                color: isFocused ? colors.primary : colors.text,
                position: "below-icon",
                children: route.name,
              })
            : options.tabBarLabel ?? options.title ?? route.name;

        const onPress = () => {
          if (!isLayoutReady) return;

          // Animate tab indicator
          tabXPosition.value = withSpring(index * buttonWidth, {
            duration: 1500,
          });

          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.key}
            onPress={onPress}
            isFocused={isFocused}
            routeName={route.name}
            label={label as string}
            onLongPress={onLongPress}
            colors={isFocused ? "#fff" : "#673ab7"}
            style={{ width: buttonWidth, flex: 1 }}
          />
        );
      })}
    </View>
  );
}

export default TabBar;
