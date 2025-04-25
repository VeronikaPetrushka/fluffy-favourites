import Quiz from "../fluffyParts/Quiz"
import ScreenWrapper from "../flufflyHelpers/ScreenWrapper";

const QuizScreen = () => {
    return (
        <ScreenWrapper child={<Quiz />} fluffyNav={true} />
    )
};

export default QuizScreen;