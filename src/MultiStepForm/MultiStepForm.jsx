import { useState } from "react";
import { UserInfo } from "./UserInfo";
import { AddressInfo } from "./AddressInfo";
import { ContactInfo } from "./ContactInfo";

export const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    nextStep();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <UserInfo
            nextStep={nextStep}
            handleChange={handleChange}
            values={formData}
            />
        );
      case 2:
        return (
            <AddressInfo
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            value={formData}
            />
        )
      case 3:
        return (
        <ContactInfo
        nextStep={nextStep}
        prevStep={prevStep}
        handleChange={handleChange}
        values={formData}
        />
        ) 
        default:
        return (
          <UserInfo
            nextStep={nextStep}
            prevStep={ prevStep}
            handleChange={handleChange}
            values={formData}
            />
        );
    }
  };

  return <>{renderStep()}</>;
};
