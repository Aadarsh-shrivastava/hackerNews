import React from "react";
import { ChipType } from "../../types/Chip";
import "./Chip.css";

interface ChipProps {
  chip: ChipType;
  isSelected: boolean;
  onClick: (name: ChipType) => void;
}
export const Chip = ({ chip, isSelected, onClick }: ChipProps) => {
  return (
    <div
      className={`chip-container ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(chip)}
    >
      {chip.name}
    </div>
  );
};
