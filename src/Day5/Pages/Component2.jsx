import { createContext, useState } from "react";
import { Component3 } from "./Component3";
// import { Component1 } from "./Component1";

export const MyContext = createContext();

export const Component2 = () => {
  const userInfo = {
    name: "yashika",
    marks: 50,
    email: "yashika@gmail.com"
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