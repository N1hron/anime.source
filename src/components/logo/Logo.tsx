import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./style.module.css";

type LogoProps = ComponentPropsWithoutRef<"h1">;

export function Logo({ className, ...props }: LogoProps) {
  return (
    <h1 className={clsx(styles.logo, className)} {...props}>
      <span className={styles.underline}>anime</span>.source
    </h1>
  );
}
