import { useEffect, useRef, type RefObject } from "react";

export type UseIntersectionObserverOptions = Omit<IntersectionObserverInit, "root"> & {
  rootRef: RefObject<IntersectionObserverInit["root"]>;
};

export function useIntersectionObserver<T extends Element>(
  onChange: (entry: IntersectionObserverEntry) => void,
  options?: UseIntersectionObserverOptions
) {
  const targetRef = useRef<T>(null);
  const rootMargin = options && options.rootMargin;
  const threshold = options && options.threshold;

  useEffect(() => {
    const target = targetRef.current;
    const root = options && options.rootRef.current;

    if (target) {
      const observer = new IntersectionObserver(
        (entries) => {
          onChange(entries[0]);
        },
        {
          root,
          rootMargin,
          threshold,
        }
      );

      observer.observe(target);

      return () => {
        observer.disconnect();
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange, rootMargin, threshold]);

  return targetRef;
}
