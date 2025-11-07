import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login () {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") navigate("/"); 
  }, [navigate]);

  const validationSchema = yup.object({
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
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      const userData = JSON.parse(localStorage.getItem("registerUser"));

      if (!userData) return alert("No user found! Please signup first.");

      if (values.email === userData.email && values.password === userData.password) {
        localStorage.setItem("isLoggedIn", "true");
        alert("Login successful!");
        navigate("/"); 
      } else {
        alert("Invalid email or password!");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="h-80 w-80 rounded-lg bg-stone-100 p-4 flex flex-col justify-center items-center ml-140 mt-5">
        <h1 className="font-medium text-amber-400 mb-4 text-center">Login User</h1>

        <label>Email:</label>
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

        <label>Password:</label>
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
          Login
        </button>
      </div>
    </form>
  );
};
