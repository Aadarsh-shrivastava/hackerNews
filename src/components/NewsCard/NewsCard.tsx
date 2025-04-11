import React from "react";
import "./NewsCard.css";
import { Story } from "../../types/News";
import { timeAgo } from "../../utils/caulculateTime";

interface NewsCardProps {
  story: Story;
}
export const NewsCard = ({ story }: NewsCardProps) => {
  return (
    <div className="news-card casts-shadow">
      <div className="news-title">
        <a href={story.url}>{story.title}</a>
      </div>
      <div className="news-description">{`Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, …when an unknown printer took a galley of type and scrambled`}</div>
      <div className="time-and-author">
        {timeAgo(story.time)} | {story.by}
      </div>
    </div>
  );
};
