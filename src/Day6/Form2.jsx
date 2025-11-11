import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { addUser, updateUser } from '../services/api';

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Email must be in a valid format").required("Email is required"),
  phone: yup.number().required("Phone number is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zipcode: yup.number().required("Zipcode is required"),
});

export const UserForm = ({ user, onFormSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: user ? user.name : '',
      email: user ? user.email : '',
      phone: user ? user.phone : '',
      address: user ? user.address : '',
      city: user ? user.city : '',
      state: user ? user.state : '',
      zipcode: user ? user.zipcode : ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (user) {
        onFormSubmit(user.id, values);
      } else {
        onFormSubmit(null, values);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input type="text" name="name" onChange={formik.handleChange} value={formik.values.name} placeholder="Name" />
      {formik.errors.name && <div>{formik.errors.name}</div>}
      <input type="email" name="email" onChange={formik.handleChange} value={formik.values.email} placeholder="Email" />
      {formik.errors.email && <div>{formik.errors.email}</div>}
      <input type="text" name="phone" onChange={formik.handleChange} value={formik.values.phone} placeholder="Phone" />
      {formik.errors.phone && <div>{formik.errors.phone}</div>}
      <input type="text" name="address" onChange={formik.handleChange} value={formik.values.address} placeholder="Address" />
      {formik.errors.address && <div>{formik.errors.address}</div>}
      <input type="text" name="city" onChange={formik.handleChange} value={formik.values.city} placeholder="City" />
      {formik.errors.city && <div>{formik.errors.city}</div>}
      <input type="text" name="state" onChange={formik.handleChange} value={formik.values.state} placeholder="State" />
      {formik.errors.state && <div>{formik.errors.state}</div>}
      <input type="text" name="zipcode" onChange={formik.handleChange} value={formik.values.zipcode} placeholder="Zipcode" />
      {formik.errors.zipcode && <div>{formik.errors.zipcode}</div>}
      <button type="submit">Save</button>
    </form>
  );
};
