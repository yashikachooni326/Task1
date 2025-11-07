import { useState, useEffect } from "react";
import { getData } from "./Api";
import { Navbar } from "./Navbar";

export const Cards = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData();
        setData(res.products);
      } catch (err) {
        console.log("error:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Product List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((p) => (
            <div
              key={p.id}
              className="border bg-stone-50 rounded-lg p-4 flex flex-col items-center shadow hover:shadow-lg transition">
              <img
                src={p.thumbnail}
                alt={p.title}
                className="h-40 w-full object-cover rounded-md mb-2"
              />
              <h2 className="font-semibold text-center">{p.title}</h2>
              <p className="text-gray-700 font-bold mt-1">${p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
