import AddPet from "../fluffyParts/AddPet"
import ScreenWrapper from "../flufflyHelpers/ScreenWrapper";

const AddPetScreen = ({ route }) => {
    const { pet } = route.params || {};
    return (
        <ScreenWrapper child={<AddPet pet={pet} />} />
    )
}; 

export default AddPetScreen;