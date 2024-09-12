import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const Update = () => {
  const {id} = useParams();
  const [initialValues, setInitialValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    number: '',
    memberShip: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCx = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/getCustomer/${id}`);
        setInitialValues(response.data);
      } catch (error) {
        console.error('There was an error fetching the customer data:', error);
      }
    };

    fetchCx();
  }, [id]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: yup.object({
      firstName: yup.string().min(3, 'Please provide at least 3 characters.').required('Please enter full name.'),
      lastName: yup.string().min(3, 'Please provide at least 3 characters.').required('Please enter last name.'),
      email: yup.string().email('Please enter a valid email.').required('Please enter email.'),
      number: yup.string().required('Please enter contact number.'),
      memberShip: yup.string().required('Please select your membership.'),
    }),
    onSubmit: (values) => {
      console.log(values);
      axios.put(`http://localhost:5000/api/${id}`, values)
        .then((response) => {
          console.log('Data submitted successfully:', response.data);
          navigate('/');
        })
        .catch((error) => {
          console.error('There was an error submitting the form:', error);
        });
    }
  });

  return (
    <>
    <h1>UPDATE Opration</h1>
    <Link to="/"><button type="button" className='backbtn'>
          Back
            </button>
      </Link>
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          name="firstName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        <span>{formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : null}</span>
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
        />
        <span>{formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : null}</span>
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <span>{formik.touched.email && formik.errors.email ? formik.errors.email : null}</span>
      </div>
      <div>
        <label>Contact Number:</label>
        <input
          type="text"
          name="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.number}
        />
        <span>{formik.touched.number && formik.errors.number ? formik.errors.number : null}</span>
      </div>
      <div>
        <label>Membership:</label>
        <select
          name="memberShip"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.memberShip}
        >
          <option value="" label="Select membership" />
          <option value="Gold" label="Gold" />
          <option value="Diamond" label="Diamond" />
        </select>
        <span>{formik.touched.memberShip && formik.errors.memberShip ? formik.errors.memberShip : null}</span>
      </div>
      <button type="submit">Update</button>      
    </form>
    </>
  );
};

export default Update;
