import { useStories } from "../../hooks/useStories";
import { LoadMoreButton } from "../LoadMoreButton/LoadMoreButton";
import { NewsCard } from "../NewsCard/NewsCard";
import "./Feed.css";

export const Feed = () => {
  const { stories, loading, loadMore } = useStories("newstories");

  return (
    <div className="feed-container">
      {stories.map((story) => (
        <NewsCard key={story.id} story={story} />
      ))}
      <LoadMoreButton onClick={loadMore} />
    </div>
  );
};
