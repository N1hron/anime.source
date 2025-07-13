import { expect, test } from "vitest";

import { removeAnimeDuplicates } from "@/utils/removeAnimeDuplicates";
import type { Anime } from "@/types/api/anime";

const mockAnimeListWithDuplicates = [
  { mal_id: 1 },
  { mal_id: 2 },
  { mal_id: 1 },
  { mal_id: 3 },
  { mal_id: 1 },
  { mal_id: 4 },
  { mal_id: 5 },
  { mal_id: 5 },
] as Anime[];

test("removeAnimeDuplicates should remove anime duplicates from an anime list", () => {
  expect(removeAnimeDuplicates(mockAnimeListWithDuplicates)).toEqual([
    { mal_id: 1 },
    { mal_id: 2 },
    { mal_id: 3 },
    { mal_id: 4 },
    { mal_id: 5 },
  ]);
});
