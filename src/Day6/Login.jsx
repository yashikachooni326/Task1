import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    const handleToggle = () => {
        navigate("/");
    }
    const validationSchema = yup.object({
        fullname : yup.string()
        .required("Name is Required"),
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
            email: "",
            password: "",
        },
        validationSchema: validationSchema,

        onSubmit: (values) => {
            const userData = JSON.parse(localStorage.getItem("registerUser"));
            if (!userData) {
                alert("No user found!");
                return;
            }
            if (values.email === userData.email && values.password === userData.password) {
                alert("Login successful!");
                handleToggle();
            } else {
                alert("Invalid email or password!");
            }
        }
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="h-80 w-80 rounded-lg bg-stone-100 p-4 justify-center items-center ml-140 mt-5 ">
                    <h1 className="font-medium text-amber-400 mb-4 text-center">
                        Login User
                    </h1>

                    <label htmlFor="email">Email: </label>
                    <br />
                    <input
                        className="border rounded-lg w-60"
                        type="email"
                        autoComplete="off"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <br />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-sm">{formik.errors.email}</p>
                    )}
                    <br />

                    <label htmlFor="password">Password: </label>
                    <br />
                    <input
                    autoComplete="off"
                        className="border rounded-lg w-60"
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <br />
                    {formik.touched.password && formik.errors.password && (
                        <p className="text-red-500 text-sm">{formik.errors.password}</p>
                    )}
                    <br />

                    <button
                        className="border rounded-lg bg-amber-400 px-4 py-1 cursor-pointer"
                        type="submit">
                        Login User
                    </button>
                </div>
            </form>
        </>
    );
};
