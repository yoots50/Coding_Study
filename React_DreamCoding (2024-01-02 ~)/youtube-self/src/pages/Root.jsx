import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";

export default function Root({ isDarkMode, onDarkModeChange }) {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
