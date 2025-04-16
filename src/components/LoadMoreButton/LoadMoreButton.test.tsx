import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { LoadMoreButton } from "./LoadMoreButton";

const mockLoadMore = jest.fn();

describe("load more button component", () => {
  test("render add list button with name", () => {
    render(<LoadMoreButton onClick={mockLoadMore} />);
    expect(screen.getByText("Load More")).toBeInTheDocument();
  });

  test("calls on load more butto clicked", async () => {
    render(<LoadMoreButton onClick={mockLoadMore} />);

    const button = screen.getByTestId("load-more-button");
    await userEvent.click(button);
    expect(mockLoadMore).toHaveBeenCalled();
  });

  test("render when isenabled false and onclick is not passed", async () => {
    render(<LoadMoreButton isEnabled={false} />);

    const button = screen.getByTestId("load-more-button");

    expect(button).not.toHaveClass("button-enabled");
    expect(button).toHaveAttribute("disabled");
  });

  it("does not throw when clicked and no onClick is passed", async () => {
    render(<LoadMoreButton />);

    const button = screen.getByTestId("load-more-button");
    expect(button).toBeEnabled();

    await userEvent.click(button);

    expect(button).toBeInTheDocument();
  });
});
