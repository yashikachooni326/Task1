
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaSortUp, FaSortDown, FaSearch } from "react-icons/fa";

export const Table = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [foodFilter, setFoodFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("dynamicForm") || "[]");
    setData(user);
  }, []);
  const foodOptions = Array.from(
    new Set(data.flatMap((item) => item.food.map((f) => f.label)))
  );
 const moveBtn = () => navigate("/");
  const handleEdit = (id) => navigate(`/edit/${id}`);
  const handleView = (id) => navigate(`/view/${id}`);

  const handleDelete = (id) => {
    const user = data.filter((p) => p.id !== id);

    Swal.fire({
      title: "Do you want to delete User?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("User Deleted!", "", "success");
        setData(user);
        localStorage.setItem("dynamicForm", JSON.stringify(user));
      } else if (result.isDenied) {
        Swal.fire("User Not Deleted", "", "info");
      }
    });

    if (currentItem.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };



  const handleSortByName = () => {
    let sortedData = [...data];
    if (sortOrder === "asc") {
      sortedData.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
      setSortOrder("desc");
    } else {
      sortedData.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1));
      setSortOrder("asc");
    }
    setData(sortedData);
    setCurrentPage(1);
  };


  const filteredData = data
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((item) => (foodFilter === "" ? true : item.food.some((f) => f.label === foodFilter)));

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItem = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemPerPage);

  const handleNextPage = () => setCurrentPage(currentPage + 1);
  const handlePrevPage = () => setCurrentPage(currentPage - 1);

  return (
    <>
      <div className="flex items-center gap-5 ml-20 mt-10">
        <button
          onClick={moveBtn}
          className="px-5 py-1 bg-indigo-400 text-white cursor-pointer hover:bg-indigo-300">
          Add User
        </button>

        <div className="flex items-center gap-2">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="h-8 w-80 text-center rounded-lg px-5 border"
            placeholder="Search user by Name..."
          />
        </div>

        <select
          value={foodFilter}
          onChange={(e) => {
            setFoodFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-1 rounded"
        >
          <option value="">All Food</option>
          {foodOptions.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      <h1 className="text-center mt-5 font-bold text-2xl">User Data</h1>

      {filteredData.length === 0 && searchTerm !== "" ? (
        <p className="text-center font-bold mt-20 text-red-500 text-2xl">No User Found!</p>
      ) : currentItem.length > 0 ? (
        <>
          <table className="mx-auto mt-10">
            <thead>
              <tr>
                <th
                  onClick={handleSortByName}
                  className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700 cursor-pointer flex items-center gap-2 justify-center"
                >
                  Name {sortOrder === "asc" ? <FaSortUp className="text-blue-600" /> : <FaSortDown className="text-blue-600" />}
                </th>
                <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Email</th>
                <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Phone</th>
                <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">City</th>
                <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Description</th>
                <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Food Items</th>
                <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentItem.map((item) => (
                <tr key={item.id}>
                  <td className="p-3 border">{item.name}</td>
                  <td className="p-3 border">{item.email}</td>
                  <td className="p-3 border">{item.phone}</td>
                  <td className="p-3 border">{item.city}</td>
                  <td className="p-3 border">
                    <div dangerouslySetInnerHTML={{ __html: item.description }} />
                  </td>
                  <td className="p-3 border">{item.food.map((f) => f.label).join(", ")}</td>
                  <td className="p-3 border">
                    <div className="flex gap-2">
                      <button
                        className="px-5 py-1 border bg-blue-300 hover:bg-blue-400 cursor-pointer"
                        onClick={() => handleEdit(item.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-5 py-1 border bg-amber-300 hover:bg-amber-400 cursor-pointer"
                        onClick={() => handleView(item.id)}
                      >
                        View
                      </button>
                      <button
                        className="px-5 py-1 border bg-red-300 hover:bg-red-400 cursor-pointer"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-4 gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-center font-bold mt-20 text-red-400 text-2xl">No Data Found!</p>
      )}
    </>
  );
};
