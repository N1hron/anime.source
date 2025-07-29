import clsx from "clsx";
import { useCallback, useState, type ComponentPropsWithoutRef } from "react";

import { IntersectionList, type IntersectionListOptions } from "../IntersectionList";

import styles from "./style.module.css";

type RevealListProps = ComponentPropsWithoutRef<"ul"> & {
  options?: IntersectionListOptions;
  horizontal?: boolean;
};

export function RevealList({ options, horizontal, className, ...props }: RevealListProps) {
  const cl = clsx(styles.revealList, horizontal && styles.horizontal, className);

  return (
    <IntersectionList
      className={cl}
      options={{
        threshold: 1,
        ...options,
      }}
      {...props}
    />
  );
}

type RevealListItemProps = ComponentPropsWithoutRef<"li"> & {
  index?: number;
  onRevealChange?: (isRevealed: boolean, item: IntersectionObserverEntry) => void;
};

function RevealListItem({
  index = 0,
  onRevealChange,
  className,
  children,
  ...props
}: RevealListItemProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const cl = clsx(styles.item, !isRevealed && styles.blurred, className);
  const appearDelay = (index + 1) ** 0.75 * 0.1 + "s";

  const onIntersectionChange = useCallback(
    (entry: IntersectionObserverEntry) => {
      setIsRevealed(entry.isIntersecting);
      if (onRevealChange) {
        onRevealChange(entry.isIntersecting, entry);
      }
    },
    [onRevealChange]
  );

  return (
    <IntersectionList.Item className={cl} onIntersectionChange={onIntersectionChange} {...props}>
      <div className={styles.itemContent} style={{ animationDelay: appearDelay }}>
        {children}
      </div>
    </IntersectionList.Item>
  );
}

RevealList.Item = RevealListItem;
