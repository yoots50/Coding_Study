import React from "react";

export default function Product({ imgURL, name, price, gender }) {
  return (
    <div>
      <img src={imgURL} />
      <div>
        <div>
          <h2>{name}</h2>
          <h3>{price}</h3>
        </div>
        <h3>{gender}</h3>
      </div>
    </div>
  );
}
