import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
export const UserDetail =()=>
{

 const [data,setData] = useState([]);

 const{id} = useParams();

 useEffect(()=>
{
const user =  JSON.parse(localStorage.getItem('multiForm'));
console.log(user[id]);
setData(user[id]);

},[id]);
console.log(data);


    return(
        <>
        {data.map((item)=>(
            <h1>name:{item.name}</h1>
        ))}
        </>
    )
}