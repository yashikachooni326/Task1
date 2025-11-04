import { useContext } from "react";
import { MyContext } from "./Component2"; 
import { Component1 } from "./Component1";

export const Component3 = () => {
  const user = useContext(MyContext);
  const name = user.name;          

  return (
    <>
      <h1>Hi, my name is {name}</h1>
       <Component1/>
    </>
  );
};