import { useFormik } from "formik";
import * as yup from 'yup'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { addUser,updateUser,getUserDetails } from "../Api/API";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const Form = () => {
    
 const { id } = useParams();


    useEffect(() => {
    if (id) {
        const fetchUser = async () => {
            try {
                const userData = await getUserDetails(id);
                if (userData) {
                    formik.setValues({
                        name: userData.name || '',
                        email: userData.email || '',
                        phone: userData.phone || '',
                        address: userData.address || '',
                        city: userData.city || '',
                        state: userData.state || '',
                        zipCode: userData.zipCode || '',
                    });
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchUser();
    }
}, [id]);


    const validationSchema = yup.object({
        name: yup.string()
            .required("name is require"),
        email: yup.string()
            .email("email must be in valid format")
            .required("email is required"),
        phone: yup.number()
            .required("phone number is required"),
        address: yup.string()
            .required("Address is required"),
        city: yup.string()
            .required("City is required"),
        state: yup.string()
            .required("State is required"),
        zipCode: yup.string()
            .required("Zipcode is require"),

    }
)

 const navigate= useNavigate()

const formik = useFormik({
    initialValues:{
        name:"",
        email:"",
        phone:"",
        address:"",
        city:"",
        state:"",
        zipCode:""
    },
      
    enableReinitialize: true,    
    validationSchema : validationSchema,
   
    onSubmit : async (values) => { 
      console.log("form submit:", values);
      try {
        const result = await addUser(values);
         
        console.log("User added successfully:", result);
        alert("Form data submitted successfully!");
        navigate('/user-list'); 
      } catch (error) {
        console.error("Error adding user:", error);
        alert("Failed to add user.");
      }
    }
  

})




    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={formik.handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-[700px]">
                <button className="border px-5 rounded-lg py-1 bg-indigo-100 cursor-pointer"> <Link to="/user-list">Show All User</Link></button>
                <h1 className="text-center text-sky-500 text-2xl font-semibold mb-8">
                    Customer Form
                </h1>

                <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-4">
                        <div>
                            <label className="font-medium text-indigo-500 text-lg">Name:</label>
                            <input
                                type="text"
                                className="border rounded-lg p-2 w-full"
                                name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            /><br/>
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-red-400">{formik.errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="font-medium text-indigo-500 text-lg">Phone:</label>
                            <input
                                type="tel"
                                className="border rounded-lg p-2 w-full"
                                name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            /><br/>
                            {formik.touched.phone && formik.errors.phone && (
                                <p className="text-red-400">{formik.errors.phone}</p>
                            )}
                        </div>

                        <div>
                            <label className="font-medium text-indigo-500 text-lg">City:</label>
                            <input
                                type="text"
                                className="border rounded-lg p-2 w-full"
                                name="city"value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            /><br/>
                            {formik.touched.city && formik.errors.city &&(
                                <p className="text-red-400">{formik.errors.city}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <div>
                            <label className="font-medium text-indigo-500 text-lg">Email:</label>
                            <input
                                type="email"
                                className="border rounded-lg p-2 w-full"
                                name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            /><br/>
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-400">{formik.errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="font-medium text-indigo-500 text-lg">Address:</label>
                            <input
                                type="text"
                                className="border rounded-lg p-2 w-full"
                                name="address"value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            /><br/>
                            {formik.touched.address && formik.errors.address && (
                                <p className="text-red-400">{formik.errors.address}</p>
                            )}
                        </div>

                        <div>
                            <label className="font-medium text-indigo-500 text-lg">State:</label>
                            <input
                                type="text"
                                className="border rounded-lg p-2 w-full"
                                name="state"value={formik.values.state} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            /><br/>
                            {formik.touched.state && formik.errors.state && (
                                <p className="text-red-400">{formik.errors.state}</p>
                            )}
                        </div>

                        <div>
                            <label className="font-medium text-indigo-500 text-lg">Zipcode:</label>
                            <input
                                type="text"
                                className="border rounded-lg p-2 w-full"
                                name="zipCode" value={formik.values.zipCode} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            /><br/>
                            {formik.touched.zipCode && formik.errors.zipCode && (
                                <p className="text-red-400">{formik.errors.zipCode}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-8">
                    <button
                        type="submit"
                        className="border cursor-pointer px-6 py-2 rounded-lg bg-sky-500 text-white font-medium hover:bg-sky-600 transition"
                    >
                        {id ? 'Update User' : 'Add User'}
                    </button>
                </div>
            </form>
        </div>
    );
};


