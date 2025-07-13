import styles from "./style.module.css";

export function Logo() {
  return (
    <h1 className={styles.logo}>
      <span className={styles.underline}>anime</span>.source
    </h1>
  );
}
