import { useEffect, useState, useCallback } from "react";
import { Story } from "../types/News";

const STORY_BATCH_SIZE = 10;

export function useStories(type = "newstories") {
  const [allIds, setAllIds] = useState<number[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [nextIndex, setNextIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // Load all story IDs (only once)
  useEffect(() => {
    const loadStoryIds = async () => {
      const res = await fetch(
        `https://hacker-news.firebaseio.com/v0/${type}.json`
      );
      const ids = await res.json();
      setAllIds(ids);
    };
    loadStoryIds();
  }, [type]);

  // Fetch stories in batches
  const loadMore = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    console.log("loading");
    const nextIds = allIds.slice(nextIndex, nextIndex + STORY_BATCH_SIZE);
    const storyPromises = nextIds.map((id) =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
        (res) => res.json()
      )
    );
    const newStories = await Promise.all(storyPromises);
    setStories((prev) => [...prev, ...newStories]);
    setNextIndex((prev) => prev + STORY_BATCH_SIZE);
    setLoading(false);
  }, [allIds, nextIndex, loading]);

  useEffect(() => {
    if (allIds.length > 0 && nextIndex === 0 && stories.length === 0) {
      loadMore();
    }
  }, [allIds, loadMore, nextIndex, stories.length]);

  return {
    stories,
    loadMore,
    hasMore: nextIndex < allIds.length,
    loading,
  };
}
