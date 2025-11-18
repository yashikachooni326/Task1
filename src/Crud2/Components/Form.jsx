
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Select from "react-select";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


export const Form = () => {
    const navigate = useNavigate();

    const validationSchema = yup.object({
        fname: yup
            .string()
            .required("First name is required")
            .matches(/^[A-Za-z]+$/, "Name can only contain letters"),
        lname: yup
            .string()
            .required("Last name is required")
            .matches(/^[A-Za-z]+$/, "Name can only contain letters"),
        email: yup
            .string()
            .email("Email must be in valid format")
            .required("Email is required"),
        phone: yup.string().required("Phone number is required"),
        bio: yup.string().required("Enter Bio"),
        office: yup.object().required("Please select atleast one"),
        address: yup.string().required("Address is required"),
    });

    const formik = useFormik({
        initialValues: {
            fname: "",
            lname: "",
            email: "",
            phone: "",
            bio: "",
            office: "",
            address: "",
        },
        validationSchema,
        onSubmit: (values) => {
            let existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

            const randomId = Math.floor(Math.random() * 1000000) + Date.now();
            const newUser = {
                id: id ? Number(id) : randomId,
                ...values,
                office: values.office?.value || "",
            };

            let updatedUsers;

            if (id) {
                updatedUsers = existingUsers.map((user) =>
                    user.id == id ? newUser : user
                );
                Swal.fire({
                    title: "User Updated Successfully!",
                    icon: "success",
                    draggable: true
                });
            } else {
                updatedUsers = [...existingUsers, newUser];
                Swal.fire({
                    title: "User added Successfully!",
                    icon: "success",
                    draggable: true
                });
            }

            updatedUsers.sort((a, b) => a.fname.localeCompare(b.fname));

            localStorage.setItem("users", JSON.stringify(updatedUsers));
            navigate("/user-data");
        },
    });

    const options = [
        { value: "Jagadhri", label: "Jagadhri" },
        { value: "Mohali", label: "Mohali" },
        { value: "Chandigarh", label: "Chandigarh" },
        { value: "Kalka", label: "Kalka" },
        { value: "Punjab", label: "Punjab" },
        { value: "Lucknow", label: "Lucknow" },
    ];

    const { id } = useParams();

    useEffect(() => {
        const allData = JSON.parse(localStorage.getItem("users")) || [];
        const findUser = allData.find((p) => p.id == id);

        if (findUser) {
            const matchedOffice = options.find(
                (opt) => opt.value === findUser.office
            );

            formik.setValues({
                fname: findUser.fname || "",
                lname: findUser.lname || "",
                email: findUser.email || "",
                phone: findUser.phone || "",
                bio: findUser.bio || "",
                office: matchedOffice || "",
                address: findUser.address || "",
            });
        }
    }, [id]);


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={formik.handleSubmit}
                className="bg-white shadow-lg rounded-lg p-8 w-[600px]"
            >
                <button type="button" className="border px-6 rounded-lg bg-indigo-300 hover:bg-indigo-500 transition cursor-pointer text-white py-1">
                    <Link to="/user-data">Show All Users</Link>
                </button>
                <h1 className="text-center text-2xl font-semibold text-indigo-600 mb-6">
                    User Form
                </h1>

                <label className="font-medium text-indigo-500">First Name:</label>
                <input
                    type="text"
                    name="fname"
                    value={formik.values.fname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border rounded-lg p-2 w-full mb-2"
                />
                {formik.touched.fname && formik.errors.fname && (
                    <p className="text-red-500">{formik.errors.fname}</p>
                )}

                <label className="font-medium text-indigo-500 mt-3 block">
                    Last Name:
                </label>
                <input
                    type="text"
                    name="lname"
                    value={formik.values.lname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border rounded-lg p-2 w-full mb-2"
                />
                {formik.touched.lname && formik.errors.lname && (
                    <p className="text-red-500">{formik.errors.lname}</p>
                )}

                <label className="font-medium text-indigo-500 mt-3 block">Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border rounded-lg p-2 w-full mb-2"
                />
                {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500">{formik.errors.email}</p>
                )}

                <label className="font-medium text-indigo-500 mt-3 block">
                    Phone Number:
                </label>
                <PhoneInput
                    country={"in"}
                    value={formik.values.phone}
                    onChange={(phone) => formik.setFieldValue("phone", phone)}
                    inputClass="rounded-lg p-2 border border-gray-400 w-full"
                />
                {formik.touched.phone && formik.errors.phone && (
                    <p className="text-red-500">{formik.errors.phone}</p>
                )}

                <label className="font-medium text-indigo-500 mt-3 block">
                    Office Location:
                </label>
                <Select
                    value={formik.values.office}
                    onChange={(selected) => formik.setFieldValue("office", selected)}
                    options={options}
                />
                {formik.touched.office && formik.errors.office && (
                    <p className="text-red-500">{formik.errors.office}</p>
                )}

                <label className="font-medium text-indigo-500 mt-3 block">Address:</label>
                <textarea
                    id="address"
                    name="address"
                    rows="4"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                    placeholder="Write your address here..."
                />
                {formik.touched.address && formik.errors.address && (
                    <p className="text-red-500">{formik.errors.address}</p>
                )}

                <label className="font-medium text-indigo-500 mt-3 block">Bio:</label>
                <ReactQuill
                    theme="snow"
                    value={formik.values.bio}
                    onChange={(content) => formik.setFieldValue("bio", content)}
                    className="mb-2 bg-white"
                />
                {formik.touched.bio && formik.errors.bio && (
                    <p className="text-red-500">{formik.errors.bio}</p>
                )}

                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white font-medium py-2 rounded-lg mt-5 hover:bg-indigo-600 transition cursor-pointer"
                >
                    {id ? "Update User" : " Add User"}
                </button>
            </form>
        </div>
    );
};
