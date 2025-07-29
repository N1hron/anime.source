import styles from "./style.module.css";

type AnimeCardTitlesProps = {
  main: string | null;
  english: string | null;
};

export function AnimeCardTitles({ main, english }: AnimeCardTitlesProps) {
  return (
    <div className={styles.titles}>
      {main && (
        <h3 className={styles.mainTitle} title={main}>
          {main}
        </h3>
      )}
      {english && (
        <p className={styles.englishTitle} title={english}>
          {english}
        </p>
      )}
    </div>
  );
}
