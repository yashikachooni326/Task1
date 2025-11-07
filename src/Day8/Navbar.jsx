import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
export const Navbar = () => {
    const [menu, setMenu] = useState(false);
    return (
        <>
            <div className="h-12 w-full bg-stone-600 text-white flex items-center justify-between px-6">
                <h1 className="text-lg font-bold text-sky-300" >My Logo</h1>
                <ul className=" hidden md:flex gap-8">
                    <li>HOME</li>
                    <li>ABOUT</li>
                    <li>CONTACT</li>
                </ul>
                <div className="hidden md:flex gap-2">
                    <button className="border px-2 py-1 rounded hover:bg-white hover:text-stone-600 transition">
                        Login
                    </button>
                    <button className="border px-2 py-1 rounded hover:bg-white hover:text-stone-600 transition">
                        Signup
                    </button>
                </div>


                <div className="md:hidden text-3xl cursor-pointer" onClick={() => setMenu(!menu)}>
                    {menu ? <HiX /> : <HiMenu />}
                </div>
            </div>


            {menu && (
                <div className="bg-stone-700 text-white flex  flex-col items-center gap-4 py-4 md:hidden">

                    <li>HOME</li>
                    <li>ABOUT</li>
                    <li>CONTACT</li>
                    <div className="flex gap-2">
                        <button className="border px-2 py-1 rounded hover:bg-stone-200 hover:text-black">Login</button>
                        <button className="border px-2 py-1  hover:bg-stone-200 hover:text-black rounded">Signup</button>
                    </div>
                </div>
            )}
        </>
    )
}