import { renderHook, act } from "@testing-library/react";
import { useStories } from "./useStories";
import { Story } from "../types/News";

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

describe("useStories", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetch story ids and first batch of stories successfully", async () => {
    const mockIds = [1, 2, 3, 4, 5, 6, 7, 8];
    const mockStory = (id: number): Story => ({
      id,
      title: `Story ${id}`,
      by: `author${id}`,
      time: Date.now(),
      url: `https://example.com/${id}`,
      type: "story",
    });

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockIds,
    });

    mockIds.slice(0, 5).forEach((id) => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockStory(id),
      });
    });

    const { result } = renderHook(() => useStories("new"));

    await act(async () => {
      await flushPromises();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.stories.length).toBe(5);
    expect(result.current.hasMore).toBe(true);
    expect(result.current.errors.length).toBe(0);
  });

  it("handles error when fetching story Ids", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useStories("new"));

    await act(async () => {
      await flushPromises();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.stories.length).toBe(0);
    expect(result.current.errors.length).toBeGreaterThan(0);
  });

  it("loads more stories when load more is called", async () => {
    const mockIds = [1, 2, 3, 4, 5, 6, 7, 8];
    const mockStory = (id: number): Story => ({
      id,
      title: `Story ${id}`,
      by: `author${id}`,
      time: Date.now(),
      url: `https://example.com/${id}`,
      type: "story",
    });

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockIds,
    });

    mockIds.slice(0, 5).forEach((id) => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockStory(id),
      });
    });

    // Remaining stories for loadMore
    mockIds.slice(5, 7).forEach((id) => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockStory(id),
      });
    });

    const { result } = renderHook(() => useStories("new"));

    await act(async () => {
      await flushPromises();
    });

    expect(result.current.stories.length).toBe(5);

    await act(async () => {
      await result.current.loadMore();
      await flushPromises();
    });

    expect(result.current.stories.length).toBe(7);
    expect(result.current.hasMore).toBe(false);
  });

  it("throws error message when wrong param is passed", async () => {
    const { result } = renderHook(() => useStories("trending"));

    await act(async () => {
      await flushPromises();
    });

    expect(result.current.stories.length).toBe(0);
    expect(result.current.loading).toBe(false);
    expect(result.current.errors.length).toBe(1);
  });

  it("throws error when no array id is found", async () => {
    const mockIds = null;

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockIds,
    });

    const { result } = renderHook(() => useStories("new"));

    await act(async () => {
      await flushPromises();
    });

    expect(result.current.errors.length).toBeGreaterThan(0);
  });

  it("throws type error when fetch fails", async () => {
    const mockIds = null;

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockIds,
    });

    const { result } = renderHook(() => useStories("new"));

    await act(async () => {
      await flushPromises();
    });

    expect(result.current.errors.length).toBeGreaterThan(0);
  });

  it("handles network type error correctly", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(
      new TypeError("Failed to fetch")
    );

    const { result } = renderHook(() => useStories("new"));
    await act(async () => {
      await flushPromises();
    });

    expect(result.current.loading).toBe(false);

    await act(async () => {
      await flushPromises();
    });

    expect(result.current.errors.length).toBeGreaterThan(0);
    expect(result.current.errors[0].message).toMatch(/failed to fetch/i);
  });

  it("throws error when stories response is not ok", async () => {
    const mockIds = [1, 2, 3, 4, 5, 6, 7, 8];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockIds,
    });

    mockIds.slice(0, 5).forEach((id) => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => null,
      });
    });

    const { result } = renderHook(() => useStories("new"));

    await act(async () => {
      await flushPromises();
    });

    expect(result.current.stories.length).toBe(0);
    expect(result.current.errors.length).toBeGreaterThan(0);
  });

  it("throws error when stories response is ok but data is invalid", async () => {
    const mockIds = [1, 2, 3, 4, 5, 6, 7, 8];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockIds,
    });

    mockIds.slice(0, 5).forEach((id) => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => null,
      });
    });

    const { result } = renderHook(() => useStories("new"));

    await act(async () => {
      await flushPromises();
    });

    expect(result.current.stories.length).toBe(0);
    expect(result.current.errors.length).toBeGreaterThan(0);
  });
});
