import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const DetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const selectedUser = allUsers.find((u) => u.id == id);
    setUser(selectedUser);
  }, [id]);

  if (!user) {
    return <p className="text-center mt-10 text-red-500 text-xl">User not found!</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-8 w-[450px]">
        <h1 className="text-2xl font-semibold text-indigo-600 text-center mb-4">
          User Details
        </h1>

        <div className="space-y-3">
          <div>
            <p className="text-gray-500 font-medium">First Name : </p>
            <p className="text-lg font-semibold text-gray-800">{user.fname}</p>
          </div>

          <div>
            <p className="text-gray-500 font-medium">Last Name</p>
            <p className="text-lg font-semibold text-gray-800">{user.lname}</p>
          </div>

          <div>
            <p className="text-gray-500 font-medium">Email</p>
            <p className="text-lg font-semibold text-gray-800">{user.email}</p>
          </div>

          <div>
            <p className="text-gray-500 font-medium">Phone</p>
            <p className="text-lg font-semibold text-gray-800">{user.phone}</p>
          </div>

          <div>
            <p className="text-gray-500 font-medium">Address</p>
            <p className="text-lg font-semibold text-gray-800">{user.address}</p>
          </div>

          <div>
            <p className="text-gray-500 font-medium">Bio</p>
            <div
              className="text-gray-800 text-sm bg-gray-50 p-2 rounded"
              dangerouslySetInnerHTML={{ __html: user.bio }}
            />
          </div>

          <div>
            <p className="text-gray-500 font-medium">Office</p>
            <p className="text-lg font-semibold text-gray-800">
              {user.office?.label || user.office || ""}
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/user-data"
            className="px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
          >
            Back to List
          </Link>
        </div>
      </div>
    </div>
  );
};
