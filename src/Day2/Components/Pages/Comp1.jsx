import { createContext, useContext } from "react";
import { MyContext } from "./Comp2";

export const Component1 = ()=>
{
    const data = useContext(MyContext);
    const name = data.name;
    const email = data.email;
    const marks = data.marks;
    return(
        <>
        <div className="mt-4">
        <label>Name:</label>
        <input type="text"  className="border"value={name}/><br/>
        <label>Email:</label>
        <input type="text"  className="border"value={email}/><br/>
        <label>Marks:</label>
        <input type="text"  className="border"value={marks}></input>
      </div>
        </>
    )
}