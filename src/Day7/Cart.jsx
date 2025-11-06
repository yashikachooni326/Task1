import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "./Navbar"; 
export const Cart = () => {
  const { id } = useParams();  
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen text-gray-600">
          Product not found.
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-stone-100 p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Product Detail</h1>

        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-6">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full md:w-1/2 h-64 object-cover rounded-md"
          />

          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {product.title}
              </h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>

            <div className="mt-4">
              <p className="text-xl font-bold text-blue-600">
                ${product.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
