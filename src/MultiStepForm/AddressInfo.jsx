export const AddressInfo = ({ nextStep, handleChange, values,errors }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };


  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border border-gray-300 rounded-lg ">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Address Info</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Address:</label>
          <input
            type="text"
            name="address"
            value={values.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded "
            required
          />
                  {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">City:</label>
          <input
            type="text"
            name="city"
            value={values.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded "
            required
          />
                  {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}

        </div>

        <div>
          <label>Country:</label>
          <input
            name="country"
            onChange={handleChange}
            type="text"
            value={values.country}
            className="w-full px-3 py-2 border border-gray-300 rounded "
            required
          />
                  {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}

        </div>
      </form>
    </div>
  );
};
