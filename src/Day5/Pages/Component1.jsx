import { createContext, useContext } from "react";
import { MyContext } from "./Component2";

export const Component1 = ()=>
{
    const data = useContext(MyContext);
  
    return(
        <>
        <div className="mt-4">
        <label>Name:</label>
        <input type="text"  className="border"value={data.name}/><br/>
        <label>Email:</label>
        <input type="text"  className="border"value={data.email}/><br/>
        <label>Marks:</label>
        <input type="text"  className="border"value={data.marks}></input>
      </div>
        </>
    )
}