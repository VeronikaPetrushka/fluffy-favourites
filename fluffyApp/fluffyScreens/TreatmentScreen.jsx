import Treatment from "../fluffyParts/Treatment"
import ScreenWrapper from "../flufflyHelpers/ScreenWrapper";

const TreatmentScreen = ({ route }) => {
    const { treatment } = route.params;

    return (
        <ScreenWrapper child={<Treatment treatment={treatment} />} />
    )
};

export default TreatmentScreen;