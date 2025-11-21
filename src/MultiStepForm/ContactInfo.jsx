import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export const ContactInfo = ({ handleChange, handleSubmit, values, errors }) => {

  const [value, setValue] = useState('')


  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border border-gray-300 rounded-lg ">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Contact Info</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Phone:</label>

          <PhoneInput
            country={'us'}
            value={values.phone}
            onChange={(phone)=> handleChange({target : {name:'phone',value:phone}})}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        </div>

        <div>
          <label>Description:</label>
          <ReactQuill theme="snow" value={values.description} onChange={(description)=> handleChange({target : {name:"description",value:description}})} />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

        </div>

      </form>
    </div>
  );
};
