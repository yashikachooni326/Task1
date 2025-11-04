export const ReusableComp =({data})=>
{
    return(
        <>
         <div
            className="bg-white border border-gray-300 rounded-md p-2 w-48 flex flex-col items-center"
          >
            <img
              src={data.image}
              alt={`Stylish Dress ${data.id}`}
              className="h-40 w-40 object-contain"
            />
            <p className="text-gray-700 text-sm mt-2 text-center">
              Stylish Dress {data.id}
            </p>
          </div>
        </>
    )
}