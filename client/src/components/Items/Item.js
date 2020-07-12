// import React from "react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import "./Item.css";

export function Items() {
  const [pager, setPager] = useState({});
  const [pageOfItems, setPageOfItems] = useState([]);
  const [tableData, setTableData] = useState([]);


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get("page")) || 1;
    if (page !== pager.currentPage) {
      fetch(`http://localhost:8000/api/getItems?page=${page}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then(({ pager, pageOfItems }) => {
          setPager(pager);
          setPageOfItems(pageOfItems);
        });
    }
  });
  
  useEffect(() => {
    fetch(`http://localhost:8000/api/getAllItems`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then(({ result }) => setTableData(result))  
  }, [])

  return (
    <>
      <h3>
        Categories Table
        <CSVLink data={pageOfItems}>Download Visible records</CSVLink>
        <CSVLink data={tableData}> Download Table </CSVLink>
        <Link to='/'>Upload File</Link>
      </h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>level</th>
              <th>cvss</th>
              <th>title</th>
              <th>vulnerability</th>
              <th>solution</th>
              <th>reference</th>
            </tr>
          </thead>

          <tbody>
            {pageOfItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.level}</td>
                <td>{item.cvss}</td>
                <td>{item.title}</td>
                <td>{item.vulnerability}</td>
                <td>{item.solution}</td>
                <td>{item.reference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {pager.pages && pager.pages.length && (
          <ul className="pagination">
            {pager.pages.map((page) => (
              <li key={page}>
                <Link to={`?page=${page}`}>{page}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
