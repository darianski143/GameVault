import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

// Tema de pornire: cea a sistemului de operare
function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// NavLink marchează singur pagina curentă
function navClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

// Antetul, navigația și subsolul, scrise o singură dată pentru toate paginile
export default function Layout() {
  const [tema, setTema] = useState(temaInitiala);

  // Comutarea temei: state-ul pentru buton, atributul data-theme pentru CSS
  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <span className={styles.logo}>GameVault</span>
          <nav className={styles.nav} data-testid="nav">
            <NavLink to="/" end className={navClass}>
              Colecția
            </NavLink>
            <NavLink to="/despre" className={navClass}>
              Despre
            </NavLink>
            <button
              className={styles.themeToggle}
              onClick={handleTema}
              aria-pressed={tema === "dark"}
            >
              {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
            </button>
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>Proiect Tehnologii Web</footer>
    </>
  );
}
