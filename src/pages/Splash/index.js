import React, { useEffect, useRef } from "react";
import { Easing } from "react-native";
import LottieView from "lottie-react-native";
import { Animated } from "react-native"; // Certifique-se de importar Animated a partir de "react-native".


const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function ControllingAnimationProgress() {
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <AnimatedLottieView
      source={require("../../../assets/splash.json")}
      progress={animationProgress.current}
    />
  );
}