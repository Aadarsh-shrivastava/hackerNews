import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { LoadMoreButton } from "./LoadMoreButton";

const mockLoadMore = jest.fn();

describe("add list button component", () => {
  test("render add list button with name", () => {
    render(<LoadMoreButton onClick={mockLoadMore} />);
    expect(screen.getByText("Load More")).toBeInTheDocument();
  });

  test("calls onAddListClick when clicked", async () => {
    render(<LoadMoreButton onClick={mockLoadMore} />);

    const button = screen.getByTestId("load-more-button");
    await userEvent.click(button);
    expect(mockLoadMore).toHaveBeenCalled();
  });
});
