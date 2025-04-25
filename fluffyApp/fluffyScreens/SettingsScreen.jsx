import Settings from "../fluffyParts/Settings"
import ScreenWrapper from "../flufflyHelpers/ScreenWrapper";

const SettingsScreen = () => {
    return (
        <ScreenWrapper child={<Settings />} fluffyNav={true} />
    )
};

export default SettingsScreen;