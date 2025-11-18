import { useEffect, useState } from "react";
import { FaTrash, FaPencilAlt, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export const Userdata = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("users")) || [];
    const sortedData = userdata.sort((a, b) =>
      a.fname.localeCompare(b.fname)
    );

    setData(sortedData);
    setFilteredData(sortedData);

    localStorage.setItem("users", JSON.stringify(sortedData));
  }, []);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    const updatedData = data.filter((p) => p.id !== id);
    const sortedData = updatedData.sort((a, b) => a.fname.localeCompare(b.fname));

    setData(sortedData);
    setFilteredData(sortedData);
    localStorage.setItem("users", JSON.stringify(sortedData));
  };

  const handleEdit = (id) => {
    navigate(`/form/${id}`);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = data.filter(
      (user) =>
        user.fname.toLowerCase().includes(value) ||       
        user.lname.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="p-6">
      <button>
        <Link to="/" className="border px-4 py-2 bg-blue-300 rounded-lg">
          Add User
        </Link>
      </button>

      <div className="flex justify-center items-center my-4">
        <FaSearch className="absolute ml-3 text-gray-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          className="border rounded-lg px-9 py-2 w-1/3"
          placeholder="Search by Name..."
        />
      </div>

      <h2 className="text-xl font-semibold mb-4 text-center text-teal-500">
        User List
      </h2>

      {filteredData.length > 0 ? (
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">First Name</th>
              <th className="border p-2">Last Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Bio</th>
              <th className="border p-2">Office</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user) => (
              <tr key={user.id}>
                <td className="border p-2">{user.fname}</td>
                <td className="border p-2">{user.lname}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.phone}</td>
                <td className="border p-2">{user.address}</td>
                <td className="border p-2">
                  <div dangerouslySetInnerHTML={{ __html: user.bio }} />
                </td>
                <td className="border p-2">
                  {user.office?.label || user.office || ""}
                </td>
                <td className="border p-2">
                  <div className="flex justify-center gap-3">
                    <span
                      className="hover:bg-sky-200 cursor-pointer text-blue-600 p-2 rounded"
                      onClick={() => handleEdit(user.id)}
                    >
                      <FaPencilAlt />
                    </span>
                    <span
                      className="hover:bg-red-200 cursor-pointer text-red-600 p-2 rounded"
                      onClick={() => handleDelete(user.id)}
                    >
                      <FaTrash />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-4 text-red-500 text-2xl mt-80">
          No data found!
        </p>
      )}
    </div>
  );
};
