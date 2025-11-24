
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { FaSort } from "react-icons/fa";

export const ListingPage = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('asc');
    const [selectedHobby, setSelectedHobby] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);

    

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userdata')) || [];
        setData(userData);
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



    const handleDelete = (id) => {
        const updatedUsers = data.filter((p) => p.id !== id);

         Swal.fire({
              title: "Do you want to delete User?",
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Yes",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire("User Deleted!", "", "success");
                setData(updatedUsers); 
                localStorage.setItem("userdata", JSON.stringify(updatedUsers)); 
              } else if (result.isDenied) {
                Swal.fire("User Not Deleted", "", "info");
              }
            });
    };

    const navigate = useNavigate();
    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const moveBtn = () => {
        navigate("/");
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const filteredData = data.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <button onClick={moveBtn} className="border px-5 py-1 bg-amber-100 mt-10 ml-5">Back Button</button>
            <input
                type="search"
                placeholder="Search Something..."
                className="ml-10 px-6 py-1 border rounded-lg"
                value={search}
                onChange={handleSearch}
            />
            <h2 className="font-bold text-lg   text-center mb-10 mt-10 text-amber-400 text-xl">User Data</h2>
            
            {filteredData.length > 0 ? (
                <table className="ml-80">
                    <thead>
                        <tr>
                            <th className="p-3 border font-bold text-teal-700 bg-stone-200 text-lg">Name</th>
                            <th className="p-3 border font-bold text-teal-700 bg-stone-200 text-lg">Email</th>
                            <th className="p-3 border font-bold text-teal-700 bg-stone-200 text-lg">Gender</th>
                            <th className="p-3 border font-bold text-teal-700 bg-stone-200 text-lg">Skills</th>
                            <th className="p-3 border font-bold text-teal-700 bg-stone-200 text-lg">Date</th>
                            <th className="p-3 border font-bold text-teal-700 bg-stone-200 text-lg">Phone</th>
                            <th className="p-3 border font-bold text-teal-700 bg-stone-200 text-lg">Description</th>
                            <th className="p-3 border font-bold text-teal-700 bg-stone-200 text-lg">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item) => ( 
                            <tr key={item.id || item.email}> 
                                <td className="p-3 border">{item.name}</td>
                                <td className="p-3 border">{item.email}</td>
                                <td className="p-3 border">{item.gender}</td>
                                <td className="p-3 border">{item.skills ? item.skills.map((p) => p.label).join(" , ") : ""}</td>
                                <td className="p-3 border">{item.date}</td>
                                <td className="p-3 border">{item.phone}</td>
                                <td className="p-3 border">
                                    <div dangerouslySetInnerHTML={{ __html: item.description }} />
                                </td>
                                <td className="p-3 border">
                                    <button className="border px-5 py-1 bg-amber-300 cursor-pointer" type="button" onClick={() => handleEdit(item.id)}>Edit</button>
                                    <button className="border px-5 py-1 bg-red-300 cursor-pointer" type="button" onClick={() => handleDelete(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-2xl font-bold text-red-400 text-center mt-100">No Data Found</p>
            )}
        </>
    );
};
