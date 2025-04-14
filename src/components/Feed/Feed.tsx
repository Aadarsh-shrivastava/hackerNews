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

      <div className={`activity-indicator ${loading ? "" : "hidden"}`}>
        <Dots />
      </div>

      {!loading && (
        <>
          <div
            className={`fallback-message ${stories.length === 0 ? "" : "hidden"}`}
          >
            No stories available at the moment. Please check back later.
          </div>

          <div
            className={`end-of-feed-message ${stories.length > 0 && !hasMore ? "" : "hidden"}`}
          >
            You've reached the end.
          </div>
        </>
      )}

      {hasMore && (
        <LoadMoreButton
          onClick={loadMore}
          isEnabled={stories.length > 0 && !loading}
          isVisible={!loading || !stories.length}
        />
      )}
    </div>
  );
};
