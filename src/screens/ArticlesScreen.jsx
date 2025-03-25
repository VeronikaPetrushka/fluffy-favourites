import { View } from "react-native"
import Articles from "../components/Articles"
import Navigation from "../components/Navigation";

const ArticlesScreen = () => {
    return (
        <View style={styles.container}>
            <Articles />
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

export default ArticlesScreen;