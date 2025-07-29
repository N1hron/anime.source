import { Logo } from "../logo/Logo";
import { AnimeSearchInput } from "../anime-search/AnimeSearchInput";
import { AnimeSearchResults } from "../anime-search/AnimeSearchResults";

import styles from "./style.module.css";

export function App() {
  return (
    <div className={styles.app}>
      <header id="app-header" className={styles.header}>
        <Logo className={styles.logo} />
        <AnimeSearchInput />
      </header>
      <main className={styles.main}>
        <div className={styles.mainContent}></div>
        <AnimeSearchResults />
      </main>
    </div>
  );
}
