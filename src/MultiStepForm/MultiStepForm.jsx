

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { UserInfo } from "./UserInfo";
import { AddressInfo } from "./AddressInfo";
import { ContactInfo } from "./ContactInfo";

import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePhone,
  validateAddress,
  validateCity,
  validateCountry,
  validateDescription,
  validateHobby
} from "./Validations/Validations";

export const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(0);

  const [formData, setFormData] = useState({
    id: Date.now(),
    fname: "",
    lname: "",
    hobby: [],
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const old = JSON.parse(localStorage.getItem("multiForm") || "[]");
      const found = old.find((user) => user.id === Number(id));
      if (found) setFormData(found);
    }
  }, [id]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateData = () => {
    const stepErrors = {};

    if (step === 1) {
      stepErrors.fname = validateFirstName(formData.fname);
      stepErrors.lname = validateLastName(formData.lname);
      stepErrors.hobby = validateHobby(formData.hobby);

      setErrors(stepErrors);
      return stepErrors.fname === "" && stepErrors.lname === "" && stepErrors.hobby === "";
    }

    if (step === 2) {
      stepErrors.address = validateAddress(formData.address);
      stepErrors.city = validateCity(formData.city);
      stepErrors.country = validateCountry(formData.country);

      setErrors(stepErrors);
      return stepErrors.address === "" && stepErrors.city === "" && stepErrors.country === "";
    }

    if (step === 3) {
      stepErrors.email = validateEmail(formData.email);
      stepErrors.phone = validatePhone(formData.phone);
      stepErrors.description = validateDescription(formData.description);

      setErrors(stepErrors);
      return stepErrors.email === "" && stepErrors.phone === "" && stepErrors.description === "";
    }

    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(step);

    if (step < 3) {
      if (validateData()) {
        setStep((s) => s + 1);
      }
    } else if (step === 3) {
      if (validateData()) {
        const getData = JSON.parse(localStorage.getItem("multiForm")) || [];

        if (!id) {
          localStorage.setItem("multiForm", JSON.stringify([...getData, formData]));
        } else {
          const index = getData.findIndex((x) => x.id === Number(id));
          getData[index] = formData;
          localStorage.setItem("multiForm", JSON.stringify(getData));
        }

        navigate("/listing-page");
      }
    }
  };

  return (
    <div className="mx-auto px-9 py-6 w-[400px] mt-10 rounded-lg">

      <div className="w-full bg-gray-300 h-2 rounded-full mb-6">
        <div
          className="bg-sky-400 h-2 rounded-full transition-all duration-500"
          style={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
        ></div>
      </div>

      <form onSubmit={handleSubmit} className="flex justify-center mt-10">
        <div className="bg-white p-6 rounded-md w-96">


          {step === 1 && (
            <UserInfo
              values={formData}
              errors={errors}
              isSubmitted={submitted}
              handleChange={(e) => handleChange(e.target.name, e.target.value)}
              handleSelect={(val) => handleChange("hobby", val)}
            />
          )}

          {step === 2 && (
            <AddressInfo
              values={formData}
              errors={errors}
              isSubmitted={submitted}
              handleChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          )}

          {step === 3 && (
            <ContactInfo
              values={formData}
              errors={errors}
              isSubmitted={submitted}
              handleChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          )}



          {step <= 3 && (
            <div className="mt-6 flex justify-center gap-5">

              {(step === 2 || step === 3) && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold px-6 py-2 rounded-md"
                >
                  Previous
                </button>
              )}

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-md"
              >
                {step === 3 ? (id ? "Update User" : "Submit") : id ? "Save Changes" : "Next"}
              </button>

            </div>
          )}

        </div>
      </form>
    </div>
  );
};
