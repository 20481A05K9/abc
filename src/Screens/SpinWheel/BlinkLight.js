 import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop, LinearGradient } from 'react-native-svg';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
const BlinkLight = () => {
  const blinkAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnimation, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnimation, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [blinkAnimation]);

  const circleRadius = 15;

  return (
    <View style={{ width: wp("12%"), height: wp("12%"),zIndex:1 }}>
      <Svg height="100%" width="100%" viewBox="0 0 100 100">
        <Defs>
          <RadialGradient
            id="goldGradient"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <Stop offset="0%" stopColor="#FFF5C3" stopOpacity="1" />
            <Stop offset="100%" stopColor="#F9D967" stopOpacity="1" />
          </RadialGradient>
          <LinearGradient id="blinkGradient" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="brown" stopOpacity="1" />
            <Stop offset="100%" stopColor="brown" stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Circle
          cx="50"
          cy="50"
          r={circleRadius}
          fill="url(#goldGradient)"
        />
        <AnimatedCircle
          cx="50"
          cy="50"
          r={circleRadius / 2}
          fill="url(#blinkGradient)"
          opacity={blinkAnimation}
        />
      </Svg>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default BlinkLight;
