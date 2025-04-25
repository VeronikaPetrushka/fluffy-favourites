import Articles from "../fluffyParts/Articles"
import ScreenWrapper from "../flufflyHelpers/ScreenWrapper";

const ArticlesScreen = () => {
    return (
        <ScreenWrapper child={<Articles />} fluffyNav={true} />
    )
};

export default ArticlesScreen;