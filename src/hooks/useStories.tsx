import { useEffect, useState, useCallback } from "react";
import { Story } from "../types/News";

const STORY_BATCH_SIZE = 1;

export function useStories(type = "newstories") {
  const [allIds, setAllIds] = useState<number[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [nextIndex, setNextIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const init = useCallback(async () => {
    setLoading(true);
    setStories([]);
    setAllIds([]);
    setNextIndex(0);

    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/${type}.json`
    );
    const ids = await res.json();
    setAllIds(ids);

    const firstBatch = ids.slice(0, STORY_BATCH_SIZE);
    const newStories = await fetchStoriesByIds(firstBatch);
    
    setStories(newStories);
    setNextIndex(firstBatch.length);
    setLoading(false);
  }, [type]);

  useEffect(() => {
    init();
  }, [init]);

  const loadMore = useCallback(async () => {
    if (loading) return;

    const nextIds = allIds.slice(nextIndex, nextIndex + STORY_BATCH_SIZE);
    setLoading(true);
    const newStories = await fetchStoriesByIds(nextIds);
    setStories((prev) => [...prev, ...newStories]);
    setNextIndex((prev) => prev + nextIds.length);
    setLoading(false);
  }, [allIds, nextIndex, loading]);

  const fetchStoriesByIds = async (ids: number[]) => {
    const storyPromises = ids.map((id) =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
        (res) => res.json()
      )
    );
    return await Promise.all(storyPromises);
  };

  return {
    stories,
    loadMore,
    hasMore: nextIndex < allIds.length,
    loading,
  };
}
