import React from "react";
import { useStories } from "../../hooks/useStories";
import { LoadMoreButton } from "../LoadMoreButton/LoadMoreButton";
import { NewsCard } from "../NewsCard/NewsCard";
import { Chip } from "../chip/Chip";
import { storyTypeChips } from "../../constants/chipData";
import { Dots } from "react-activity";
import "react-activity/dist/library.css";
import "./Feed.css";
import { useNavigate, useParams } from "react-router-dom";

export const Feed = () => {
  const { feedtype } = useParams();
  const navigate = useNavigate();
  const { stories, loading, loadMore, hasMore } = useStories(
    `${feedtype}stories`
  );

  return (
    <div className="feed-container">
      {/* list of cswitchable tab chips */}
      <div className="chips-container">
        {storyTypeChips.map((chip) => (
          <Chip
            key={chip.name}
            chip={chip}
            isSelected={chip.keyword === feedtype}
            onClick={() => navigate(`/${chip.keyword}`)}
          />
        ))}
      </div>

      {/* news card list component */}
      {stories.map((story) => (
        <NewsCard key={story.id} story={story} />
      ))}

      {/* Initial Loading State */}
      {loading && stories.length === 0 && (
        <>
          <div className="activity-indicator">
            <Dots />
          </div>
          <LoadMoreButton isEnabled={false} />
        </>
      )}

      {/* Fallback when no stories exist */}
      {!loading && stories.length === 0 && (
        <div className="fallback-message">
          No stories available at the moment. Please check back later.
        </div>
      )}

      {/* Load More or Loader */}
      {stories.length > 0 && (
        <>
          {loading && (
            <div className="activity-indicator">
              <Dots />
            </div>
          )}

          {!loading && hasMore && <LoadMoreButton onClick={loadMore} />}

          {!loading && !hasMore && (
            <div className="end-of-feed-message">You’ve reached the end.</div>
          )}
        </>
      )}
    </div>
  );
};
