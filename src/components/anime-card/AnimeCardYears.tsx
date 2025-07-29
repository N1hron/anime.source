import styles from "./style.module.css";

type AnimeCardYearsProps = {
  from: number | null;
  to: number | null;
};

export function AnimeCardYears({ from, to }: AnimeCardYearsProps) {
  if (!from) return null;

  return <p className={styles.years}>{from + (to ? "-" + to : "")}</p>;
}
