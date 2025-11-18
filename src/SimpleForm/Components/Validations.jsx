export const validateForm = (formValue) => {
  const errors = {};  
  let isValid = true;

  const nameRegex = /^[A-Za-z\s]+$/;
  if (!formValue.name.trim()) {
    errors.name = "Name is required";
  } else if (!nameRegex.test(formValue.name)) {
    errors.name = "Name can only contain letters and spaces";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formValue.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(formValue.email)) {
    errors.email = "Invalid email format";
  }

  if (!formValue.gender) {
    errors.gender = "Gender is required";
  }

  if (formValue.skills.length === 0) {
    errors.skills = "At least one skill must be selected";
  }

  if (!formValue.date || isNaN(formValue.date)) {
    errors.date = "Please select a valid date";
  }

  const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{2,3}\)?[-.\s]?)?[\d\-.\s]{7,}$/;
  if (!formValue.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!phoneRegex.test(formValue.phone)) {
    errors.phone = "Invalid phone number";
  }

  if (!formValue.description.trim()) {
    errors.description = "Description is required";
  }

  return Object.keys(errors).length > 0 ? errors : null; 
};
