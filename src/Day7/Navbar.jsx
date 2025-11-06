import { Link, useNavigate } from "react-router-dom";

export const Navbar = ({ cartCount }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="h-10 w-full bg-stone-500 text-white flex justify-between px-6">
      <h1 className="font-medium text-amber-400 text-center mt-2">My Logo</h1>
      <ul className="flex gap-6 text-lg text-center">
        <li><Link to="/">Home</Link></li>
        <li>About</li>
        <li>Products</li>
      </ul>
      <div className="flex items-center gap-4">
        <h1 className="px-3 mt-2 font-medium">
          <Link to="/cart">Cart: <span className="text-orange-300 font-medium text-xl">{cartCount}</span></Link>
        </h1>
        <button onClick={handleLogout} className="border px-2 rounded">Logout</button>
      </div>
    </div>
  );
};
