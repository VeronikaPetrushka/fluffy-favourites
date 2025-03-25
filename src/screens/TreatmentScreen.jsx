import { View } from "react-native"
import Treatment from "../components/Treatment"

const TreatmentScreen = ({ route }) => {
    const { treatment } = route.params;

    return (
        <View style={styles.container}>
            <Treatment treatment={treatment} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default TreatmentScreen;