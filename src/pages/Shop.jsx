// Shop.jsx
import { useParams } from "react-router-dom";
import WomensShop from "./ShopeWomen";

export default function Shop() {
  const { gender } = useParams();

  if (gender === "women") return <WomensShop />;
  if (gender === "men") return <MensShop />;

  return (
    <div className="pt-24 min-h-screen">
      <h1 className="text-4xl text-center">All Products</h1>
      {/* You can import a component that shows all products */}
    </div>
  );
}