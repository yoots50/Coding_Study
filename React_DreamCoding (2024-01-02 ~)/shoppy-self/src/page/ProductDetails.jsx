import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShoppyAPI } from "../context/ShoppyAPIProvider";

export default function ProductDetails() {
  const { shoppyAPI } = useShoppyAPI();
  const { productId } = useParams();

  const { data: productInfo } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => shoppyAPI.searchByProductId(productId),
  });
  const [value, setValue] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
  };
  useEffect(() => {
    if (productInfo) {
      setValue(productInfo.sizes[0]);
    }
  }, [productInfo]);
  console.log(productInfo);
  return (
    <div>
      {productInfo ? (
        <div>
          <h4>{`>${productInfo.gender.map((g, i) =>
            i < productInfo.gender.length - 1 ? `${g}` : ` ${g}`
          )}`}</h4>
          <div className="flex">
            <div>
              <img src={productInfo.imgURL} />
            </div>
            <div className="basis-2/3 p-5 ">
              <div className="border-b-2 border-b-neutral-500">
                <h2>{productInfo.name}</h2>
                <h2>{productInfo.price}</h2>
              </div>
              <div>{productInfo.description}</div>
              <div className="flex">
                <form onSubmit={handleSubmit} className="flex flex-col w-full">
                  <div className="flex">
                    <h4 className="w-10">옵션: </h4>
                    <select
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="w-full"
                    >
                      {productInfo.sizes.map((size) => (
                        <option>{size}</option>
                      ))}
                    </select>
                  </div>
                  <button className="w-full bg-red-400 text-white text-2xl">
                    장바구니에 추가
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
