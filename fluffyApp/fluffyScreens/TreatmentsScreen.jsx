import Treatments from "../fluffyParts/Treatments"
import ScreenWrapper from "../flufflyHelpers/ScreenWrapper";

const TreatmentsScreen = () => {
    return (
        <ScreenWrapper child={<Treatments />} fluffyNav={true} />
    )
}; 

export default TreatmentsScreen;