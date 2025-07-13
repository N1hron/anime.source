function getCurrentTime(timezone?: string) {
  const values = Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  })
    .format(new Date())
    .split(/,\ |:|\//);

  return {
    year: parseInt(values[2]),
    month: parseInt(values[0]),
    day: parseInt(values[1]),
    hours: parseInt(values[3]),
    minutes: parseInt(values[4]),
    seconds: parseInt(values[5]),
  };
}

export { getCurrentTime };
