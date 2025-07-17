import { Logo } from "../logo/Logo";
import { AnimeSearch } from "../anime-search/AnimeSearch";

import styles from "./style.module.css";

export function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <Logo className={styles.logo} />
        <AnimeSearch />
      </header>
      <main className={styles.main}></main>
    </div>
  );
}
