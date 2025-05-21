import { useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    navigate(`/search/${search}`)
  };
  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}><Link to={"/"}>youtube</Link></div>
      <form onSubmit={handleSubmit} className={styles.search}>
        <input
          type="text"
          placeholder="search..."
          value={search}
          onChange={handleChange}
        ></input>
        <button>search</button>
      </form>
    </div>
  );
}
