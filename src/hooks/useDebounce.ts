import { useEffect, useRef, useState } from "react";

type TimeoutId = ReturnType<typeof setTimeout>;

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef<TimeoutId>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      const id = timeoutRef.current;
      if (id) {
        clearTimeout(id);
      }
    };
  }, [value, delay]);

  return debouncedValue;
}

export { useDebounce };
