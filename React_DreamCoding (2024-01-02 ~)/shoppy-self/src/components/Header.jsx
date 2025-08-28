import React from "react";
import { FiShoppingBag } from "react-icons/fi";

export default function Header() {
  return (
    <div className="flex justify-between px-72 items-center py-10">
      <div className="flex">
        <FiShoppingBag />
        <h2>Shoppy</h2>
      </div>
      <div className="flex ">
        <h2>Products</h2>
        <img src="" />
        <img src="" />
        <img src="" />
        <h2>userName</h2>
        <button>Logout</button>
      </div>
    </div>
  );
}
