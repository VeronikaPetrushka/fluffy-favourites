import { View } from "react-native"
import Pet from "../components/Pet"

const PetScreen = ({ route }) => {
    const { pet } = route.params;

    return (
        <View style={styles.container}>
            <Pet pet={pet} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default PetScreen;