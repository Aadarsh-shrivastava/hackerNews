import React from "react";
import { render, screen } from "@testing-library/react";
import { Feed } from "./Feed";
import { useStories } from "../../hooks/useStories";
import userEvent from "@testing-library/user-event";
import { storyTypeChips } from "../../constants/chipData";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";

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
const mockUserStoriesResponse = {
  stories: stories,
  loading: false,
  loadMore: jest.fn(),
  hasMore: false,
  errors: [],
};

describe("add list button component", () => {
  beforeEach(() => {
    mockedUseStories.mockClear();
    mockedUseStories.mockReturnValue(mockUserStoriesResponse);
  });

  it("renders chips and selects the first by default", () => {
    render(
      <MemoryRouter>
        <Feed />
      </MemoryRouter>
    );
    storyTypeChips.forEach((chip) => {
      expect(screen.getByTestId(`chip-${chip.name}`)).toBeInTheDocument();
    });
  });

  it("renders NewsCard components for each story with correct test IDs", async () => {
    render(
      <MemoryRouter>
        <Feed />
      </MemoryRouter>
    );

    for (const story of stories) {
      const card = await screen.findByTestId(`news-card-${story.id}`);
      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent(story.title);
    }
  });

  it("shows loading indicator when loading is true", () => {
    mockedUseStories.mockReturnValue({
      ...mockUserStoriesResponse,
      loading: true,
    });

    render(
      <MemoryRouter>
        <Feed />
      </MemoryRouter>
    );

    const loader = screen.getByTestId("loading-indicator");
    expect(loader).toBeInTheDocument();
  });

  it("renders Load More button when there are more stories and not loading", async () => {
    const loadMore = jest.fn();

    mockedUseStories.mockReturnValue({
      ...mockUserStoriesResponse,
      loadMore,
      hasMore: true,
    });

    render(
      <MemoryRouter>
        <Feed />
      </MemoryRouter>
    );

    const loadMoreButton = screen.getByText("Load More");
    expect(loadMoreButton).toBeInTheDocument();

    await userEvent.click(loadMoreButton);
    expect(loadMore).toHaveBeenCalled();
  });

  it("shows a end mesage when hasmore is false and not loading", async () => {
    mockedUseStories.mockReturnValue({
      ...mockUserStoriesResponse,
      loading: false,
      hasMore: false,
    });

    render(
      <MemoryRouter>
        <Feed />
      </MemoryRouter>
    );
    const endMessage = screen.getByText("You've reached the end.");
    expect(endMessage).toBeInTheDocument();
  });

  it("changes chip selection and triggers hook again", async () => {
    mockedUseStories.mockReturnValue(mockUserStoriesResponse);

    render(
      <MemoryRouter>
        <Feed />
      </MemoryRouter>
    );
    const newChip = storyTypeChips[1];
    const chipButton = screen.getByTestId(`chip-${newChip.name}`);
    await userEvent.click(chipButton);

    expect(chipButton).toHaveStyle("font-weight: normal");
  });

  it("renders error message when errors are present and not loading", () => {
    mockedUseStories.mockReturnValue({
      ...mockUserStoriesResponse,
      errors: [{ message: "Something went wrong" }],
    });

    render(
      <MemoryRouter initialEntries={["/feed/top"]}>
        <Routes>
          <Route path="/feed/:feedtype" element={<Feed />} />
        </Routes>
      </MemoryRouter>
    );

    const errorMessage = screen.getByText("Something went wrong");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("error-message");
  });

  it("renders fallback message when no stories are present and not loading", () => {
    mockedUseStories.mockReturnValue({
      ...mockUserStoriesResponse,
      stories: [],
    });

    render(
      <MemoryRouter>
        <Feed />
      </MemoryRouter>
    );

    const errorMessage = screen.getByText(
      "No stories available at the moment. Please check back later."
    );
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("fallback-message");
  });
});
