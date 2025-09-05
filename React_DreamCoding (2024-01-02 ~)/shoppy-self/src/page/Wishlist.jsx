import { useQueries, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/FirebaseProvider";
import { useShoppyAPI } from "../context/ShoppyAPIProvider";
import WishlistProduct from "../components/WishlistProduct";

export default function Wishlist() {
  const { auth } = useFirebase();
  const { shoppyAPI } = useShoppyAPI();
  const uid = "123";
  const { data: wishlist } = useQuery({
    queryKey: ["wishlist", uid],
    queryFn: () => shoppyAPI.wishlist(uid),
  });
  console.log(wishlist);
  return (
    <div className="flex flex-col">
      {wishlist &&
        wishlist.map((w) => {
          console.log(w)
          return (
            <WishlistProduct
              productInfo={{
                id: w.id,
                imgURL: w.imgURL,
                name: w.name,
                price: w.price,
              }}
              options={w.options}
            />
          );
        })}
    </div>
  );
}
