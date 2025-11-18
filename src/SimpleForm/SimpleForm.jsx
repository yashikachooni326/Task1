import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import Swal from 'sweetalert2'
import { validateForm } from "./Components/Validations";


export const SimpleForm = () => {

  const options = [
    { value: 'Node', label: 'Node' },
    { value: 'React', label: 'React' },
    { value: 'Html', label: 'Html' },
    { value: 'Mongo', label: 'Mongo' },
    { value: 'TypeScript', label: 'Typescript' },
    { value: 'Java', label: 'Java' },
    { value: 'React Native', label: 'React Native' },
    { value: 'Javascript', label: 'Javascript' }
  ];


  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    gender: "",
    skills: [],
    date: new Date(),
    phone: "",
    description: ""
  });

  const [errors, setErrors] = useState({});
const [isSubmitted, setIsSubmitted] = useState(false); 
 const [data,setdata] = useState([]);
 const[isValid, setIsValid] = useState(false);

const handleChange = (e)=>
{
    const{name,value} = e.target
    setFormValue(prev => ({...prev,[name]:value}))
    if(isSubmitted)
    {
  setErrors(validateForm({...formValue, [name]: value}) || {});    
   }
}

const handleSubmit = (e)=> {
    e.preventDefault();
    const validationErrors = validateForm(formValue);
    setErrors(validationErrors);
    
    const formIsValid = !validationErrors; 
    setIsValid(formIsValid);
    setIsSubmitted(true);

    if (formIsValid) { 
        console.log('Form Submitted!');
        setdata(prev=> [...prev,formValue])
        localStorage.setItem('userdata',JSON.stringify(formValue));
        Swal.fire({
            title: "form submitted!",
            icon: "success",
            draggable: true
        });
    } else {
        console.log('Form has errors');
    }
};

  return (
    <>
      <form onSubmit={handleSubmit}>
  <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl border border-indigo-300 rounded-xl">
 <button className="border px-7 py-1 cursor-pointer  bg-indigo-300">Show Users</button>
          <h1 className="text-center mb-10 font-semibold text-3xl text-indigo-500">
            User Form
          </h1>

          <label className="font-medium text-gray-600">Name:</label>
          <input
            className="border w-full h-10 rounded-lg mb-5 px-3"
            type="text"
            name="name"
            value={formValue.name}
            onChange={handleChange}
          /><br/>
 {errors.name && <p className=" text-red-500 text-sm mt-1 mb-3">{errors.name}</p>}
          <label className="font-medium text-gray-600">Email:</label>
          <input
            className="border w-full h-10 rounded-lg mb-5 px-3 "
            type="email"
            name="email"
            value={formValue.email}
            onChange={handleChange}
          /><br/>
          {errors.email && <p className="text-red-500 text-sm mt-1 mb-3">{errors.email}</p>}
          

          <label className="font-medium text-gray-600">Gender:</label>
          <div className="flex gap-6 mb-5 mt-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="gender" value="male"  onChange={handleChange}/>
              <span>Male</span>
            </label>

            <label className="flex items-center gap-2">
              <input type="radio" name="gender" value="Female" onChange={handleChange} />
              <span>Female</span>
            </label>

            <label className="flex items-center gap-2">
              <input type="radio" name="gender" value="others" onChange={handleChange} />
              <span>Others</span>
            </label>
          </div><br/>
          {errors.gender && <p className="text-red-500 text-sm mt-1 mb-3 " >{errors.gender}</p>}

          <label className="font-medium text-gray-600">Skills:</label>
          <Select
            className="mt-1 mb-5"
            isMulti
            isSearchable
            defaultValue={formValue.skills}
            options={options}
            value={formValue.skills}
            onChange={(e)=> setFormValue(prev=>({...prev,skills:e}) )}
          /><br/>
                    {errors.skills && <p className="text-red-500 text-sm mt-1 mb-3">{errors.skills}</p>}

          <label className="font-medium text-gray-600">Select Date:</label><br/>
          <DatePicker
            className="border w-150 px-3 h-10 rounded-lg mb-5"
            value={formValue.date}
            selected={formValue.date}
            onChange={(e)=> setFormValue(prev => ({...prev,date:e}))}
          /><br/>
          {errors.date && <p className="text-red-500 text-sm mt-1 mb-3">{errors.date}</p>}

          <label className="font-medium text-gray-600">Phone Number:</label><br/>
          <div className="mb-5">
            <PhoneInput
            country={'us'} 
            value={formValue.phone}
            // className="w-250"
            onChange={(e)=> setFormValue(prev => ({...prev,phone:e}))}
            />
          </div><br/>
          {errors.phone && <p className="text-red-500 text-sm mt-1 mb-3">{errors.phone}</p>}

          <label className="font-medium text-gray-600">Description:</label>
          <ReactQuill
            className="w-full h-40 mb-8"
            theme="snow"
            value={formValue.description}
            onChange={(e)=> setFormValue(prev => ({...prev,description:e}))}
          /><br/>
          {errors.description && <p className="text-red-500 text-sm mt-1 mb-3">{errors.description}</p>}

          <button
            type="submit"
            className="w-70  ml-35 h-11 bg-indigo-600 text-white rounded-lg mt-5 
          cursor-pointer  hover:bg-indigo-500 transition font-medium shadow-md" > Submit </button>
        </div>
      </form>
    </>
  );
}




