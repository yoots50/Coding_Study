import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/FirebaseProvider";

export default function Header() {
  const { auth } = useFirebase();
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    setUser(userCredential.user);
  };
  console.log(user);
  return (
    <div className="flex justify-between items-center py-5 border-b-2 border-b-neutral-500 mb-2">
      <button
        className="flex gap-2 items-center text-3xl text-red-400"
        onClick={() => navigate("/")}
      >
        <FiShoppingBag />
        <h2>Shoppy</h2>
      </button>
      <div className="flex gap-5 items-center">
        <button onClick={() => navigate("/products")}>Products</button>
        <button onClick={() => navigate("/wishlist")}>
          <MdOutlineShoppingCart className="text-3xl" />
        </button>
        {user ? (
          <div className="flex items-center gap-5">
            <BsFillPencilFill className="text-2xl" /> {/* dev only */}
            <div className="flex items-center gap-2">
              <FaRegUserCircle className="text-2xl" />
              <h2>{user.displayName}</h2>
            </div>
          </div>
        ) : null}
        {user ? (
          <button
            onClick={() => {
              signOut(auth);
              window.location.reload();
            }}
            className="bg-red-400 text-white text-2xl px-2 py-1"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => handleGoogleLogin()}
            className="bg-red-400 text-white text-2xl px-2 py-1"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
