import { FaSearch } from "react-icons/fa";
import "./index.css";
import { Login } from "../Pages/Login";
import { Link, useNavigate } from 'react-router-dom';
export const Navbar = () => {
    const navigate = useNavigate();
    const login = ()=>
    {
        navigate("/login");
    }
  return (
    <>
      <div className="bg-zinc-600 h-12 w-full text-white flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-lg text-fuchsia-300">My Site</h1>
        </div>

        <ul className="flex gap-8 text-sm font-medium">
          <li className="navLinks hover:text-red-300 cursor-pointer"><Link to="/">Home</Link></li>
          <li className="navLinks hover:text-red-300 cursor-pointer"><Link to="/about">About</Link></li>
          <li className="navLinks hover:text-red-300 cursor-pointer"><Link to="/login">Contact Us</Link></li>
        </ul>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border border-gray-300 rounded-md px-2 py-1">
            <FaSearch className="text-gray-300" />
            <input
              className="bg-transparent outline-none text-white placeholder-gray-400 w-[150px]"
              type="text"
              placeholder="Search..."
            />
          </div>

          <button onClick={login}className="bg-fuchsia-300 text-white px-3 py-1 rounded-md hover:bg-red-400 transition-all">
            Login
          </button>
        </div>
      </div>
    </>
  );
};
