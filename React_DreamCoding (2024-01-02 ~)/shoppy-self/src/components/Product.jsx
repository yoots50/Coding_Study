import React from "react";
import { useNavigate } from "react-router-dom";

export default function Product({ productInfo }) {
  const navigate = useNavigate();
  const { id, imgURL, name, price, gender } = productInfo;
  return (
    <button onClick={() => navigate(`/productDetails/${id}`)}>
      <img src={imgURL} alt="clothes" />
      <div>
        <div>
          <h2>{name}</h2>
          <h3>{price}</h3>
        </div>
        <h3>
          {gender.map((g, i) => {
            return g + (i < gender.length - 1 ? ", " : "");
          })}
        </h3>
      </div>
    </button>
  );
}
