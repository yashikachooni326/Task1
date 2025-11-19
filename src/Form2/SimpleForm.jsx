
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

import {
    validateName,
    validateEmail,
    validateGender,
    validateSkills,
    validateDate,
    validatePhone,
    validateDescription
} from "./Validations";

export const SimpleForm = () => {
    const options = [
        { value: "Node", label: "Node" },
        { value: "React", label: "React" },
        { value: "Html", label: "Html" },
        { value: "Mongo", label: "Mongo" },
        { value: "TypeScript", label: "Typescript" },
        { value: "Java", label: "Java" },
        { value: "React Native", label: "React Native" },
        { value: "Javascript", label: "Javascript" }
    ];

    const [formValue, setFormValue] = useState({
        id: Date.now(),
        name: "",
        email: "",
        gender: "",
        skills: [],
        date: new Date(),
        phone: "",
        description: ""
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const oldData = JSON.parse(localStorage.getItem("userdata") || "[]");
            const edit = oldData.find((p) => p.id === Number(id));
            if (edit) setFormValue(edit);
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue((prev) => ({ ...prev, [name]: value }));

        if (isSubmitted) {
            setErrors((prev) => ({
                ...prev,
                name: name === "name" ? validateName(value) : prev.name,
                email: name === "email" ? validateEmail(value) : prev.email,
                gender: name === "gender" ? validateGender(value) : prev.gender
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        const newErrors = {
            name: validateName(formValue.name),
            email: validateEmail(formValue.email),
            gender: validateGender(formValue.gender),
            skills: validateSkills(formValue.skills),
            date: validateDate(formValue.date),
            phone: validatePhone(formValue.phone),
            description: validateDescription(formValue.description)
        };

        setErrors(newErrors);
        const noError = Object.values(newErrors).every((err) => err === "");
        if (!noError) return;

        const oldData = JSON.parse(localStorage.getItem("userdata") || "[]");

        if (id) {
            const updated = oldData.map((item) =>
                item.id === Number(id) ? formValue : item
            );
            localStorage.setItem("userdata", JSON.stringify(updated));
            Swal.fire({ title: "User Updated!", icon: "success" });
        } else {
            const updatedData = [...oldData, formValue];
            localStorage.setItem("userdata", JSON.stringify(updatedData));
            Swal.fire({ title: "Form Submitted!", icon: "success" });
        }

        navigate("/listing");
    };

    const handleToggle = () => {
        navigate("/listing");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl border border-indigo-300 rounded-xl">
                <button
                    type="button"
                    className="border px-7 py-1 bg-indigo-300 cursor-pointer"
                    onClick={handleToggle}
                >
                    Show All User
                </button>

                <h1 className="text-center mb-10 font-semibold text-3xl text-indigo-500">
                    {id ? "Edit User" : "User Form"}
                </h1>

                <label>Name:</label>
                <input
                    className="border w-full h-10 rounded-lg mb-1 px-3"
                    type="text"
                    name="name"
                    value={formValue.name}
                    onChange={handleChange}
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}

                <label>Email:</label>
                <input
                    className="border w-full h-10 rounded-lg mb-1 px-3"
                    type="email"
                    name="email"
                    value={formValue.email}
                    onChange={handleChange}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}

                <label>Gender:</label>
                <div className="flex gap-5 mt-2">
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={formValue.gender === "Male"}
                            onChange={handleChange}
                        />
                        {" "}Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formValue.gender === "Female"}
                            onChange={handleChange}
                        />
                        {" "}Female
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Others"
                            checked={formValue.gender === "Others"}
                            onChange={handleChange}
                        />
                        {" "}Others
                    </label>
                </div>
                {errors.gender && <p className="text-red-500">{errors.gender}</p>}

                <label>Skills:</label>
                <Select
                    isMulti
                    options={options}
                    value={formValue.skills}
                    onChange={(e)=>setFormValue(prev=>({...prev,skills:e}))}

                />
                <p className="text-red-500">{errors.skills && validateSkills(formValue.skills)}</p>

                <label>Select Date:</label>
                <br />
                <DatePicker
                    className="border mt-5"
                    selected={formValue.date}
                    onChange={(date) => handleChange("date", date)}

                />
                <br />
                <p className="text-red-500">{errors.date && validateDate(formValue.date)}</p>

                <label>Phone:</label>
                <PhoneInput
                    country="in"
                    value={formValue.phone}
                    onChange={(e)=>setFormValue(prev=>({...prev,phone:e}))}

                />
                <br />
                <p className="text-red-500">{errors.phone && validatePhone(formValue.phone)}</p>

                <label>Description:</label>
                <ReactQuill
                    theme="snow"
                    value={formValue.description}
                      onChange={(e)=>setFormValue(prev=>({...prev,description:e}))}

                />
                <br />
                <p className="text-red-500">{errors.description && validateDescription(formValue.description)}</p>


                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg mt-5">
                    {id ? "Update" : "Submit"}
                </button>
            </div>
        </form>
    );
};
