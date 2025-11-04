import { useState } from "react";
import off from"../assets/off.png"
import on from"../assets/on.png"
export const EventHandliing = ()=>
{
    const clicked = ()=>
    {
        alert("How are you");
    }
    const[data,setData] = useState("");
    const[submit,setSubmit] = useState(false);
    const[change,setChange] = useState(false);
    const[colour,setColour] = useState(false);
    const[val,setval] = useState("");
    const[text,setText] = useState("ON");
    const[isOn,setIsOn] = useState(false);
    const [key, setKey] = useState("");
    const [keys, setKeys] = useState("");

    const [color, setColor] = useState("lightgray");

  const handleMouseOver = () => {
    setColor("lightblue");
  };

  const handleMouseOut = () => {
    setColor("lightgray");
  };

  const handleKeyUp = (e) => {
    setKeys(e.keys); 
    console.log("Key released:", e.keys);
  };
  const handleKey = (e) => {
    setKey(e.key); 
  };

    const handleClick = (e)=>
    {
    setData(e.target.value);
    }
    const handleSubmit = ()=>
    {
        setSubmit(true);
    }

    const handleChange  = ()=>
    {
        setChange(!change);
    }

   const doubleClick = () => {
    const newColour = !colour;
    setColour(newColour);

    document.body.style.backgroundColor = newColour ? "lightblue" : "white";
  };

  const handleBlur=()=>
  {
    console.log("Item Blurred")
  }
 
 const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    setText(newState ? "ON" : "OFF"
    )}

   

    return(
        <>
        <button  className="border mt-15 ml-14 w-50 bg-blue-400 text-white"onClick={clicked}>Click Me!</button>
        <h2 className="ml-5 mt-7">Enter Name:</h2>
        <input className="border ml-5" type="text"  onChange={handleClick}value={data}/>
        <button className="border" onClick={handleSubmit}>submit</button>
       {submit && data?
       <h1>Thank you {data}</h1> 
    : ""}

    <h3  className="mt-8"onClick={handleChange} style={{color: change ? "blue" : "red",cursor:"pointer"}}>Click to change the color</h3>

   <button
        className="border bg-teal-100 mt-9 p-2 rounded"
        onDoubleClick={doubleClick}
      >
        Double Click Me
      </button><br/>

      <label>Name:</label>
      <input className="border mt-8" type="text" value={val} onChange={(e)=> setval(e.target.value)} onBlur={handleBlur} placeholder="enter something"/>

      <img className="mt-8" src={isOn ? on : off} alt="Toggle" />


      <button className="border mt-4 p-2" onClick={handleToggle} onBlur={handleBlur}>
        {isOn ? "OFF" : "ON"}
      </button><br/>

      <input className="border mt-8"type="text"onKeyDown={handleKey}placeholder="Press any key..."/>

      <h1 className="text-teal-400 font-medium mt-4">
        Pressed key: {key ? key : ""}
      </h1>

      <input className="border" type="text" value={keys} onKeyUp={handleKey} placeholder="Enter something"/>
      <h1 className="text-blue-500 font-medium mt-4">
        Last released key: {key ? key : "None yet"}
      </h1>

       <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={{
        backgroundColor: color,
        width: "200px",
        height: "200px",
        textAlign: "center",
        lineHeight: "200px",
        border: "2px solid teal",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
      }}
    >
      Hover over me!
    </div>
    </>
    )
}