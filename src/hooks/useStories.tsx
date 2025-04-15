import { useEffect, useState, useCallback } from "react";
import { Story } from "../types/News";
import { storyTypeChips } from "../constants/chipData";

const STORY_BATCH_SIZE = 5;
type FetchError = {
  id: number;
  message: string;
};
// custom hook to fetch a list of ids first, based on those ids fetch list of paginated stories
export function useStories(type = "newstories") {
  const [allIds, setAllIds] = useState<number[]>([]);
  const [errors, setErrors] = useState<FetchError[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [nextIndex, setNextIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // initial function to fetch all ids and fetch initial batch of stories
  const init = useCallback(async () => {
    setLoading(true);
    setStories([]);
    setAllIds([]);
    setNextIndex(0);
    setErrors([]);

    try {
      const res = await fetch(
        `https://hacker-news.firebaseio.com/v0/${type}stories.json`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch stories.");
      }

      const ids = await res.json();

      if (!Array.isArray(ids)) {
        throw new Error("Invalid data format.");
      }

      setAllIds(ids);

      const firstBatch = ids.slice(0, STORY_BATCH_SIZE);
      const newStories = await fetchStoriesByIds(firstBatch);

      setStories(newStories.stories);
      setErrors(newStories.errors);
      setNextIndex(firstBatch.length);
    } catch (err: any) {
      setErrors([{ id: -1, message: err.message || "Unknow error occured." }]);
    } finally {
      setLoading(false);
    }
  }, [type]);

  //call initial fetches
  useEffect(() => {
    if (storyTypeChips.some((chip) => chip.keyword === type)) {
      init().catch(() => {
        setErrors([{ id: -1, message: "Couldn't fetch story IDs." }]);
        setLoading(false); // optional but safe
      });
    } else {
      setErrors([{ id: -1, message: "Stories not found." }]);
    }
  }, [init]);

  //function fetches one batch of stories frm current index
  const loadMore = useCallback(async () => {
    if (loading) return;

    const nextIds = allIds.slice(nextIndex, nextIndex + STORY_BATCH_SIZE);
    setLoading(true);
    const newStories = await fetchStoriesByIds(nextIds);
    setStories((prev) => [...prev, ...newStories.stories]);
    setErrors((prev) => [...prev, ...newStories.errors]);
    setNextIndex((prev) => prev + nextIds.length);
    setLoading(false);
  }, [allIds, nextIndex, loading]);

  //function fetches stories from a list of ids

  const fetchStoriesByIds = async (
    ids: number[]
  ): Promise<{ stories: Story[]; errors: FetchError[] }> => {
    if (!ids || ids.length === 0) return { stories: [], errors: [] };

    const storyPromises = ids.map(async (id) => {
      try {
        const res = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );

        if (!res.ok) {
          return {
            story: null,
            error: { id, message: `unable to fetch stories.` },
          };
        }

        const data = await res.json();

        if (!data || typeof data !== "object") {
          return {
            story: null,
            error: { id, message: "Invalid JSON or empty response." },
          };
        }

        return { story: data as Story, error: null };
      } catch (err: any) {
        return {
          story: null,
          error: { id, message: err.message || "Unknown fetch error." },
        };
      }
    });

    const results = await Promise.all(storyPromises);

    const stories = results
      .map((r) => r.story)
      .filter((s): s is Story => s !== null);

    const errors = results
      .map((r) => r.error)
      .filter((e): e is FetchError => e !== null);

    return { stories, errors };
  };

  return {
    stories,
    loadMore,
    hasMore: nextIndex < allIds.length,
    loading,
    errors,
  };
}
