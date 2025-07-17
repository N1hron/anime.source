import type { MouseEvent } from "react";

import { Button } from "../button/Button";
import PinIcon from "@icons/pin.svg?react";
import UnpinIcon from "@icons/unpin.svg?react";
import type { Anime } from "@/types/api/anime";

import styles from "./style.module.css";

export function Pin({ mal_id }: Pick<Anime, "mal_id">) {
  const isPinned = false;

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();

    if (isPinned) {
      console.log("Unpin", mal_id);
    } else {
      console.log("Pin", mal_id);
    }
  }

  return (
    <Button icon className={styles.pin} onClick={handleClick}>
      {isPinned ? <UnpinIcon title="Unpin card" /> : <PinIcon title="Pin card" />}
    </Button>
  );
}
