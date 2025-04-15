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
      className={`load-more-button ${isEnabled ? "button-enabled" : ""}  `}
      onClick={() => {
        onClick && onClick();
      }}
      disabled={!isEnabled}
    >
      Load More
    </button>
  );
};
