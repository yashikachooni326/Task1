import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

export default function Signup  ()  {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
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
      .min(4, "Password must be at least 4 characters")
      .max(6, "Password must be less than 6 characters"),
  });
   
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      localStorage.setItem("registerUser", JSON.stringify(values));
      localStorage.setItem("isLoggedIn",true);
      alert("Signup successful! Please login.");
      navigate("/login"); 
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="h-96 w-80 rounded-lg bg-stone-100 p-4 flex flex-col justify-center items-center ml-140 mt-5">
        <h1 className="font-medium text-amber-400 mb-4 text-center">
          Signup User
        </h1>

        <label htmlFor="name">Name:</label>
        <input
          className="border rounded-lg w-60 mt-1 mb-2"
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm">{formik.errors.name}</p>
        )}

        <label htmlFor="email">Email:</label>
        <input
          className="border rounded-lg w-60 mt-1 mb-2"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm">{formik.errors.email}</p>
        )}

        <label htmlFor="password">Password:</label>
        <input
          className="border rounded-lg w-60 mt-1 mb-2"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm">{formik.errors.password}</p>
        )}

        <button
          className="border rounded-lg bg-amber-400 px-4 py-1 mt-3 cursor-pointer"
          type="submit"
        >
          Signup
        </button>
      </div>
    </form>
  );
};
