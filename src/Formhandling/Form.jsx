import React from "react";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export const Form = () => {
  const navigate = useNavigate();

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const formik = useFormik({
    initialValues: {
      rows: [{ location: null, name: "", age: "" }],
    },

    validationSchema: Yup.object({
      rows: Yup.array().of(
        Yup.object().shape({
          location: Yup.object().required("Select location"),
          name: Yup.string().required("Name is required"),
          age: Yup.string().required("Age is required"),
        })
      ),
    }),

    onSubmit: (values) => {
      const oldData = JSON.parse(localStorage.getItem("data")) || [];
      localStorage.setItem("data", JSON.stringify([...oldData, ...values.rows]));
      navigate("/listing");
    },
  });

  const addMore = () => {
    formik.setFieldValue("rows", [
      ...formik.values.rows,
      { location: null, name: "", age: "" },
    ]);
  };

  const deleteRow = (index) => {
    if (formik.values.rows.length === 1) return;
    const updated = [...formik.values.rows];
    updated.splice(index, 1);
    formik.setFieldValue("rows", updated);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="bg-stone-100 shadow-md ml-50 mt-10 p-4">
        <h1 className="text-2xl text-center font-medium mb-4">Form</h1>

        {formik.values.rows.map((row, index) => (
          <div key={index} className="flex flex-col gap-2 px-4 py-4 border-b">

            <Select
              value={row.location}
              options={options}
              placeholder="Select location"
              onChange={(val) =>
                formik.setFieldValue(`rows[${index}].location`, val)
              }
              onBlur={() =>
                formik.setFieldTouched(`rows[${index}].location`, true)
              }
            />

            {formik.touched.rows?.[index]?.location &&
              formik.errors.rows?.[index]?.location && (
                <p className="text-red-500 text-sm">
                  {formik.errors.rows[index].location}
                </p>
              )}

            <input
              type="text"
              className="border px-4 py-1"
              name={`rows[${index}].name`}
              value={row.name}
              placeholder="Enter name..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.rows?.[index]?.name &&
              formik.errors.rows?.[index]?.name && (
                <p className="text-red-500 text-sm">
                  {formik.errors.rows[index].name}
                </p>
              )}

            <input
              type="text"
              className="border px-4 py-1"
              name={`rows[${index}].age`}
              value={row.age}
              placeholder="Enter age..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.rows?.[index]?.age &&
              formik.errors.rows?.[index]?.age && (
                <p className="text-red-500 text-sm">
                  {formik.errors.rows[index].age}
                </p>
              )}

            <button
              type="button"
              onClick={() => deleteRow(index)}
              disabled={formik.values.rows.length === 1}
              className={`px-3 py-1 text-white mt-2 ${
                formik.values.rows.length === 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500"
              }`}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="border bg-sky-300 px-4 py-1 mt-6 ml-5"
        onClick={addMore}
      >
        + Add More
      </button>

      <button
        type="submit"
        className="border bg-green-500 text-white px-4 py-1 mt-6 ml-5"
      >
        Submit
      </button>
    </form>
  );
};
