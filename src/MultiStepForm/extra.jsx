import { useState } from "react";
import UserInfo from "../../Components/UserInfo";
import CompanyInfo from "../../Components/CompanyInfo";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { validateEmail, validateName, validatePhoneNo, validateUrl } from '../../Components/Validations';
import BankInfo from "../../Components/BankInfo";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";

function MultiStepForm() {
    const [step, setStep] = useState(1);
    const { id } = useParams()
    const navigate = useNavigate()
    const [userToEdit, setEdit] = useState()
    const [submitted, setSubmitted] = useState(0)
    const [formData, setFormData] = useState({
        userInfo: {
            name: "",
            email: "",
            bio: "",
            phoneNo: "",
            skills: {}
        },
        companyInfo: {
            name: "",
            url: "",
        },
        bankInfo: {
            branchName: "",
            branchNo: "",
            accountType: {}

        }

    });
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("multiStepData"))
        console.log(data)
        console.log(data[id])
        setEdit(data[id])
    }, [])

    useEffect(() => {
        if (userToEdit) {
            setFormData(userToEdit);
        }
    }, [userToEdit]);


    const back = () => setStep((s) => s - 1);

    const handleChange = (name, value, keyName) =>     
    {
        setFormData((prev) => ({
            ...prev,
            [keyName]: {
                ...prev[keyName],
                [name]: value
            }
        }));
        console.log(formData)

    }


    const validateData = () => {
        if (step == 1) {
            if (!validateName(formData.userInfo.name) && !validateEmail(formData.userInfo.email) && !validatePhoneNo(formData.userInfo.phoneNo)) {
                return true;
            }
            else {
                return false
            }
        } 
        else if (step == 2) {
            if (!validateUrl(formData.companyInfo.url)){
                return true;
            }
            else {
                return false
            }
        }
        else if (step == 3) {
            return true;
        }
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (step < 3) {
            setSubmitted(step)
            if (validateData()){
                setStep((s) => s + 1)
            }
        }
        else if (step == 3) {
            setSubmitted(3)

            if (validateData()) {
                let multiStepData = JSON.parse(localStorage.getItem("multiStepData")) || []
                if (!id) {

                    localStorage.setItem("multiStepData", JSON.stringify([...multiStepData, formData]))
                    toast.success("Form submitted successfully")
                }
                else if (id) {
                    multiStepData[id] = formData
                    localStorage.setItem("multiStepData", JSON.stringify([...multiStepData]))
                    toast.success("Record Updated successfully")

                }
                navigate("/multistep/listing")
                setStep((s) => s + 1)
            }
        }

    };

    return (
        <div className="flex justify-center mt-20 flex flex-col place-self-center">
             <ProgressBar step={step} />
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-white border-2 border-blue-700 rounded-xl shadow-2xl p-2"
            >
                <button type="button" className='bg-blue-900 rounded px-5 p-2 max-w-20 text-white  font-bold'
                    onClick={() => { navigate("/multistep/listing") }}
                >Back</button>
                {step === 1 && (
                    <UserInfo
                        info={formData.userInfo}
                        handleChange={handleChange}
                        isSubmitted={submitted}

                    />
                )}

                {step === 2 && (
                    <>
                        <CompanyInfo
                            info={formData.companyInfo}
                            handleChange={handleChange}
                            isSubmitted={submitted}

                        />


                    </>
                )}
                {
                    step === 3 && (
                        <>
                            <BankInfo
                                info={formData.bankInfo}
                                handleChange={handleChange}
                                isSubmitted={submitted}

                            />

                        </>
                    )
                }

                {
                    step <= 3 && <div className="mt-15 flex justify-center gap-5">
                        {
                            step === 2 || step === 3 ? <button
                                type="button"
                                onClick={back}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold px-6 py-2 rounded-md"
                            >
                                Previous
                            </button> : null
                        }

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-md"
                        >
                            {step === 3 ? id ? "Update" : "Submit" : id ? "Save Changes" : "Next"}

                        </button>
                    </div>
                }

            </form>
        </div>
    );

}

export default MultiStepForm;
