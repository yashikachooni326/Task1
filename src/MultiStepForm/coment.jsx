
// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Swal from "sweetalert2";

// import { UserInfo } from "./UserInfo";
// import { AddressInfo } from "./AddressInfo";
// import { ContactInfo } from "./ContactInfo";

// import {
//   validateFirstName,
//   validateLastName,
//   validateEmail,
//   validatePhone,
//   validateAddress,
//   validateCity,
//   validateCountry,
//   validateDescription,
//   validateHobby
// } from "./Validations/Validations";

// export const MultiStepForm = () => {
//   const [step, setStep] = useState(1);
//   const [submitted, setSubmitted] = useState(0)


//   const [formData, setFormData] = useState({
//     id: Date.now(),
//     fname: "",
//     lname: "",
//     hobby: [],
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     country: "",
//     description: "",
//   });

//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     if (id) {
//       const old = JSON.parse(localStorage.getItem("multiForm") || "[]");
//       const found = old.find((user) => user.id === Number(id));
//       if (found) setFormData(found);
//     }
//   }, [id]);

//   const handleChange = (name, value) => {
//     setFormData((p) => ({ ...p, [name]: value }));
    
//     let msg = "";
//     if (name === "fname") msg = validateFirstName(value);
//     if (name === "lname") msg = validateLastName(value);
//     if (name === "hobby") msg = validateHobby(value);
//     if (name === "address") msg = validateAddress(value);
//     if (name === "city") msg = validateCity(value);
//     if (name === "country") msg = validateCountry(value);
//     if (name === "email") msg = validateEmail(value);
//     if (name === "phone") msg = validatePhone(value);
//     if (name === "description") msg = validateDescription(value);

//     setErrors((p) => ({ ...p, [name]: msg }));
//   };



//   // const validateStep = () => {
//   //   let stepErrors = {};

//   //   if (step === 1) {
//   //     stepErrors = {
//   //       fname: validateFirstName(formData.fname),
//   //       lname: validateLastName(formData.lname),
//   //       hobby: validateHobby(formData.hobby),
//   //     };

//   //     if (stepErrors.fname || stepErrors.lname || stepErrors.hobby) {
//   //       setErrors(stepErrors);
//   //       return false;
//   //     }
//   //   }

//   //   if (step === 2) {
//   //     stepErrors = {
//   //       address: validateAddress(formData.address),
//   //       city: validateCity(formData.city),
//   //       country: validateCountry(formData.country),
//   //     };

//   //     if (stepErrors.address || stepErrors.city || stepErrors.country) {
//   //       setErrors(stepErrors);
//   //       return false;
//   //     }
//   //   }

//   //   if (step === 3) {
//   //     stepErrors = {
//   //       email: validateEmail(formData.email),
//   //       phone: validatePhone(formData.phone),
//   //       description: validateDescription(formData.description),
//   //     };

//   //     if (stepErrors.email || stepErrors.phone || stepErrors.description) {
//   //       setErrors(stepErrors);
//   //       return false;
//   //     }
//   //   }

//   //   return true;
//   // };



//   const validateData = ()=>
//   {
//     if(step==1)
//     {
//       if(!validateFirstName(formData.fname) &&  !validateLastName(formData.lname) && !validateHobby(formData.hobby))
//       {
//         return true;
//       }
//       else{
//         return false;
//       }
//     }

//     else if(step==2)
//     {
//       if(!validateAddress(formData.address) && !validateCountry(formData.country) && !validateCity(formData.city))
//       {
//         return true;
//       }
//       else{
//         return false;
//       }
//     }

//     else if(step==3)
//     {
//       return true;
//     }
//   }
//   // const nextStep = () => {
//   //   if (validateStep()) setStep(step + 1);
//   // };

//   // const prevStep = () => setStep(step - 1);


//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   if (!validateStep()) return;

//   //   const old = JSON.parse(localStorage.getItem("multiForm") || "[]");

//   //   if (id) {
//   //     const updated = old.map((user) =>
//   //       user.id === Number(id) ? formData : user
//   //     );
//   //     localStorage.setItem("multiForm", JSON.stringify(updated));
//   //     Swal.fire({ icon: "success", title: "User Updated!" });
//   //   } 
//   //   else {
//   //     localStorage.setItem("multiForm", JSON.stringify([...old, formData]));
//   //     Swal.fire({ icon: "success", title: "Form Submitted!" });
//   //   }

//   //   navigate("/listing-page");
//   // };

//   const handleSubmit = (e)=>
//   {
//     e.preventDefault();
//     if(step < 3)
//     {
//     setSubmitted(step)
//     if(validateData()){
//       setStep((s)=> s+1);
//     }
//     }
//     else if(step==3)
//     {
//       setSubmitted(3)

//       if(validateData())
//       {
//         const getData = JSON.parse(localStorage.getItem('multiForm')) || []
//         if(!id)
//         {
//           localStorage.setItem('multiForm',JSON.stringify([...getData,formData]))
//         }
//         else if(id)
//         {
//           getData[id] = formData
//           localStorage.setItem('multiForm',JSON.stringify([...getData]))
//         }
// navigate("/listing-page");
//         setStep((s)=> s+1)
//       }
//     }
//   }

//   return (
    


// <>
    
//         <div className="mx-auto px-9 py-6 w-[400px] mt-10 rounded-lg">

//        <div className="w-full bg-gray-300 h-2 rounded-full mb-6">
//          <div
//           className={`bg-sky-400 h-2 rounded-full transition-all duration-500`}
//           style={{
//             width:
//               formData === 1
//                 ? "10%"
//                 : formData === 2
//                 ? "66%"
//                 : "100%",
//           }}
//         ></div>
//       </div>
//     <form onSubmit={handleSubmit} className="flex justify-center mt-10">
//       <div className="bg-white p-6 rounded-md w-96">
      
//         {step === 1 && (
//           <UserInfo
//             values={formData}
//             errors={errors}
//             handleChange={(e) =>
//               handleChange(e.target.name, e.target.value)
//             }
//             handleSelect={(val) => handleChange("hobby", val)}
//           />
//         )}

//       {step === 2 && (
//           <AddressInfo
//             values={formData}
//             errors={errors}
//             handleChange={(e) =>
//               handleChange(e.target.name, e.target.value)
//             }
//           />
//         )}

//         {step === 3 && (
//           <ContactInfo
//             values={formData}
//             errors={errors}
//             handleChange={(e) =>
//               handleChange(e.target.name, e.target.value)
//             }
//           />
//         )}

//         <div className="flex justify-between mt-6">
//           {step > 1 && (
//             <button
//               type="button"
//               onClick={prevStep}
//               className="px-4 py-2 bg-stone-600 text-white "
//             >
//               Previous
//             </button>
//           )}

//           {step < 3 && (
//             <button
//               type="button"
//               onClick={nextStep}
//               className="ml-auto px-4 py-2 bg-blue-500 text-white"
//             >
//               Next
//             </button>
//           )}

//           {step === 3 && (
//             <button
//               type="submit"
//               className="ml-auto px-4 py-2 bg-green-500 text-white rounded"
//             >
//               {id ? "Update User" : "Submit"}
//             </button>
//           )}
//         </div>
//       </div>
//     </form>
//     </div>
//     </>

//   );
// };



