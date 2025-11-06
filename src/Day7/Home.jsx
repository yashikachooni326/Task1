import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { BeatLoader } from "react-spinners";
import { Navbar } from "./Navbar";
import { Link } from "react-router-dom";

export const Home = () => {
    const [data, setData] = useState([]);
    const [displayed, setDisplayed] = useState([]);
    const [cart, setCart] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const size = 8;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const res = await fetch("https://dummyjson.com/products");
                if (!res.ok) {
                    console.log("Error fetching data");
                    return;
                }
                const jsonData = await res.json();

                setTimeout(() => {
                    setData(jsonData.products);
                    setDisplayed(jsonData.products.slice(0, size));
                    setLoading(false);
                }, 1000);
            } catch (err) {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const fetchMoreData = () => {
        const next = data.slice(displayed.length, displayed.length + size);
        setDisplayed((prev) => [...prev, ...next]);
        if (displayed.length + next.length >= data.length) {
            setHasMore(false);
        }
    };

    const handleCart = (item) => {
        const findItem = cart.find((p) => p.id === item.id);
        if (findItem) {
            setCart(cart.filter((p) => p.id !== item.id));
        } else {
            setCart([...cart, item]);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <BeatLoader color="#FFA500" size={15} />
            </div>
        );
    }

    return (
        <>
            <Navbar cartCount={cart.length} />
            <div className="min-h-screen w-full bg-orange-50 p-6">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Product List
                </h1>

                <InfiniteScroll
                    dataLength={displayed.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={
                        <div className="flex justify-center my-6">
                            <BeatLoader color="#FFA500" size={10} />
                        </div>
                    }
                    endMessage={
                        <p className="text-center mt-6 text-gray-500">
                            <b>No more products to load</b>
                        </p>
                    }
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {displayed.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex-col"
                            >
                                <Link to={`/cart/${item.id}`}>
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="w-full h-48 object-cover rounded-md mb-4"
                                    />
                                </Link>
                                <div className="flex justify-between">
                                    <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                                    <p className="mt-auto text-blue-600 font-bold text-lg text-right">${item.price}</p>
                                </div>
                                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{item.description}</p>
                                <button
                                    className={`px-4 py-2 w-40 rounded-lg cursor-pointer transition-colors duration-200 mx-auto mt-4 block
                                     ${cart.find((p) => p.id === item.id)
                                            ? "bg-red-400 hover:bg-red-500 text-white"
                                            : "bg-yellow-300 hover:bg-orange-400 text-black"
                                        }`}
                                    type="button"
                                    onClick={() => handleCart(item)}
                                >
                                    {cart.find((p) => p.id === item.id) ? "Remove" : "Add To Cart"}
                                </button>

                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </>
    );
};







