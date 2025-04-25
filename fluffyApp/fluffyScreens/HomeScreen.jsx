import Home from "../fluffyParts/Home"
import ScreenWrapper from "../flufflyHelpers/ScreenWrapper";

const HomeScreen = () => {
    return (
        <ScreenWrapper child={<Home />} fluffyNav={true} />
    )
}; 

export default HomeScreen;