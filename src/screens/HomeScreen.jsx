import { View } from "react-native"
import Home from "../components/Home"
import Navigation from "../components/Navigation";

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Home />
            <View style={styles.navigation}>
                <Navigation />
            </View>
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },
    navigation: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        zIndex: 10
    }
}

export default HomeScreen;