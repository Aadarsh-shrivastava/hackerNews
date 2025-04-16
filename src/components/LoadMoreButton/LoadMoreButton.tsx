import React from "react";
import "./LoadMoreButton.css";

interface LoadMoreButtonProps {
  onClick?: () => void;
  isEnabled?: boolean;
}
export const LoadMoreButton = ({
  onClick,
  isEnabled = true,
}: LoadMoreButtonProps) => {
  return (
    <button
      data-testid="loading-indicator"
      className={`load-more-button ${isEnabled ? "button-enabled" : ""}  `}
      onClick={() => {
        onClick && onClick();
      }}
      disabled={!isEnabled}
      data-testid="load-more-button"
    >
      Load More
    </button>
  );
};
