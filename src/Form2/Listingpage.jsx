import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
export const ListingPage = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userdata')) || [];
        setData(userData);
    }, [])

    const handleDelete = (id) => {
        const user = [...data]
        user.splice(id, 1)
        setData(user);
        localStorage.setItem("userdata", JSON.stringify(user));
    }
  
    const navigate = useNavigate();
    const handleEdit = (id)=>
    {
    navigate(`/edit/${id}`);
    }

    const moveBtn = ()=>
    {
        navigate("/")
    }
    return (
        <>

      
          <button onClick={moveBtn}>Back Button</button>
            <h2 className="font-bold text-lg   text-center mb-10 mt-10 text-amber-400 text-xl">User Data</h2>
        {data.length != 0 ? (
            <table>
                <thead>
                    <tr>
                        <th className="p-3 border font-bold text-teal-700 bg-stone-200 text-lg">Name</th>
                        <th className="p-3 border font-bold text-teal-700 bg-stone-200 text-lg">Email</th>
                        <th className="p-3 border font-bold text-teal-700 bg-stone-200 text-lg">Gender</th>

                        <th className="p-3 border font-bold text-teal-700 bg-stone-200 text-lg">Skills</th>
                        <th className="p-3 border font-bold text-teal-700 bg-stone-200 text-lg">Date</th>
                        <th className="p-3 border font-bold text-teal-700 bg-stone-200 text-lg">Phone</th>
                        <th className="p-3 border font-bold text-teal-700 bg-stone-200 text-lg">Description</th>
                        <th className="p-3 border font-bold text-teal-700 bg-stone-200 text-lg">Action</th>
                    </tr>
                </thead>




                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className="p-3 border">{item.name}</td>
                            <td className="p-3 border">{item.email}</td>
                            <td className="p-3 border">{item.gender}</td>
                            <td className="p-3 border">{item.skills ? item.skills.map((p) => p.label).join(" , ") : ""}  </td>
                            <td className="p-3 border">{item.date}</td>
                            <td className="p-3 border">{item.phone}</td>
                            <td className="p-3 border">
                                <div dangerouslySetInnerHTML={{ __html: item.description }} />
                            </td>
                            <td className="p-3 border"><button className="border px-5 py-1 bg-amber-300 cursor-pointer" type="button" onClick={()=> handleEdit(item.id)}>Edit</button>
                                <button className="border px-5 py-1 bg-red-300 cursor-pointer" type="button" onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
              ) : <p className="text-2xl font-bold text-red-400 text-center mt-100">No Data Found</p>}
        </>
    )
}