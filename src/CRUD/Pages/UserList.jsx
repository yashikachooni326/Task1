import { useState, useEffect } from "react";
import { getUser,deleteUser  } from "../Api/API";
import { useNavigate } from "react-router-dom";
export const UserList = () => {
  const [user, setUser] = useState([]);
  const [existUser , setExistUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUser();
        console.log(res.data.data);
        const result = res.data.data;
        setUser(result);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUser();
  }, []);

  const navigate = useNavigate();

  const handleEdit = (user) => {
  navigate(`/form/${user._id}`); 
  };



  const handleDelete = async (id) => {
    try{
    const res = await deleteUser(id);
  setUser(user.filter( p => p._id !== id))
    }
    catch(err)
    {
        console.log('error occur:',err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-center text-teal-500">User List</h2>

      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 ">Name</th>
            <th className="border p-2 ">Email</th>
            <th className="border p-2 ">Phone</th>
            <th className="border p-2 ">Address</th>
            <th className="border p-2 ">City</th>
            <th className="border p-2 ">State</th>
            <th className="border p-2 ">Zipcode</th>
            <th className="border p-2 ">Actions</th>
          </tr>
        </thead>

        <tbody>
          {user.map((user) => (
            <tr key={user._id} >
                {console.log(user.phone)}
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.phone}</td>
              <td className="border p-2">{user.address}</td>
              <td className="border p-2">{user.city}</td>
              <td className="border p-2">{user.state}</td>
              <td className="border p-2">{user.zipCode}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
