import react from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";

export default function Splash() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LottieView
                source={require('../../../assets/splash.json')}
                autoPlay
                loop />
        </View>
    )
}