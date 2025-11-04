import model from "../../assets/model.png";
import { Products } from "./Products";

export const Home = () => {
  return (
    <>
      <div className="bg-red-50 w-full flex flex-col-reverse md:flex-row h-auto md:h-[600px]">
        
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center p-6 md:p-12">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-2">
            <span className="text-fuchsia-500">D</span>ress{" "}
            <span className="text-fuchsia-500">L</span>ike
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl text-gray-700">
            You Are Already Famous
          </h2>
          <button className="bg-fuchsia-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-md mt-5 text-sm sm:text-base md:text-lg">
            Explore More
          </button>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center p-6 md:p-12">
          <img
            className="w-64 sm:w-80 md:w-[400px] h-auto object-contain"
            src={model}
            alt="Model"
          />
        </div>

      </div>

      <Products />
    </>
  );
};
