import React from "react";
import "./LoadMoreButton.css";

interface LoadMoreButtonProps {
  onClick?: () => void;
  isEnabled?: boolean;
  isVisible?: boolean;
}
export const LoadMoreButton = ({
  onClick,
  isEnabled = true,
  isVisible = true,
}: LoadMoreButtonProps) => {
  return (
    <button
      className={`load-more-button ${isEnabled ? "button-enabled" : ""} ${!isVisible ? "hidden" : ""} `}
      onClick={() => {
        onClick && onClick();
      }}
      disabled={!isEnabled}
    >
      Load More
    </button>
  );
};
