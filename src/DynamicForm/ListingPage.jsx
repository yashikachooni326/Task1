import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
export const Table = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('dynamicForm')) || [];
        setData(user);
    }, [])

    const handleDelete = (id) => {
        const user = data.filter((p) => p.id !== id)
        Swal.fire({
            title: "User Deleted!",
            icon: "success",
            draggable: true
        });
        setData(user)
        localStorage.setItem('dynamicForm',JSON.stringify(user))

    }

    const navigate = useNavigate();

    const moveBtn = ()=>
    {
        navigate('/');
    }
    const handleEdit = (id)=>
    {
        navigate(`/edit/${id}`);
    }
    return (
        <>
        <button onClick={moveBtn} className="px-5 py-1 bg-indigo-400 ml-20 mt-10 text-white cursor-pointer hover:bg-indigo-300">Add user</button>
            <h1 className="text-center mt-5 font-bold text-2xl">User data</h1>
            {data.length != 0 ? (
                <table className="mx-auto mt-10">
                    <thead>
                        <tr>
                            <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Name</th>
                            <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Email</th>
                            <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Phone</th>
                            <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">City</th>
                            <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Description</th>
                            <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Food Items</th>
                            <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id}>
                                <td className="p-3 border">{item.name}</td>
                                <td className="p-3 border">{item.email}</td>
                                <td className="p-3 border">{item.phone}</td>
                                <td className="p-3 border">{item.city}</td>
                                <td className="p-3 border"><div
                                    dangerouslySetInnerHTML={{ __html: item.description }}
                                /></td>
                                <td className="p-3 border"> {item.food.map(f => f.label).join(', ')}</td>
                                <td className="p-3 border">
                                    <div className="flex gap-8">
                                        <button className="px-5 py-1 border bg-blue-300  hover:bg-blue-400 cursor-pointer" onClick={()=> handleEdit(item.id)}>Edit</button>
                                        <button className="px-5 py-1 border bg-red-300 hover:bg-red-400 cursor-pointer" onClick={()=> handleDelete(item.id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            ) :
                <p className="text-center font-bold mt-80 text-red-400 text-2xl">No Data Found!</p>}
        </>
    )
}