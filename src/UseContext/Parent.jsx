import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Parent() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { location: "", name: "", email: "" }
  ]);

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const addMore = () => {
    setRows([...rows, { location: "", name: "", email: "" }]);
  };
const deleteRow = (index) => {
  const updatedRows = [...rows];   
  updatedRows.splice(index, 1);  
  setRows(updatedRows);            
};


  const handleSubmit = (e) => {
  e.preventDefault();

  const oldData = JSON.parse(localStorage.getItem("myData")) || [];

  const updatedData = [...oldData, ...rows];

  localStorage.setItem("myData", JSON.stringify(updatedData));

  navigate("/listing");
};


  return (
    <form onSubmit={handleSubmit}>
      <h2>Add More Form</h2>

      {rows.map((row, index) => (
        <div key={index} style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
          <input className="border rounded-lg"
            type="text"
            placeholder="Location"
            value={row.location}
            onChange={(e) => handleChange(index, "location", e.target.value)}
          />

          <input className="border rounded-lg"
            type="text"
            placeholder="Name"
            value={row.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
          />

          <input className="border rounded-lg"
            type="email"
            placeholder="Email"
            value={row.email}
            onChange={(e) => handleChange(index, "email", e.target.value)}
          />

          <button type="button" onClick={() => deleteRow(index)} style={{ background: "red", color: "#fff" }}>
            Delete
          </button>
        </div>
      ))}

      <button type="button" className="border rounded-lg" onClick={addMore}>
        + Add More
      </button>

      <br /><br />

      <button type="submit" className="border rounded-lg">Submit</button>
    </form>
  );
}




