
import { useEffect, useState } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from 'react-select';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import Swal from 'sweetalert2';
import { validateCity, validateDescription, validateFood, validateName, validateEmail, validatePhone } from "./Validations";
import { useNavigate, useParams } from "react-router-dom";

export const DynamicForm = () => {
    const [formData, setFormData] = useState([{
        id: Date.now(),
        name: '',
        email: '',
        city: '',
        phone: '',
        food: [],
        description: ''
    }]);

    const [submited, setSubmited] = useState(false);

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
        { value: 'coffee', label: 'Coffee' },
        { value: 'cake', label: 'Cake' },
    ];

    const handleChange = (index, field, value) => {
        const updated = [...formData];
        updated[index][field] = value;
        setFormData(updated);
    }

    const addForm = () => {
        const fields = {
            id: Date.now(),
            name: '',
            email: '',
            city: '',
            phone: '',
            food: [],
            description: ''
        }
        setFormData([...formData, fields]);
    }

    const validate = () => {
        for (let form of formData) {
            if (
                validateName(form.name) ||
                validateEmail(form.email) ||
                validateCity(form.city) ||
                validatePhone(form.phone) ||
                validateFood(form.food) ||
                validateDescription(form.description)
            ) {
                return true;
            }
        }
        return false;
    }

    const navigate = useNavigate();

    const handleSubmit = (e) => {
    e.preventDefault();
    setSubmited(true);

    if (validate()) return;

    const existingData = JSON.parse(localStorage.getItem("dynamicForm")) || [];

    if (!id) {
        const newData = [...existingData, ...formData];
        localStorage.setItem("dynamicForm", JSON.stringify(newData));

        Swal.fire({
            title: "Form submitted!",
            icon: "success"
        });
    } 
    else {
        const updated = existingData.map((item) =>
            item.id === Number(id) ? { ...item, ...formData[0] } : item
        );

        localStorage.setItem("dynamicForm", JSON.stringify(updated));

        Swal.fire({
            title: "User Updated!",
            icon: "success"
        });
    }

    navigate("/table");
};

    const moveBtn = ()=>
    {
        navigate('/table');
    }


const delteForm = (index) => {
     console.log(formData.length);
    // if (formData.length === 1) {
    //     Swal.fire({
    //         icon: "warning",
    //         title: "You cannot delete the last form!",
    //         text: "At least one form is required."
    //     });
    //     return;   
    // }


    const data = [...formData];
    data.splice(index, 1);
    setFormData(data);
};


    const{id}=useParams();

    useEffect(()=>{
    if(id)
    {
        const user = JSON.parse(localStorage.getItem('dynamicForm')||'[]')
        const found = user.find(p=>p.id===Number(id))
             if (found) 
                {
                    setFormData([found]);
                }
            //  console.log(user);
            //  console.log(found)

    }
    },[id])
    return (
        <>
        <div className="h-200 w-100 px-5 py-1 bg-stone-100 shadow-lg mt-3 mx-auto">
            <div className="flex gap-6 justify-center">
            <button className="mt-3 bg-sky-700 px-6 py-1 text-white cursor-pointer rounded" onClick={moveBtn}>Show user</button>
            <button
                type="button"
                onClick={addForm}
                className="mt-3 bg-sky-500 px-6 py-1 text-white cursor-pointer rounded"
            >
                Add Form
            </button>
            </div>
            <form onSubmit={handleSubmit}>
                {formData.map((form, index) => (
                    <div key={form?.id} className="border p-5 mt-5 rounded-lg bg-white shadow-md">
                        <h2 className="font-bold mb-3 text-sky-600">Form {index + 1}</h2>

                        <label>Name:</label><br />
                        <input
                            type="text"
                            className="border px-4 py-1 rounded-lg mb-3 w-full"
                            value={form?.name}
                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                        /><br />
                        {submited && validateName(form?.name) && <p className="text-red-500">{validateName(form?.name)}</p>}

                        <label>Email:</label><br />
                        <input
                            type="email"
                            className="border px-4 py-1 rounded-lg mb-3 w-full"
                            value={form?.email}
                            onChange={(e) => handleChange(index, 'email', e.target.value)}
                        /><br />
                        {submited && validateEmail(form?.email) && <p className="text-red-500">{validateEmail(form?.email)}</p>}

                        <label>City:</label><br />
                        <input
                            type="text"
                            className="border px-4 py-1 rounded-lg mb-3 w-full"
                            value={form?.city}
                            onChange={(e) => handleChange(index, 'city', e.target.value)}
                        /><br />
                        {submited && validateCity(form?.city) && <p className="text-red-500">{validateCity(form?.city)}</p>}

                        <label>Phone:</label><br />
                        <PhoneInput
                            country={'us'}
                            value={form?.phone}
                            onChange={(phone) => handleChange(index, 'phone', phone)}
                        /><br /><br />
                        {submited && validatePhone(form?.phone) && <p className="text-red-500">{validatePhone(form?.phone)}</p>}

                        <label>Food:</label><br />
                        <Select
                            closeMenuOnSelect={false}
                            isMulti
                            options={options}
                            value={form?.food}
                            onChange={(food) => handleChange(index, 'food', food)}
                        /><br />
                        {submited && validateFood(form?.food) && <p className="text-red-500">{validateFood(form?.food)}</p>}

                        <label>Description:</label><br />
                        <ReactQuill
                            theme="snow"
                            value={form?.description}
                            onChange={(desc) => handleChange(index, 'description', desc)}
                        />
                        {submited && validateDescription(form?.description) && <p className="text-red-500">{validateDescription(form?.description)}</p>}

                        <button
                            type="button"
                            className="border px-6 py-1 bg-stone-600 text-white cursor-pointer hover:bg-red-400 mt-5"
                            disabled={formData.length === 1}
                            onClick={() => delteForm(index)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
                <button
                    type="submit"
                    className="mx-auto px-9 py-2 mt-5 cursor-pointer bg-sky-700 text-white hover:bg-sky-500 transition rounded"
                >
                 {id ? "Update User" : "Submit"}  
                </button>
            </form>
        </div>
        </>
    );
}
