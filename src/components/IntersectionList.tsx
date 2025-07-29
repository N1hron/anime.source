import { createContext, useContext, useRef, type ComponentPropsWithoutRef } from "react";

import {
  useIntersectionObserver,
  type UseIntersectionObserverOptions,
} from "@/hooks/useIntersectionObserver";

const IntersectionListContext = createContext<UseIntersectionObserverOptions | undefined>(
  undefined
);

export type IntersectionListOptions = Omit<IntersectionObserverInit, "root">;

type IntersectionListProps = ComponentPropsWithoutRef<"ul"> & {
  options?: IntersectionListOptions;
};

export function IntersectionList({ options, children, ...props }: IntersectionListProps) {
  const rootRef = useRef<HTMLUListElement>(null);
  const observerOptions = {
    rootRef,
    ...options,
  };

  return (
    <ul ref={rootRef} {...props}>
      <IntersectionListContext value={observerOptions}>{children}</IntersectionListContext>
    </ul>
  );
}

type IntersectionListItemProps = ComponentPropsWithoutRef<"li"> & {
  onIntersectionChange: (entry: IntersectionObserverEntry) => void;
};

function IntersectionListItem({ onIntersectionChange, ...props }: IntersectionListItemProps) {
  const observerOptions = useContext(IntersectionListContext);
  const targetRef = useIntersectionObserver<HTMLLIElement>(onIntersectionChange, observerOptions);

  return <li ref={targetRef} {...props} />;
}

IntersectionList.Item = IntersectionListItem;
