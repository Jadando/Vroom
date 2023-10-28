import react from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";

export default function Splash() {
    return (
        <View>
            <LottieView
                source={require('../../../assets/splash.json')}
                autoPlay
            />
        </View>
    )
}