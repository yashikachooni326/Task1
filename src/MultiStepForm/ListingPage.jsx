
import { useEffect, useState } from "react";
import { FaPencilAlt, FaTrashAlt, FaEye, FaSort } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const ListingPage = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('asc');
    const [selectedHobby, setSelectedHobby] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);

    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('multiForm'));
        setData(userInfo || []);
    }, []);


    useEffect(() => {
    let filteredData = data.filter(user => {
      const nameMatch = user.fname.toLowerCase().includes(search.toLowerCase());

      const hobbyMatch = selectedHobby ? 
        user.hobby && user.hobby.map(h => h.label).includes(selectedHobby) : 
        true;
      return nameMatch && hobbyMatch;
    });

    filteredData.sort((a, b) => {
      const nameA = a.fname.toLowerCase();
      const nameB = b.fname.toLowerCase();
      if (nameA < nameB) return sort === 'asc' ? -1 : 1;
      if (nameA > nameB) return sort === 'asc' ? 1 : -1;
      return 0;
    });

    setFilter(filteredData);
    setCurrentPage(1);
  }, [search, sort, selectedHobby, data]);

    
    const handleSearch = (e) => setSearch(e.target.value);
    const moveBtn = () => navigate('/');
    const handleEdit = (id) => navigate(`/edit/${id}`);
    const handleUser = (id) => navigate(`/user/${id}`);

    
    const handleDelete = (id) => {
        const updatedUsers = data.filter(p => p.id !== id);
        Swal.fire({
            title: "Do you want to delete User?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("User Deleted!", "", "success");
                setData(updatedUsers);
                localStorage.setItem("multiForm", JSON.stringify(updatedUsers));
            } else if (result.isDenied) {
                Swal.fire("User Not Deleted", "", "info");
            }
        });
    };

    //pagination
    const totalPages = Math.ceil(filter.length / recordsPerPage);
    const endIndex = currentPage * recordsPerPage;
    const startIndex = endIndex - recordsPerPage;
    const currentRecords = filter.slice(startIndex, endIndex);

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);

        }
    };
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);

        }
    };

    return (
        <>
            <div className="flex gap-5 ml-10 mt-10">
                <button className="border px-5 py-1 bg-sky-400" onClick={moveBtn}>Add User</button>

                <input
                    type="search"
                    placeholder="Search by Name..."
                    value={search}
                    onChange={handleSearch}
                    className="px-7 py-1 border w-80 rounded-lg text-center"
                />

              
            </div>

                <label className="ml-200">Hobby:</label>
            

            <div className="ml-200 px-7 py-1 border w-50">

                <select  onChange={(e)=> setSelectedHobby(e.target.value)} value={selectedHobby}>
                    <option value="">All Hobbies</option>
                    <option value="Dancing">Dancing</option>
                    <option value="Singing">Singing</option>
                    <option value="Travelling">Travelling</option>
                    <option value="painting">painting</option>
                </select>

            </div>

            <h1 className="text-2xl text-center font-bold mb-10 mt-10">User Data</h1>

            {currentRecords.length !== 0 ? (
                <table cellPadding="1" className="mx-auto">
                    <thead>
                        <tr>
                            <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">
                                First Name
                                <FaSort
                                    size={20}
                                    color={"green"}
                                    className="cursor-pointer ml-2"
                                    onClick={() => setSort(sort === 'asc' ? 'desc' : 'asc')}
                                />
                            </th>
                            <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Last Name</th>
                            <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Phone</th>
                            <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Email</th>
                            <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Address</th>
                            <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">City</th>
                            <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Description</th>
                            <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Country</th>
                            <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Hobby</th>
                            <th className="p-3 border text-center font-bold text-lg bg-stone-200 text-sky-700">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentRecords.map(item => (
                            <tr key={item.id}>
                                <td className="p-3 border">{item.fname}</td>
                                <td className="p-3 border">{item.lname}</td>
                                <td className="p-3 border">{item.phone}</td>
                                <td className="p-3 border">{item.email}</td>
                                <td className="p-3 border">{item.address}</td>
                                <td className="p-3 border">{item.city}</td>
                                <td className="p-3 border">
                                    <div dangerouslySetInnerHTML={{ __html: item.description }} />
                                </td>
                                <td className="p-3 border">{item.country}</td>
                                <td className="p-3 border">{item.hobby ? item.hobby.map(h => h.label).join(", ") : ""}</td>
                                <td className="p-3 border">
                                    <div className="flex justify-center gap-5">
                                        <FaPencilAlt size={20} onClick={() => handleEdit(item.id)} className="cursor-pointer text-blue-300 hover:text-blue-700 transition-colors duration-300" />
                                        <FaEye size={20} onClick={() => handleUser(item.id)} className="cursor-pointer text-amber-400 hover:text-green-700 transition-colors duration-300" />
                                        <FaTrashAlt size={20} onClick={() => handleDelete(item.id)} className="cursor-pointer text-red-300 hover:text-red-500 transition-colors duration-300" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center font-bold text-xl text-red-500 mt-20">No data found!</p>
            )}

            <div className="flex justify-center mt-5 gap-3">
                <button onClick={goToPrevPage} disabled={currentPage === 1} className="px-3 py-1 border bg-gray-200 rounded">Prev</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={goToNextPage} disabled={currentPage === totalPages} className="px-3 py-1 border bg-gray-200 rounded">Next</button>
            </div>
        </>
    );
}

