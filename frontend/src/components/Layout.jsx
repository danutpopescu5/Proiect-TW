import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

// NavLink marchează singur pagina curentă
function navClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

export default function Layout() {
  const [tema, setTema] = useState(() => {
    const current = document.documentElement.dataset.theme || "dark";
    document.documentElement.dataset.theme = current;
    return current;
  });

  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <div className={styles.brand}>
            <span className={styles.logo}>StudioDNG</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <nav className={styles.nav} data-testid="nav">
              <NavLink to="/" end className={navClass}>
                Proiecte
              </NavLink>
              <NavLink to="/despre" className={navClass}>
                Despre
              </NavLink>
            </nav>
            <button className={styles.themeBtn} onClick={handleTema} aria-label="Comută tema">
              {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
            </button>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>Proiect Tehnologii Web - StudioDNG</footer>
    </>
  );
}
