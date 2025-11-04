import { createContext, useState } from "react";
import { Component3 } from "./Comp3";
import { Component1 } from "./Comp1";

export const MyContext = createContext();

export const Component2 = () => {
  const userInfo = {
    name: "Kriti",
    marks: 50,
    email: "kriti@gmail.com"
  };

  const [data, setData] = useState(userInfo);

  return (
    <>
      <MyContext.Provider value={data}>
        <h1>This is Component 2</h1>
        <Component3 />
      </MyContext.Provider>
    </>
  );
};
