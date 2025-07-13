import clsx from "clsx";
import type { ComponentProps } from "react";

import styles from "./style.module.css";

type TextInputProps = ComponentProps<"input"> & {
  type?: "text" | "password" | "email" | "search" | "tel" | "url" | "number" | "textarea";
};

export function TextInput({ type = "text", className, ...props }: TextInputProps) {
  return <input className={clsx(styles.textInput, className)} {...props} />;
}
