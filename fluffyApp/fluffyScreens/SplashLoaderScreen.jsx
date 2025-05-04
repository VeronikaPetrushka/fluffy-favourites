import SplashLoader from "../fluffyParts/SplashLoader"
import ScreenWrapper from "../flufflyHelpers/ScreenWrapper";

const SplashLoaderScreen = () => {
    return (
        <ScreenWrapper child={<SplashLoader />} />
    )
}; 

export default SplashLoaderScreen;