export const Login = () => {
  return (
    <>
      <div className="h-screen w-full bg-fuchsia-100 flex justify-center items-center">
        <div className="bg-white p-6  w-[300px]">
          <h1 className="text-center text-xl font-medium text-gray-700 mb-4">
            Login
          </h1>

          <form className="flex flex-col space-y-3">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Name</label>
              <input
                type="text"
                className="border border-gray-400 w-full px-2 py-1 "
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Password</label>
              <input
                type="password"
                className="border border-gray-400 w-full px-2 py-1 "
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <input
                type="email"
                className="border border-gray-400 w-full px-2 py-1 "
              />
            </div>

            <button className="bg-fuchsia-400 text-white py-1 mt-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
