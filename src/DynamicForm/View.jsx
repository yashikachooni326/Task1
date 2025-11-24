import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const View = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const allUsers = JSON.parse(localStorage.getItem("dynamicForm") || "[]");
        const found = allUsers.find((u) => u.id == id);
        if (found) {
            setData(found);
        }
    }, [id]);

    const navigate = useNavigate();
     const move = ()=>
    {
        navigate('/');
    }
    return (
        <>
        <button className="border px-7 py-1 bg-stone-300 mt-10 ml-10" onClick={move}>Back</button>
            <div className="w-2/3 bg-sky-50 p-10 mx-auto mt-20 rounded-lg border border-sky-500 shadow-lg">
                <h1 className="text-2xl font-bold text-center text-blue-600 mb-5">User Details</h1>

                {data ? (
                    <div className="space-y-4 text-lg">
                        <p>Name: {data.name}</p>
                        <p>Email: {data.email}</p>
                        <p>Phone: {data.phone}</p>
                        <p>City: {data.city}</p>

                        <p>
                            <strong>Description:</strong>
                            <div
                                className=" p-3 "
                                dangerouslySetInnerHTML={{ __html: data.description }}
                            />
                        </p>

                        <p>
                            <strong>Food Items:</strong> 
                            {data.food.map((f) => f.label).join(", ")}
                        </p>
                    </div>
                ) : (
                    <p className="text-center text-red-500">User not found!</p>
                )}
            </div>
        </>
    );
};
