
import { useNavigate } from "react-router-dom";
import Select from "react-select";

export const UserInfo = ({ handleChange, values, errors }) => {
  const options = [
    { value: "Dancing", label: "Dancing" },
    { value: "Singing", label: "Singing" },
    { value: "Painting", label: "Painting" },
    { value: "Travelling", label: "Travelling" },
  ];

  const navigate = useNavigate();

  const Listing = ()=>
  {
    navigate('/listing-page');
  }
  return (
    <>
      <button type="button" className=" px-5 py-1 bg-amber-100" onClick={Listing}>Show User</button>
    <div className="max-w-sm mx-auto mt-6 p-6 border border-gray-300 rounded-lg ">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
        User Info
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">First Name:</label>
        <input
          type="text"
          name="fname"
          value={values.fname}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.fname && <p className="text-red-500 text-sm">{errors.fname}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Last Name:</label>
        <input
          type="text"
          name="lname"
          value={values.lname}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.lname && <p className="text-red-500 text-sm">{errors.lname}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Hobby:</label>
        
        <Select
          isMulti
           closeMenuOnSelect={false}
          value={values.hobby}
          onChange={(selected) =>
            handleChange({ target: { name: "hobby", value: selected } })
          }
          options={options}
        />

        {errors.hobby && <p className="text-red-500 text-sm">{errors.hobby}</p>}
      </div>
    </div>
    </>
  );
};
