import { useQuery } from "@tanstack/react-query";
import Product from "../components/Product";
import { useShoppyAPI } from "../context/ShoppyAPIProvider";
import { BsPinAngle } from "react-icons/bs";

export default function Home() {
  const { shoppyAPI } = useShoppyAPI();
  const {
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => shoppyAPI.loadProducts(),
  });
  console.log(products);
  return (
    <div>
      <div className="w-full h-80 border-slate-950 border-2">Banner Image</div>
      <div className="grid grid-cols-4 gap-5 p-5">
        {products &&
          products.map((productInfo, i) => <Product productInfo={productInfo} key={i}/>)}
      </div>
    </div>
  );
}
