import React, { useEffect, useState } from "react";
import Hamburger from "../Hamburger/Hamburger";
import "./employees.css";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState({
    column: "",
    order: "asc",
  });

  useEffect(() => {
    fetch("http://localhost:8081/employees")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
        setTotalPages(Math.ceil(data.length / pageSize));
      })
      .catch((error) => console.error(error));
  }, []);

  const sortEmployees = () => {
    return employees.sort((a, b) => {
      if (sort.column === "id") {
        return sort.order === "asc" ? a.id - b.id : b.id - a.id;
      } else if (sort.column === "name") {
        return sort.order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (sort.column === "email") {
        return sort.order === "asc" ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email);
      } else {
        return 0;
      }
    });
  };

  const paginate = () => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    // Filter the list of employees based on the search filter.
    const filteredEmployees = employees.filter((employee) => {
      return employee.name.toLowerCase().includes(filter.toLowerCase());
    });

    // Sort the filtered list of employees.
    const sortedEmployees = filteredEmployees.sort((a, b) => {
      if (sort.column === "id") {
        return sort.order === "asc" ? a.id - b.id : b.id - a.id;
      } else if (sort.column === "name") {
        return sort.order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (sort.column === "email") {
        return sort.order === "asc" ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email);
      } else {
        return 0;
      }
    });

    // Return the paginated list of sorted employees.
    return sortedEmployees.slice(start, end);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (column) => {
    setSort({
      column,
      order: sort.order === "asc" ? "desc" : "asc",
    });
  };

  return (
    <div>
      <div className="forhamburgermenuforgetexcel">
        <Hamburger />
      </div>
      <div>
        <h1 className="skjdbfhsbfkhsdbdkhbs"></h1>
        <div className="employee-list-container">
          <h2 className="employee-list-title">EXCEL DATA</h2>
          <h2 className="employee-list-title1">EXCEL DATA</h2>
          <input
          className="search-bar-for-filter-the-emp"
            type="text"
            placeholder="Filter By Name 🔎"
            value={filter}
            onChange={handleFilterChange}
          />
          <table className="employee-list-table">
          <thead>
              <tr>
                <th
                  className="employee-list-header"
                  sort-by="id"
                  onClick={() => handleSortChange("id")}
                >
                  ID
                </th>
                <th
                  className="employee-list-header"
                  sort-by="name"
                  onClick={() => handleSortChange("name")}
                >
                  First Name
                </th>
                <th
                  className="employee-list-header"
                  sort-by="phone"
                  onClick={() => handleSortChange("phone")}
                >
                  Last Name
                </th>
                <th
                  className="employee-list-header"
                  sort-by="email"
                  onClick={() => handleSortChange("email")}
                >
                  Email
                </th>
                
              </tr>
            </thead>
            <tbody>
              {paginate().map((employee) => (
                <tr key={employee.id} className="employee-list-row">
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-control">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              First
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
