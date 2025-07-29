import type { MouseEvent } from "react";

import PinIcon from "@icons/pin.svg?react";
import UnpinIcon from "@icons/unpin.svg?react";
import { Button } from "../button/Button";
import type { Anime } from "@/types/api/anime";

import styles from "./style.module.css";

type AnimeCardPinProps = Pick<Anime, "mal_id">;

export function AnimeCardPin({ mal_id }: AnimeCardPinProps) {
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
