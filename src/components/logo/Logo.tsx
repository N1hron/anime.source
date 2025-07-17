import clsx from "clsx";
import styles from "./style.module.css";
import type { ComponentPropsWithoutRef } from "react";

type LogoProps = ComponentPropsWithoutRef<"h1">;

export function Logo({ className, ...props }: LogoProps) {
  return (
    <h1 className={clsx(styles.logo, className)} {...props}>
      <span className={styles.underline}>anime</span>.source
    </h1>
  );
}
