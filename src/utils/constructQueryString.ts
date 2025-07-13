function constructQueryString(params?: Record<string, unknown>) {
  if (!params) {
    return "";
  }

  const entries = Object.entries(params);

  if (entries.length === 0) {
    return "";
  }

  let queryString = "?";

  for (const entry of entries) {
    const paramString = entry.join("=");

    if (queryString !== "?") {
      queryString += "&";
    }

    queryString += paramString;
  }

  return queryString;
}

export { constructQueryString };
