import type { MouseEvent } from "react";

import PinIcon from "@icons/pin.svg?react";
import UnpinIcon from "@icons/unpin.svg?react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToPins, removeFromPins, selectIsPinned } from "@/store/slices/ui";
import type { Anime } from "@/types/api/anime";

import styles from "./style.module.css";

export function AnimeCardPin({ mal_id }: Pick<Anime, "mal_id">) {
  const dispatch = useAppDispatch();
  const isPinned = useAppSelector((state) => selectIsPinned(state, mal_id));

  function handlePinClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();

    if (isPinned) {
      dispatch(removeFromPins(mal_id));
    } else {
      dispatch(addToPins(mal_id));
    }
  }

  return (
    <button className={styles.pin} onClick={handlePinClick}>
      {isPinned ? <UnpinIcon title="Unpin" /> : <PinIcon title="Pin" />}
    </button>
  );
}
