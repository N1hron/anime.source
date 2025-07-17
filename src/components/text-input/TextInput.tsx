import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

import styles from "./style.module.css";

type TextInputProps = ComponentPropsWithRef<"input"> & {
  type?: "text" | "password" | "email" | "search" | "tel" | "url" | "number" | "textarea";
};

export function TextInput({ type = "text", className, ...props }: TextInputProps) {
  return <input className={clsx(styles.textInput, className)} type={type} {...props} />;
}
