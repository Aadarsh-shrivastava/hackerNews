import React from "react";
import { render, screen } from "@testing-library/react";
import { Chip } from "./Chip";
import userEvent from "@testing-library/user-event";

const mockChip = {
  name: "New",
  keyword: "newstories",
};
const mockOnClick = jest.fn();

describe("chip component test", () => {
  test("should render chip", () => {
    render(<Chip chip={mockChip} isSelected={false} onClick={mockOnClick} />);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  test("should have selected class when props passed", () => {
    render(<Chip chip={mockChip} isSelected={true} onClick={mockOnClick} />);
    expect(screen.getByText("New")).toHaveClass("selected");
  });

  test("should call onclick function when clicked", async () => {
    render(<Chip chip={mockChip} isSelected={true} onClick={mockOnClick} />);
    const chip = screen.getByTestId("chip");
    await userEvent.click(chip);
    expect(mockOnClick).toHaveBeenCalled();
  });
});
