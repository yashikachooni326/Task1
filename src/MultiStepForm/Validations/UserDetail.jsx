import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const UserDetail = () => {
    const [data, setData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("multiForm") || "[]");
        const found = user.find((p) => p.id == id);
        if (found) {
            setData([found])
        }
    }, [id]);

    const navigate = useNavigate();

    const move = () => {
        navigate('/');
    }

    return (
        <>
            <button className="border px-5 py-1 bg-stone-300 mt-9 ml-9" onClick={move}>Back</button>
            <div className="h-50 w-100 bg-sky-200 border-2 border-sky-500 rounded-lg mx-auto mt-30">
                {data.length > 0 ? (
                    data.map((item) => (
                        <div key={item.id}>
                            <h1>Name: {item.fname}{" "}{item.lname}</h1>
                            <p>Email: {item.email}</p>
                            <p>Phone: {item.phone}</p>
                            <p>City: {item.city}</p>
                            <p>Description: <div dangerouslySetInnerHTML={{ __html: item.description }} /></p>
                        </div>
                    ))
                ) : (
                    <p>User not found!</p>
                )}
            </div>
        </>
    );
};
