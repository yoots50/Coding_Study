import { useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router";
import { useDarkMode } from "../context/DarkModeContext";

export default function Navbar({ isDarkMode, onDarkModeChange }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    navigate(`/search/${search}`);
  };
  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Link to={"/"}>youtube</Link>
      </div>
      <form onSubmit={handleSubmit} className={styles.search}>
        <input
          type="text"
          placeholder="search..."
          value={search}
          onChange={handleChange}
        ></input>
        <button>search</button>
      </form>
      <button className={styles.toggle} onClick={toggleDarkMode}>
        {!darkMode && "dark"}
        {darkMode && "light"}
      </button>
    </div>
  );
}
