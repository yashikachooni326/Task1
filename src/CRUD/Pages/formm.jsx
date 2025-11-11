import { useFormik } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Api } from "../Networking/Api";
import { useParams } from "react-router-dom";
 
const Home = () => {
  const navigate = useNavigate();
  const [userData,setUserData]=useState([])
  const [initialData,setInitialData]=useState(null)
 
  const {id}=useParams()
   
  const findUserById=async()=>{
    const url=`/customer/detail?id=${id}`
      const user = await Api(url,{},"get")
      // console.log(user.data.data)
      const result=user.data.data
      setInitialData(result)
    }
     useEffect(()=>{
      findUserById()
     },[id])
     
    //  const handelEdit=async()=>{
    //   const url='/customer/update'
    //   const result=await Api(url,)
    //  }
  
  const validationSchema = yup.object({
    name: yup.string().required("name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    phone: yup.string().required("phone number is required"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    zipCode: yup.string().required("zipCode is required"),
  });
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      address: initialData?.address || "",
      city: initialData?.city || "",
      state: initialData?.state || "",
      zipCode: initialData?.zipCode || "",
    },
    validationSchema,
    
    onSubmit: async (values) => {
      try {
        let method,url;
        if(initialData){
               const url='/customer/update'
                method="put"
        }else{
          const url = "/customer/add";
          method="post"
        }
    const response = await Api(url, values,method);
    setUserData(response.data);
    alert("Customer added successfully!");
  } catch (err) {
    console.error( err);
  }
}
 
  });
 
  return (
    <>
      <h1 className="place-self-center text-2xl font-bold m-7 bg-purple-200 p-3 rounded-xl">
        Customers App
      </h1>
 
      <form onSubmit={formik.handleSubmit} className="flex flex-col items-center">
        <fieldset className="flex flex-col rounded-lg border-2 border-black p-6 w-80">
          <legend className="text-lg font-semibold">Customer Details</legend>
 
          <label htmlFor="name" className="mt-4">name:</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="rounded-lg p-2 border border-black"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-600 font-bold">{formik.errors.name}</div>
          )}
 
          {/* Email */}
          <label htmlFor="email" className="mt-4">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="rounded-lg p-2 border border-black"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-600 font-bold">{formik.errors.email}</div>
          )}
 
          {/* phone */}
          <label htmlFor="phone" className="mt-4">phone:</label>
          <PhoneInput
            country={"us"}
            value={formik.values.phone}
            onChange={(phone) => formik.setFieldValue("phone", phone)}
            inputClass="rounded-lg p-2 border border-black w-full"
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="text-red-600 font-bold">{formik.errors.phone}</div>
          )}
 
          {/* Address */}
          <label htmlFor="address" className="mt-4">Address:</label>
          <input
            id="address"
            name="address"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            className="rounded-lg p-2 border border-black"
          />
          {formik.touched.address && formik.errors.address && (
            <div className="text-red-600 font-bold">{formik.errors.address}</div>
          )}
 
          {/* City */}
          <label htmlFor="city" className="mt-4">City:</label>
          <input
            id="city"
            name="city"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            className="rounded-lg p-2 border border-black"
          />
          {formik.touched.city && formik.errors.city && (
            <div className="text-red-600 font-bold">{formik.errors.city}</div>
          )}
 
          {/* State */}
          <label htmlFor="state" className="mt-4">State:</label>
          <input
            id="state"
            name="state"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.state}
            className="rounded-lg p-2 border border-black"
          />
          {formik.touched.state && formik.errors.state && (
            <div className="text-red-600 font-bold">{formik.errors.state}</div>
          )}
 
          {/* zipCode */}
          <label htmlFor="zipCode" className="mt-4">zipCode:</label>
          <input
            id="zipCode"
            name="zipCode"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.zipCode}
            className="rounded-lg p-2 border border-black"
          />
          {formik.touched.zipCode && formik.errors.zipCode && (
            <div className="text-red-600 font-bold">{formik.errors.zipCode}</div>
          )}
 
          {/* Submit */}
          <div>
            {id ? (
              <>
              <button
            type="submit"
            className="rounded-lg bg-green-500 border-2 border-black mt-6 text-xl font-bold w-24 p-2 self-end cursor-pointer"
            // onClick={handelEdit}
          >
            Update
          </button>
          </>
            ):(
              <>
          <button
            type="submit"
            className="rounded-lg bg-red-500 border-2 border-black mt-6 text-xl font-bold w-24 p-2 self-end cursor-pointer"
            >
            Add
          </button>
            </>
            )}
          <button
            type="button"
            className="rounded-lg bg-red-500 border-2 border-black mt-6 text-xl font-bold w-24 p-2 ml-[90px] cursor-pointer"
            onClick={()=>navigate('/customer/list')}
            >
            display
          </button>
            </div>
        </fieldset>
      </form>
    </>
  );
};
 
export default Home;
 
 