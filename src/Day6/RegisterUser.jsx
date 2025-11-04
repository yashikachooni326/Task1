import { useFormik } from "formik";
import * as yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useEffect } from "react";

export const RegisterUser = () => {
    const options = [
        { value: "Maths", label: "Maths" },
        { value: "Science", label: "Science" },
        { value: "Node", label: "Node" },
        { value: "React", label: "React" },
    ];

    const [selectedOption, setSelectedOption] = useState(null);

    const validationSchema = yup.object({
        name: yup
            .string()
            .required("Name is Required")
            .min(3, "Atleast 3 character required")
            .matches(/^[A-Za-z\s]+$/, "Name can only contain letters"),
        email: yup
            .string()
            .required("Email is required")
            .matches(
                /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                "Invalid email format"
            ),
        password: yup
            .string()
            .required("Password is required")
            .min(4, "Password must be atleast 4 length")
            .max(6, "Password must be less than 6 length"),
        age: yup
            .number()
            .required("Age is required")
            .min(18, "Age must be atleast 18")
            .max(100, "Please enter valid age"),
        contact: yup
            .string()
            .required("Phone number is required")
            .min(10, "Enter a valid phone number")
            .max(15, "Enter a valid phone number"),
        gender: yup.string().required("Please select gender"),
        subject: yup.string().required("Please select atleast one subject"),
        description: yup.string().required("Description is required"),
    });

      const data = JSON.parse(localStorage.getItem("registerUser")) || {};

    const formik = useFormik({
       initialValues: {
            name: data.name || "",
            email: data.email || "",
            password: data.password || "",
            age: data.age || "",
            contact: data.contact || "",
            gender: data.gender || "",
            subject: data.subject || "",
            description: data.description || "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert("User Registered Successfully!");
            localStorage.setItem("registerUser", JSON.stringify(values));
            console.log("Form Submitted:", values);
           
        },
    });

   
    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="bg-neutral-100 shadow-lg rounded-lg p-8 w-[500px]">
                    <h1 className="text-2xl font-semibold text-center text-yellow-500 mb-6">
                        Register User
                    </h1>

                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-md mb-1">
                                Name:
                            </label>
                            <input type="text" name="name" id="name" className="border rounded-lg w-full h-9 px-3" onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-red-500 text-sm">{formik.errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-md mb-1">
                                Email:
                            </label>
                            <input type="email" name="email" id="email" className="border rounded-lg w-full h-9 px-3" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-sm">{formik.errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-md  mb-1">
                                Password:
                            </label>
                            <input type="password" name="password" id="password" className="border rounded-lg w-full h-9 px-3" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-sm">{formik.errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="age" className="block text-md  mb-1">
                                Age:
                            </label>
                            <input type="text" name="age" id="age" className="border rounded-lg w-full h-9 px-3" onChange={formik.handleChange} value={formik.values.age} onBlur={formik.handleBlur}
                            />
                            {formik.touched.age && formik.errors.age && (
                                <p className="text-red-500 text-sm">{formik.errors.age}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="contact" className="block text-md  mb-1"
                            >
                                Contact Us:
                            </label>
                            <PhoneInput
                                country={"in"}
                                value={formik.values.contact}
                                onChange={(phone) => formik.setFieldValue("contact", phone)}
                                onBlur={formik.handleBlur}
                                inputProps={{
                                    name: "contact",
                                    required: true,
                                    className:
                                        "w-full h-9 px-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300",
                                }}
                                containerClass="w-full"
                            />
                            {formik.touched.contact && formik.errors.contact && (
                                <p className="text-red-500 text-sm">{formik.errors.contact}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-md  mb-1">Gender:</label>
                            <div className="space-x-4">
                                <label>
                                    <input  type="radio"  name="gender"  value="male"  onChange={formik.handleChange} checked={formik.values.gender === "male"}
                                    />{" "}
                                    Male
                                </label>
                                <label>
                                    <input type="radio" name="gender" value="female" onChange={formik.handleChange}  checked={formik.values.gender === "female"}
                                    />{" "}
                                    Female
                                </label>
                                <label>
                                    <input type="radio" name="gender" value="other"onChange={formik.handleChange}checked={formik.values.gender === "other"}
                                    />{" "}
                                    Other
                                </label>
                            </div>
                            {formik.touched.gender && formik.errors.gender && (
                                <p className="text-red-500 text-sm">{formik.errors.gender}</p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="subject"
                                className="block text-md  mb-1"
                            >
                                Subject:
                            </label>
                            <Select
                                id="subject"
                                name="subject"
                                options={options}
                                isMulti={true}
                                value={
                                    options.find(
                                        (option) => option.value === formik.values.subject
                                    ) || null
                                }
                                onChange={(option) => {
                                    setSelectedOption(option);
                                    formik.setFieldValue("subject", option ? option.value : "");
                                }}
                                onBlur={formik.handleBlur}
                                className="w-full"
                                placeholder="Select Subject"
                            />
                            {formik.touched.subject && formik.errors.subject && (
                                <p className="text-red-500 text-sm">{formik.errors.subject}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-md  mb-1">
                                Description:
                            </label>
                            <ReactQuill
                                theme="snow"
                                value={formik.values.description}
                                onChange={(value) =>
                                    formik.setFieldValue("description", value)
                                }
                                onBlur={() => formik.setFieldTouched("description", true)}
                                placeholder="Write something..."
                                className="h-32 mb-10"
                            />
                            {formik.touched.description && formik.errors.description && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formik.errors.description}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-orange-400 text-white  px-6 py-2 rounded-lg hover:bg-orange-500 transition"
                            >
                                Submit
                            </button>

                            <button type="button" onClick={()=> localStorage.removeItem("registerUser")}  className="bg-orange-400 text-white ml-4   px-6 py-2 rounded-lg hover:bg-orange-500 transition">Reset</button>
                              
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
