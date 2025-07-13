import { Logo } from "../logo/Logo";
import { SearchInput } from "../search/SearchInput";
import { SearchResults } from "../search/SearchResults";

import styles from "./style.module.css";

export function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <Logo />
        <SearchInput />
      </header>
      <main className={styles.main}>
        <SearchResults />
      </main>
    </div>
  );
}
