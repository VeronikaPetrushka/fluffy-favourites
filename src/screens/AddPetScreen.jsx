import { View } from "react-native"
import AddPet from "../components/AddPet"

const AddPetScreen = ({ route }) => {
    const { pet } = route.params || {};
    return (
        <View style={styles.container}>
            <AddPet pet={pet} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default AddPetScreen;