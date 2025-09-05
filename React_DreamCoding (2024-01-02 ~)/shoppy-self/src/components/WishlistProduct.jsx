import React from "react";
import { useNavigate } from "react-router-dom";

export default function WishlistProduct({ productInfo, options }) {
  const navigate = useNavigate();
  const { id, imgURL, name, price } = productInfo;
  return (
    <button onClick={() => navigate(`/productDetails/${id}`)} className="flex">
      <div className="">
        <img src={imgURL} alt="clothes" height="100px" width="100px"/>
      </div>
      <div>
        <div>
          <h2>{name}</h2>
          <h3>{price}</h3>
        </div>
        <h3>
          {options.map((option) => (
            <h4>{`${option.size} 사이즈 ${option.amount}개`}</h4>
          ))}
        </h3>
      </div>
    </button>
  );
}
