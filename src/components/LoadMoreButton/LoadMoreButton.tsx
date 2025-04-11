import React from "react";
import "./LoadMoreButton.css";

interface LoadMoreButtonProps {
  onClick: () => void;
}
export const LoadMoreButton = ({ onClick }: LoadMoreButtonProps) => {
  return <div className="load-more-button casts-shadow" onClick={onClick}>Load More</div>;
};
