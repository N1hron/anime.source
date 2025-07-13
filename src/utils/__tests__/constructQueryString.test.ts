import { describe, test, expect } from "vitest";

import { constructQueryString } from "@/utils/constructQueryString";

describe("constructQueryString", () => {
  test("should return empty string for empty params", () => {
    expect(constructQueryString({})).toBe("");
    expect(constructQueryString()).toBe("");
  });

  test("should return query string for specified params", () => {
    expect(
      constructQueryString({
        a: 1,
        b: 2,
        c: "3",
        d: true,
      })
    ).toBe("?a=1&b=2&c=3&d=true");

    expect(
      constructQueryString({
        a: "",
      })
    ).toBe("?a=");
  });
});
