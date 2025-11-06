export const Home = () => {
    const userData = JSON.parse(localStorage.getItem("registerUser"));

    if (!userData) {
        return (
            <div className="p-4 text-center text-red-500">
                No user data found
            </div>
        );
    }

    return (
        <>
       
        <div className="h-80 w-100 bg-amber-50 rounded-xl shadow-lg border border-solid border-indigo-600 ml-115 mt-5 p-4">
            <h1 className="font-medium text-xl text-center mb-5">
                Welcome {userData.name}
            </h1>

            <h2 className="mb-3">
                Hey, your Contact Number is:{" "}
                <span className="text-red-300">{userData.contact}</span>
            </h2>

            <h2 className="mb-3">
                Your Selected Subjects are:{" "}
                <span className="text-red-300">
                    {userData.subject && userData.subject.length > 0
                        ? userData.subject.map((s) => s.label).join(", ")
                        : "No subjects selected"}
                </span>
            </h2>

            <h2 className="mb-3">
                Data:{" "}
                <span
                    dangerouslySetInnerHTML={{
                        __html: userData.description || "No description provided",
                    }}
                ></span>
            </h2>

            <h3>Gender: {userData.gender || "Not specified"}</h3>
        </div>

        </>
        
    );
};

