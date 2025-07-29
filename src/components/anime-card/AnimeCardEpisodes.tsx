import styles from "./style.module.css";

type AnimeCardEpisodesProps = {
  amount: number | null;
};

export function AnimeCardEpisodes({ amount }: AnimeCardEpisodesProps) {
  if (!amount) return null;

  return (
    <p className={styles.episodes}>
      {amount} {amount === 1 ? "episode" : "episodes"}
    </p>
  );
}
