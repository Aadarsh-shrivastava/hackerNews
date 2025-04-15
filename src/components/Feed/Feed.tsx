import React from "react";
import { useMemo, useState } from "react";
import { useStories } from "../../hooks/useStories";
import { LoadMoreButton } from "../LoadMoreButton/LoadMoreButton";
import { NewsCard } from "../NewsCard/NewsCard";
import { Chip } from "../chip/Chip";
import { storyTypeChips } from "../../constants/chipData";
import { Dots } from "react-activity";
import "react-activity/dist/library.css";
import "./Feed.css";

export const Feed = () => {
  const [selectedChip, setSelectedChip] = useState(storyTypeChips[0]);

  const selectedKeyword = useMemo(() => selectedChip.keyword, [selectedChip]);
  const { stories, loading, loadMore, hasMore } = useStories(
    `${selectedKeyword}`
  );
  return (
    <div className="feed-container">
      {/* list of cswitchable tab chips */}
      <div className="chips-container">
        {storyTypeChips.map((chip) => (
          <Chip
            key={chip.name}
            chip={chip}
            isSelected={chip.name === selectedChip.name}
            onClick={setSelectedChip}
          />
        ))}
      </div>

      {/* news card list component */}
      {stories.length > 0 &&
        stories.map((story) => <NewsCard key={story.id} story={story} />)}

      {loading ? (
        <div className="activity-indicator ">
          <Dots />
        </div>
      ) : stories.length ? (
        !hasMore && (
          <div className="end-of-feed-message">You've reached the end.</div>
        )
      ) : (
        <div className="fallback-message">
          No stories available at the moment. Please check back later.
        </div>
      )}

      {hasMore && !loading && (
        <LoadMoreButton
          onClick={loadMore}
          isEnabled={stories.length > 0 && !loading}
        />
      )}
    </div>
  );
};
