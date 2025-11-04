import { Child } from "./Child"
import kiwi from "../../../assets/green1.jpg"
import kiwi2 from "../../../assets/green4.png"
import kiwi3 from "../../../assets/green2.jpg"
import { useEffect, useState, useRef, createContext, useContext } from "react";

import { Comp2 } from "./Comp2";
const context = createContext();

export const Parent = () => {
    const Myname = "yashika"
    const marks = 50

    const products = [{
        id: 1,
        title: "kiwi",
        description: "Kiwi juice",
        image: kiwi
    },
    {
        id: 2,
        title: "Lemon",
        description: "Lemon juice",
        image: kiwi2
    },
    {
        id: 3,
        title: "Juice",
        description: "Healthy drink",
        image: kiwi3
    }]

    const [count, setCount] = useState(0);
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);

    const [colour, setColour] = useState('black');

    useEffect(() => {
        setTimeout(() => {
            setColour('red')
        }, 2000)
    }, [])

    const [race, setRace] = useState(10);

    useEffect(() => {
        if (race > 0) {
            setTimeout(() => {
                setRace(race - 1)
            }, 1000)
        }
    }, [race])

    const inp = useRef();
    const focus = () => {
        inp.current.focus();
    };
    const user = { name: "Yashika", city: "Delhi" };

    return (
        <>
            <context.Provider value={user}>
                <div className="bg-blue-100 h-300 ">
                    <h1 className="font-medium text-blue-600">Parent Component</h1>
                    
                    <Child name={Myname} marks={marks} products={products} />

                    <div className="flex">
                        <div className="h-50 w-70 bg-teal-200 mt-8 ml-3 border ">
                            <h1 className="font-medium flex justify-center items-center text-blue-500">Counter:{count}</h1>
                            <button className="border ml-2  rounded" onClick={increment}>Add</button>
                            <button className="border ml-2  rounded" onClick={decrement}>Subtract</button>
                        </div>

                        <div className="ml-5 h-50 w-50 rounded bg-lime-100 mt-5">
                            <h1 className="font-medium ">UseEffect Example</h1>
                            <h1 style={{ color: colour }}>Next JS</h1>
                            <h3 style={{ color: colour }}>React JS</h3>
                            <h5 style={{ color: colour }}>Node JS</h5>
                        </div>

                        <h1 className="ml-5 mt-5 font-bold text-xl text-amber-700">Race Start in {race}'s Second</h1>
                    </div>

                    <div>
                        <input type="text" ref={inp} />
                        <button onClick={focus}>Focus Input</button>
                    </div>

                  <Comp2 />  
                </div>
            </context.Provider>
        </>
    )
};


