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
    <div
      className={`load-more-button ${isEnabled && "button-enabled"} `}
      onClick={() => {
        isEnabled && onClick && onClick();
      }}
    >
      Load More
    </div>
  );
};
