import { useEffect, useState } from "react";

export const Form2 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const Userdata = JSON.parse(localStorage.getItem("data")) || [];
    setData(Userdata);
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Detail Page</h1>

      <table
        style={{
          width: "80%",
          margin: "0 auto",
          borderCollapse: "collapse"
        }}
        border="1"
        cellPadding="10"
      >
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0", fontWeight: "bold" }}>
            <th>Location</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.location?.label || "-"}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
