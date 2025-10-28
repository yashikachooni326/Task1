import orange from "../assets/green1.jpg";
import pink from "../assets/green3.jpg";
import ornge from "../assets/green2.jpg";

export const Menu = () => {
  return (
    <div className="bg-lime-900 mt-2 py-8">
      <h1 className="font-bold text-2xl text-center text-white mb-8">Our Menu</h1>

      <div className="flex justify-center gap-8 flex-wrap">
        <div className="bg-lime-100 rounded-lg shadow-lg p-4 flex flex-col items-center w-60">
          <img src={orange} className="rounded-sm h-40 w-full object-cover mb-4" />
          <h1 className="text-center ">Kiwi Juice</h1>
        </div>

        <div className="bg-lime-100 rounded-lg shadow-lg p-4 flex flex-col items-center w-60">
          <img src={pink} className="rounded-sm h-40 w-full object-cover mb-4" />
          <h1 className="text-center">Lime Soda</h1>
          
        </div>

        <div className="bg-lime-100 rounded-lg shadow-lg p-4 flex flex-col items-center w-60">
          <img src={ornge} className="rounded-sm h-40 w-full object-cover mb-4" />
          <h1 className="text-center ">Healthy Juice</h1>
        </div>
      </div>
    </div>
  );
};
