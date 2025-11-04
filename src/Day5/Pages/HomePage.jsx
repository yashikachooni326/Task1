
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Navbar } from "../Components/Navbar";

export const HomePage = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const totalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) return;
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.log("Error occur:", error.message);
      }
    };
    fetchData();
  }, []);

  const CartItems = useCallback((item) => {
      const isInCart = cart.find((p) => p.id === item.id);
      if (isInCart) {
        setCart(cart.filter((p) => p.id !== item.id));
      } else {
        setCart([...cart, item]);
      }
    },
    [cart]
  );

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  }, [cart]);

  const handleShowTotal = () => {
    totalRef.current.scrollIntoView({ behavior: "smooth" });
    totalRef.current.focus();
  };

  return (
    <>
      <Navbar cartCount={cart.length} />
      <button
        className="mt-14 px-4 border bg-teal-200"
        onClick={handleShowTotal}
      >
        Show Total Price
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-8 lg:grid-cols-4 gap-4 px-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-sm p-4 mt-8 flex flex-col items-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-40 object-contain mb-2"
            />
            <h2 className="font-semibold text-center">{item.title}</h2>
            <p className="font-bold text-purple-600">${item.price}</p>
            <p className="text-sm mt-1 text-center">
              {item.description.substring(0, 60)}...
            </p>
            <button
              className={`mt-2 px-4 py-1 rounded text-white cursor-pointer ${
                cart.find((p) => p.id === item.id)
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-teal-500 hover:bg-cyan-500"
              }`}
              onClick={() => CartItems(item)}
            >
              {cart.find((p) => p.id === item.id) ? "Remove" : "Add To Cart"}
            </button>
          </div>
        ))}
      </div>

      <div
        ref={totalRef}
        className="mt-6 px-6 h-20 bg-sky-200 w-100 border font-bold text-lg flex items-center justify-center transition-all duration-500">
        Total Price: ${totalPrice}
      </div>
    </>
  );
};
