import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./style.module.css";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  icon?: boolean;
};

export function Button({ icon, className, ...props }: ButtonProps) {
  return <button className={clsx(styles.button, icon && styles.icon, className)} {...props} />;
}
