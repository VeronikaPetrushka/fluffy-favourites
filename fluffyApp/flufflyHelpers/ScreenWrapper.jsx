import { View, Dimensions } from "react-native"
import FluffyNavigation from "../fluffyParts/FluffyNavigation"
import LinearGradient from "react-native-linear-gradient";

const { height } = Dimensions.get('window');

const ScreenWrapper = ({ child, fluffyNav }) => {
    return (
        <LinearGradient colors={['#26C642', '#03BADC']} style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                
                <View style={{ width: '100%', height: '100%', paddingTop: height * 0.07, padding: 20, paddingBottom: 40 }}>{
                    child}
                </View>

                {
                    fluffyNav && (
                        <View style={{ width: '100%', position: 'absolute', bottom: 30, alignSelf: 'center', zIndex: 10 }}>
                            <FluffyNavigation />
                        </View>
                    )
                }

            </View>
        </LinearGradient>
    )
};

export default ScreenWrapper;