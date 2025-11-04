export const Navbar=({cartCount})=>
{
    return(
        <>
        <div className="fixed top-0 h-10 w-full bg-cyan-400 flex justify-between items-center px-8 text-white">
        <h1 className="font-medium text-lg text-sky-600">My Logo</h1>
        <ul className="flex  items-center gap-8">
        <li className="text-violet-400 hover:text-white cursor-pointer text-lg font-medium">Home</li>
        <li className="text-violet-400 hover:text-white cursor-pointer text-lg font-medium">About</li>
        <li className="text-violet-400 hover:text-white cursor-pointer text-lg font-medium">Contact</li>
        </ul>
        <h1 className="flex font-medium text-lg text-blue-600">Cart:<span className="text-red-500">{cartCount}</span></h1>
        </div>
        </>
    )
}