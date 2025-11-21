import { useEffect, useState } from "react"
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye } from "react-icons/fa";
export const ListingPage = ()=>
{
    const[data,setData] = useState([]);
    useEffect(()=>{
    const userInfo = JSON.parse(localStorage.getItem('multiForm'))
    setData(userInfo || []);
    },[])

    
    const{id} = useParams();
    const navigate = useNavigate();

    const handleDelete = (userId) => {
    const updatedUsers = data.filter((user) => user.id !== userId);

    setData(updatedUsers);

    localStorage.setItem('multiForm', JSON.stringify(updatedUsers));
    };

    const handleEdit = (id)=>
    {
    navigate(`/edit/${id}`);
    }

const moveBtn = ()=>
{
    navigate('/');
}

const handleUser = (id)=>
{
    navigate(`/user/${id}`);
}
    return(
        <>
        <button className="border px-5 py-1 bg-sky-400 mt-20 ml-30" onClick={moveBtn}>Add User</button>
        <h1 className="text-2xl text-center font-bold mb-10 mt-10">User Data</h1>
        
        {data.length !== 0  ?  (
       <table cellPadding="1" className="mx-auto">
        <thead>
        <tr>
        <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">First Name</th>
        <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Last Name</th>

        <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Phone</th>
        <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Email</th>
        <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Address</th>
        <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">City</th>
        <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Description</th>
        <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Country</th>
        <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Hobby</th>
        <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Actions</th>

        </tr>
        </thead>
        
         <tbody>
        {data.map((item)=>(
            <tr key={item.id}>
            <td className="p-3 border">{item.fname}</td>
            <td className="p-3 border">{item.lname}</td>
            <td className="p-3 border">{item.phone}</td>
            <td className="p-3 border">{item.email}</td>
            <td className="p-3 border">{item.address}</td>
            <td className="p-3 border">{item.city}</td>
            <td className="p-3 border">
     <div
      dangerouslySetInnerHTML={{__html: item.description}}
      />          </td>
      <td className="p-3 border">{item.country}</td>
            <td className="p-3 border">{item.hobby ? item.hobby.map((p)=> p.label).join( " , " ): ""}</td>


            <td className="p-3 border">
            <div className="flex justify-center gap-5">
           <FaPencilAlt size={20} onClick={()=> handleEdit(item.id)}  className="cursor-pointer text-blue-300 hover:text-blue-700 transition-colors duration-300" />

            <FaEye  size={20} onClick={()=> handleUser(item.id)}  className="cursor-pointer text-amber-400 hover:text-green-700 transition-colors duration-300" />

           <FaTrashAlt size={20}  className="cursor-pointer text-red-300 hover:text-red-500 transition-colors duration-300"  onClick={() => handleDelete(item.id)}/>
           </div>
            </td>
            </tr>
        ))}
        </tbody>

       </table>
       ) : <p className="text-center  font-bold text-xl text-red-500 mt-70">No data found!</p>}
        </>
    )
}
