
import { useEffect, useState } from "react";
import { FaTrash, FaPencilAlt, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export const Userdata = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filterData, setFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;

  const navigate = useNavigate();




  useEffect(() => {
  const userdata = JSON.parse(localStorage.getItem("users")) || [];
const sortedData = userdata.sort();
  setData(sortedData);
  setFilter(sortedData);
}, []);




  const handleDelete = (id) => {
    const updatedData = data.filter(p => p.id !== id);
    setData(updatedData);
    localStorage.setItem('users', JSON.stringify(updatedData));
  };

  const handelEdit = (id) => 
  {
    navigate(`/form/${id}`);
  }
  const handleView = (id) => {
    navigate(`/detail/${id}`);
  }

 const handleSearch = (e) => {
  const value = e.target.value.toLowerCase(); 
  setSearch(value);
  if (value === "") {
    setFilter(data);
    return;
  }
  const filtered = data.filter((user) =>
      user.fname?.toLowerCase().includes(value) ||
      user.lname?.toLowerCase().includes(value)
  );
  setFilter(filtered);
  setCurrentPage(1);
};


  const lastItem = currentPage * itemPerPage;
  const firstItem = lastItem - itemPerPage;
  const currentItems = filterData.slice(firstItem, lastItem);
  const totalPages = Math.ceil(filterData.length / itemPerPage);

  return (
    <div className="p-6">
      <button>
        <Link to="/" className="border px-4 py-2 bg-blue-300 rounded-lg">Add User</Link>
      </button>

      <div className="flex items-center justify-center w-full my-6">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search with Name..."
        />
      </div>

      <h2 className="text-xl font-semibold mb-4 text-center text-teal-500">User List</h2>

      {data.length > 0 ? (
        <>
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
              {currentItems.map((user) => (
                <tr key={user.id} className="hover:bg-sky-100">
                  <td className="border p-2">{user.fname}</td>
                  <td className="border p-2">{user.lname}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.phone}</td>
                  <td className="border p-2">{user.address}</td>
                  <td className="border p-2">
                    <div dangerouslySetInnerHTML={{ __html: user.bio }} />
                  </td>
                  <td className="border p-2">{user.office?.label || user.office || ""}</td>
                  <td className="border p-2">
                    <div className="flex justify-center gap-3">
                      <span className="hover:bg-green-200 cursor-pointer text-green-600 p-2 rounded" onClick={() => handleView(user.id)}>
                        <FaEye />
                      </span>
                      <span className="hover:bg-sky-200 cursor-pointer text-blue-600 p-2 rounded" onClick={() => handelEdit(user.id)}>
                        <FaPencilAlt />
                      </span>
                      <span className="hover:bg-red-200 cursor-pointer text-red-600 p-2 rounded" onClick={() => handleDelete(user.id)}>
                        <FaTrash />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center items-center gap-3 mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>

            <span className="font-medium text-gray-700">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-center mt-4 text-red-500 text-2xl mt-80">No data found!</p>
      )}
    </div>
   
  );
};
