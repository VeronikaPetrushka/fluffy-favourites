import AddTreatment from "../fluffyParts/AddTreatment"
import ScreenWrapper from "../flufflyHelpers/ScreenWrapper";

const AddTreatmentScreen = ({ route }) => {
    const { treatment } = route.params || {};
    return (
        <ScreenWrapper child={<AddTreatment treatment={treatment} />} />
    )
}; 

export default AddTreatmentScreen;