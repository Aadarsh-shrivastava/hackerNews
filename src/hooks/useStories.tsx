import { useEffect, useState, useCallback } from "react";
import { Story } from "../types/News";

const STORY_BATCH_SIZE = 10;

// custom hook to fetch a list of ids first, based on those ids fetch list of paginated stories
export function useStories(type = "newstories") {
  const [allIds, setAllIds] = useState<number[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [nextIndex, setNextIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // initial functio to fetch all ids and fetch initial batch of stories
  const init = useCallback(async () => {
    setLoading(true);
    setStories([]);
    setAllIds([]);
    setNextIndex(0);

    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/${type}.json`
    );
    const ids = await res.json();

    // set all ids
    setAllIds(ids);

    //fetching first batch of stories
    const firstBatch = ids.slice(0, STORY_BATCH_SIZE);
    const newStories = await fetchStoriesByIds(firstBatch);

    setStories(newStories);
    setNextIndex(firstBatch.length);
    setLoading(false);
  }, [type]);

  //call initial fetches
  useEffect(() => {
    init();
  }, [init]);

  //function fetches one batch of stories frm current index
  const loadMore = useCallback(async () => {
    if (loading) return;

    const nextIds = allIds.slice(nextIndex, nextIndex + STORY_BATCH_SIZE);
    setLoading(true);
    const newStories = await fetchStoriesByIds(nextIds);
    setStories((prev) => [...prev, ...newStories]);
    setNextIndex((prev) => prev + nextIds.length);
    setLoading(false);
  }, [allIds, nextIndex, loading]);

  //function fetches stories from a list of ids
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
    hasMore: nextIndex === 0 ? true : nextIndex < allIds.length,
    loading,
  };
}
