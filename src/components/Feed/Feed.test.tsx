import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Feed } from "./Feed";
import { useStories } from "../../hooks/useStories";
import userEvent from "@testing-library/user-event";
import { storyTypeChips } from "../../constants/chipData";

jest.mock("../NewsCard/NewsCard", () => ({
  NewsCard: ({ story }: any) => (
    <div data-testid={`news-card-${story.id}`}>{story.title}</div>
  ),
}));

jest.mock("../LoadMoreButton/LoadMoreButton", () => ({
  LoadMoreButton: ({ onClick }: any) => (
    <button onClick={onClick}>Load More</button>
  ),
}));

const stories = [
  { id: 1, title: "First Story" },
  { id: 2, title: "Second Story" },
];

jest.mock("../chip/Chip", () => ({
  Chip: ({ chip, onClick, isSelected }: any) => (
    <button
      data-testid={`chip-${chip.name}`}
      onClick={() => onClick(chip)}
      style={{ fontWeight: isSelected ? "bold" : "normal" }}
    >
      {chip.name}
    </button>
  ),
}));

// mock hook
jest.mock("../../hooks/useStories");

const mockedUseStories = useStories as jest.Mock;

describe("add list button component", () => {
  beforeEach(() => {
    mockedUseStories.mockClear();
    mockedUseStories.mockReturnValue({
      stories: stories,
      loading: false,
      loadMore: jest.fn(),
      hasMore: false,
    });
  });

  it("renders chips and selects the first by default", () => {
    render(<Feed />);
    storyTypeChips.forEach((chip) => {
      expect(screen.getByTestId(`chip-${chip.name}`)).toBeInTheDocument();
    });
  });

  it("renders NewsCard components for each story with correct test IDs", async () => {
    mockedUseStories.mockReturnValue({
      stories: stories,
      loading: false,
      loadMore: jest.fn(),
      hasMore: false,
    });

    render(<Feed />);

    for (const story of stories) {
      const card = await screen.findByTestId(`news-card-${story.id}`);
      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent(story.title);
    }
  });

  it("shows loading indicator when loading is true", () => {
    mockedUseStories.mockReturnValue({
      stories: [],
      loading: true,
      loadMore: jest.fn(),
      hasMore: false,
    });

    render(<Feed />);

    const loader = screen.getByTestId("loading-indicator");
    expect(loader).toBeInTheDocument();
  });

  it("renders Load More button when there are more stories and not loading", async () => {
    const loadMore = jest.fn();

    mockedUseStories.mockReturnValue({
      stories: stories,
      loading: false,
      loadMore,
      hasMore: true,
    });

    render(<Feed />);

    const loadMoreButton = screen.getByText("Load More");
    expect(loadMoreButton).toBeInTheDocument();

    await userEvent.click(loadMoreButton);
    expect(loadMore).toHaveBeenCalled();
  });

  it("shows Load More button when hasMore is true and not loading", async () => {
    const loadMore = jest.fn();
    mockedUseStories.mockReturnValue({
      stories: [{ id: 1, title: "More News" }],
      loading: false,
      loadMore,
      hasMore: true,
    });

    render(<Feed />);
    const button = screen.getByText("Load More");
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(loadMore).toHaveBeenCalled();
  });

  it("changes chip selection and triggers hook again", async () => {
    mockedUseStories.mockReturnValue({
      stories: [],
      loading: false,
      loadMore: jest.fn(),
      hasMore: false,
    });

    render(<Feed />);
    const newChip = storyTypeChips[1];
    const chipButton = screen.getByTestId(`chip-${newChip.name}`);
    await userEvent.click(chipButton);

    expect(chipButton).toHaveStyle("font-weight: bold");
  });
});
