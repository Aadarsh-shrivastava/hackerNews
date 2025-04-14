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
      {stories.map((story) => (
        <NewsCard key={story.id} story={story} />
      ))}

      {/* Show loader, fallback message, or Load More button based on state */}
      {loading ? (
        <div className="activity-indicator">
          <Dots />
        </div>
      ) : stories.length === 0 ? (
        <div className="fallback-message">
          There are no stories available at the moment. Please check back later.
        </div>
      ) : hasMore ? (
        <LoadMoreButton onClick={loadMore} />
      ) : null}
    </div>
  );
};
