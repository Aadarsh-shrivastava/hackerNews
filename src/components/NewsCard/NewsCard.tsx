import React from "react";
import { Story } from "../../types/News";
import { timeAgo } from "../../utils/caulculateTime";
import "./NewsCard.css";

interface NewsCardProps {
  story: Story;
}
export const NewsCard = ({ story }: NewsCardProps) => {
  return (
    <a
      href={story.url}
      target="_blank"
      rel="noopener noreferrer"
      className="news-card-container casts-shadow block no-underline text-inherit"
    >
      <div className="news-title">{story.title}</div>
      <div className="news-description">
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s...
      </div>
      <div className="time-and-author">
        {timeAgo(story.time)} | {story.by}
      </div>
    </a>
  );
};
