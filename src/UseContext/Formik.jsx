import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Parent() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([{ location: "", name: "", email: "" }]);

  const formik = useFormik({
    initialValues: { rows },
    enableReinitialize: true, // needed to sync with rows state
    validationSchema: Yup.object().shape({
      rows: Yup.array().of(
        Yup.object().shape({
          location: Yup.string().required("Location is required"),
          name: Yup.string().required("Name is required"),
          email: Yup.string().email("Invalid email").required("Email is required"),
        })
      )
    }),
    // onSubmit: (values) => {
    //   const oldData = JSON.parse(localStorage.getItem("myData")) || [];
    //   const updatedData =.oldData, ...values.rows];
    //   localStorage.setItem("m [..yData", JSON.stringify(updatedData));
    //   navigate("/listing");
    // }
  });

  const addMore = () => {
    const newRows = [...formik.values.rows, { location: "", name: "", email: "" }];
    formik.setValues({ rows: newRows });
  };

  const deleteRow = (index) => {
    const updatedRows = formik.values.rows.filter((_, i) => i !== index);
    formik.setValues({ rows: updatedRows });
  };

  return (
    <div>
      <h2>Add More Form</h2>
      <form onSubmit={formik.handleSubmit}>
        {formik.values.rows.map((row, index) => (
          <div key={index} style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
            <div>
              <input
                name={`rows.${index}.location`}
                placeholder="Location"
                value={formik.values.rows[index].location}
                onChange={formik.handleChange}
              />
              {formik.touched.rows?.[index]?.location && formik.errors.rows?.[index]?.location ? (
                <div style={{ color: "red" }}>{formik.errors.rows[index].location}</div>
              ) : null}
            </div>

            <div>
              <input
                name={`rows.${index}.name`}
                placeholder="Name"
                value={formik.values.rows[index].name}
                onChange={formik.handleChange}
              />
              {formik.touched.rows?.[index]?.name && formik.errors.rows?.[index]?.name ? (
                <div style={{ color: "red" }}>{formik.errors.rows[index].name}</div>
              ) : null}
            </div>

            <div>
              <input
                name={`rows.${index}.email`}
                placeholder="Email"
                value={formik.values.rows[index].email}
                onChange={formik.handleChange}
              />
              {formik.touched.rows?.[index]?.email && formik.errors.rows?.[index]?.email ? (
                <div style={{ color: "red" }}>{formik.errors.rows[index].email}</div>
              ) : null}
            </div>

            <button type="button" onClick={() => deleteRow(index)} style={{ background: "red", color: "#fff" }}>
              Delete
            </button>
          </div>
        ))}

        <button type="button" onClick={addMore}>
          + Add More
        </button>

        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
