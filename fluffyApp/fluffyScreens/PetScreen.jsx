import Pet from "../fluffyParts/Pet"
import ScreenWrapper from "../flufflyHelpers/ScreenWrapper";

const PetScreen = ({ route }) => {
    const { pet } = route.params;

    return (
        <ScreenWrapper child={<Pet pet={pet} />} fluffyNav={true} />
    )
}; 

export default PetScreen;