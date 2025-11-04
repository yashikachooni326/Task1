import { createContext, useState } from "react";
import dress1 from "../../assets/dress1.png";
import dress2 from "../../assets/dress2.png";
import dress3 from "../../assets/dress3.png";
import dress4 from "../../assets/dress4.png";
import dress5 from "../../assets/dress5.png";
import dress6 from "../../assets/dress6.png";
import dress7 from "../../assets/dress7.png";
import dress8 from "../../assets/dress8.png";
import { ReusableComp } from "./ReusableComp";

export const MyContext = createContext();

export const Products = () => {
  const initialProducts = [
    { id: 1, image: dress1 },
    { id: 2, image: dress2 },
    { id: 3, image: dress3 },
    { id: 4, image: dress4 },
    { id: 5, image: dress5 },
    { id: 6, image: dress6 },
    { id: 7, image: dress7 },
    { id: 8, image: dress8 },
  ];

  const [data, setData] = useState(initialProducts);

  return (
    <div className="w-full bg-violet-50 py-6 mt-6">
      <h1 className="text-center text-purple-600 font-medium text-2xl mb-4">
        Featured Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-items-center">
        {data.map((item) => (
         <ReusableComp key={item.id} data = {item} />
        ))}
      </div>
    </div>
  );
};
