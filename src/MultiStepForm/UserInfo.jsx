
export const UserInfo = ({ nextStep, handleChange, values }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep(); 
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">User Info</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">First Name:</label>
          <input
            type="text"
            name="fname"
            value={values.fname}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Last Name:</label>
          <input
            type="text"
            name="lname"
            value={values.lname}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      </form>
    </div>
  );
};
