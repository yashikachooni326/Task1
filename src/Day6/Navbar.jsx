import { Link, useNavigate } from "react-router-dom"
export const Navbar=()=>
{
 const navigate = useNavigate();

 const registerUser = ()=>
{
    navigate("/register-user");
}
    return(
        <>
        <div className="h-12 w-full bg-stone-400 flex justify-between px-5 ">
        <h1 className=" flex items-center text-amber-300 text-lg">My Logo</h1>
        <ul className="flex gap-6 justify-center items-center">
        <li className="cursor-pointer text-white text-lg hover:text-amber-300"><Link to="/">Home</Link></li>
        <li className="cursor-pointer text-white text-lg hover:text-amber-300">About</li>
        <li className="cursor-pointer text-white text-lg hover:text-amber-300">Contact</li>
        </ul>
        <input type="text" className="border-2  focus:border-amber-300 w-60 h-8 mt-2 rounded-lg text-center flex justify-center items-center" placeholder="Search Something...."/>
        <button onClick={registerUser} className="border rounded px-3 h-7 mt-2 cursor-pointer text-amber-300">Register User</button>
        </div>
        </>
    )
}