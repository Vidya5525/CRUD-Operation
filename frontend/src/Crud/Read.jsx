import React, { useState, useEffect } from "react";
import "./Read.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Read() {
  const [customers, setCustomers] = useState([]);

  function getAllData(){
    // Fetch customer data from the API
    axios.get(`http://localhost:5000/api/`)
    .then((response) => {
         console.log('Data getting successfully:', response.data);
         setCustomers(response.data);
    })
     .catch((error) => {
        console.error('There was an error submitting the form:', error);
    });
  }

  function handleDelete(id){
    axios.delete(`http://localhost:5000/api/deleteCustomer/${id}`)
    .then((response) => {
         console.log('Data deleted successfully:', response.data);
         getAllData();
    })
     .catch((error) => {
        console.error('There was an error submitting the form:', error);
    });
  }

  useEffect(() => {

    getAllData()
  }, []);


  return (
    <section className="customerpage">
      <h1>READ Opration</h1>

      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Membership</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td>
                  {customer.firstName} {customer.lastName}
                </td>
                <td>{customer.email}</td>
                <td>{customer.number}</td>
                <td>{customer.memberShip}</td>
                <td>
                  <NavLink to={`/update/${customer._id}`}>
                    <button className="edit-delete-button">
                      <FaUserEdit />
                    </button>
                  </NavLink>
                  <button
                    className="edit-delete-button"
                    onClick={() =>handleDelete(customer._id)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NavLink to="/create">
        <button className="adduserbtn">Add New Customer</button>
      </NavLink>
    </section>
  );
}

export default Read;
