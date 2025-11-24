import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export const View = ()=>
{
    const{id} = useParams();
    const[data,setData] = useState([]);
   useEffect(() => {
        const allUsers = JSON.parse(localStorage.getItem("userdata") || "[]");
        const found = allUsers.find((u) => u.id == id);
        if (found) {
            setData(found);
        }
    }, [id]);
    return(
        <>
        {data.map((item,index)=>(
         <h1>{item.name}</h1>
        ))}
        </>
    )
}