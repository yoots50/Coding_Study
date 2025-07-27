import React, { useEffect, useState } from "react";
import useProducts from "../../hooks/use-products";

export default function Products() {
  const [loading, error, products] = useProducts({ salesOnly: checked }); // 본래 가지고 있던 Products의 로직을 hook으로 만듬
  const [checked, setChecked] = useState(false);
  const handleChange = () => setChecked((prev) => !prev);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <>
      <input
        id="checkbox"
        type="checkbox"
        value={checked}
        onChange={handleChange}
      />
      <label htmlFor="checkbox">Show Only 🔥 Sale</label>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <article>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
