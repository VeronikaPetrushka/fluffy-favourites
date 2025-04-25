import Article from "../fluffyParts/Article"
import ScreenWrapper from "../flufflyHelpers/ScreenWrapper";

const ArticleScreen = ({ route }) => {
    const { article } = route.params;
    return (
        <ScreenWrapper child={<Article article={article} />} />
    )
}; 

export default ArticleScreen;