import { useEffect, useState } from "react";

export default function ListingPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("myData")) || [];
    setData(stored);
  }, []);

  return (
    <div>
      <h2>Listing Page</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Location</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.location}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
