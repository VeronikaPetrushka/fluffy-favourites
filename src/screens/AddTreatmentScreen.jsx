import { View } from "react-native"
import AddTreatment from "../components/AddTreatment"

const AddTreatmentScreen = ({ route }) => {
    const { treatment } = route.params || {};
    return (
        <View style={styles.container}>
            <AddTreatment treatment={treatment} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default AddTreatmentScreen;