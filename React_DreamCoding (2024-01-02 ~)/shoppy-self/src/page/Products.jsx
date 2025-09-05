import React from "react";
import { useShoppyAPI } from "../context/ShoppyAPIProvider";
import { useQuery } from "@tanstack/react-query";
import Product from "../components/Product";

export default function Products() {
  const { shoppyAPI } = useShoppyAPI();
  const {
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => shoppyAPI.loadProducts(),
  });
  return (
    <div className="grid grid-cols-4 gap-5 p-5">
      {products &&
        products.map((productInfo, i) => (
          <Product productInfo={productInfo} key={i} />
        ))}
    </div>
  );
}
