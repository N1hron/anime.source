import clsx from "clsx";
import { useState, type ComponentPropsWithoutRef } from "react";

import styles from "./style.module.css";

type ImageProps = ComponentPropsWithoutRef<"img">;

export function Image({ className, src, ...props }: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [prevSrc, setPrevSrc] = useState(src);
  const cl = clsx(styles.image, isLoading && styles.loading, className);

  if (prevSrc !== src) {
    setIsLoading(true);
    setPrevSrc(src);
  }

  function handleLoadEnd() {
    setIsLoading(false);
  }

  return <img className={cl} src={src} onLoad={handleLoadEnd} onError={handleLoadEnd} {...props} />;
}
